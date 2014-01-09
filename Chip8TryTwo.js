var chip8Emu = function() {
    this.reset();
};

chip8Emu.prototype.reset = function() {

    /*
        Chip 8 has 35 opcodes which are all two bytes long.
     */
    this.opcode = 0;

    /*
        Chip 8 has 4K memory in total.
        Memory map:
        0x000 - 0x1FF = Chip 8 interpreter (contains font set in emu)
        0x050 - 0x0A0 = Used for the built in 4x5 pixel font set (0-F)
        0x200 - 0xFFF = Program ROM and work RAM
     */
    this.memory = new Array(4096);

    /*
        Chip 8 has 15 8-bit general purpose registers named V0 to VE.
        The 16th register (VF) is used for the 'carry flag'
     */
    this.V = new Array(16);

    /*
        There is an Index register (I) and a program counter (pc)
        which can have a value from 0x000 to 0xFFF.
     */
    this.I = 0;
    this.pc = 0;

    /*
        The graphics are black and white and the screen has a total of 2048 pixels (64x32).
        Chip 8 has one instruction that draws a sprite to the screen. Drawing is done in XOR
        mode and if a pixel is turned off as a result of drawing, the VF register is set.
        This is used for collision detection.
     */
    this.gfx = new Array(64 * 32);

    /*
        Chip 8 has no interrupts or hardware registers, but there are two timer registers that
        count at 60Hz. When set above zero, they will count down to zero. The buzzer sounds
        when the sound timer reaches zero.
     */
    this.delay_timer = 0;
    this.sound_timer = 0;

    /*
        Chip 8's instruction set has opcodes which allow the program to jump to a certain address
        or call a subroutine. The specification of the chip doesn't mention a stack, but one will
        have to be implemented. It is used to remember the current location before a jump is performed.
        So anytime this happens, we must store the program counter in the stack before proceeding.
        Chip 8 has 16 levels of stack and in order to remember which part of the stack is used,
        we will also need a stack pointer (sp).
     */
    this.stack = new Array(16);
    this.sp = 0;

    /*
        Chip 8 has a HEX based keypad.
     */
    this.key = new Array(16);
}

chip8Emu.prototype.beginEmulation = function() {
    this.setupGraphics();
    this.setupInput();

    this.initialize();
    this.loadGame("pong");

    // Emulation loop
    while(true) {
        // Emulate one cycle
        this.emulateCycle();

        // If the draw flag is set, update the screen
        if(this.drawflag) {
            this.drawGraphics();
        }

        // Store key press state
        this.setKeys();
    }

    return 0;
};

