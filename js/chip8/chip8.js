var chip8Emu = function() {};

chip8Emu.prototype.beginEmulation = function(romimage,canvasID) {
    /* EMULATION OF CHIP-8
        Call this function with the path of the ROM you want to use. That should be it...
        If it doesn't work, then there's something wrong... Obviously...
        You can submit a bug/issue at http://github.com/PachiSystems/JSEmu
        Please be as descriptive as possible. I'll try and put a test suite together when I have time.
     */

    var me = this;

    me.setupGraphics(canvasID);
    console.debug("Graphics setup complete");

    me.setupInput();
    console.debug("Input setup complete");

    me.initialize();
    console.debug("Initialisation complete");

    me.loadGame(romimage);
    console.debug("ROM image loading complete");

    return 0;
};

chip8Emu.prototype.setupGraphics = function(canvasID) {

    var me = this;

    me.screen = document.getElementById(canvasID).getContext('2d');

};

chip8Emu.prototype.setupInput = function() {

    var me = this;

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
        49:0x1, // PC 1 -> C8 1
        50:0x2, // PC 2 -> C8 2
        51:0x3, // PC 3 -> C8 3
        52:0xC, // PC 4 -> C8 C
        81:0x4, // PC Q -> C8 4
        87:0x5, // PC W -> C8 5
        69:0x6, // PC E -> C8 6
        82:0xD, // PC R -> C8 D
        65:0x7, // PC A -> C8 7
        83:0x8, // PC S -> C8 8
        68:0x9, // PC D -> C8 9
        70:0xE, // PC F -> C8 E
        90:0xA, // PC Z -> C8 A
        88:0x0, // PC X -> C8 0
        67:0xB, // PC C -> C8 B
        86:0xF  // PC V -> C8 F
    };

    me.lastKeyPressed = null;

    /* KEYPRESS EVENT HANDLERS
     This is a bit special... Normally the key handler should be a part of the emulation loop and
     checked after a cycle. However, since JS doesn't have a way to poll the keyboard state, we are
     going to have to capture the keypress and set a variable to the ASCII code when the key is down
     and remove it when the key is up.
     */
    window.onkeydown = function (ev) {

        var key = (ev || window.event).keyCode;

        console.debug("KEY DOWN:" + key);

        if(!(key in me.keymap)) {
            // We're not pressing a key in the keymap, so ignore it and cancel out the keypress.
            me.lastKeyPressed = null;

            console.debug("KEY [" + key + "] NOT IN KEYMAP");

        } else {
            // We're pressing a key! Quick! Do something useful!
            me.lastKeyPressed = me.keymap[key];

            console.debug("KEY [" + key + "] MAPPED TO [" + me.keymap[key] + "]");
        }
    };

    window.onkeyup = function (ev) {
        // Unset the lastKeyPressed.
        me.lastKeyPressed = null;
        console.debug("KEY UP");
    }

    window.onblur = function() {
        me.lastKeyPressed = null;
    }
};

chip8Emu.prototype.initialize = function() {

    var me = this;

    /* PROGRAM COUNTER & INDEX REGISTER
        There is an Index register (I) and a program counter (pc)
        which can have a value from 0x000 to 0xFFF.
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
    me.stack = new Array(16);
    me.sp    = 0;

    /* GRAPHICS INITIALISATION
        The graphics are black and white and the screen has a total of 2048 pixels (64x32).
        Chip 8 has one instruction that draws a sprite to the screen. Drawing is done in XOR
        mode and if a pixel is turned off as a result of drawing, the VF register is set.
        This is used for collision detection.
     */
    me.gfx = new Array(64 * 32);

    /* GENERAL REGISTERS INITIALISATION
        Chip 8 has 15 8-bit general purpose registers named V0 to VE.
        The 16th register (VF) is used for the 'carry flag'
     */
    me.V = new Array(16);

    /* MEMORY INITIALISATION
        Chip 8 has 4K memory in total.
        Memory map:
        0x000 - 0x1FF = Chip 8 interpreter (contains font set in emu)
        0x050 - 0x0A0 = Used for the built in 4x5 pixel font set (0-F)
        0x200 - 0xFFF = Program ROM and work RAM
     */
    me.memory = new Array(4096);

    /* OPCODE HOLDER
        Chip 8 has 35 opcodes which are all two bytes long.
     */
    me.opcode = 0;     // Reset current opcode

    /* FONTSET INITIALISATION
        Since there's no interpreter to store, we can just pop the fontset here.
     */
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

    for (var i = 0; i < 80; i++) {
        me.memory[i] = fontset[i];
    }

    /* TIMERS INITIALISATION
        Chip 8 has no interrupts or hardware registers, but there are two timer registers that
        count at 60Hz. When set above zero, they will count down to zero. The buzzer sounds
        when the sound timer reaches zero.
     */
    me.delay_timer = 0;
    me.sound_timer = 0;

    /* OTHER VARIABLES
        These are other variables that get used at various times. Here are their initial states.
     */
    me.lastKeyPressed = null;

};

