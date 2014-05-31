var MOS6502 = new MOS6502(),
    $fixture = $( "#qunit-fixture" );

//MOS6502.beginEmulation("TEST_MODE",renderer);

/**
 * CPU Tests
 * Check initialization has been performed correctly.
 */

module("Utility Functions");
test("Make Address", function() {

    var addressByte1 = 0xFF & (Math.floor(Math.random() * 255 - 1)),
        addressByte2 = 0xFF & (Math.floor(Math.random() * 255 - 1)),
        fullAddress = (addressByte2 << 8) + addressByte1;

    /**
     * Given two bytes, it should return a 16-bit address.
     */
    equal(MOS6502._MAKE_ADDRESS(addressByte1,addressByte2),
        fullAddress,
        "16-bit address calculated from two bytes in a little endian way.");

});

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

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomAddress = Math.floor(Math.random() * 255) + 1;

    MOS6502._RAM[randomAddress & 0xFF] = randomByte;

    equal(MOS6502.ReadZeroPage(randomAddress),
        randomByte,
        "Byte stored in ZeroPage address matches value.");

});

test("Read Zero Page X", function() {
    /**
     * Read Zero Page X
     * Given a byte, it should read from 0x00-- in memory offset by the value in X.
     */

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomX = Math.floor(Math.random() * 255) + 1,
        randomAddress = Math.floor(Math.random() * 255) + 1;

    MOS6502._X = randomX;

    // It should ALWAYS be in Zero Page. Even if it goes past the boundary.
    MOS6502._RAM[ (0xFF & (randomX + randomAddress)) ] = randomByte;

    equal(MOS6502.ReadZeroPageX(randomAddress),
        randomByte,
        "Byte stored in Zero Page (offset by X) matches value.");

});

test("Read Zero Page Y", function() {
    /**
     * Read Zero Page Y
     * Given a byte, it should read from 0x00-- in memory offset by the value in Y.
     */

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = Math.floor(Math.random() * 255) + 1,
        randomAddress = Math.floor(Math.random() * 255) + 1;

    MOS6502._Y = randomY;

    // It should ALWAYS be in Zero Page. Even if it goes past the boundary.
    MOS6502._RAM[( 0xFF & (randomAddress + randomY))] = randomByte;

    equal(MOS6502.ReadZeroPageY(randomAddress),
        randomByte,
    "Byte stored in Zero Page (offset by Y) matches value.");
});

test("Read Absolute", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    /**
     * Read Absolute
     * Given two bytes, it should read from the address created by combining those two bytes.
     */

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) ] = randomByte;

    equal(MOS6502.ReadAbsolute(randomAddress1, randomAddress2),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2)).toString(16) + " matches value.");

});

test("Read Absolute X (check page false)", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomX = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

    /**
     * Read Absolute X (Check Page False)
     * Shouldn't matter if it crosses page boundary. All it needs to do is get the right operand from a 16-bit address.
     */

    MOS6502._X = randomX;

    MOS6502._CYCLES = 0;

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomX ] = randomByte;

    equal(MOS6502.ReadAbsoluteX(randomAddress1, randomAddress2, false),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomX).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        0,
        "Page boundary checking off. Cycles not increased.");


});

test("Read Absolute X (check page true)", function(){

    /**
     * Read Absolute X (Check Page True)
     * It needs to do is get the right operand from a 16-bit address. If it crosses a page boundary, it should add a cycle.
     */

    // To guarantee a page crossing, we're setting the numbers instead of randomising them.

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomX = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

    MOS6502._X = randomX;

    // If the page is crossed, it should add a cycle.
    MOS6502._CYCLES = 0;

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomX] = randomByte;

    equal(MOS6502.ReadAbsoluteX(randomAddress1, randomAddress2, true),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomX).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        1,
        "Page boundary crossed. One cycle added.");

});

test("Read Absolute Y (check page false)", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

    /**
     * Read Absolute Y (Check Page False)
     * Shouldn't matter if it crosses page boundary. All it needs to do is get the right operand from a 16-bit address.
     */

    MOS6502._Y = randomY;

    MOS6502._CYCLES = 0;

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY ] = randomByte;

    equal(MOS6502.ReadAbsoluteY(randomAddress1, randomAddress2, false),
        randomByte,
            "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        0,
        "Page boundary checking off. Cycles not increased.");
});

test("Read Absolute Y (check page true)", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

    /**
     * Read Absolute Y (Check Page True)
     * It needs to do is get the right operand from a 16-bit address. If it crosses a page boundary, it should add a cycle.
     */

    MOS6502._Y = randomY;

    MOS6502._CYCLES = 0;

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY ] = randomByte;

    equal(MOS6502.ReadAbsoluteY(randomAddress1, randomAddress2, true),
        randomByte,
            "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        1,
        "Page boundary crossed. One cycle added.");
});

test("Read Indirect X", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomX = Math.floor(Math.random() * 255) + 1,
        randomZP = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    // Okay... Here's the deal... The random address needs to be stored in ZP offset by X.
    MOS6502._RAM[ 0xFF & (randomZP + randomX) ] = randomAddress1;
    MOS6502._RAM[ 0xFF & (randomZP + randomX + 1) ] = randomAddress2;

    var addressByte1 = MOS6502._RAM[0xFF & (randomZP + randomX)],
        addressByte2 = MOS6502._RAM[0xFF & (randomZP + randomX + 1)];

    /**
     * Read Indirect X
     * Address in Zero Page, offset by X gives first byte of address, +1 for second byte. Little endian.
     */

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1,randomAddress2) ] = randomByte;
    MOS6502._X = randomX;

    equal(MOS6502.ReadIndirectX(randomZP),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(addressByte1, addressByte2)).toString(16) + " matches value.");

});

test("Read Indirect Y (check page false)", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = 200,
        randomZP = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

    // Set the address within zero page.
    MOS6502._RAM[randomZP] = randomAddress1;
    MOS6502._RAM[randomZP + 1] = randomAddress2;

    // Set the byte in the right place.
    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY] = randomByte;

    MOS6502._Y = randomY;
    MOS6502._CYCLES = 0;

    /**
     * Read Indirect Y (Check Page False)
     * The operand is stored at the zero page address given, offest by Y.
     */

    equal(MOS6502.ReadIndirectY(randomZP, false),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        0,
        "Page boundary checking off. Cycles not increased.");

});

test("Read Indirect Y (check page true)", function(){
    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = 200,
        randomZP = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

    // Set the address within zero page.
    MOS6502._RAM[randomZP] = randomAddress1;
    MOS6502._RAM[randomZP + 1] = randomAddress2;

    // Set the byte in the right place.
    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY] = randomByte;

    MOS6502._Y = randomY;
    MOS6502._CYCLES = 0;

    /**
     * Read Indirect Y (Check Page True)
     * The operand is stored at the zero page address given, offest by Y. If page boundary is crossed, it should increment the CYCLES by 1.
     */

    equal(MOS6502.ReadIndirectY(randomZP, true),
        randomByte,
            "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        1,
        "Page boundary crossed. One cycle added.");
});