chip8.prototype.initialize = function(romimage) {
    // Initialise the registers and memory.
    this.pc     = 0x200; // Program counter starts at 0x200
    this.opcode = 0;     // Reset current opcode
    this.I      = 0;     // Reset index register
    this.sp     = 0;     // Reset stack pointer

    // Clear display
    // Clear stack
    // Clear registers V0-VF
    // Clear memory

    // Load fontset
    for (var i = 0; i < 80; i++) {
        this.memory[i] = this.fontset[i];
    }

    // Reset timers

    // Load the program into the memory.
    var xhr = new XMLHttpRequest;
    xhr.open("GET",romimage,true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function() {
        var program = new Uint8Array(xhr.response);
        for (var i = 0; i < program.length; i++) {
            this.memory[i + 512] = program[i];
        }
    };

    xhr.send();
};

chip8.prototype.emulateCycle = function() {
    // Fetch Opcode
    this.opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1];

    // Decode Opcode
    switch(this.opcode & 0xF000) {

        case 0x0000:
            switch(this.opcode & 0x000F) {
                case 0x0000: // 0x00E0: Clears the screen
                    // Execute opcode
                    for(var i = 0; i < this.gfx.length; i++) {
                        this.gfx[i] = 0;
                    }
                    this.drawflag = true;
                    this.pc += 2; // Increment the program counter.
                    break;
                case 0x000E: // 0x00EE: Returns from subroutine
                    // Execute opcode
                    this.sp--; // Move back down the stack.
                    // We're going to jump, so no incrementing the program counter.
                    this.pc = this.stack[this.sp]; // Stack pointer points to the last address on the stack.
                    break;
            }
            break;

        case 0x1000: // 0x1nnn: Jump to address nnn
            // Execute opcode
            this.stack[sp] = pc;
            this.sp++;
            // We're jumping... Don't increment the program counter, but point it somewhere else...
            this.pc = this.opcode & 0x0FFF;
            break;

        case 0x2000: // 0x2nnn: Calls the subroutine at address nnn
            // Execute opcode
            this.stack[sp] = pc;
            this.sp++;
            // We're jumping... Don't increment the program counter, but point it somewhere else...
            this.pc = this.opcode & 0x0FFF;
            break;

        case 0x3000: // 0x3Xnn: Skips the next instruction if VX equals nn
            // Execute opcode
            if(this.V[(this.opcode & 0x0F00) >> 8] == (this.opcode & 0x0FF)) {
                // It equal, so skip the next instruction.
                this.pc += 4;
            } else {
                // Not equal, so keep on going.
                this.pc += 2;
            }
            break;

        case 0x4000: // 0x4Xnn: Skips the next instruction if VX doesn't equal nn.
            // Execute opcode
            if(this.V[(this.opcode & 0x0F00) >> 8] != (this.opcode & 0x00FF)) {
                // Not equal, so skip the next instruction.
                this.pc += 4;
            } else {
                // It's equal, so continue.
                this.pc += 2;
            }
            break;

        case 0x5000: // 0x5XY0: Skips the next instruction if VX equals VY.
            // Execute opcode.
            if(this.V[(this.opcode & 0x0F00) >> 8] == this.V[(this.opcode & 0x00F0) >> 4]) {
                // VX and VY match! Skip the next instruction.
                this.pc += 4;
            } else {
                // VX and VY are not the same. Keep going.
                this.pc += 2;
            }
            break;

        case 0x6000: // 0x6Xnn: Sets VX to nn.
            // Execute opcode.
            this.V[(this.opcode & 0x0F00) >> 8] = (this.opcode & 0x00FF);
            this.pc += 2; // Increment the program counter.
            break;

        case 0x7000: // 0x7Xnn: Adds nn to VX.
            // Execute opcode.
            // Does this set VF on overflow?... There seems to be no documentation.
            this.V[(this.opcode & 0x0F00) >> 8] += (this.opcode & 0x00FF);
            this.pc += 2; // Increment the program counter.
            break;

        case 0x8000:
            switch(this.opcode & 0x000F) {

                case 0x0000: // 0x8XY0: Sets VX to the value of VY
                    // Execute opcode
                    this.V[(this.opcode & 0x0F00) >> 8] = this.V[(this.opcode & 0x00F0) >> 4];
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x0001: // 0x8XY1: Sets VX to VX | VY
                    // Execute opcode
                    this.V[(this.opcode & 0x0F00) >> 8] |= this.V[(this.opcode & 0x00F0) >> 4];
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x0002: // 0x8XY2: Sets VX to VX & VY
                    // Execute opcode
                    this.V[(this.opcode & 0x0F00) >> 8] &= this.V[(this.opcode & 0x00F0) >> 4];
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x0003: // 0x8XY3: Sets VX to VX XOR VY
                    // Execute opcode
                    this.V[(this.opcode & 0x0F00) >> 8] ^= this.V[(this.opcode & 0x00F0) >> 4];
                    this.pc += 2;  // Increment the program counter.
                    break;

                case 0x0004: // 0x8XY4: Adds VY to VX. VF is set to 1 when there's a carry and 0 when there isn't.
                    // Execute opcode
                    // If VY > (0xFF - VX) it will carry...
                    if(this.V[(this.opcode & 0x00F0) >> 4] > (0xFF - this.V[(this.opcode & 0x0F00) >> 8])) {
                        this.V[0xF] = 1; // Set the carry flag
                    } else {
                        this.V[0xF] = 0;
                    }
                    this.V[(this.opcode & 0x0F00) >> 8] += this.V[(this.opcode & 0x00F0) >> 4];
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x0005: // 0x8XY5: VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
                    // Execute opcode
                    // If VY > VX, there will be a borrow...
                    if(this.V[(this.opcode & 0x00F0) >> 4] > this.V[(this.opcode & 0x0F00) >> 8]) {
                        this.V[0xF] = 1; // Set the borrow flag.
                    } else {
                        this.V[0xF] = 0;
                    }
                    this.V[(this.opcode & 0x0F00) >> 8] -= this.V[(this.opcode & 0x00F0) >> 4];  // VX - VY
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x0006: // 0x8XY6: Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.
                    // Execute opcode
                    this.V[0xF] = this.V[(this.opcode & 0x0F00) >> 8] & 0x000F;
                    this.V[(this.opcode & 0x0F00) >> 8] >>= 1; // Shift one right and store.
                    this.pc += 2; // Incrment the program counter.
                    break;

                case 0x0007: // 0x8XY7: Sets VX to VY-VX. VF is set to 0 when there's a borrow and 1 when there isn't.
                    // Execute opcode
                    // If VX > VY, there will be a borrow...
                    if(this.V[(this.opcode & 0x0F00) >> 8] > this.V[(this.opcode & 0x00F0) >> 4]) {
                        this.V[0xF] = 0; // Set the borrow flag
                    } else {
                        this.V[0xF] = 1;
                    }
                    this.V[(this.opcode & 0x0F00) >> 8] = this.V[(this.opcode & 0x00F0) >> 4] - this.V[(this.opcode & 0x0F00) >> 8];
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x000E: // 0x8XYE: Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.
                    // Execute opcode
                    this.V[0xF] = this.V[(this.opcode & 0x0F00) >> 8] & 0x00F0; // Remember, it's only an 8-bit register!
                    this.V[(this.opcode & 0x0F00) >> 8] <<= 1; // Shift left by one.
                    this.V[(this.opcode & 0x0F00) >> 8] &= 0x00FF; // Do I need to do this? I suppose if there's a lot of shifts it could overflow...
                    this.pc += 2; // Increment the program counter.
                    break;
            }
            break;

        case 0x9000: // 0x9XY0: Skips the next instruction if VX doesn't equal VY
            // Execute opcode
            if(this.V[(this.opcode & 0x0F00) >> 8] != this.V[(this.opcode & 0x00F0) >> 4]) {
                this.pc += 4; // Skips an opcode.
            } else {
                this.pc += 2; // Doesn't skip an opcode.
            }
            break;

        case 0xA000: // 0xAnnn: Sets I to the address nnn
            // Execute opcode.
            this.I = opcode & 0x0FFF;
            this.pc += 2; // Increment the program counter.
        break;

        case 0xB000: // 0xBnnn: Jumps to the address nnn plus V0
            // Execute opcode.
            this.stack[sp] = this.pc;
            this.sp++;
            this.pc = (this.opcode & 0x0FFF) + this.V[0x0]; // Jumping, so no incrementing.
            break;

        case 0xC000: // 0xCXnn: Sets VX to a random number and nn
            // Execute opcode.
            var randomNumber = Math.floor(Math.random() * 255); // This should be between 0x00 and 0xFF...
            this.V[(this.opcode & 0x0F00) >> 8] = (randomNumber & (this.opcode & 0x00FF)) & 0x00FF;
            this.pc += 2; // Increment the program counter.
            break;

        case 0xD000: // 0xDXYn: Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a
                     //         height of n pixels. Each row of 8 pixels is read as bit-coded with the
                     //         most significant bit of each byte displayed on the left, starting from
                     //         memory location I. I value doesn't change after the execution of this
                     //         instruction. VF is set to 1 if any screen pixels are flipped from set to
                     //         unset when the sprite is drawn and 0 if that doesn't happen.
            // Execute opcode.
            var x = this.V[(this.opcode & 0x0F00) >> 8]; // X co-ordinate
            var y = this.V[(this.opcode & 0x00F0) >> 4]; // Y co-ordinate
            var height = opcode & 0x000F; // Height in pixels.
            var pixel;

            // Unless there's a change in a pixel state, this should be 0.
            this.V[0xF] = 0;

            // Top to bottom
            for(var yline = 0; yline < height; yline++) {

                // Get the pixel value from the memory starting at location I
                pixel = this.memory[I + yline];

                // Left to right
                for(var xline = 0; xline < 8; xline++) {

                    // Check to see if the current pixel is set to 1 (scans the byte one bit at a time)
                    if((pixel & (0x80 >> xline)) != 0) {

                        // Check if the pixel on display is set to 1...
                        if(this.gfx[(x + xline + ((y + yline) * 64))] == 1) {
                            // ... if it is, register a collision in the VF register.
                            this.V[0xF] = 1;

                        }

                        // The the pixel value by using XOR.
                        this.gfx[x + xline + ((y + yline) * 64)] ^= 1;

                    }
                }
            }

            this.drawflag = true; // GFX has changed, update the screen.
            this.pc += 2; // Increment the program counter to move to the next opcode.
            break;

        case 0xE000:
            switch (this.opcode & 0x000F){
            
                case 0x000E: // 0xEX9E: Skips the next instruction if the key stored in VX is pressed
                    // Execute opcode.
                    break;
                    
                case 0x0001: // 0xEXA1: Skips the next instruction if the key stored in VX isn't pressed.
                    // Execute opcode.
                    break;
            }
            break;

        case 0xF000:

            switch(this.opcode & 0x00FF){

                case 0x0007: // 0xFX07: Sets VX to the value of the delay timer.
                    // Execute opcode.
                    this.V[(this.opcode & 0x0F00) >> 8] = this.delay_timer;
                    this.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x000A: // 0xFX0A: A key press is awaited, and then stored in VX.
                    // Execute opcode.
                    break;
                    
                case 0x0015: // 0xFX15: Sets the delay timer to VX.
                    // Execute opcode.
                    this.delay_timer = this.V[(this.opcode & 0x0F00) >> 8];
                    this.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x0018: // 0xFX18: Sets the sound timer to VX.
                    // Execute opcode.
                    this.sound_timer = this.V[(this.opcode & 0x0F00) >> 8];
                    this.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x001E: // 0xFX1E: Adds VX to I.
                    // Execute opcode.
                    // VF is set to 1 when there is overflow. This is undocumented, but utilised in Spaceflight 2019!
                    this.V[0xF] = 0;
                    if((this.V[(this.opcode & 0x0F00) >> 8] + this.I) > 0xFFF) {
                        this.V[0xF] = 1;
                    }
                    this.I += this.V[(this.opcode & 0x0F00) >> 8];
                    this.I &= 0xFFF;
                    this.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x0029: // 0xFX29: Sets I to the location of the sprite for the character in VX.
                             //         Characters 0-F (in HEX) are represented by a 4x5 font.
                    // Execute opcode.
                    break;

                case 0x0033: // 0xFX33: Stores the binary-coded decimal representation of VX, with the hundreds
                             //         digit at address I, tens digit at address I+1 and the ones digit at I+2.
                    // Execute opcode.
                    this.memory[I] = this.V[(0x0F00) >> 8] / 100;
                    this.memory[I + 1] = (this.V[(0x0F00) >> 8] / 10) % 10;
                    this.memory[I + 2] = (this.V[(0x0F00) >> 8] % 100) % 10;
                    this.pc += 2; // Increment the program counter.
                    break;

                case 0x0055: // 0xFX55: Stores V0 to VX in memory starting at address I.
                    // Execute opcode.
                    var xAddr = (this.opcode & 0x0F00) >> 8;
                    for(var i = 0; i <= xAddr; i++) {
                        this.memory[this.I + i] = this.V[i];
                    }
                    // After the operation, I should be set to I + X + 1:
                    this.I += xAddr + 1;
                    this.pc += 2; // Increment the program counter.
                    break;
                    
                case 0x0065: // 0xFX65: Fills V0 to VX with values from memory starting at address I.
                    // Execute opcode.
                    var xAddr = (this.opcode & 0x0F00) >> 8;
                    for(var i = 0; i <= xAddr; i++) {
                        this.V[i] = this.memory[this.I + i];
                    }
                    //After the operation, I shoul dbe set to I + X + 1:
                    this.I += xAddr + 1;
                    this.pc += 2; // Increment the program counter.
                    break;
            }
            break;

        default:
            alert("Unknown opcode: 0x" + this.opcode);
    }

    // Update timers
    if(this.delay_timer > 0) {
        this.delay_timer--;
    }

    if(this.sound_timer > 0) {
        if(this.sound_timer == 1) {
            console.log("BEEP!");
        }
        this.sound_timer--;
    }
};