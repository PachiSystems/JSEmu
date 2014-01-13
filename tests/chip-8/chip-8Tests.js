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

        equal(chip8.pc,
              0x200,
              "Program counter pointing to start of program memory.");

        equal(chip8.delay_timer,
              0,
              "Delay timer at zero.");

        equal(chip8.sound_timer,
              0,
              "Sound timer at zero.");

        equal(chip8.sp,
              0,
              "Stack pointer at zero.");

        equal(chip8.opcode,
              0,
              "No opcode loaded.");
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
    test("[0x00E0] - CLS", function() {

        /**
         * 00E0 - CLS
         * Clear the display.
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

        equal(graphicsEmpty,
              true,
              "Graphics buffer has been emptied.");

        equal(chip8.drawflag,
              true,
              "Drawflag is set to true.");

        equal(chip8.pc,
              0x202,
              "Program counter incremented from 0x200 to 0x202.");

    });

    test("[0x00EE] - RET", function() {

        /**
         * 00EE - RET
         * Return from a subroutine.
         *
         * The interpreter sets the program counter to the address at the top of the stack, then subtracts 1 from the
         * stack pointer.
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

        equal(chip8.sp,
              sp - 1,
              "Stack pointer decremented");

        equal(chip8.pc,
             randAddr,
             "Jumped to correct random address at memory location " + randAddr);
    });

    test("[0x1nnn]", function() {

        /**
         * 1nnn - JP addr
         * Jump to location nnn.
         *
         * The interpreter sets the program counter to nnn.
         */

        var randAddr = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200)) + 0x200,
            tempOpCode = 0x1000 + randAddr;

        chip8.memory[0x200] = (tempOpCode & 0xFF00) >> 8;
        chip8.memory[0x201] = tempOpCode & 0x00FF;

        chip8.emulateCycle();

        equal(chip8.pc,
              randAddr,
              "Jumped to correct random address at " + randAddr);


    });

    test("[0x2nnn]", function() {

        /**
         * 2nnn - CALL addr
         * Call subroutine at nnn.
         *
         * The interpreter increments the stack pointer, then puts the current PC on the top of the stack. The PC is
         * then set to nnn.
         */

        var randAddr = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200)) + 0x200,
            tempOpCode = 0x2000 + randAddr,
            sp = chip8.sp;

        chip8.memory[0x200] = (tempOpCode & 0xFF00) >> 8;
        chip8.memory[0x201] = tempOpCode & 0x00FF;

        chip8.emulateCycle();

        equal(chip8.sp,
              sp + 1,
              "Stack pointer incremented by one.");

        equal(chip8.stack[sp],
              0x202,
              "Return point stored at the top of the stack.");

        equal(chip8.pc,
              randAddr,
              "Program counter pointing to random subroutine at " + randAddr);
    });

    test("[0x3Xnn]", function() {

        /**
         * 3xkk - SE Vx, byte
         * Skip next instruction if Vx = kk.
         *
         * The interpreter compares register Vx to kk, and if they are equal, increments the program counter by 2.
         */
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF));

        chip8.memory[0x200] = 0x30;
        chip8.memory[0x201] = randNum;

        chip8.V[0] = randNum;

        chip8.emulateCycle();

        equal(chip8.pc, 0x200 + 4, "Program counter skipped an instruction when V[0] = " + randNum);

        chip8.initialize();

        chip8.memory[0x200] = 0x30;
        chip8.memory[0x201] = randNum;
        chip8.V[0] = randNum + 1;

        chip8.emulateCycle();

        equal(chip8.pc, 0x200 + 2, "Program counter moved to next instruction when V[0] = " + chip8.V[0] +
              " but randNum = " + randNum);
    });

    test("[0x4Xnn]", function() {

        /**
         * 4xkk - SNE Vx, byte
         * Skip next instruction if Vx != kk.
         *
         * The interpreter compares register Vx to kk, and if they are not equal, increments the program counter by 2.
         */
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF));

        chip8.memory[0x200] = 0x40;
        chip8.memory[0x201] = randNum;

        chip8.V[0] = randNum;

        chip8.emulateCycle();

        equal(chip8.pc,
              0x202,
              " Vx is equal to  nn. Program counter moved to next instruction.");

        chip8.initialize();

        chip8.memory[0x200] = 0x40;
        chip8.memory[0x201] = randNum;
        chip8.V[0] = randNum + 1;

        chip8.emulateCycle();

        equal(chip8.pc,
              0x204,
              "Vx is not equal to nn. Program counter skipped an instruction.");
    });

    test("[0x5XY0]", function() {

        /**
         * 5xy0 - SE Vx, Vy
         * Skip next instruction if Vx = Vy.
         *
         * The interpreter compares register Vx to register Vy, and if they are equal, increments the program counter
         * by 2.
         */

        // Using V0 and V1 for this test.
        chip8.memory[0x200] = 0x50;
        chip8.memory[0x201] = 0x10;
        chip8.V[0] = 0x05;
        chip8.V[1] = 0x05;

        chip8.emulateCycle();

        equal(chip8.pc, 0x204, "Next instruction skipped when V[X] = V[Y].");

        chip8.initialize();
        chip8.memory[0x200] = 0x50;
        chip8.memory[0x201] = 0x10;
        chip8.V[0] = 0x05;
        chip8.V[1] = 0x10;

        chip8.emulateCycle();

        equal(chip8.pc, 0x202, "Program counter moved to next instruction when V[X] != V[Y].");
    });

    test("[0x6Xnn]", function() {

        /**
         * 6xkk - LD Vx, byte
         * Set Vx = kk.
         *
         * The interpreter puts the value kk into register Vx.
         */
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
        chip8.memory[0x200] = 0x66; // Using V6
        chip8.memory[0x201] = randNum;

        chip8.emulateCycle();

        equal(chip8.V[6], randNum, "V[X] set successfully to a random number.");
        equal(chip8.pc, 0x202, "Program counter incremented correctly");

    });

    test("[0x7Xnn]", function() {

        /**
         * 7xkk - ADD Vx, byte
         * Set Vx = Vx + kk.
         *
         * Adds the value kk to the value of register Vx, then stores the result in Vx.
         */
        var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
            randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
        chip8.memory[0x200] = 0x70; // Use V[0] for this test.
        chip8.memory[0x201] = randNum2;

        chip8.V[0] = randNum1;

        chip8.emulateCycle();

        equal(chip8.V[0], randNum1 + randNum2, "Added nn to V[0] successfully.");
        equal(chip8.pc, 0x202, "Program counter incremented correctly.");

    });

    test("[0x8XY0]", function() {

        /**
         * 8xy0 - LD Vx, Vy
         * Set Vx = Vy.
         *
         * Stores the value of register Vy in register Vx.
         */
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
        chip8.memory[0x200] = 0x80; // Using V[0] as VX
        chip8.memory[0x201] = 0x10; // Using V[1] as VY

        chip8.V[1] = randNum;

        chip8.emulateCycle();

        equal(chip8.V[0], randNum, "V[X] equals the random number.");
        equal(chip8.V[0],chip8.V[1], "V[X] equals V[Y].");
        equal(chip8.pc, 0x202, "Program counter incremented correctly.");

    });

    test("[0x8XY1]", function() {

        /**
         * 8xy1 - OR Vx, Vy
         * Set Vx = Vx OR Vy.
         *
         * Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. A bitwise OR compares the
         * corrseponding bits from two values, and if either bit is 1, then the same bit in the result is also 1.
         * Otherwise, it is 0.
         */

    });

    test("[0x8XY2]", function() {

        /**
         * 8xy2 - AND Vx, Vy
         * Set Vx = Vx AND Vy.
         *
         * Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx. A bitwise AND compares the
         * corresponding bits from two values, and if both bits are 1, then the same bit in the result is also 1.
         * Otherwise, it is 0.
         */

    });

    test("[0x8XY3]", function() {

        /**
         * 8xy3 - XOR Vx, Vy
         * Set Vx = Vx XOR Vy.
         *
         * Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx. An exclusive OR
         * compares the corresponding bits from two values, and if the bits are not both the same, then the
         * corresponding bit in the result is set to 1. Otherwise, it is 0.
         */

    });

    test("[0x8XY4]", function() {

        /**
         * 8xy4 - ADD Vx, Vy
         * Set Vx = Vx + Vy, set VF = carry.
         *
         * The values of Vx and Vy are added together. If the result is greater than 8 bits (i.e., > 255,) VF is set to
         * 1, otherwise 0. Only the lowest 8 bits of the result are kept, and stored in Vx.
         */

    });

    test("[0x8XY5]", function() {

        /**
         * 8xy5 - SUB Vx, Vy
         * Set Vx = Vx - Vy, set VF = NOT borrow.
         *
         * If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.
         */

    });

    test("[0x8XY6]", function() {

        /**
         * 8xy6 - SHR Vx {, Vy}
         * Set Vx = Vx SHR 1.
         *
         * If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0. Then Vx is divided by 2.
         */

    });

    test("[0x8XY7]", function() {

        /**
         * 8xy7 - SUBN Vx, Vy
         * Set Vx = Vy - Vx, set VF = NOT borrow.
         *
         * If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
         */

    });

    test("[0x8XYE]", function() {

        /**
         * 8xyE - SHL Vx {, Vy}
         * Set Vx = Vx SHL 1.
         *
         * If the most-significant bit of Vx is 1, then VF is set to 1, otherwise to 0. Then Vx is multiplied by 2.
         */

    });

    test("[0x9XY0]", function() {

        /**
         * 9xy0 - SNE Vx, Vy
         * Skip next instruction if Vx != Vy.
         *
         * The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.
         */

    });

    test("[0xAnnn]", function() {

        /**
         * Annn - LD I, addr
         * Set I = nnn.
         *
         * The value of register I is set to nnn.
         */

    });

    test("[0xBnnn]", function() {

        /**
         * Bnnn - JP V0, addr
         * Jump to location nnn + V0.
         *
         * The program counter is set to nnn plus the value of V0.
         */

    });

    test("[0xCXnn]", function() {

        /**
         * Cxkk - RND Vx, byte
         * Set Vx = random byte AND kk.
         *
         * The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk. The results
         * are stored in Vx. See instruction 8xy2 for more information on AND.
         */

    });

    test("[0xDXYn]", function() {

        /**
         * Dxyn - DRW Vx, Vy, nibble
         * Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
         *
         * The interpreter reads n bytes from memory, starting at the address stored in I. These bytes are then displayed as sprites on screen at coordinates (Vx, Vy). Sprites are XORed onto the existing screen. If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0. If the sprite is positioned so part of it is outside the coordinates of the display, it wraps around to the opposite side of the screen. See instruction 8xy3 for more information on XOR, and section 2.4, Display, for more information on the Chip-8 screen and sprites.
         */

    });

    test("[0xEX9E]", function() {

        /**
         * Ex9E - SKP Vx
         * Skip next instruction if key with the value of Vx is pressed.
         *
         * Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC
         * is increased by 2.
         */

    });

    test("[0xEXA1]", function() {

        /**
         * ExA1 - SKNP Vx
         * Skip next instruction if key with the value of Vx is not pressed.
         *
         * Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is
         * increased by 2.
         */

    });

    test("[0xFX07]", function() {

        /**
         * Fx07 - LD Vx, DT
         * Set Vx = delay timer value.
         *
         * The value of DT is placed into Vx.
         */

    });

    test("[0xFX0A]", function() {

        /**
         * Fx0A - LD Vx, K
         * Wait for a key press, store the value of the key in Vx.
         *
         * All execution stops until a key is pressed, then the value of that key is stored in Vx.
         */

    });

    test("[0xFX15]", function() {

        /**
         * Fx15 - LD DT, Vx
         * Set delay timer = Vx.
         *
         * DT is set equal to the value of Vx.
         */

    });

    test("[0xFX18]", function() {

        /**
         * Fx18 - LD ST, Vx
         * Set sound timer = Vx.
         *
         * ST is set equal to the value of Vx.
         */

    });

    test("[0xFX1E]", function() {

        /**
         * Fx1E - ADD I, Vx
         * Set I = I + Vx.
         *
         * The values of I and Vx are added, and the results are stored in I.
         */

    });

    test("[0xFX29]", function() {

        /**
         * Fx29 - LD F, Vx
         * Set I = location of sprite for digit Vx.
         *
         * The value of I is set to the location for the hexadecimal sprite corresponding to the value of Vx.
         */

    });

    test("[0xFX33]", function() {

        /**
         * Fx33 - LD B, Vx
         * Store BCD representation of Vx in memory locations I, I+1, and I+2.
         *
         * The interpreter takes the decimal value of Vx, and places the hundreds digit in memory at location in I,
         * the tens digit at location I+1, and the ones digit at location I+2.
         */

    });

    test("[0xFX55]", function() {

        /**
         * Fx55 - LD [I], Vx
         * Store registers V0 through Vx in memory starting at location I.
         *
         * The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.
         */

    });

    test("[0xFX65]", function() {

        /**
         * Fx65 - LD Vx, [I]
         * Read registers V0 through Vx from memory starting at location I.
         *
         * The interpreter reads values from memory starting at location I into registers V0 through Vx.
         */

    });