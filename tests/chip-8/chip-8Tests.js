var chip8 = new chip8Emu(),
    $fixture = $( "#qunit-fixture" );

$fixture.append( "<canvas id='TEST_CANVAS'></canvas>" );
chip8.beginEmulation("TEST_MODE","TEST_CANVAS");

/**
 * CPU Tests
 * Check initialization has been performed correctly.
 */

module("CPU");
    test("Initialization", function() {
        chip8.initialize();
        var memoryEmpty = true,
            gfxEmpty = true,
            regEmpty = true,
            staEmpty = true,
            i, len;

        // There is a fontset stored in the first 80 bytes...
        for(i = 80, len = chip8.memory.length ; i < len ; i++) {
            if (chip8.memory[i] != null) { memoryEmpty = false; }
        }

        // Graphics buffer, however should be totally empty.
        for(i = 0, len = chip8.gfx.length ; i < len ; i++) {
            if (chip8.gfx[i] != null) { gfxEmpty = false; }
        }

        // So should the registers
        for (i = 0 ; i < 16 ; i++) {
            if (chip8.V[i] != null) { regEmpty = false; }
        }
        if (chip8.I != 0) { regEmpty = false; }

        // And the stack
        for (i = 0 ; i < 16 ; i++) {
            if (chip8.stack[i] != null) { staEmpty = false; }
        }

        ok(memoryEmpty,"Memory from 0x050 to 0xFFF is clear.");
        ok(gfxEmpty, "Graphics buffer is clear.");
        ok(regEmpty, "Registers are clear.");
        ok(staEmpty, "Stack is clear.");
        equal(chip8.pc, 0x200, "Program counter pointing to start of program memory.");
        equal(chip8.delay_timer, 0, "Delay timer at zero.");
        equal(chip8.sound_timer, 0, "Sound timer at zero.");
        equal(chip8.sp, 0, "Stack pointer at zero.");
        equal(chip8.opcode, 0, "No opcode loaded.");
    });

/**
 * OPCODE Tests
 * Each opcode should have its own test. Before each test is run, the emulator will be reset.
 */

