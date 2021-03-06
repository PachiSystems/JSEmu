var Chip8Emu = function() {
    var memory = new ArrayBuffer(0x1000);

    this.delay_timer = 0;
    this.cycleAmount = 8; // Should give us about 60Hz
    this.halt = false;
    this.gfx = new Array(64 * 32);
    this.I = 0;
    this.key = new Array(16);
    this.keymap = {};
    this.memory = new Uint8Array(memory);
    this.opcode = 0x0000;
    this.randomNumber = 0;
    this.renderer = null;
    this.sound_timer = 0;
    this.sp = 0;
    this.stack = new Array(16);
    this.step = 0;
    this.TEST_MODE = false;
    this.V = new Array(16);

    this.init();
};

Chip8Emu.prototype = {

    init : function() {
        /**
         * The initialize function can also be called to reset the emulator to its default state.
         */
        var me = this,
            i;

        /* MEMORY INITIALISATION
         Chip 8 has 4K memory in total.
         Memory map:
         0x000 - 0x1FF = Chip 8 interpreter (contains font set in emu)
         0x050 - 0x0A0 = Used for the built in 4x5 pixel font set (0-F)
         0x200 - 0xFFF = Program ROM and work RAM
         */
        // Blanking.
        for(i=0;i<me.memory.length;i++) {
            me.memory[i] = 0;
        }
        // Install font. (Going to put the font where it should be...)
        var fontset = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
            0x20, 0x60, 0x20, 0x20, 0x70, // 1
            0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
            0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
            0x90, 0x90, 0xF0, 0x10, 0x10, // 4
            0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
            0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
            0xF0, 0x10, 0x20, 0x40, 0x40, // 7
            0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
            0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
            0xF0, 0x90, 0xF0, 0x90, 0x90, // A
            0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
            0xF0, 0x80, 0x80, 0x80, 0xF0, // C
            0xE0, 0x90, 0x90, 0x90, 0xE0, // D
            0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
            0xF0, 0x80, 0xF0, 0x80, 0x80  // F
        ];
        for (i = 0 ; i < fontset.length; i++) { me.memory[i+0x050] = fontset[i]; }

        /* GENERAL REGISTERS INITIALISATION
         Chip 8 has 15 8-bit general purpose registers named V0 to VE.
         The 16th register (VF) is used for the 'carry flag'
         */
        for(i = 0 ; i < me.V.length ; i++) { me.V[i]=0; }

        /* GRAPHICS INITIALISATION
         The graphics are black and white and the screen has a total of 2048 pixels (64x32).
         Chip 8 has one instruction that draws a sprite to the screen. Drawing is done in XOR
         mode and if a pixel is turned off as a result of drawing, the VF register is set.
         This is used for collision detection.
         */
        for(i = 0 ; i < me.gfx.length ; i++) { me.gfx[i]=0; }

        /* PROGRAM COUNTER & INDEX REGISTER
            There is an Index register (I) and a program counter (pc) which can have a value from 0x000 to 0xFFF.
         */
        me.pc = 0x200; // Program counter starts at 0x200 (program memory)
        me.I  = 0;     // Reset index register

        /* STACK INITIALISATION
         Chip 8's instruction set has opcodes which allow the program to jump to a certain address
         or call a subroutine. The specification of the chip doesn't mention a stack, but one will
         have to be implemented. It is used to remember the current location before a jump is performed.
         So anytime this happens, we must store the program counter in the stack before proceeding.
         Chip 8 has 16 levels of stack and in order to remember which part of the stack is used,
         we will also need a stack pointer (sp).
         */
        me.sp = 0;
        for(i=0 ; i < me.stack.length ; i++) { me.stack[i]=0; }

        /* OPCODE HOLDER
         Chip 8 has 35 opcodes which are all two bytes long.
         */
        me.opcode = 0x0000;     // Reset current opcode

        /* TIMERS INITIALISATION
         Chip 8 has no interrupts or hardware registers, but there are two timer registers that
         count at 60Hz. When set above zero, they will count down to zero. The buzzer sounds
         when the sound timer reaches zero.
         */
        me.delay_timer = 0;
        me.sound_timer = 0;
        me.step = 0;

        /* KEYPAD INITIALISATION
         Chip 8 has a HEX based keypad. Since we need to use a PC keyboard, the following mapping is used:

         PC Keyboard             Chip-8 Keypad
         [1] [2] [3] [4]          [1] [2] [3] [C]
         [Q] [W] [E] [R]          [4] [5] [6] [D]
         [A] [S] [D] [F]          [7] [8] [9] [E]
         [Z] [X] [C] [V]          [A] [0] [B] [F]

         This object maps an ASCII keycode to the keypad HEX value.
         */
        me.keymap = {
            "Digit1":0x1, // PC 1 -> C8 1
            "Digit2":0x2, // PC 2 -> C8 2
            "Digit3":0x3, // PC 3 -> C8 3
            "Digit4":0xC, // PC 4 -> C8 C
            "KeyQ":0x4, // PC Q -> C8 4
            "KeyW":0x5, // PC W -> C8 5
            "KeyE":0x6, // PC E -> C8 6
            "KeyR":0xD, // PC R -> C8 D
            "KeyA":0x7, // PC A -> C8 7
            "KeyS":0x8, // PC S -> C8 8
            "KeyD":0x9, // PC D -> C8 9
            "KeyF":0xE, // PC F -> C8 E
            "KeyZ":0xA, // PC Z -> C8 A
            "KeyX":0x0, // PC X -> C8 0
            "KeyC":0xB, // PC C -> C8 B
            "KeyV":0xF  // PC V -> C8 F
        };
        for (i = 0 ; i < me.key.length ; i++) { me.key[i]=0; }

        /* KEYPRESS EVENT HANDLERS
         This is a bit special... Normally the key handler should be a part of the emulation loop and
         checked after a cycle. However, since JS doesn't have a way to poll the keyboard state, we are
         going to have to capture the keypress and set a variable to the ASCII code when the key is down
         and remove it when the key is up.
         */
        window.onkeydown = function (ev) {

            var pressedKey = ev.code;

            if(pressedKey in me.keymap) {
                me.key[me.keymap[pressedKey]] = 1;
            }
        };

        window.onkeyup = function (ev) {
            // Unset the lastKeyPressed.
            var releasedKey = ev.code;

            if(releasedKey in me.keymap) {
                me.key[me.keymap[releasedKey]] = 0;
            }
        };

        window.onblur = function() {
            me.key[0x0] = 0;
            me.key[0x1] = 0;
            me.key[0x2] = 0;
            me.key[0x3] = 0;
            me.key[0x4] = 0;
            me.key[0x5] = 0;
            me.key[0x6] = 0;
            me.key[0x7] = 0;
            me.key[0x8] = 0;
            me.key[0x9] = 0;
            me.key[0xA] = 0;
            me.key[0xB] = 0;
            me.key[0xC] = 0;
            me.key[0xD] = 0;
            me.key[0xE] = 0;
            me.key[0xF] = 0;
        };
    },

    loadGame : function(romimage) {
        var xhr = new XMLHttpRequest(),
            me = this,
            i, len;

        /* GAME LOADING
         Load the program into the memory. Check to make sure it's not too big as well...
         */
        xhr.open("GET",romimage);
        xhr.responseType = "arraybuffer";

        xhr.onload = function() {

            var program = new Uint8Array(xhr.response);

            if (program.length <= (4096 - 512)) {

                for (i = 0; i < program.length; i++) {

                    me.memory[(i + 512)] = program[i];

                }

                // Emulation loop to trigger once our ROM has finished loading.

                // There's some problem with speed here... I'm assuming it's to do with the way that the loop processes
                // a fairly big array rather inefficiently... Perhaps I should find another way to run the loop...
                var start;

               requestAnimationFrame(function cpuCycle(timeStamp) {
                   if (typeof start === 'undefined') start = timeStamp;
                   var elapsed = timeStamp - start;

                   // This is incredibly slow...
                   if (elapsed >= me.cycleAmount) {
                       start = timeStamp;
                       me.emulateCycle();
                   }

                   // for (i = 0 , len = me.cycleAmount; i < len; i++) {
                   //     me.emulateCycle();
                   // }

                    if (me.drawflag) {
                        me.renderer.renderScreen(me.gfx);
                        me.drawflag = false;
                    }

                    if(me.step++ %2) {
                        if (me.delay_timer > 0) {
                            me.delay_timer--;
                        }

                        if (me.sound_timer > 0) {
                            if (me.sound_timer === 1) {
                                console.log("BEEP!");
                            }
                            me.sound_timer--;
                        }
                    }

                   requestAnimationFrame(cpuCycle);
               });

            } else {

                console.error("This program will not fit into Chip-8 memory.");

            }

        };
        xhr.send();
    },

    beginEmulation : function(romimage, renderer) {
        /* EMULATION OF CHIP-8
         Call this function with the path of the ROM you want to use. That should be it...
         If it doesn't work, then there's something wrong... Obviously...
         You can submit a bug/issue at http://github.com/PachiSystems/JSEmu
         Please be as descriptive as possible. I'll try and put a test suite together when I have time.

         NEW ADDITION: Instead of the 'canvasID', there should be a 'renderer' passed. In the future, the renderer
                       should work for ALL implemented engines and not just CHIP-8. However, since that is a fair way
                       away, there should be a 'CHIP8Renderer.js' in this folder that can be used. It should contain the
                       following methods:
                        drawPixel(x,y,colour) to draw a pixel at a certain position (scaling handled by the display).

                       This should free up a few cycles from the CPU... The renderer should be initialised separately.
                       from the CPU.
         */
        var me = this;

        me.renderer = renderer;

        if(romimage == "TEST_MODE") {
            me.TEST_MODE = true;
            me.randomNumber = 0; // This can be test in a test case.
        } else {
            me.TEST_MODE = false;
            me.loadGame(romimage);
        }
    },

    emulateCycle : function() {
        /**
         * This is the meat and potatoes of it all...
         */
        var me = this,
            i, xline, yline, total;

        // Fetch Opcode
        me.opcode = me.memory[me.pc] << 8 | me.memory[me.pc + 1];

        // These values seem to be the same all the time. Let's cache them and stop processing so many bitshifts in the
        // OPCODE functions.
        me.Vx = (me.opcode & 0x0F00) >> 8;
        me.Vy = (me.opcode & 0x00F0) >> 4;

        // Decode Opcode
        switch(me.opcode & 0xF000) {

            case 0x0000:
                switch(me.opcode & 0x000F) {
                    case 0x0000: // 0x00E0: Clears the screen
                        // Execute opcode
                        // Let's do this a little more intelligently... If we're now using a renderer to handle our
                        // graphics, let's just tell that to clear the screen... Might speed it up a bit...

                        me.renderer.clearScreen();


                        for(i = me.gfx.length-1; i >= 0 ; i--) {
                            me.gfx[i] = 0;
                        }

                        me.drawflag = true;


                        me.pc += 2; // Increment the program counter.
                        break;
                    case 0x000E: // 0x00EE: Returns from subroutine
                        // Execute opcode
                        me.sp--; // Move back down the stack.
                        // We're going to jump, so no incrementing the program counter.
                        me.pc = me.stack[me.sp]; // Stack pointer points to the last address on the stack.
                        break;

                    default:
                        console.error("Unknown opcode [0x0000]: 0x" + me.opcode);
                        me.halt = true;
                        break;
                }
                break;

            case 0x1000: // 0x1nnn: Jump to address nnn
                // Execute opcode
                // Does it need to go on the stack?...
                // me.stack[sp] = pc;
                // me.sp++;
                // We're jumping... Don't increment the program counter, but point it somewhere else...
                me.pc = me.opcode & 0x0FFF;
                break;

            case 0x2000: // 0x2nnn: Calls the subroutine at address nnn
                // Execute opcode
                me.stack[me.sp] = me.pc + 2; // If we don't increment the program counter here,
                                             // we will just keep bouncing.
                me.sp++;
                // We're jumping... Don't increment the program counter, but point it somewhere else...
                me.pc = me.opcode & 0x0FFF;
                break;

            case 0x3000: // 0x3Xnn: Skips the next instruction if VX equals nn
                // Execute opcode
                if(me.V[me.Vx] == (me.opcode & 0x0FF)) {
                    // It equal, so skip the next instruction.
                    me.pc += 4;
                } else {
                    // Not equal, so keep on going.
                    me.pc += 2;
                }
                break;

            case 0x4000: // 0x4Xnn: Skips the next instruction if VX doesn't equal nn.
                // Execute opcode
                if(me.V[me.Vx] !== (me.opcode & 0x00FF)) {
                    // Not equal, so skip the next instruction.
                    me.pc += 4;
                } else {
                    // It's equal, so continue.
                    me.pc += 2;
                }
                break;

            case 0x5000: // 0x5XY0: Skips the next instruction if VX equals VY.
                // Execute opcode.
                if(me.V[me.Vx] == me.V[me.Vy]) {
                    // VX and VY match! Skip the next instruction.
                    me.pc += 4;
                } else {
                    // VX and VY are not the same. Keep going.
                    me.pc += 2;
                }
                break;

            case 0x6000: // 0x6Xnn: Sets VX to nn.
                // Execute opcode.
                me.V[me.Vx] = (me.opcode & 0x00FF);
                me.pc += 2; // Increment the program counter.
                break;

            case 0x7000: // 0x7Xnn: Adds nn to VX.
                // Execute opcode.
                // Does this set VF on overflow?... There seems to be no documentation.

                total = (me.V[me.Vx] + (me.opcode & 0x00FF));

                // carry? then V[F] = 1 :else: V[F] = 0
                (total > 255) ? me.V[0xF] = 1 : me.V[0xF] = 0;

                me.V[me.Vx] = total % 256;
                me.pc += 2; // Increment the program counter.
                break;

            case 0x8000:
                switch(me.opcode & 0x000F) {

                    case 0x0000: // 0x8XY0: Sets VX to the value of VY
                        // Execute opcode
                        me.V[me.Vx] = me.V[me.Vy];
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0001: // 0x8XY1: Sets VX to VX | VY
                        // Execute opcode
                        me.V[me.Vx] |= me.V[me.Vy];
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0002: // 0x8XY2: Sets VX to VX & VY
                        // Execute opcode
                        me.V[me.Vx] &= me.V[me.Vy];
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0003: // 0x8XY3: Sets VX to VX XOR VY
                        // Execute opcode
                        me.V[me.Vx] ^= me.V[me.Vy];
                        me.pc += 2;  // Increment the program counter.
                        break;

                    case 0x0004: // 0x8XY4: Adds VY to VX. VF is set to 1 when there's a carry and 0 when there isn't.
                        // Execute opcode

                        total = me.V[me.Vx] + me.V[me.Vy];

                        // carry? then V[0xF] = 1 :else: V[0xF] = 0
                        (total > 256) ? me.V[0xF] = 1 : me.V[0xF] = 0;

                        me.V[me.Vx] = total % 256; // %256 ensures we don't overflow.
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0005: // 0x8XY5: VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
                        // Execute opcode

                        total = me.V[me.Vx] - me.V[me.Vy];

                        // borrow? then V[0xF] = 0 :else: V[0xF] = 1
                        (total < 0) ? me.V[0xF] = 0 : me.V[0xF] = 1;

                        me.V[me.Vx] = Math.abs(total) % 256; // %256 ensures we don't overflow.

                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0006: // 0x8XY6: Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.
                        // Execute opcode
                        me.V[0xF] = me.V[me.Vx] & 0x1;

                        me.V[me.Vx] >>= 1; // Shift one right and store.

                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0007: // 0x8XY7: Sets VX to VY-VX. VF is set to 0 when there's a borrow and 1 when there isn't.
                        // Execute opcode
                        total = me.V[me.Vy] - me.V[me.Vx];

                        // borrow? then V[F] = 0 :else: V[F] = 1
                        (total < 0) ? me.V[0xF] = 0 : me.V[0xF] = 1;

                        me.V[me.Vx] = Math.abs(total);

                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x000E: // 0x8XYE: Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.
                        // Execute opcode
                        me.V[0xF] = me.V[me.Vx] >> 7;

                        me.V[me.Vx] = (me.V[me.Vx] << 1) % 256; // Shift left by one and keep it a byte.

                        me.pc += 2; // Increment the program counter.
                        break;

                    default:
                        console.error("Unknown opcode [0x8000]: 0x" + me.opcode);
                        me.halt = true;
                        break;
                }
                break;

            case 0x9000: // 0x9XY0: Skips the next instruction if VX doesn't equal VY
                // Execute opcode

                // Not equal? then skip :else: continue
                (me.V[me.Vx] != me.V[me.Vy]) ? me.pc += 4 : me.pc += 2;

                break;

            case 0xA000: // 0xAnnn: Sets I to the address nnn
                // Execute opcode.
                me.I = me.opcode & 0x0FFF;
                me.pc += 2; // Increment the program counter.
                break;

            case 0xB000: // 0xBnnn: Jumps to the address nnn plus V0
                // Execute opcode.
                // If the memory goes out of bounds, let's log an error... We can handle it better later.
                total = (me.opcode & 0x0FFF) + me.V[0x0];
                //(total > 0xFFF) ? console.error("[0xB000] : Calling address out of bounds. Will wrap around.") : 0;
                me.pc = total % 4096; // Jumping, so no incrementing and keeping within memory bounds.
                break;

            case 0xC000: // 0xCXnn: Sets VX to a random number and nn
                // Execute opcode.
                // Problem is, to unit test this one, we need to stop it from creating a random number...
                // Luckily, we put the Chip-8 into TEST_MODE before...
                var randomNumber;

                if(me.TEST_MODE) {
                    // Running in test/debug mode. This should be set in initialization.
                    randomNumber = me.randomNumber;
                } else {
                    // Regular operation.
                    randomNumber = Math.floor(Math.random() * (0x01 + 0xFF)); // This should be between 0x00 and 0xFF...
                }

                me.V[me.Vx] = randomNumber & (me.opcode & 0x00FF);

                me.pc += 2; // Increment the program counter.
                break;

            case 0xD000: // 0xDXYn: Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a
                //         height of n pixels. Each row of 8 pixels is read as bit-coded with the
                //         most significant bit of each byte displayed on the left, starting from
                //         memory location I. I value doesn't change after the execution of this
                //         instruction. VF is set to 1 if any screen pixels are flipped from set to
                //         unset when the sprite is drawn and 0 if that doesn't happen.
                // Execute opcode.
                var x = me.V[me.Vx]; // X co-ordinate
                var y = me.V[me.Vy]; // Y co-ordinate
                var height = me.opcode & 0x000F; // Height in pixels.
                var pixel;

                // Unless there's a change in a pixel state, this should be 0.
                me.V[0xF] = 0;

                // Top to bottom
                for(yline = 0; yline < height; yline++) {

                    // Get the pixel value from the memory starting at location I
                    pixel = me.memory[me.I + yline];

                    // Left to right
                    for(xline = 0; xline < 8; xline++) {

                        // Check to see if the current pixel is set to 1 (scans the byte one bit at a time)
                        if((pixel & (0x80 >> xline)) != 0) {

                            // Check if the pixel on display is set to 1...
                            if(me.gfx[(x + xline + ((y + yline) * 64))] == 1) {
                                // ... if it is, register a collision in the VF register.
                                me.V[0xF] = 1;

                            }

                            // The the pixel value by using XOR.
                            me.gfx[x + xline + ((y + yline) * 64)] ^= 1;

                        }
                    }
                }

                me.drawflag = true; // GFX has changed, update the screen.
                me.pc += 2; // Increment the program counter to move to the next opcode.
                break;

            case 0xE000:
                switch (me.opcode & 0x000F){

                    case 0x000E: // 0xEX9E: Skips the next instruction if the key stored in VX is pressed
                        // Execute opcode.

                        // key pressed? then skip :else: continue
                        (me.key[me.V[me.Vx]] == 1) ? me.pc += 4 : me.pc += 2;

                        break;

                    case 0x0001: // 0xEXA1: Skips the next instruction if the key stored in VX isn't pressed.
                        // Execute opcode.

                        // key not pressed? then skip :else: continue
                        (me.key[me.V[me.Vx]] == 0) ? me.pc += 4 : me.pc += 2;

                        break;

                    default:
                        console.error("Unknown opcode [0xE000]: 0x" + me.opcode);
                        me.halt = true;
                        break;
                }
                break;

            case 0xF000:

                switch(me.opcode & 0x00FF){

                    case 0x0007: // 0xFX07: Sets VX to the value of the delay timer.
                        // Execute opcode.
                        me.V[me.Vx] = me.delay_timer;
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x000A: // 0xFX0A: A key press is awaited, and then stored in VX.
                        // Execute opcode.
                        var pressed = false;

                        // Scan the keys to see if one was pressed.
                        for (i = 0 ; i < 16 ; i++) {
                            if (me.key[i] != 0) {
                                me.V[me.Vx] = i;
                                pressed = true;
                            }
                        }

                        // Check to see if we pressed something...
                        if (!pressed) {
                            return;
                        }

                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0015: // 0xFX15: Sets the delay timer to VX.
                        // Execute opcode.
                        me.delay_timer = me.V[me.Vx];
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0018: // 0xFX18: Sets the sound timer to VX.
                        // Execute opcode.
                        me.sound_timer = me.V[me.Vx];
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x001E: // 0xFX1E: Adds VX to I.
                        // Execute opcode.
                        // VF is set to 1 when there is overflow. This is undocumented, but utilised in Spaceflight 2019!
                        total = me.V[me.Vx] + me.I;

                        // Overflow? Remember I is a 16-bit register...
                        (total > 65535) ? me.V[0xF] = 1 : me.V[0xF] = 0;

                        me.I += me.V[me.Vx];
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0029: // 0xFX29: Sets I to the location of the sprite for the character in VX.
                        //         Characters 0-F (in HEX) are represented by a 4x5 font.
                        //         We set the font at the beginning of memory. Each char is 5 bytes,
                        //         so we can determine VX * 5 = First byte of char.
                        // Execute opcode.
                        me.I = (me.V[me.Vx] * 5) + 0x050;
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0033: // 0xFX33: Stores the binary-coded decimal representation of VX, with the hundreds
                        //         digit at address I, tens digit at address I+1 and the ones digit at I+2.
                        // Execute opcode.
                        me.memory[me.I] = Math.floor(me.V[me.Vx] / 100);
                        me.memory[me.I + 1] = Math.floor((me.V[me.Vx] / 10) % 10);
                        me.memory[me.I + 2] = Math.floor((me.V[me.Vx] % 100) % 10);
                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0055: // 0xFX55: Stores V0 to VX in memory starting at address I.
                        // Execute opcode.
                        var xAddr = (me.opcode & 0x0F00) >> 8;

                        for(i = 0; i <= xAddr ; i++) {
                            me.memory[me.I + i] = me.V[i];
                        }

                        // After the operation, I should be set to I + X + 1:
                        me.I += xAddr + 1;

                        me.pc += 2; // Increment the program counter.
                        break;

                    case 0x0065: // 0xFX65: Fills V0 to VX with values from memory starting at address I.
                        // Execute opcode.
                        var xAddr = (me.opcode & 0x0F00) >> 8;

                        for(i = 0; i <= xAddr ; i++) {
                            me.V[i] = me.memory[me.I + i];
                        }

                        // After the operation, I should be set to I + X + 1:
                        me.I += xAddr + 1;

                        me.pc += 2; // Increment the program counter.
                        break;

                    default:
                        console.error("Unknown opcode [0xF000]: 0x" + me.opcode);
                        me.halt = true;
                        break;

                }
                break;

            default:
                console.error("Unknown opcode: 0x" + me.opcode);
                me.halt = true;
                break;
        }
    }

};

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports.Chip8Emu = Chip8Emu;
}
