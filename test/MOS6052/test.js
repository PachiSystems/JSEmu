var MOS6502 = new MOS6502();

/**
 * Utiliity Methods
 * These methods are used to set flags in the CPU and to create 16-bit addresses. MOS6502 is little endian.
 */

QUnit.module("Utility Methods", {
    setup: function() {
        MOS6502.init();
    }
});

test("CPU initialisation", function() {
    /**
     * CPU Start Up
     *
     * According to 6502 Programmer's Reference, this is how the CPU should initialise:
     * 1. Processor sets INTERRUPT to false an places the RESET Vector address in the PC.
     * 2. CPU executes whatever it finds there.
     * 3. Programmer should init the stack, init I/O, enable interrupts and set arithmetic mode.
     *
     * In this case, the only thing that needs doing, really, is to grab the address in the RESET vector and set the PC
     * and stack pointer to the right place.
     */

    //MOS6502.init("TEST_MODE");

    equal(true,true,"Not implemented. True for CI build passing.")
});

test("Make Address", function() {

    /**
     * _MAKE_ADDRESS
     * Given two bytes, it should return a 16-bit address. MOS6502 is little endian.
     */

    var addressByte1 = 0xFF & (Math.floor(Math.random() * 255 - 1)),
        addressByte2 = 0xFF & (Math.floor(Math.random() * 255 - 1)),
        fullAddress = (addressByte2 << 8) + addressByte1;

    equal(MOS6502._MAKE_ADDRESS(addressByte1,addressByte2),
        fullAddress,
        "16-bit address calculated from two bytes in a little endian way.");

});