module ("OPCODE", {
    setup: function() {
        chip8.initialize();
    }
});
    test("[0x00E0]", function() {

        /**
         * Clear the screen
         */
        chip8.memory[0x200] = 0x00;
        chip8.memory[0x201] = 0xE0;

        chip8.emulateCycle();

        var graphicsEmpty = true;

        for(var i = 0, len = chip8.gfx.length ; i < len ; i++) {
            if (chip8.gfx[i] != 0) {
                graphicsEmpty = false;
            }
        }

        equal(graphicsEmpty,true,"Graphics buffer has been emptied.");
        equal(chip8.drawflag,true,"Drawflag is set to true.");
        equal(chip8.pc,0x200+0x2,"Program counter incremented from 0x200 to 0x202.");

    });

    test("[0x00EE]", function() {

        /**
         * Return from subroutine.
         */
        chip8.memory[0x200] = 0x00;
        chip8.memory[0x201] = 0xEE;

        // To jump to an address, we have to put it in the stack where we want to jump to.
        // We're going to create a random address in memory and jump there.
        var randAddr = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200)) + 0x200;

        chip8.stack[chip8.sp] = randAddr;
        chip8.sp++;

        var sp = chip8.sp;  // Make sure it goes down after.

        chip8.emulateCycle();

        equal(chip8.sp, sp - 1, "Stack pointer decremented");
        equal(chip8.pc, randAddr, "Jumped to correct random address at memory location " + randAddr);
    });

    test("[0x1nnn]", function() {

        /**
         * Jump to address nnn.
         */

        var randAddr = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200)) + 0x200,
            tempOpCode = 0x1000 + randAddr;

        chip8.memory[0x200] = (tempOpCode & 0xFF00) >> 8;
        chip8.memory[0x201] = tempOpCode & 0x00FF;

        equal(chip8.memory[0x200] << 8 | chip8.memory[0x201], tempOpCode, "Opcode created successfully.");

        chip8.emulateCycle();

        equal(chip8.pc, randAddr, "Jumped to correct random address at " + randAddr);


    });

    test("[0x2nnn]", function() {

        /**
         * Call subroutine at nnn.
         */

        var randAddr = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200)) + 0x200,
            tempOpCode = 0x2000 + randAddr,
            sp = chip8.sp;

        chip8.memory[0x200] = (tempOpCode & 0xFF00) >> 8;
        chip8.memory[0x201] = tempOpCode & 0x00FF;

        equal(chip8.memory[0x200] << 8 | chip8.memory[0x201], tempOpCode, "Opcode created successfully.");

        chip8.emulateCycle();

        equal(chip8.sp, sp + 1, "Stack pointer incremented by one.");
        equal(chip8.stack[sp], 0x202, "Return point stored at the top of the stack (sp-1).");
        equal(chip8.pc, randAddr, "Program counter pointing to random subroutine at " + randAddr);
    });

    test("[0x3Xnn]", function() {

        /**
         * Skips the next instruction if VX equals nn.
         */
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF)),
            randReg = Math.floor(Math.random() * (0x1 + 0xE)),
            tempOpCode = 0x3000 | (randReg << 8) | randNum;

        chip8.memory[0x200] = (tempOpCode & 0xFF00) >> 8;
        chip8.memory[0x201] = tempOpCode & 0x00FF;

        equal(chip8.memory[0x200] << 8 | chip8.memory[0x201], tempOpCode, "Opcode created successfully.");

        chip8.V[randReg] = randNum;

        chip8.emulateCycle();

        equal(chip8.pc, 0x200 + 4, "Program counter skipped an instruction when V" + randReg + " = " + randNum);

        chip8.initialize();

        tempOpCode = 0x3000 | (randReg << 8) | randNum + 1;
        chip8.memory[0x200] = (tempOpCode & 0xFF00) >> 8;
        chip8.memory[0x201] = tempOpCode & 0x00FF;
        chip8.V[randReg] = randNum;

        chip8.emulateCycle();

        equal(chip8.pc, 0x200 + 2, "Program counter moved to next instruction when V" + randReg + " = " + chip8.V[randReg] + " but randNum = " + (randNum+1));
    });

    test("[0x4Xnn]", function() {

        /**
         * Skips the next instruction if VX doesn't equal nn.
         */

    });

    test("[0x5XY0]", function() {

        /**
         * Skips the next instruction if VX equals VY.
         */

    });

    test("[0x6Xnn]", function() {

        /**
         * Sets VX to nn.
         */

    });

    test("[0x7Xnn]", function() {

        /**
         * Adds nn to VX.
         */

    });

    test("[0x8XY0]", function() {

        /**
         * Sets VX to the value of VY.
         */

    });

    test("[0x8XY1]", function() {

        /**
         * Sets VX to VX OR VY (bitwise).
         */

    });

    test("[0x8XY2]", function() {

        /**
         * Sets VX to VX & VY (bitwise).
         */

    });

    test("[0x8XY3]", function() {

        /**
         * Sets VX to VX ^ VY (bitwise).
         */

    });

    test("[0x8XY4]", function() {

        /**
         * Adds VY to VX. VF is set to 1 when there's a carry.
         */

    });

    test("[0x8XY5]", function() {

        /**
         * VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
         */

    });

    test("[0x8XY6]", function() {

        /**
         * Shifts VX right by one. VF is set to the value of the least significant bit of VX before the shift.
         */

    });

    test("[0x8XY7]", function() {

        /**
         * Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there isn't.
         */

    });

    test("[0x8XYE]", function() {

        /**
         * Shifts VX left by one. VF is set to the value of the most significant bit of VX before the shift.
         */

    });

    test("[0x9XY0]", function() {

        /**
         * Skips the next instruction if VX doesn't equal VY.
         */

    });

    test("[0xAnnn]", function() {

        /**
         * Sets I to the address NNN.
         */

    });

    test("[0xBnnn]", function() {

        /**
         * Jumps to the address NNN plus V0.
         */

    });

    test("[0xCXnn]", function() {

        /**
         * Sets VX to a random number and NN.
         */

    });

    test("[0xDXYn]", function() {

        /**
         * Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N pixels. Each row of 8
         * pixels is read as bit-coded (with the most significant bit of each byte displayed on the left) starting from
         * memory location I; I value doesn't change after the execution of this instruction. As described above, VF is
         * set to 1 if any screen pixels are flipped from set to unset when the sprite is drawn, and to 0 if that
         * doesn't happen.
         */

    });

    test("[0xEX9E]", function() {

        /**
         * Skips the next instruction if the key stored in VX is pressed.
         */

    });

    test("[0xEXA1]", function() {

        /**
         * Skips the next instruction if the key stored in VX isn't pressed.
         */

    });

    test("[0xFX07]", function() {

        /**
         * Sets VX to the value of the delay timer.
         */

    });

    test("[0xFX0A]", function() {

        /**
         * A key press is awaited, and then stored in VX.
         */

    });

    test("[0xFX15]", function() {

        /**
         * Sets the delay timer to VX.
         */

    });

    test("[0xFX18]", function() {

        /**
         * Sets the sound timer to VX.
         */

    });

    test("[0xFX1E]", function() {

        /**
         * Adds VX to I.
         */

    });

    test("[0xFX29]", function() {

        /**
         * Sets I to the location of the sprite for the character in VX. Characters 0-F (in hexadecimal) are
         * represented by a 4x5 font.
         */

    });

    test("[0xFX33]", function() {

        /**
         * Stores the Binary-coded decimal representation of VX, with the most significant of three digits at the
         * address in I, the middle digit at I plus 1, and the least significant digit at I plus 2. (In other words,
         * take the decimal representation of VX, place the hundreds digit in memory at location in I, the tens digit
         * at location I+1, and the ones digit at location I+2.)
         */

    });

    test("[0xFX55]", function() {

        /**
         * Stores V0 to VX in memory starting at address I.
         */

    });

    test("[0xFX65]", function() {

        /**
         * Fills V0 to VX with values from memory starting at address I.
         */

    });