chip8Emu.prototype.loadGame = function(romimage) {

    var xhr = new XMLHttpRequest(),
        me = this;

    /* GAME LOADING
        Load the program into the memory. Check to make sure it's not too big as well...
     */

    xhr.open("GET",romimage);
    xhr.responseType = "arraybuffer";

    xhr.onload = function() {

        var program = new Uint8Array(xhr.response);

        if(program.length > (4096 - 512)) {

            console.error("This program will not fit into Chip-8 memory.");

        } else {

            for (var i = 0; i < program.length; i++) {

                me.memory[(i + 512)] = program[i];

            }

            // Emulation loop to trigger once our ROM has finished loading.
            //while(true) {
            //For test purposes, we're going to run just 10000 cycles
            //for (var i = 0 ; i < 10000; i++) {
            // Since it blocks the whole app, let's try a setInterval:
            setInterval(function() {
                //console.debug("Emulation loop running");
                // Emulate one cycle
                me.emulateCycle();

                // If the draw flag is set, update the screen
                if(me.drawflag) {
                    me.drawGraphics();
                }
            },1); // Should give us about 30fps-ish

        }

    };
    xhr.send();

};

chip8Emu.prototype.emulateCycle = function() {

    var me = this;

    // Fetch Opcode
    me.opcode = me.memory[me.pc] << 8 | me.memory[me.pc + 1];

    // Decode Opcode
    switch(me.opcode & 0xF000) {

        case 0x0000:
            switch(me.opcode & 0x000F) {
                case 0x0000: // 0x00E0: Clears the screen
                    // Execute opcode
                    for(var i = 0; i < me.gfx.length; i++) {
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
            me.stack[me.sp] = me.pc;
            me.sp++;
            // We're jumping... Don't increment the program counter, but point it somewhere else...
            me.pc = me.opcode & 0x0FFF;
            break;

        case 0x3000: // 0x3Xnn: Skips the next instruction if VX equals nn
            // Execute opcode
            if(me.V[(me.opcode & 0x0F00) >> 8] == (me.opcode & 0x0FF)) {
                // It equal, so skip the next instruction.
                me.pc += 4;
            } else {
                // Not equal, so keep on going.
                me.pc += 2;
            }
            break;

        case 0x4000: // 0x4Xnn: Skips the next instruction if VX doesn't equal nn.
            // Execute opcode
            if(me.V[(me.opcode & 0x0F00) >> 8] != (me.opcode & 0x00FF)) {
                // Not equal, so skip the next instruction.
                me.pc += 4;
            } else {
                // It's equal, so continue.
                me.pc += 2;
            }
            break;

        case 0x5000: // 0x5XY0: Skips the next instruction if VX equals VY.
            // Execute opcode.
            if(me.V[(me.opcode & 0x0F00) >> 8] == me.V[(me.opcode & 0x00F0) >> 4]) {
                // VX and VY match! Skip the next instruction.
                me.pc += 4;
            } else {
                // VX and VY are not the same. Keep going.
                me.pc += 2;
            }
            break;

        case 0x6000: // 0x6Xnn: Sets VX to nn.
            // Execute opcode.
            me.V[(me.opcode & 0x0F00) >> 8] = (me.opcode & 0x00FF);
            me.pc += 2; // Increment the program counter.
            break;

        case 0x7000: // 0x7Xnn: Adds nn to VX.
            // Execute opcode.
            // Does this set VF on overflow?... There seems to be no documentation.
            me.V[(me.opcode & 0x0F00) >> 8] += (me.opcode & 0x00FF);
            me.pc += 2; // Increment the program counter.
            break;

        case 0x8000:
            switch(me.opcode & 0x000F) {

                case 0x0000: // 0x8XY0: Sets VX to the value of VY
                    // Execute opcode
                    me.V[(me.opcode & 0x0F00) >> 8] = me.V[(me.opcode & 0x00F0) >> 4];
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0001: // 0x8XY1: Sets VX to VX | VY
                    // Execute opcode
                    me.V[(me.opcode & 0x0F00) >> 8] |= me.V[(me.opcode & 0x00F0) >> 4];
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0002: // 0x8XY2: Sets VX to VX & VY
                    // Execute opcode
                    me.V[(me.opcode & 0x0F00) >> 8] &= me.V[(me.opcode & 0x00F0) >> 4];
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0003: // 0x8XY3: Sets VX to VX XOR VY
                    // Execute opcode
                    me.V[(me.opcode & 0x0F00) >> 8] ^= me.V[(me.opcode & 0x00F0) >> 4];
                    me.pc += 2;  // Increment the program counter.
                    break;

                case 0x0004: // 0x8XY4: Adds VY to VX. VF is set to 1 when there's a carry and 0 when there isn't.
                    // Execute opcode
                    // If VY > (0xFF - VX) it will carry...
                    if(me.V[(me.opcode & 0x00F0) >> 4] > (0xFF - me.V[(me.opcode & 0x0F00) >> 8])) {
                        me.V[0xF] = 1; // Set the carry flag
                    } else {
                        me.V[0xF] = 0;
                    }
                    me.V[(me.opcode & 0x0F00) >> 8] += me.V[(me.opcode & 0x00F0) >> 4];
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0005: // 0x8XY5: VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
                    // Execute opcode
                    // If VY > VX, there will be a borrow...
                    if(me.V[(me.opcode & 0x00F0) >> 4] > me.V[(me.opcode & 0x0F00) >> 8]) {
                        me.V[0xF] = 0; // Set the borrow flag.
                    } else {
                        me.V[0xF] = 1;
                    }
                    me.V[(me.opcode & 0x0F00) >> 8] -= me.V[(me.opcode & 0x00F0) >> 4];  // VX - VY
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0006: // 0x8XY6: Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.
                    // Execute opcode
                    me.V[0xF] = me.V[(me.opcode & 0x0F00) >> 8] & 0x000F;
                    me.V[(me.opcode & 0x0F00) >> 8] >>= 1; // Shift one right and store.
                    me.pc += 2; // Incrment the program counter.
                    break;

                case 0x0007: // 0x8XY7: Sets VX to VY-VX. VF is set to 0 when there's a borrow and 1 when there isn't.
                    // Execute opcode
                    // If VX > VY, there will be a borrow...
                    if(me.V[(me.opcode & 0x0F00) >> 8] > me.V[(me.opcode & 0x00F0) >> 4]) {
                        me.V[0xF] = 0; // Set the borrow flag
                    } else {
                        me.V[0xF] = 1;
                    }
                    me.V[(me.opcode & 0x0F00) >> 8] = me.V[(me.opcode & 0x00F0) >> 4] - me.V[(me.opcode & 0x0F00) >> 8];
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x000E: // 0x8XYE: Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.
                    // Execute opcode
                    me.V[0xF] = me.V[(me.opcode & 0x0F00) >> 8] & 0x00F0; // Remember, it's only an 8-bit register!
                    me.V[(me.opcode & 0x0F00) >> 8] <<= 1; // Shift left by one.
                    me.V[(me.opcode & 0x0F00) >> 8] &= 0x00FF; // Do I need to do this? I suppose if there's a lot of shifts it could overflow...
                    me.pc += 2; // Increment the program counter.
                    break;

                default:
                    console.error("Unknown opcode [0x8000]: 0x" + me.opcode);
                    break;
            }
            break;

        case 0x9000: // 0x9XY0: Skips the next instruction if VX doesn't equal VY
            // Execute opcode
            if(me.V[(me.opcode & 0x0F00) >> 8] != me.V[(me.opcode & 0x00F0) >> 4]) {
                me.pc += 4; // Skips an opcode.
            } else {
                me.pc += 2; // Doesn't skip an opcode.
            }
            break;

        case 0xA000: // 0xAnnn: Sets I to the address nnn
            // Execute opcode.
            me.I = me.opcode & 0x0FFF;
            me.pc += 2; // Increment the program counter.
        break;

        case 0xB000: // 0xBnnn: Jumps to the address nnn plus V0
            // Execute opcode.
            // Does a jump really need the stack? Surely only a subroutine would...
            // me.stack[sp] = me.pc;
            // me.sp++;
            me.pc = (me.opcode & 0x0FFF) + me.V[0x0]; // Jumping, so no incrementing.
            break;

        case 0xC000: // 0xCXnn: Sets VX to a random number and nn
            // Execute opcode.
            var randomNumber = Math.floor(Math.random() * 255); // This should be between 0x00 and 0xFF...
            me.V[(me.opcode & 0x0F00) >> 8] = (randomNumber & (me.opcode & 0x00FF)) & 0x00FF;
            me.pc += 2; // Increment the program counter.
            break;

        case 0xD000: // 0xDXYn: Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a
                     //         height of n pixels. Each row of 8 pixels is read as bit-coded with the
                     //         most significant bit of each byte displayed on the left, starting from
                     //         memory location I. I value doesn't change after the execution of this
                     //         instruction. VF is set to 1 if any screen pixels are flipped from set to
                     //         unset when the sprite is drawn and 0 if that doesn't happen.
            // Execute opcode.
            var x = me.V[(me.opcode & 0x0F00) >> 8]; // X co-ordinate
            var y = me.V[(me.opcode & 0x00F0) >> 4]; // Y co-ordinate
            var height = me.opcode & 0x000F; // Height in pixels.
            var pixel;

            // Unless there's a change in a pixel state, this should be 0.
            me.V[0xF] = 0;

            // Top to bottom
            for(var yline = 0; yline < height; yline++) {

                // Get the pixel value from the memory starting at location I
                pixel = me.memory[me.I + yline];

                // Left to right
                for(var xline = 0; xline < 8; xline++) {

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
                    if (me.V[(me.opcode & 0x0F00) >> 8] == me.lastKeyPressed) {
                        me.pc += 4; // Skip an instruction.
                    } else {
                        me.pc += 2; // Increment the program counter.
                    }
                    break;
                    
                case 0x0001: // 0xEXA1: Skips the next instruction if the key stored in VX isn't pressed.
                    // Execute opcode.
                    if (me.V[(me.opcode & 0x0F00) >> 8] != me.lastKeyPressed) {
                        me.pc += 4; // Skip an instruction.
                    } else {
                        me.pc += 2;
                    }
                    break;

                default:
                    console.error("Unknown opcode [0xE000]: 0x" + me.opcode);
                    break;
            }
            break;

        case 0xF000:

            switch(me.opcode & 0x00FF){

                case 0x0007: // 0xFX07: Sets VX to the value of the delay timer.
                    // Execute opcode.
                    me.V[(me.opcode & 0x0F00) >> 8] = me.delay_timer;
                    me.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x000A: // 0xFX0A: A key press is awaited, and then stored in VX.
                    // Execute opcode.
                    if(me.lastKeyPressed == null) {
                        return; // If there isn't a key pressed, then we should just return and not increment the pc.
                    } else {
                        me.pc += 2; // YAY! A key was pressed! We can increment the program counter.
                    }
                    break;
                    
                case 0x0015: // 0xFX15: Sets the delay timer to VX.
                    // Execute opcode.
                    me.delay_timer = me.V[(me.opcode & 0x0F00) >> 8];
                    me.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x0018: // 0xFX18: Sets the sound timer to VX.
                    // Execute opcode.
                    me.sound_timer = me.V[(me.opcode & 0x0F00) >> 8];
                    me.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x001E: // 0xFX1E: Adds VX to I.
                    // Execute opcode.
                    // VF is set to 1 when there is overflow. This is undocumented, but utilised in Spaceflight 2019!
                    if((me.V[(me.opcode & 0x0F00) >> 8] + me.I) > 0xFFF) {
                        me.V[0xF] = 1;
                    } else {
                        me.V[0xF] = 0;
                    }
                    me.I += me.V[(me.opcode & 0x0F00) >> 8];
                    me.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x0029: // 0xFX29: Sets I to the location of the sprite for the character in VX.
                             //         Characters 0-F (in HEX) are represented by a 4x5 font.
                             //         We set the font at the beginning of memory. Each char is 5 bytes,
                             //         so we can determine VX * 5 = First byte of char.
                    // Execute opcode.
                    me.I = me.V[(me.opcode & 0x0F00) >> 8] * 5;
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0033: // 0xFX33: Stores the binary-coded decimal representation of VX, with the hundreds
                             //         digit at address I, tens digit at address I+1 and the ones digit at I+2.
                    // Execute opcode.
                    me.memory[I] = me.V[(0x0F00) >> 8] / 100;
                    me.memory[I + 1] = (me.V[(0x0F00) >> 8] / 10) % 10;
                    me.memory[I + 2] = (me.V[(0x0F00) >> 8] % 100) % 10;
                    me.pc += 2; // Increment the program counter.
                    break;

                case 0x0055: // 0xFX55: Stores V0 to VX in memory starting at address I.
                    // Execute opcode.
                    var xAddr = (me.opcode & 0x0F00) >> 8;
                    for(var i = 0; i <= xAddr; i++) {
                        me.memory[me.I + i] = me.V[i];
                    }
                    // After the operation, I should be set to I + X + 1:
                    me.I += xAddr + 1;
                    me.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x0065: // 0xFX65: Fills V0 to VX with values from memory starting at address I.
                    // Execute opcode.
                    var xAddr = (me.opcode & 0x0F00) >> 8;
                    for(var i = 0; i <= xAddr; i++) {
                        me.V[i] = me.memory[me.I + i];
                    }
                    // After the operation, I should be set to I + X + 1:
                    me.I += xAddr + 1;
                    me.pc += 2; // Increment the program counter.
                    break;

                default:
                    console.error("Unknown opcode [0xF000]: 0x" + me.opcode);
                    break;

            }
            break;

        default:
            console.error("Unknown opcode: 0x" + me.opcode);
    }

    // Update timers
    if(me.delay_timer > 0) {
        me.delay_timer--;
    }

    if(me.sound_timer > 0) {
        if(me.sound_timer == 1) {
            console.log("BEEP!");
        }
        me.sound_timer--;
    }
};

chip8Emu.prototype.drawGraphics = function() {

    var me = this;

    for (var curRow = 0; curRow < 32; curRow++) {

        // Work our way down the image one row at a time.

        for (var curCol = 0; curCol < 64; curCol++) {

            // And we work our way across the row one column at a time.

            if (me.gfx[(curRow * 64) + curCol] == 1) {

                // Draw a white pixel.

                me.screen.fillStyle = '#FFF';

            } else {

                // Draw a black pixel... Yes. I know... I'll do something better next time.

                me.screen.fillStyle = '#000';

            }

            var sizeMod = 10;

            me.screen.fillRect(curCol * sizeMod, curRow * sizeMod, sizeMod, sizeMod);

        }
    }
};