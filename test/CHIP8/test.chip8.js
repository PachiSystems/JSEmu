var chip8 = new Chip8Emu(),
    renderer = new Chip8Display(),
    $fixture = $( "#qunit-fixture" );

$fixture.append( "<canvas id='TEST_CANVAS'></canvas>" );
renderer.init('TEST_CANVAS');
chip8.beginEmulation("TEST_MODE",renderer);

/**
 * CPU Tests
 * Check initialization has been performed correctly.
 */

module("CPU");
test("Initialization", function() {
    chip8.init();
    var memoryEmpty = true,
        gfxEmpty = true,
        regEmpty = true,
        staEmpty = true,
        fontInstalled = true,
        i, len;

    // There is a fontset stored in 80 bytes between 0x050 and 0x0A0
    for(i = 0, len = chip8.memory.length ; i < len ; i++) {
        // Need to take into account the installed font
        if (chip8.memory[i] != 0 && (i < 0x050 || i > 0x0A0)) { memoryEmpty = false; }
    }

    // Now let's check the fontset is installed.
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
    for(i = 0 ; i < fontset.length ; i++) {
        if(chip8.memory[i + 0x050] != fontset[i]) { fontInstalled = false; console.log("Failed at byte 0x"+(i + 0x050).toString(16));}
    }

    // Graphics buffer, however should be totally empty.
    for(i = 0, len = chip8.gfx.length ; i < len ; i++) {
        if (chip8.gfx[i] != 0) { gfxEmpty = false; }
    }

    // So should the registers
    for (i = 0 ; i < 16 ; i++) {
        if (chip8.V[i] != 0) { regEmpty = false; }
    }
    if (chip8.I != 0) { regEmpty = false; }

    // And the stack
    for (i = 0 ; i < 16 ; i++) {
        if (chip8.stack[i] != 0) { staEmpty = false; }
        if (chip8.sp != 0) { staEmpty = false; }
    }

    ok(memoryEmpty,"Should clear the entire memory except the font area.");
    ok(fontInstalled,"Should install the font between 0x050 and 0x0A0.");
    ok(gfxEmpty, "Should clear the graphics buffer.");
    ok(regEmpty, "Should clear all registers.");
    ok(staEmpty, "Should clear the stack.");

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

QUnit.module ("OPCODE", {
    setup: function() {
        chip8.init();
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
        "Should clear the entire graphics buffer.");

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

test("[0x1nnn] - JP addr", function() {

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

test("[0x2nnn] CALL addr", function() {

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

test("[0x3Xnn] - SE Vx, byte", function() {

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

    chip8.init();

    chip8.memory[0x200] = 0x30;
    chip8.memory[0x201] = randNum;
    chip8.V[0] = randNum + 1;

    chip8.emulateCycle();

    equal(chip8.pc, 0x200 + 2, "Program counter moved to next instruction when V[0] = " + chip8.V[0] +
        " but randNum = " + randNum);
});

test("[0x4Xnn] - SNE Vx, byte", function() {

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

    chip8.init();

    chip8.memory[0x200] = 0x40;
    chip8.memory[0x201] = randNum;
    chip8.V[0] = randNum + 1;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x204,
        "Vx is not equal to nn. Program counter skipped an instruction.");
});

test("[0x5XY0] - SE Vx, Vy", function() {

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

    equal(chip8.pc,
        0x204,
        "Should skip the program counter over the next instruction when Vx = Vy.");

    chip8.init();
    chip8.memory[0x200] = 0x50;
    chip8.memory[0x201] = 0x10;
    chip8.V[0] = 0x05;
    chip8.V[1] = 0x10;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction when Vx != Vy.");
});

test("[0x6Xnn] - LD Vx, byte", function() {

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

    equal(chip8.V[6],
        randNum,
        "Vx set successfully to correct value.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x7Xnn] - ADD Vx, byte", function() {

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

    equal(chip8.V[0],
        (randNum1 + randNum2) % 256,
        "Added nn to Vx successfully.");

    equal(chip8.V[0xF],
        ((randNum1 + randNum2) < 256) ? 0 : 1,
        "V[F] register set correctly.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY0] - LD Vx, Vy", function() {

    /**
     * 8xy0 - LD Vx, Vy
     * Set Vx = Vy.
     *
     * Stores the value of register Vy in register Vx.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as Vx
    chip8.memory[0x201] = 0x10; // Using V[1] as Vy

    chip8.V[1] = randNum;

    chip8.emulateCycle();

    equal(chip8.V[0],
        randNum,
        "Vx set successfully to correct value.");

    equal(chip8.V[0],
        chip8.V[1],
        "Vx equals Vy.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY1] - OR Vx, Vy", function() {

    /**
     * 8xy1 - OR Vx, Vy
     * Set Vx = Vx OR Vy.
     *
     * Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx. A bitwise OR compares the
     * corrseponding bits from two values, and if either bit is 1, then the same bit in the result is also 1.
     * Otherwise, it is 0.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x11; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        randNum1 | randNum2,
        "Vx has been set successfully to the correct value.");

    equal(chip8.V[1],
        randNum2,
        "Vy remains unchanged.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY2] - AND Vx, Vy", function() {

    /**
     * 8xy2 - AND Vx, Vy
     * Set Vx = Vx AND Vy.
     *
     * Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx. A bitwise AND compares the
     * corresponding bits from two values, and if both bits are 1, then the same bit in the result is also 1.
     * Otherwise, it is 0.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x12; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        randNum1 & randNum2,
        "Vx has been set successfully to the correct value.");

    equal(chip8.V[1],
        randNum2,
        "Vy remains unchanged.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY3] - XOR Vx, Vy", function() {

    /**
     * 8xy3 - XOR Vx, Vy
     * Set Vx = Vx XOR Vy.
     *
     * Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx. An exclusive OR
     * compares the corresponding bits from two values, and if the bits are not both the same, then the
     * corresponding bit in the result is set to 1. Otherwise, it is 0.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x13; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        randNum1 ^ randNum2,
        "Vx has been set successfully to the correct value.");

    equal(chip8.V[1],
        randNum2,
        "Vy remains unchanged.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY4] - ADD Vx, Vy", function() {

    /**
     * 8xy4 - ADD Vx, Vy
     * Set Vx = Vx + Vy, set VF = carry.
     *
     * The values of Vx and Vy are added together. If the result is greater than 8 bits (i.e., > 255,) VF is set to
     * 1, otherwise 0. Only the lowest 8 bits of the result are kept, and stored in Vx.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x14; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        (randNum1 + randNum2) % 256,
        "Vx has been set successfully to the correct value.");

    equal(chip8.V[1],
        randNum2,
        "Vy remains unchanged.");

    equal(chip8.V[0xF],
        ((randNum1 + randNum2) < 256) ? 0 : 1,
        "V[0xF] set correctly.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY5] - SUB Vx, Vy", function() {

    /**
     * 8xy5 - SUB Vx, Vy
     * Set Vx = Vx - Vy, set VF = NOT borrow.
     *
     * If Vx > Vy, then VF is set to 1, otherwise 0. Then Vy is subtracted from Vx, and the results stored in Vx.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x15; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        Math.abs(randNum1 - randNum2) % 256,
        "Vx has been set successfully to the correct value.");

    equal(chip8.V[1],
        randNum2,
        "Vy remains unchanged.");

    equal(chip8.V[0xF],
        ((randNum1 - randNum2) < 0) ? 0 : 1,  // NOT borrow (0 for borrow, 1 for not borrow)
        "V[0xF] set correctly.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY6] - SHR Vx {,Vy}", function() {

    /**
     * 8xy6 - SHR Vx {, Vy}
     * Set Vx = Vx SHR 1.
     *
     * If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0. Then Vx is divided by 2.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x16;

    chip8.V[0] = randNum;

    chip8.emulateCycle();

    equal(chip8.V[0xF],
        randNum & 0x1,
        "V[F] successfully set to correct value.");

    equal(chip8.V[0],
        randNum >> 1,
        "Vx successfully set to correct value.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XY7] - SUBN Vx, Vy", function() {

    /**
     * 8xy7 - SUBN Vx, Vy
     * Set Vx = Vy - Vx, set VF = NOT borrow.
     *
     * If Vy > Vx, then VF is set to 1, otherwise 0. Then Vx is subtracted from Vy, and the results stored in Vx.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x17; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        Math.abs(randNum2 - randNum1) % 256,
        "Vx successfully set to correct value.");

    equal(chip8.V[0xF],
        (randNum2 > randNum1) ? 1 : 0,
        "V[F] register set to correct value.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x8XYE] - SHL Vx, {,Vy}", function() {

    /**
     * 8xyE - SHL Vx {, Vy}
     * Set Vx = Vx SHL 1.
     *
     * If the most-significant bit of Vx is 1, then VF is set to 1, otherwise to 0. Then Vx is multiplied by 2.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x80; // Using V[0] as VX
    chip8.memory[0x201] = 0x1E; // Using V[1] as VY

    chip8.V[0] = randNum;

    chip8.emulateCycle();

    equal(chip8.V[0xF],
        randNum >> 7,
        "V[F] set to correct value.");

    equal(chip8.V[0],
        (randNum << 1) % 256,
        "Vx set to correct value.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0x9XY0] - SNE Vx, Vy", function() {

    /**
     * 9xy0 - SNE Vx, Vy
     * Skip next instruction if Vx != Vy.
     *
     * The values of Vx and Vy are compared, and if they are not equal, the program counter is increased by 2.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF));
    chip8.memory[0x200] = 0x90; // Using V[0] as VX
    chip8.memory[0x201] = 0x10; // Using V[1] as VY

    chip8.V[0] = randNum1;
    chip8.V[1] = Math.abs(randNum2 - randNum1); // Just in case we happen to have randNum 2 == randNum1...

    chip8.emulateCycle();

    equal(chip8.pc,
        0x204,
        "Vx and Vy not equal so the program counter skipped an instruction.");

    chip8.init();

    chip8.memory[0x200] = 0x90; // Using V[0] as VX
    chip8.memory[0x201] = 0x10; // Using V[1] as VY

    chip8.V[0] = chip8.V[1] = randNum1;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x202,
        "Vx and Vy are equal so the program counter moved to the next instruction.");

});

test("[0xAnnn] - LD I, addr", function() {

    /**
     * Annn - LD I, addr
     * Set I = nnn.
     *
     * The value of register I is set to nnn.
     */
    var randNum = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200) + 0x200),
        opcode = 0xA000 + randNum;
    chip8.memory[0x200] = (opcode & 0xFF00) >> 8;
    chip8.memory[0x201] = (opcode & 0x00FF);

    chip8.emulateCycle();

    equal(chip8.I,
        randNum,
        "Register I successfully set to the correct address.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xBnnn]", function() {

    /**
     * Bnnn - JP V0, addr
     * Jump to location nnn + V0.
     *
     * The program counter is set to nnn plus the value of V0.
     */
    var randNum1 = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200) + 0x200),
        randNum2 = Math.floor(Math.random() * (0x001 + 0xFFF - 0x200) + 0x200),
        opcode = 0xB000 + randNum1
        ;
    chip8.memory[0x200] = (opcode & 0xFF00) >> 8;
    chip8.memory[0x201] = (opcode & 0x00FF);

    chip8.V[0] = randNum2;

    chip8.emulateCycle();

    equal(chip8.pc,
        (randNum1 + randNum2) % 4096,
        "Should increment the program counter to the next instruction.");

});

test("[0xCXnn] - RND Vx, byte", function() {

    /**
     * Cxkk - RND Vx, byte
     * Set Vx = random byte AND kk.
     *
     * The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk. The results
     * are stored in Vx. See instruction 8xy2 for more information on AND.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x01 + 0xFF)),
        opcode = 0xC000 + randNum1;
    chip8.memory[0x200] = (opcode & 0xFF00) >> 8;
    chip8.memory[0x201] = (opcode & 0x00FF);

    chip8.randomNumber = randNum2;

    chip8.emulateCycle();

    equal(chip8.V[0],
        randNum1 & randNum2,
        "Vx successfully set to correct value.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

/*
test("[0xDXYn] - DRW Vx, Vy, nibble", function() {

    /**
     * Dxyn - DRW Vx, Vy, nibble
     * Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
     *
     * The interpreter reads n bytes from memory, starting at the address stored in I. These bytes are then
     * displayed as sprites on screen at coordinates (Vx, Vy). Sprites are XORed onto the existing screen.
     * If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0. If the sprite is
     * positioned so part of it is outside the coordinates of the display, it wraps around to the opposite side of
     * the screen. See instruction 8xy3 for more information on XOR.
     */
        // No collision (draws a sprite on an empty background)

        // No collision (draws a sprite exactly adjacent to the last one)

        // Collision (draws a sprite colliding with the last one)
/*
    equal(CHIP8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

*/

test("[0xEX9E] - SKP Vx", function() {

    /**
     * Ex9E - SKP Vx
     * Skip next instruction if key with the value of Vx is pressed.
     *
     * Checks the keyboard, and if the key corresponding to the value of Vx is currently in the down position, PC
     * is increased by 2.
     */
    var randKey = Math.floor(Math.random() * (0x1 + 0xF));

    chip8.memory[0x200] = 0xE0;
    chip8.memory[0x201] = 0x9E;

    // Key not pressed
    chip8.V[0] = randKey;
    chip8.key[randKey] = 0;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction when key is not pressed.");

    chip8.init();

    // Key pressed
    chip8.memory[0x200] = 0xE0;
    chip8.memory[0x201] = 0x9E;

    // Key not pressed
    chip8.V[0] = randKey;
    chip8.key[randKey] = 1;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x204,
        "Should skip the program counter over the next instruction when  key is pressed.");

});

test("[0xEXA1] - SKNP Vx", function() {

    /**
     * ExA1 - SKNP Vx
     * Skip next instruction if key with the value of Vx is not pressed.
     *
     * Checks the keyboard, and if the key corresponding to the value of Vx is currently in the up position, PC is
     * increased by 2.
     */
    var randKey = Math.floor(Math.random() * (0x1 + 0xF));

    chip8.memory[0x200] = 0xE0;
    chip8.memory[0x201] = 0xA1;

    // Key not pressed
    chip8.V[0] = randKey;
    chip8.key[randKey] = 0;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x204,
        "Should skip the program counter over the next instruction when key is not pressed.");

    chip8.init();

    // Key pressed
    chip8.memory[0x200] = 0xE0;
    chip8.memory[0x201] = 0xA1;

    // Key not pressed
    chip8.V[0] = randKey;
    chip8.key[randKey] = 1;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction when key is pressed.");

});

test("[0xFX07] - LD Vx, DT", function() {

    /**
     * Fx07 - LD Vx, DT
     * Set Vx = delay timer value.
     *
     * The value of DT is placed into Vx.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF));

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x07;

    chip8.delay_timer = randNum;  // Delay timer gets decremented at the beginning of the cycle.

    chip8.emulateCycle();

    equal(chip8.V[0],
        randNum,
        "Delay timer value placed in Vx correctly.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX0A] - LD Vx, K", function() {

    /**
     * Fx0A - LD Vx, K
     * Wait for a key press, store the value of the key in Vx.
     *
     * All execution stops until a key is pressed, then the value of that key is stored in Vx.
     */
    var randKey = Math.floor(Math.random() * (0x1 + 0xF));

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x0A;
    chip8.V[0] = null;
    for(var i = 0 ; i < 16 ; i++) { chip8.key[i] = 0; }

    chip8.emulateCycle();

    // No key pressed.
    equal(chip8.pc,
        0x200,
        "Key not pressed, program counter not moved.");

    equal(chip8.V[0],
        null,
        "Key not pressed, nothing stored in Vx.");

    chip8.key[randKey] = 1;

    chip8.emulateCycle();

    equal(chip8.pc,
        0x202,
        "Pressed key ["+randKey+"].Program counter incremented correctly.");

    equal(chip8.V[0],
        randKey,
        "Pressed key stored correctly in Vx.");

});

test("[0xFX15] - LD DT, Vx", function() {

    /**
     * Fx15 - LD DT, Vx
     * Set delay timer = Vx.
     *
     * DT is set equal to the value of Vx.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF));

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x15;

    chip8.V[0] = randNum;

    chip8.emulateCycle();

    equal(chip8.delay_timer,
        randNum,
        "Delay timer set to the value of Vx correctly.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX18] - LD ST, Vx", function() {

    /**
     * Fx18 - LD ST, Vx
     * Set sound timer = Vx.
     *
     * ST is set equal to the value of Vx.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF));

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x18;

    chip8.V[0] = randNum;

    chip8.emulateCycle();

    equal(chip8.sound_timer,
        randNum,
        "Sound timer set to the value of Vx correctly.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX1E] - ADD I, Vx", function() {

    /**
     * Fx1E - ADD I, Vx
     * Set I = I + Vx.
     *
     * The values of I and Vx are added, and the results are stored in I.
     */
    var randNum1 = Math.floor(Math.random() * (0x01 + 0xFF)),
        randNum2 = Math.floor(Math.random() * (0x0001 + 0xFFFF));

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x1E;

    chip8.V[0] = randNum1;
    chip8.I = randNum2; // It's a 16-bit register.

    chip8.emulateCycle();

    equal(chip8.I,
        (randNum1 + randNum2) % 65536,
        "Should store 0x" + ((randNum1 + randNum2) % 65536).toString(16) + " in the I register.");

    equal(chip8.V[0xF],
        ((randNum1 + randNum2) > 65535) ? 1 : 0,
        "Should set V[F] to 1 on overflow, else it will set to 0.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX29] - LD F, Vx", function() {

    /**
     * Fx29 - LD F, Vx
     * Set I = location of sprite for digit Vx.
     *
     * The value of I is set to the location for the hexadecimal sprite corresponding to the value of Vx.
     */
    var randSprite = Math.floor(Math.random() * (0x1 + 0xF));

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x29;

    chip8.V[0] = randSprite;

    chip8.emulateCycle();

    equal(chip8.I,
        (randSprite * 5)+0x050,
        "Should set I to the memory location corresponding to the sprite for 0x" + (randSprite).toString(16) +
            " [0x00"+((randSprite * 5)*0x050).toString(16)+"]");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX33] - LD B, Vx", function() {

    /**
     * Fx33 - LD B, Vx
     * Store BCD representation of Vx in memory locations I, I+1, and I+2.
     *
     * The interpreter takes the decimal value of Vx, and places the hundreds digit in memory at location in I,
     * the tens digit at location I+1, and the ones digit at location I+2.
     */
    var randNum = Math.floor(Math.random() * (0x01 + 0xFF)),
        randAdd = Math.floor(Math.random() * (0x001 + 0xFFC - 0x203) + 0x203);

    chip8.memory[0x200] = 0xF0;
    chip8.memory[0x201] = 0x33;

    chip8.V[0] = randNum;
    chip8.I = randAdd;

    chip8.emulateCycle();

    equal(chip8.memory[randAdd],
        Math.floor(randNum / 100),
        "Should set address 0x"+(randAdd).toString(16)+" to the most significant digit of " + randNum + " (" + Math.floor(randNum / 100) + ")");

    equal(chip8.memory[randAdd+1],
        Math.floor((randNum / 10) % 10),
        "Should set address 0x"+(randAdd+1).toString(16)+" to the middle digit of " + randNum + " (" + Math.floor((randNum / 10) % 10) + ")");

    equal(chip8.memory[randAdd+2],
        Math.floor((randNum % 100) % 10),
        "Should set address 0x"+(randAdd+2).toString(16)+" to the least significant digit of " + randNum + " (" + Math.floor((randNum % 100) % 10) + ")");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX55] - LD [I], Vx", function() {

    /**
     * Fx55 - LD [I], Vx
     * Store registers V0 through Vx in memory starting at location I.
     *
     * The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.
     */
    var randReg = Math.floor(Math.random() * (0x1 + 0xE)),
        randAdd = Math.floor(Math.random() * (0x001 + 0xFFC - 0x203) + 0x203),
        values = [];

    chip8.memory[0x200] = 0xF0 + randReg;
    chip8.memory[0x201] = 0x55;

    chip8.I = randAdd;

    for (var i = 0 ; i <= randReg ; i++) {
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
        chip8.V[i] = values[i] = randNum;
    }

    chip8.emulateCycle();

    for (var i = 0 ; i <= randReg ; i++) {
        equal(chip8.memory[randAdd + i],
            chip8.V[i],
            "Should make value at address 0x"+(randAdd+i).toString(16) + " (0x" + (chip8.memory[randAdd + i]).toString(16) + ") correspond to register V" + i.toString(16) + "(0x"+chip8.V[i].toString(16)+")");
    }

    equal(chip8.I,
        randAdd + randReg + 1,
        "Should set register I to be I + x + 1.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});

test("[0xFX65] - LD Vx, [I]", function() {

    /**
     * Fx65 - LD Vx, [I]
     * Read registers V0 through Vx from memory starting at location I.
     *
     * The interpreter reads values from memory starting at location I into registers V0 through Vx.
     */
    var randReg = Math.floor(Math.random() * (0x1 + 0xE)),
        randAdd = Math.floor(Math.random() * (0x001 + 0xFFC - 0x203) + 0x203),
        values = [];

    chip8.memory[0x200] = 0xF0 + randReg;
    chip8.memory[0x201] = 0x65;

    chip8.I = randAdd;

    for (var i = 0 ; i <= randReg ; i++) {
        var randNum = Math.floor(Math.random() * (0x01 + 0xFF));
        chip8.memory[randAdd + i] = values[i] = randNum;
    }

    chip8.emulateCycle();

    for (var i = 0 ; i <= randReg ; i++) {
        equal(chip8.memory[randAdd + i],
            chip8.V[i],
            "Should make register V" + i.toString(16) + "(0x"+chip8.V[i].toString(16)+")" + " correspond to the value at address 0x"+(randAdd+i).toString(16) + " (0x" + (chip8.memory[randAdd + i]).toString(16) + ")");
    }

    equal(chip8.I,
        randAdd + randReg + 1,
        "Should set register I to be I + x + 1.");

    equal(chip8.pc,
        0x202,
        "Should increment the program counter to the next instruction.");

});