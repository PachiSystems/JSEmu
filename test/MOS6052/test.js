var MOS6502 = new MOS6502(),
    $fixture = $( "#qunit-fixture" );

//MOS6502.beginEmulation("TEST_MODE",renderer);

/**
 * CPU Tests
 * Check initialization has been performed correctly.
 *

module("CPU");
test("Initialization", function() {

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
*/

/**
 * OPCODE Tests
 * Each opcode should have its own test. Before each test is run, the emulator will be reset.
 */

QUnit.module ("Address Modes", {
    setup: function() {
        //MOS6502.init();
    }
});
test("Read Zero Page", function() {

    /**
     * Read Zero Page
     * Given a byte, it should read from 0x00-- in memory.
     */

    var randomByte = Math.floor(Math.random() * 255 - 1),
        randomAddress = Math.floor(Math.random() * 255 - 1);

    MOS6502._RAM[randomAddress] = randomByte;

    MOS6502.ReadZeroPage(randomAddress);

    equal(MOS6502.ReadZeroPage(randomAddress),
        randomByte,
        "Byte stored in ZeroPage address matches value.");

});
test("Read Zero Page X", function() {
    /**
     * Read Zero Page X
     * Given
     */
});