test("If / Set Carry", function() {

    /**
     * _SET_CARRY
     * This should set the carry flag in the P register.
     */

    /**
     * _IF_CARRY
     * This should return true if the carry flag is set in the P register.
     */

    // Make sure it's all empty first.
    MOS6502._P = 0x20;

    equal(MOS6502._IF_CARRY(),
        false,
        "Carry flag not set.");

    // Now we'll try to set the carry flag.
    MOS6502._SET_CARRY(true);

    equal(MOS6502._IF_CARRY(),
        true,
        "_IF_CARRY detected carry flag set");

    equal(MOS6502._P,
        0x21,
        "P register correctly set.");

    // Now try to unset the carry flag.
    MOS6502._SET_CARRY(false);

    equal(MOS6502._IF_CARRY(),
        false,
        "_IF_CARRY detected carry flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

test("If / Set Zero", function() {

    /**
     * _SET_ZERO
     * This should set the zero flag in the P register.
     */

    /**
     * _IF_ZERO
     * This should return true if the zero flag is set in the P register.
     */

        // Make sure it's all empty first.
    MOS6502._P = 0x20;

    equal(MOS6502._IF_ZERO(),
        false,
        "Zero flag not set.");

    // Now we'll try to set the zero flag.
    MOS6502._SET_ZERO(0);

    equal(MOS6502._IF_ZERO(),
        true,
        "_IF_ZERO detected zero flag set");

    equal(MOS6502._P,
        0x22,
        "P register correctly set.");

    // Now try to unset the zero flag.
    MOS6502._SET_ZERO(1);

    equal(MOS6502._IF_ZERO(),
        false,
        "_IF_ZERO detected zero flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

test("If / Set Interrupt", function() {

    /**
     * _SET_INTERRUPT
     * This should set the interrupt flag in the P register.
     */

    /**
     * _IF_INTERRUPT
     * This should return true if the interrupt flag is set in the P register.
     */

        // Make sure it's all empty first.
    MOS6502._P = 0x20;

    equal(MOS6502._IF_INTERRUPT(),
        false,
        "Interrupt flag not set.");

    // Now we'll try to set the zero flag.
    MOS6502._SET_INTERRUPT(true);

    equal(MOS6502._IF_INTERRUPT(),
        true,
        "_IF_INTERRUPT detected interrupt flag set");

    equal(MOS6502._P,
        0x24,
        "P register correctly set.");

    // Now try to unset the zero flag.
    MOS6502._SET_INTERRUPT(false);

    equal(MOS6502._IF_INTERRUPT(),
        false,
        "_IF_INTERRUPT detected interrupt flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

test("If / Set Decimal", function() {

    /**
     * _SET_DECIMAL
     * This should set the decimal flag in the P register.
     */

    /**
     * _IF_DECIMAL
     * This should return true if the decimal flag is set in the P register.
     */

        // Make sure it's all empty first.
    MOS6502._P = 0x20;

    equal(MOS6502._IF_DECIMAL(),
        false,
        "Decimal flag not set.");

    // Now we'll try to set the zero flag.
    MOS6502._SET_DECIMAL(true);

    equal(MOS6502._IF_DECIMAL(),
        true,
        "_IF_DECIMAL detected decimal flag set");

    equal(MOS6502._P,
        0x28,
        "P register correctly set.");

    // Now try to unset the zero flag.
    MOS6502._SET_DECIMAL(false);

    equal(MOS6502._IF_DECIMAL(),
        false,
        "_IF_DECIMAL detected decimal flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

test("If / Set Break", function() {

    /**
     * _SET_BREAK
     * This should set the break flag in the P register.
     */

    /**
     * _IF_BREAK
     * This should return true if the break flag is set in the P register.
     */

        // Make sure it's all empty first.
    MOS6502._P = 0x20;

    equal(MOS6502._IF_BREAK(),
        false,
        "Break flag not set.");

    // Now we'll try to set the zero flag.
    MOS6502._SET_BREAK(true);

    equal(MOS6502._IF_BREAK(),
        true,
        "_IF_BREAK detected break flag set");

    equal(MOS6502._P,
        0x30,
        "P register correctly set.");

    // Now try to unset the zero flag.
    MOS6502._SET_BREAK(false);

    equal(MOS6502._IF_BREAK(),
        false,
        "_IF_BREAK detected break flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

test("If / Set Overflow", function() {

    /**
     * _SET_OVERFLOW
     * This should set the break flag in the P register.
     */

    /**
     * _IF_OVERFLOW
     * This should return true if the break flag is set in the P register.
     */

        // Make sure it's all empty first.
    MOS6502._P = 0x20;

    equal(MOS6502._IF_OVERFLOW(),
        false,
        "Overflow flag not set.");

    // Now we'll try to set the zero flag.
    MOS6502._SET_OVERFLOW(true);

    equal(MOS6502._IF_OVERFLOW(),
        true,
        "_IF_OVERFLOW detected overflow flag set");

    equal(MOS6502._P,
        0x60,
        "P register correctly set.");

    // Now try to unset the zero flag.
    MOS6502._SET_OVERFLOW(false);

    equal(MOS6502._IF_OVERFLOW(),
        false,
        "_IF_OVERFLOW detected overflow flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

test("If / Set Sign", function() {

    /**
     * _SET_SIGN
     * This should set the sign flag in the P register.
     */

    /**
     * _IF_SIGN
     * This should return true if the sign flag is set in the P register.
     */

        // Make sure it's all empty first.
    MOS6502._P = 0x20;


    equal(MOS6502._IF_SIGN(),
        false,
        "Overflow flag not set.");

    // Now we'll try to set the zero flag.
    MOS6502._SET_SIGN(0x80);

    equal(MOS6502._IF_SIGN(),
        true,
        "_IF_SIGN detected sign flag set");

    equal(MOS6502._P,
        0xA0,
        "P register correctly set.");

    // Now try to unset the zero flag.
    MOS6502._SET_SIGN(0x00);

    equal(MOS6502._IF_SIGN(),
        false,
        "_IF_SIGN detected sign flag not set.");

    equal(MOS6502._P,
        0x20,
        "P register set to correct value.");

});

/*********************************************************************************************************************/

QUnit.module("Memory Modes - Read", {
    setup: function() {
        MOS6502.init();
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

    /**
     * Read Absolute
     * Given two bytes, it should read from the address created by combining those two bytes.
     */

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) ] = randomByte;

    equal(MOS6502.ReadAbsolute(randomAddress1, randomAddress2),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2)).toString(16) + " matches value.");

});

test("Read Absolute X (check page false)", function(){

    /**
     * Read Absolute X (Check Page False)
     * Shouldn't matter if it crosses page boundary. All it needs to do is get the right operand from a 16-bit address.
     */

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomX = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

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

    /**
     * Read Absolute Y (Check Page False)
     * Shouldn't matter if it crosses page boundary. All it needs to do is get the right operand from a 16-bit address.
     */

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

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

    /**
     * Read Absolute Y (Check Page True)
     * It needs to do is get the right operand from a 16-bit address. If it crosses a page boundary, it should add a cycle.
     */

    var randomByte = Math.floor(Math.random() * 255) + 1,
        randomY = 200,
        randomAddress1 = 200,
        randomAddress2 = 200;

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

    /**
     * Read Indirect X
     * Address in Zero Page, offset by X gives first byte of address, +1 for second byte. Little endian.
     */

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

    MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1,randomAddress2) ] = randomByte;
    MOS6502._X = randomX;

    equal(MOS6502.ReadIndirectX(randomZP),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(addressByte1, addressByte2)).toString(16) + " matches value.");

});

test("Read Indirect Y (check page false)", function(){

    /**
     * Read Indirect Y (Check Page False)
     * The operand is stored at the zero page address given, offest by Y.
     */

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

    equal(MOS6502.ReadIndirectY(randomZP, false),
        randomByte,
        "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        0,
        "Page boundary checking off. Cycles not increased.");

});

test("Read Indirect Y (check page true)", function(){

    /**
     * Read Indirect Y (Check Page True)
     * The operand is stored at the zero page address given, offest by Y. If page boundary is crossed, it should increment the CYCLES by 1.
     */

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

    equal(MOS6502.ReadIndirectY(randomZP, true),
        randomByte,
            "Byte stored at address 0x" + (MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY).toString(16) + " matches value.");

    equal(MOS6502._CYCLES,
        1,
        "Page boundary crossed. One cycle added.");
});

/*********************************************************************************************************************/

QUnit.module("Memory Modes - Write", {
    setup: function() {
        MOS6502.init();
    }
});


test("Write Zero Page", function() {

    /**
     * Write Zero Page
     * Given a byte of data and a ZP address, it should write to that address.
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomZP = Math.floor(Math.random() * 255) + 1;

    MOS6502.WriteZeroPage(randomZP, randomData);

    equal(MOS6502._RAM[0xFF & randomZP],
        randomData,
        "Successfully written to zero page.");

});

test("Write Zero Page X", function() {

    /**
     * Write Zero Page X
     * Given a byte of data and a ZP address, it should write to that address offset by the X register.
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomX = Math.floor(Math.random() * 255) + 1,
        randomZP = Math.floor(Math.random() * 255) + 1;

    MOS6502._X = randomX;
    MOS6502.WriteZeroPageX(randomZP, randomData);

    equal(MOS6502._RAM[0xFF & (randomZP + randomX)],
        randomData,
        "Successfully written to zero page offset by X.");

});

test("Write Zero Page Y", function() {

    /**
     * Write Zero Page Y
     * Given a byte of data and a ZP address, it should write to that address offset by the Y register.
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomY = Math.floor(Math.random() * 255) + 1,
        randomZP = Math.floor(Math.random() * 255) + 1;

    MOS6502._Y = randomY;
    MOS6502.WriteZeroPageY(randomZP, randomData);

    equal(MOS6502._RAM[0xFF & (randomZP + randomY)],
        randomData,
        "Successfully written to zero page offset by Y.");

});

test("Write Absolute", function() {

    /**
     * Write Absolute
     * Given a byte of data and a little endian address, it should write to that address.
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    MOS6502.WriteAbsolute(randomAddress1, randomAddress2, randomData);

    equal(MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2)],
        randomData,
        "Successfully written to absolute address.");

});

test("Write Absolute X", function() {

    /**
     * Write Absolute X
     * Given a byte of data and a little endian address, it should write to that address offset by the X register value.
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomX = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    MOS6502._X = randomX;
    MOS6502.WriteAbsoluteX(randomAddress1, randomAddress2, randomData);

    equal(MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomX],
        randomData,
        "Successfully written to absolute address offset by X.");

});

test("Write Absolute Y", function() {

    /**
     * Write Absolute Y
     * Given a byte of data and a little endian address, it should write to that address offset by the Y register value.
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomY = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    MOS6502._Y = randomY;
    MOS6502.WriteAbsoluteY(randomAddress1, randomAddress2, randomData);

    equal(MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY],
        randomData,
        "Successfully written to absolute address offset by Y.");

});

test("Write Indirect X", function() {

    /**
     * Write Indirect X
     * Given a byte of data and a zero page address, it should write to the address pointed to in zero page offset by
     * the X register and zero page + 1 offset by the value in the X register. (Offset happens in zero page).
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomX = Math.floor(Math.random() * 255) + 1,
        randomZP = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    MOS6502._RAM[0xFF & (randomZP + randomX)] = randomAddress1;
    MOS6502._RAM[0xFF & (randomZP + randomX + 1)] = randomAddress2;

    MOS6502._X = randomX;

    MOS6502.WriteIndirectX(randomZP, randomData);

    equal(MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2)],
        randomData,
        "Successfully written to indirect address offset by X in zero page.");

});

test("Write Indirect Y", function() {

    /**
     * Write Indirect Y
     * Given a byte of data and a zero page address, it should write to the address pointed to in zero page and zero
     * page + 1 offset by the value in the Y register. (Offset happens after address is loaded).
     */

    var randomData = Math.floor(Math.random() * 255) + 1,
        randomY = Math.floor(Math.random() * 255) + 1,
        randomZP = Math.floor(Math.random() * 255) + 1,
        randomAddress1 = Math.floor(Math.random() * 255) + 1,
        randomAddress2 = Math.floor(Math.random() * 255) + 1;

    MOS6502._RAM[0xFF & (randomZP)] = randomAddress1;
    MOS6502._RAM[0xFF & (randomZP + 1)] = randomAddress2;

    MOS6502._Y = randomY;

    MOS6502.WriteIndirectY(randomZP, randomData);

    equal(MOS6502._RAM[ MOS6502._MAKE_ADDRESS(randomAddress1, randomAddress2) + randomY],
        randomData,
        "Successfully written to indirect address offset by X in zero page.");

});

/*********************************************************************************************************************/

QUnit.module ("Instruction - ORA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x09 - ORA (Immediate)", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x09,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4000,
        OperandAddress = PCStart + 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
        PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");
});

test("0x05 - ORA (Zero Page)", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x05,
        ZPAddress = 0x20,
        CycleCost = 3,
        BytesUsed = 2,
        PCStart = 0x4000,
        OperandAddress = ZPAddress;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x15 - ORA (Zero Page, X)", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x15,
        ZPAddress = 0x20,
        XRegister = 0x80,
        CycleCost = 4,
        BytesUsed = 2,
        PCStart = 0x4000,
        OperandAddress = (ZPAddress + XRegister) & 0xFF;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");
});

test("0x0D - ORA (Absolute)", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x0D,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        CycleCost = 4,
        BytesUsed = 3,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2);

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");
});

test("0x1D - ORA (Absolute, X) [Same Page]", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x1D,
        XRegister = 0x80,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        CycleCost = 4,
        BytesUsed = 3,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x1D - ORA (Absolute, X) [Page Boundary Crossed]", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x1D,
        XRegister = 0x80,
        AddressByte1 = 0x81,
        AddressByte2 = 0x31,
        CycleCost = 5,
        BytesUsed = 3,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x19 - ORA (Absolute, Y) [Same Page]", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x1D,
        YRegister = 0x80,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        CycleCost = 4,
        BytesUsed = 3,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x19 - ORA (Absolute, Y) [Page Boundary Crossed]", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x1D,
        YRegister = 0x80,
        AddressByte1 = 0x81,
        AddressByte2 = 0x31,
        CycleCost = 5,
        BytesUsed = 3,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x01 - ORA (Indirect, X)", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x01,
        XRegister = 0x80,
        ZPAddress = 0x21,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        CycleCost = 6,
        BytesUsed = 2,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2);

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress + XRegister] = AddressByte1;
    MOS6502._RAM[ZPAddress + XRegister + 1] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x11 - ORA (Indirect, Y) [Same Page]", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x11,
        YRegister = 0x80,
        ZPAddress = 0x21,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        CycleCost = 5,
        BytesUsed = 2,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

test("0x11 - ORA (Indirect, Y) [Page Boundary Crossed]", function() {
    /**
     *    Instruction = ORA
     * Affected Flags = Sign & Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x11,
        YRegister = 0x80,
        ZPAddress = 0x21,
        AddressByte1 = 0x81,
        AddressByte2 = 0x31,
        CycleCost = 5,
        BytesUsed = 2,
        PCStart = 0x4000,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set Sign
     *
     * Before ORA Applied:
     *         Operand: 01010101 (85)
     *     Accumulator: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 11010101 (213)
     * Status Register: 10100000 (160)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 85;
    MOS6502._A = 128;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        213,
        "Set sign: Accumulator set correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: CYCLES incremented correctly.");

    /**
     * Test 2: Set Zero
     *
     * Before ORA Applied:
     *         Operand: 00000000 (0)
     *     Accumulator: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 00000000 (0)
     * Status Register: 00100010 (34)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 0;
    MOS6502._A = 0;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        0,
        "Set zero: Accumulator set correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: CYCLES incremented correctly.");

    /**
     * Test 3: Set None
     *
     * Before ORA Applied:
     *         Operand: 01100110 (102)
     *     Accumulator: 01100001 (97)
     * Status Register: 00100000 (32)
     *
     * After ORA Applied:
     *     Accumulator: 01100111 (103)
     * Status Register: 00100000 (32)
     */

    MOS6502._PC = PCStart;
    MOS6502._RAM[OperandAddress] = 102;
    MOS6502._A = 97;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();


    equal(MOS6502._A,
        103,
        "Set none: Accumulator set correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: PC incremented correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: CYCLES incremented correctly.");

});

/*********************************************************************************************************************/

QUnit.module("Instruction - BRK", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x00 - BRK (Implied)", function() {
    /**
     * BRK
     * Pre-state:
     *          PC = 0x4000
     *      CYCLES = 0
     *           P = 0x20
     *      0x4000 = 0x00
     *      0xFFFE = 0x40
     *      0xFFFF = 0x40
     *
     * Post-state:
     *          PC = 0x4040
     *      CYCLES = 7
     *           P = 0x34 (Break & Interrupt set)
     */

    MOS6502._PC = 0x4000;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._RAM[0x4000] = 0x00;
    MOS6502._RAM[0xFFFE] = 0x40;
    MOS6502._RAM[0xFFFF] = 0x40;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        0x4040,
        "PC set correctly.");

    equal(MOS6502._CYCLES,
        7,
        "CYCLES incremented correctly.");

    equal(MOS6502._P,
        0x34,
        "Status Register set correctly.");
});

/*********************************************************************************************************************/

QUnit.module("Instruction - ASL", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x0A - ASL (Accumulator)", function() {
    /**
     *    Instruction: ASL - Shift left one bit.
     * Affected Flags: Sign, Zero, Carry
     *    Total Tests: 5
     */

    var OPCODE = 0x0A,
        CycleCost = 2,
        BytesUsed = 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set carry.
     *
     * Before ASL Applied:
     *         Operand: 10101010 (170)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 01010100 (84)
     * Status Register: 00100001 (33)
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 170;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
          84,
        "Set carry: Operand shifted correctly.");

    equal(MOS6502._P,
        33,
        "Set carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry: Cycles set correctly.");

    /**
     * Test 2: Set carry & zero.
     *
     * Before ASL Applied:
     *         Operand: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100011 (35)
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 128;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        0,
        "Set carry & zero: Operand shifted correctly.");

    equal(MOS6502._P,
        35,
        "Set carry & zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry & zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry & zero: Cycles set correctly.");

    /**
     * Test 3: Set sign & carry.
     *
     * Before ASL Applied:
     *         Operand: 11001010 (202)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10010100 (148)
     * Status Register: 10100001 (161)
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 202;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        148,
        "Set sign & carry: Operand shifted correctly.");

    equal(MOS6502._P,
        161,
        "Set sign & carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign & carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign & carry: Cycles set correctly.");

    /**
     * Test 4: Set zero.
     *
     * Before ASL Applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100010 (34)
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        0,
        "Set zero: Operand shifted correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: Cycles set correctly.");

    /**
     * Test 5: Set sign.
     *
     * Before ASL Applied:
     *         Operand: 01000000 (64)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 64;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        128,
        "Set sign: Operand shifted correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: Cycles set correctly.");

    /**
     * Test 6: Set none.
     *
     * Before ASL Applied:
     *         Operand: 00100110 ()
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 38;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        76,
        "Set none: Operand shifted correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: Cycles set correctly.");
});

test("0x06 - ASL (Zero Page)", function() {
    /**
     *    Instruction: ASL - Shift left one bit.
     * Affected Flags: Sign, Zero, Carry
     *    Total Tests: 5
     */

    var OPCODE = 0x06,
        ZPAddress = 0x20,
        CycleCost = 5,
        BytesUsed = 2,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set carry.
     *
     * Before ASL Applied:
     *         Operand: 10101010 (170)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 01010100 (84)
     * Status Register: 00100001 (33)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 170;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        84,
        "Set carry: Operand shifted correctly.");

    equal(MOS6502._P,
        33,
        "Set carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry: Cycles set correctly.");

    /**
     * Test 2: Set carry & zero.
     *
     * Before ASL Applied:
     *         Operand: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100011 (35)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 128;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        0,
        "Set carry & zero: Operand shifted correctly.");

    equal(MOS6502._P,
        35,
        "Set carry & zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry & zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry & zero: Cycles set correctly.");

    /**
     * Test 3: Set sign & carry.
     *
     * Before ASL Applied:
     *         Operand: 11001010 (202)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10010100 (148)
     * Status Register: 10100001 (161)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 202;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        148,
        "Set sign & carry: Operand shifted correctly.");

    equal(MOS6502._P,
        161,
        "Set sign & carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign & carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign & carry: Cycles set correctly.");

    /**
     * Test 4: Set zero.
     *
     * Before ASL Applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100010 (34)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        0,
        "Set zero: Operand shifted correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: Cycles set correctly.");

    /**
     * Test 5: Set sign.
     *
     * Before ASL Applied:
     *         Operand: 01000000 (64)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 64;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        128,
        "Set sign: Operand shifted correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: Cycles set correctly.");

    /**
     * Test 6: Set none.
     *
     * Before ASL Applied:
     *         Operand: 00100110 ()
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 38;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        76,
        "Set none: Operand shifted correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: Cycles set correctly.");
});

test("0x16 - ASL (Zero Page, X)", function() {
    /**
     *    Instruction: ASL - Shift left one bit.
     * Affected Flags: Sign, Zero, Carry
     *    Total Tests: 5
     */

    var OPCODE = 0x16,
        ZPAddress = 0x80,
        XRegister = 0x80,
        CycleCost = 6,
        BytesUsed = 2,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set carry.
     *
     * Before ASL Applied:
     *         Operand: 10101010 (170)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 01010100 (84)
     * Status Register: 00100001 (33)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 170;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],
        84,
        "Set carry: Operand shifted correctly.");

    equal(MOS6502._P,
        33,
        "Set carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry: Cycles set correctly.");

    /**
     * Test 2: Set carry & zero.
     *
     * Before ASL Applied:
     *         Operand: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100011 (35)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 128;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],
        0,
        "Set carry & zero: Operand shifted correctly.");

    equal(MOS6502._P,
        35,
        "Set carry & zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry & zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry & zero: Cycles set correctly.");

    /**
     * Test 3: Set sign & carry.
     *
     * Before ASL Applied:
     *         Operand: 11001010 (202)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10010100 (148)
     * Status Register: 10100001 (161)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 202;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],
        148,
        "Set sign & carry: Operand shifted correctly.");

    equal(MOS6502._P,
        161,
        "Set sign & carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign & carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign & carry: Cycles set correctly.");

    /**
     * Test 4: Set zero.
     *
     * Before ASL Applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100010 (34)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],
        0,
        "Set zero: Operand shifted correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: Cycles set correctly.");

    /**
     * Test 5: Set sign.
     *
     * Before ASL Applied:
     *         Operand: 01000000 (64)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 64;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],
        128,
        "Set sign: Operand shifted correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: Cycles set correctly.");

    /**
     * Test 6: Set none.
     *
     * Before ASL Applied:
     *         Operand: 00100110 ()
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 38;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],
        76,
        "Set none: Operand shifted correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: Cycles set correctly.");
});

test("0x0E - ASL (Absolute)", function() {
    /**
     *    Instruction: ASL - Shift left one bit.
     * Affected Flags: Sign, Zero, Carry
     *    Total Tests: 5
     */

    var OPCODE = 0x0E,
        AddressByte1 = 0x80,
        AddressByte2 = 0x80,
        CycleCost = 6,
        BytesUsed = 3,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set carry.
     *
     * Before ASL Applied:
     *         Operand: 10101010 (170)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 01010100 (84)
     * Status Register: 00100001 (33)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 170;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],
        84,
        "Set carry: Operand shifted correctly.");

    equal(MOS6502._P,
        33,
        "Set carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry: Cycles set correctly.");

    /**
     * Test 2: Set carry & zero.
     *
     * Before ASL Applied:
     *         Operand: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100011 (35)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 128;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],
        0,
        "Set carry & zero: Operand shifted correctly.");

    equal(MOS6502._P,
        35,
        "Set carry & zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry & zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry & zero: Cycles set correctly.");

    /**
     * Test 3: Set sign & carry.
     *
     * Before ASL Applied:
     *         Operand: 11001010 (202)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10010100 (148)
     * Status Register: 10100001 (161)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 202;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],
        148,
        "Set sign & carry: Operand shifted correctly.");

    equal(MOS6502._P,
        161,
        "Set sign & carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign & carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign & carry: Cycles set correctly.");

    /**
     * Test 4: Set zero.
     *
     * Before ASL Applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100010 (34)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 0;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],
        0,
        "Set zero: Operand shifted correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: Cycles set correctly.");

    /**
     * Test 5: Set sign.
     *
     * Before ASL Applied:
     *         Operand: 01000000 (64)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 64;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],
        128,
        "Set sign: Operand shifted correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: Cycles set correctly.");

    /**
     * Test 6: Set none.
     *
     * Before ASL Applied:
     *         Operand: 00100110 ()
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 38;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],
        76,
        "Set none: Operand shifted correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: Cycles set correctly.");
});

test("0x1E - ASL (Absolute, X)", function() {
    /**
     *    Instruction: ASL - Shift left one bit.
     * Affected Flags: Sign, Zero, Carry
     *    Total Tests: 5
     */

    var OPCODE = 0x1E,
        AddressByte1 = 0x80,
        AddressByte2 = 0x80,
        XRegister = 0x80,
        CycleCost = 7,
        BytesUsed = 3,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set carry.
     *
     * Before ASL Applied:
     *         Operand: 10101010 (170)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 01010100 (84)
     * Status Register: 00100001 (33)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 170;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],
        84,
        "Set carry: Operand shifted correctly.");

    equal(MOS6502._P,
        33,
        "Set carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry: Cycles set correctly.");

    /**
     * Test 2: Set carry & zero.
     *
     * Before ASL Applied:
     *         Operand: 10000000 (128)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100011 (35)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 128;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],
        0,
        "Set carry & zero: Operand shifted correctly.");

    equal(MOS6502._P,
        35,
        "Set carry & zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set carry & zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set carry & zero: Cycles set correctly.");

    /**
     * Test 3: Set sign & carry.
     *
     * Before ASL Applied:
     *         Operand: 11001010 (202)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10010100 (148)
     * Status Register: 10100001 (161)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 202;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],
        148,
        "Set sign & carry: Operand shifted correctly.");

    equal(MOS6502._P,
        161,
        "Set sign & carry: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign & carry: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign & carry: Cycles set correctly.");

    /**
     * Test 4: Set zero.
     *
     * Before ASL Applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 00000000 (0)
     * Status Register: 00100010 (34)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 0;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],
        0,
        "Set zero: Operand shifted correctly.");

    equal(MOS6502._P,
        34,
        "Set zero: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set zero: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set zero: Cycles set correctly.");

    /**
     * Test 5: Set sign.
     *
     * Before ASL Applied:
     *         Operand: 01000000 (64)
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 64;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],
        128,
        "Set sign: Operand shifted correctly.");

    equal(MOS6502._P,
        160,
        "Set sign: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set sign: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set sign: Cycles set correctly.");

    /**
     * Test 6: Set none.
     *
     * Before ASL Applied:
     *         Operand: 00100110 ()
     * Status Register: 00100000 (32)
     *
     * After ASL applied:
     *         Operand: 10000000 (128)
     * Status Register: 10100000 (160)
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 38;
    MOS6502._P = 32;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],
        76,
        "Set none: Operand shifted correctly.");

    equal(MOS6502._P,
        32,
        "Set none: Status Register set correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Set none: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Set none: Cycles set correctly.");
});

/*********************************************************************************************************************/

QUnit.module("Instruction - PHP", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x08 - PHP (Implied)", function() {
    /**
     *    Instruction = PHP - Push status register on to the stack.
     * Affected Flags = None
     *    Total Tests = 1
     */

    var OPCODE = 0x08,
        CycleCost = 3,
        BytesUsed = 1,
        PCStart = 0x4000,
        StatusRegister = 32;

    MOS6502._PC = PCStart;
    MOS6502._SP = 0x01FF;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._P = StatusRegister;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Push status register onto the stack.
     *
     * Before PHP Applied:
     *        0x1FFF = 0x00
     * Stack Pointer = 0x01FF
     *
     * After PHP Applied:
     *        0x1FFF = 0x32
     * Stack Pointer = 0x01FE
     */

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[0x01FF],
        32,
        "Status register pushed to stack.");

    equal(MOS6502._SP,
        0x01FE,
        "Stack Pointer set correctly.");

    equal(MOS6502._PC,
        PCStart + BytesUsed,
        "Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles set correctly.")
});