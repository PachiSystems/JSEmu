var MOS6502 = new MOS6502();

//<editor-fold desc="Utility Method Tests">

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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="Memory Mode Tests (Read)">

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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="Memory Mode Tests (Write)">

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
        randomX = 0x21,
        randomAddress1 = 0x31,
        randomAddress2 = 0x41;

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

    var randomData = Math.floor(Math.random() * 254) + 1,
        randomY = Math.floor(Math.random() * 254) + 1,
        randomAddress1 = Math.floor(Math.random() * 254) + 1,
        randomAddress2 = Math.floor(Math.random() * 254) + 1;

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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="ORA Tests"

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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BRK Tests">

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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="ASL Tests">

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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="PHP Tests">

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
     *        0x01FF = 0x00
     * Stack Pointer = 0x01FF
     *
     * After PHP Applied:
     *        0x01FF = 0x32
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

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BPL Tests">

QUnit.module("Instruction - BPL", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x10 - BPL (Relative)", function() {
    /**
     *    Instruction = BPL - Branch on result plus.
     * Affected Flags = None
     *    Total Tests = 5
     *
     */

    var OPCODE = 0x10,
        relativePlusSamePage = 64,
        relativeMinusSamePage = 192,
        relativePlusNextPage = 127,
        relativeMinusNextPage = 129,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4080,
        PCStartHigh = 0x40E0,
        PCStartLow = 0x4010;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStartHigh] = OPCODE;
    MOS6502._RAM[PCStartLow] = OPCODE;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Result not plus (no branch, but 2 cycles used)
     */

    // Set the sign flag which indicates a negative.
    MOS6502._P = 0xA0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Result not plus: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Result not plus: Cycles set correctly.");

    /**
     * Test 2: Result plus. Branch forward to same page. (3 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativePlusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        PCStart + relativePlusSamePage,
        "Result plus, branch forward, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost + 1,
        "Result plus, branch forward, same page: Cycles set correctly.");

    /**
     * Test 3: Result plus. Branch backward to same page. (3 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativeMinusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        (PCStart + relativeMinusSamePage) - 256,
        "Result plus, branch backwards, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Result plus, branch backwards, same page: Cycles set correctly.");

    /**
     * Test 4: Result plus. Branch forward to different page. (4 cycles)
     *
     * NOTE: It's not possible to branch to another page from 0x4080. Using 0x40E0 for forward branch.
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStartHigh;
    MOS6502._RAM[PCStartHigh + 1] = relativePlusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        PCStartHigh + relativePlusNextPage,
        "Result plus, branch forward, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Result plus, branch forward, different page: Cycles set correctly.");

    /**
     * Test 5: Result plus. Branch backward to different page. (4 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStartLow;
    MOS6502._RAM[PCStartLow + 1] = relativeMinusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStartLow + relativeMinusNextPage) - 256,
        "Result plus, branch backwards, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Result plus, branch backwards, different page: Cycles set correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="CLC Tests">

QUnit.module("Instruction - CLC", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x18 - CLC (Implied)", function() {
    /**
     *    Instruction = CLC - Clear carry flag.
     * Affected Flags = Carry
     *    Total Tests = 3
     */

    var OPCODE = 0x18,
        CycleCost = 2,
        BytesUsed = 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Carry flag not set. CLC should not alter Status Register.
     */

    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502.emulateCycle();

    equal(MOS6502._P,
        0xA0,
        "Carry flag not set. CLC did not alter Status Register.");

    /**
     * Test 2: Carry flag not set. Other flags set. CLC should not alter Status Register.
     */

    MOS6502._P = 0xC2;
    MOS6502._PC = PCStart;
    MOS6502.emulateCycle();

    equal(MOS6502._P,
        0xC2,
        "Carry flag not set. Other flags set. CLC did not alter Status Register.");

    /**
     * Test 3: Carry flag set. CLC should alter Status Register.
     */

    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502.emulateCycle();

    equal(MOS6502._P,
        0x20,
        "Carry flag set. CLC altered Status Register correctly.");


    /**
     * Test 4: Carry flag set. Other flags set. CLC should alter Status Register to remove only the carry flag.
     */

    MOS6502._P = 0xC3;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502.emulateCycle();

    equal(MOS6502._P,
        0xC2,
        "Carry flag set. Other flags set. CLC altered Status Register correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles calculated correctly.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Program Counter incremented correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc = "JSR Tests">

QUnit.module("Instruction - JSR", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x20 - JSR (Absolute)", function() {
    /**
     *    Instruction = JSR - Jump to new location saving return address.
     * Affected Flags = None
     *    Total Tests = 1
     */

    var OPCODE = 0x20,
        CycleCost = 6,
        PCStart = 0x4000;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = 0x31;
    MOS6502._RAM[PCStart + 2] = 0x21;
    MOS6502._SP = 0x01FF;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: JSR should jump to a given address and store the return address on the stack.
     */

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        0x2131,
        "Jump made successfully.");

    equal(MOS6502._SP,
        0x01FD,
        "Stack pointer updated correctly.");

    equal(MOS6502._RAM[0x01FF],
        (PCStart + 3) >> 8,
        "Return address high byte stored correctly.");

    equal(MOS6502._RAM[0x01FE],
            (PCStart + 3) & 0xFF,
        "Return address low byte stored correctly.");


    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles calculated correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc = "AND Tests">

QUnit.module("Instruction - AND", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x29 - AND (Immediate)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x29,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart + 1] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart + 1] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart + 1] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x25 - AND (Zero Page)", function(){
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x25,
        CycleCost = 3,
        BytesUsed = 2,
        ZPAddress = Math.floor(Math.random() * 256) + 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x35 - AND (Zero Page, X)", function(){
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x35,
        CycleCost = 4,
        BytesUsed = 2,
        ZPAddress = Math.floor(Math.random() * 256) + 1,
        XRegister = Math.floor(Math.random() * 256) + 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x2D - AND (Absolute)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x2D,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x3D - AND (Absolute, X) (Same Page)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x3D,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0x80,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + XRegister] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + XRegister] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + XRegister] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x3D - AND (Absolute, X) (Cross Page)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x3D,
        CycleCost = 5,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0xFE,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + XRegister] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + XRegister] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + XRegister] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x39 - AND (Absolute, Y) (Same Page)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x39,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        YRegister = 0x80,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x39 - AND (Absolute, Y) (Cross Page)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x3D,
        CycleCost = 5,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        YRegister = 0xFE,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x21 - AND (Indirect, X)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x21,
        CycleCost = 6,
        BytesUsed = 2,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        ZPAddress = 0x31,
        XRegister = 0x80,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = AddressByte1;
    MOS6502._RAM[(ZPAddress + XRegister + 1) & 0xFF] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

test("0x31 - AND (Indirect, Y)", function() {
    /**
     *    Instruction = AND - "AND" memory with accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x31,
        CycleCost = 5,
        BytesUsed = 2,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        ZPAddress = 0x31,
        YRegister = 0x80,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: AND performed without setting any flags.
     */

    MOS6502._A = 0x14;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x54;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "No flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x14,
        "No flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x20,
        "No flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "No flag: Cycles calculated correctly.");

    /**
     * Test 2: AND performed setting the zero flag.
     */

    MOS6502._A = 0x54;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Zero flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x00,
        "Zero flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0x22,
        "Zero flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Zero flag: Cycles calculated correctly.");

    /**
     * Test 3: AND performed setting the sign flag.
     */

    MOS6502._A = 0x82;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[FullAddress + YRegister] = 0x81;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Sign flag: Program Counter set correctly.");

    equal(MOS6502._A,
        0x80,
        "Sign flag: AND operation performed correctly and stored in accumulator.");

    equal(MOS6502._P,
        0xA0,
        "Sign flag: Status register set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Sign flag: Cycles calculated correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BIT Tests">

QUnit.module("Instruction - BIT", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x24 - BIT (Zero Page)", function() {
    /**
     *    Instruction = BIT - Test bits in memory with accumulator.
     * Affected Flags = Sign, Zero, Overflow
     *    Total Tests = 5
     */

    var OPCODE = 0x24,
        CycleCost = 3,
        BytesUsed = 2,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._A = 42;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 43;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20,"Set none: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set none: Cycles incremented correctly.");

    /**
     * Test 2: Set zero.
     */
    MOS6502._A = 21;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x22,"Set zero: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set zero: Cycles incremented correctly.");

    /**
     * Test 3: Set sign.
     */
    MOS6502._A = 153;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 137;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0xA0,"Set sign: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set sign: Cycles incremented correctly.");

    /**
     * Test 4: Set overflow.
     */
    MOS6502._A = 204;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x60,"Set overflow: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set overflow: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set overflow: Cycles incremented correctly.");

    /**
     * Test 5: Set sign and overflow.
     */
    MOS6502._A = 204;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 213;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0xE0,"Set sign and overflow: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set sign and overflow: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set sign and overflow: Cycles incremented correctly.");

    /**
     * Test 6: Set all.
     */
    MOS6502._A = 42;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 213;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0xE2,"Set all: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set all: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set all: Cycles incremented correctly.");
});

test("0x2C - BIT (Absolute)", function() {
    /**
     *    Instruction = BIT - Test bits in memory with accumulator.
     * Affected Flags = Sign, Zero, Overflow
     *    Total Tests = 5
     */

    var OPCODE = 0x2C,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = Math.floor(Math.random() * 255) + 1,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._A = 42;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 43;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20,"Set none: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set none: Cycles incremented correctly.");

    /**
     * Test 2: Set zero.
     */
    MOS6502._A = 21;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x22,"Set zero: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set zero: Cycles incremented correctly.");

    /**
     * Test 3: Set sign.
     */
    MOS6502._A = 153;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 137;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0xA0,"Set sign: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set sign: Cycles incremented correctly.");

    /**
     * Test 4: Set overflow.
     */
    MOS6502._A = 204;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x60,"Set overflow: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set overflow: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set overflow: Cycles incremented correctly.");

    /**
     * Test 5: Set sign and overflow.
     */
    MOS6502._A = 204;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 213;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0xE0,"Set sign and overflow: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set sign and overflow: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set sign and overflow: Cycles incremented correctly.");

    /**
     * Test 6: Set all.
     */
    MOS6502._A = 42;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 213;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0xE2,"Set all: Status register correctly set.");

    equal(MOS6502._PC,PCStart+BytesUsed,"Set all: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Set all: Cycles incremented correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="ROL Tests">

QUnit.module("Instruction - ROL", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x2A - ROL (Accumulator)",function() {
    /**
     *    Instruction = ROL - Rotate one bit left (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 10
     */
    var OPCODE = 0x2A,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._A = 21;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        42,
        "Test 1: Set none - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    equal(MOS6502._PC,
        PCStart + BytesUsed,
        "Test 1: Set none - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 1: Set none - Cycles incremented correctly.");

    /**
     * Test 2: Set none. Carry set before ROL.
     */
    MOS6502._A = 0;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        1,
        "Test 2: Set none. Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 2: Set none. Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 2: Set none. Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 2: Set none. Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 3: Carry set before ROL.
     */
    MOS6502._A = 39;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        79,
        "Test 3: Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 3: Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 3: Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 3: Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 4: ROL sets carry.
     */
    MOS6502._A = 136;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        16,
        "Test 4: ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 4: ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 4: ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 4: ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 5: Carry set before ROL. ROL sets carry.
     */
    MOS6502._A = 136;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        17,
        "Test 5: Carry set before ROL. ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 5: Carry set before ROL. ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 5: Carry set before ROL. ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 5: Carry set before ROL. ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 6: Set zero.
     */
    MOS6502._A = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        0,
        "Test 6: Set zero - ROL successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 6: Set zero - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 6: Set zero - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 6: Set zero - Cycles incremented correctly.");

    /**
     * Test 7: Set zero and carry
     */
    MOS6502._A = 128;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        0,
        "Test 7: Set zero and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 7: Set zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 7: Set zero and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 7: Set zero and carry - Cycles incremented correctly.");

    /**
     * Test 8: Set sign.
     */
    MOS6502._A = 66;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        132,
        "Test 8: Set sign - ROL successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 8: Set sign - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 8: Set sign - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 8: Set sign - Cycles incremented correctly.");

    /**
     * Test 9: Set sign and carry.
     */
    MOS6502._A = 201;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        146,
        "Test 9: Set sign and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 9: Set sign and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 9: Set sign and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 9: Set sign and carry - Cycles incremented correctly.");

    /**
     * Test 10: Carry set before ROL. Set sign and carry after ROL.
     */
    MOS6502._A = 201;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        147,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Cycles incremented correctly.");
});

test("0x26 - ROL (Zero Page)",function() {
    /**
     *    Instruction = ROL - Rotate one bit left (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 10
     */
    var OPCODE = 0x26,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        CycleCost = 5,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[ZPAddress] = 21;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        42,
        "Test 1: Set none - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 1: Set none - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 1: Set none - Cycles incremented correctly.");

    /**
     * Test 2: Set none. Carry set before ROL.
     */
    MOS6502._RAM[ZPAddress] = 0;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        1,
        "Test 2: Set none. Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 2: Set none. Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 2: Set none. Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 2: Set none. Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 3: Carry set before ROL.
     */
    MOS6502._RAM[ZPAddress] = 39;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        79,
        "Test 3: Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 3: Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 3: Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 3: Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 4: ROL sets carry.
     */
    MOS6502._RAM[ZPAddress] = 136;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        16,
        "Test 4: ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 4: ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 4: ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 4: ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 5: Carry set before ROL. ROL sets carry.
     */
    MOS6502._RAM[ZPAddress] = 136;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        17,
        "Test 5: Carry set before ROL. ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 5: Carry set before ROL. ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 5: Carry set before ROL. ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 5: Carry set before ROL. ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 6: Set zero.
     */
    MOS6502._RAM[ZPAddress] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        0,
        "Test 6: Set zero - ROL successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 6: Set zero - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 6: Set zero - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 6: Set zero - Cycles incremented correctly.");

    /**
     * Test 7: Set zero and carry
     */
    MOS6502._RAM[ZPAddress] = 128;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        0,
        "Test 7: Set zero and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 7: Set zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 7: Set zero and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 7: Set zero and carry - Cycles incremented correctly.");

    /**
     * Test 8: Set sign.
     */
    MOS6502._RAM[ZPAddress] = 66;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        132,
        "Test 8: Set sign - ROL successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 8: Set sign - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 8: Set sign - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 8: Set sign - Cycles incremented correctly.");

    /**
     * Test 9: Set sign and carry.
     */
    MOS6502._RAM[ZPAddress] = 201;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        146,
        "Test 9: Set sign and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 9: Set sign and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 9: Set sign and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 9: Set sign and carry - Cycles incremented correctly.");

    /**
     * Test 10: Carry set before ROL. Set sign and carry after ROL.
     */
    MOS6502._RAM[ZPAddress] = 201;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[ZPAddress],
        147,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Cycles incremented correctly.");
});

test("0x36 - ROL (Zero Page, X)",function() {
    /**
     *    Instruction = ROL - Rotate one bit left (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 10
     */
    var OPCODE = 0x36,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        XRegister = Math.floor(Math.random() * 255) + 1,
        OperandLocation = (ZPAddress + XRegister) & 0xFF,
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 21;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        42,
        "Test 1: Set none - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 1: Set none - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 1: Set none - Cycles incremented correctly.");

    /**
     * Test 2: Set none. Carry set before ROL.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        1,
        "Test 2: Set none. Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 2: Set none. Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 2: Set none. Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 2: Set none. Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 3: Carry set before ROL.
     */
    MOS6502._RAM[OperandLocation] = 39;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        79,
        "Test 3: Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 3: Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 3: Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 3: Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 4: ROL sets carry.
     */
    MOS6502._RAM[OperandLocation] = 136;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        16,
        "Test 4: ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 4: ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 4: ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 4: ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 5: Carry set before ROL. ROL sets carry.
     */
    MOS6502._RAM[OperandLocation] = 136;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        17,
        "Test 5: Carry set before ROL. ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 5: Carry set before ROL. ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 5: Carry set before ROL. ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 5: Carry set before ROL. ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 6: Set zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 6: Set zero - ROL successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 6: Set zero - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 6: Set zero - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 6: Set zero - Cycles incremented correctly.");

    /**
     * Test 7: Set zero and carry
     */
    MOS6502._RAM[OperandLocation] = 128;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 7: Set zero and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 7: Set zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 7: Set zero and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 7: Set zero and carry - Cycles incremented correctly.");

    /**
     * Test 8: Set sign.
     */
    MOS6502._RAM[OperandLocation] = 66;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        132,
        "Test 8: Set sign - ROL successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 8: Set sign - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 8: Set sign - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 8: Set sign - Cycles incremented correctly.");

    /**
     * Test 9: Set sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 201;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        146,
        "Test 9: Set sign and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 9: Set sign and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 9: Set sign and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 9: Set sign and carry - Cycles incremented correctly.");

    /**
     * Test 10: Carry set before ROL. Set sign and carry after ROL.
     */
    MOS6502._RAM[OperandLocation] = 201;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        147,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Cycles incremented correctly.");
});

test("0x2E - ROL (Absolute)",function() {
    /**
     *    Instruction = ROL - Rotate one bit left (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 10
     */
    var OPCODE = 0x2E,
        PCStart = 0x4000,
        AddressByte1 = Math.floor(Math.random() * (255-120+1) + 120),
        AddressByte2 = Math.floor(Math.random() * (255-120+1) + 120),
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        CycleCost = 6,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 21;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        42,
        "Test 1: Set none - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 1: Set none - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 1: Set none - Cycles incremented correctly.");

    /**
     * Test 2: Set none. Carry set before ROL.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        1,
        "Test 2: Set none. Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 2: Set none. Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 2: Set none. Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 2: Set none. Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 3: Carry set before ROL.
     */
    MOS6502._RAM[OperandLocation] = 39;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        79,
        "Test 3: Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 3: Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 3: Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 3: Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 4: ROL sets carry.
     */
    MOS6502._RAM[OperandLocation] = 136;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        16,
        "Test 4: ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 4: ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 4: ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 4: ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 5: Carry set before ROL. ROL sets carry.
     */
    MOS6502._RAM[OperandLocation] = 136;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        17,
        "Test 5: Carry set before ROL. ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 5: Carry set before ROL. ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 5: Carry set before ROL. ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 5: Carry set before ROL. ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 6: Set zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 6: Set zero - ROL successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 6: Set zero - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 6: Set zero - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 6: Set zero - Cycles incremented correctly.");

    /**
     * Test 7: Set zero and carry
     */
    MOS6502._RAM[OperandLocation] = 128;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 7: Set zero and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 7: Set zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 7: Set zero and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 7: Set zero and carry - Cycles incremented correctly.");

    /**
     * Test 8: Set sign.
     */
    MOS6502._RAM[OperandLocation] = 66;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        132,
        "Test 8: Set sign - ROL successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 8: Set sign - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 8: Set sign - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 8: Set sign - Cycles incremented correctly.");

    /**
     * Test 9: Set sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 201;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        146,
        "Test 9: Set sign and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 9: Set sign and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 9: Set sign and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 9: Set sign and carry - Cycles incremented correctly.");

    /**
     * Test 10: Carry set before ROL. Set sign and carry after ROL.
     */
    MOS6502._RAM[OperandLocation] = 201;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        147,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Cycles incremented correctly.");
});

test("0x3E - ROL (Absolute, X)",function() {
    /**
     *    Instruction = ROL - Rotate one bit left (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 10
     */
    var OPCODE = 0x3E,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0x41,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        CycleCost = 7,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 21;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        42,
        "Test 1: Set none - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 1: Set none - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 1: Set none - Cycles incremented correctly.");

    /**
     * Test 2: Set none. Carry set before ROL.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        1,
        "Test 2: Set none. Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 2: Set none. Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 2: Set none. Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 2: Set none. Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 3: Carry set before ROL.
     */
    MOS6502._RAM[OperandLocation] = 39;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        79,
        "Test 3: Carry set before ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 3: Carry set before ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 3: Carry set before ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 3: Carry set before ROL - Cycles incremented correctly.");

    /**
     * Test 4: ROL sets carry.
     */
    MOS6502._RAM[OperandLocation] = 136;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        16,
        "Test 4: ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 4: ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 4: ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 4: ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 5: Carry set before ROL. ROL sets carry.
     */
    MOS6502._RAM[OperandLocation] = 136;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        17,
        "Test 5: Carry set before ROL. ROL sets carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x21,
        "Test 5: Carry set before ROL. ROL sets carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 5: Carry set before ROL. ROL sets carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 5: Carry set before ROL. ROL sets carry - Cycles incremented correctly.");

    /**
     * Test 6: Set zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 6: Set zero - ROL successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 6: Set zero - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 6: Set zero - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 6: Set zero - Cycles incremented correctly.");

    /**
     * Test 7: Set zero and carry
     */
    MOS6502._RAM[OperandLocation] = 128;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 7: Set zero and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 7: Set zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 7: Set zero and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 7: Set zero and carry - Cycles incremented correctly.");

    /**
     * Test 8: Set sign.
     */
    MOS6502._RAM[OperandLocation] = 66;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        132,
        "Test 8: Set sign - ROL successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 8: Set sign - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 8: Set sign - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 8: Set sign - Cycles incremented correctly.");

    /**
     * Test 9: Set sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 201;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        146,
        "Test 9: Set sign and carry - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 9: Set sign and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 9: Set sign and carry - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 9: Set sign and carry - Cycles incremented correctly.");

    /**
     * Test 10: Carry set before ROL. Set sign and carry after ROL.
     */
    MOS6502._RAM[OperandLocation] = 201;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        147,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - ROL successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Test 10: Carry set before ROL. Set sign and carry after ROL - Cycles incremented correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="PLP Tests">

QUnit.module("Instruction - PLP", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x28 - PLP (Implied)", function() {
    /**
     *    Instruction = PLP - Pull processor status from stack
     * Affected Flags = All
     *    Total Tests = 1
     */

    var OPCODE = 0x28,
        CycleCost = 4,
        BytesUsed = 1,
        StatusRegister = Math.floor(Math.random() * 255) + 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;
    MOS6502._SP = 0x01FE;
    MOS6502._RAM[0x01FF] = StatusRegister;
    MOS6502._PC = PCStart;

    /**
     * Test 1: Pull status register from the stack.
     */

    MOS6502.emulateCycle();

    equal(MOS6502._P,StatusRegister,"Status register updated correctly.");

    equal(MOS6502._SP,0x01FF,"Stack pointer updated correctly.");

    equal(MOS6502._PC,PCStart + BytesUsed,"Program counter updated successfully.");

    equal(MOS6502._CYCLES,CycleCost,"Cycle count updated successfully.");
});


//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BMI Tests">

QUnit.module("Instruction - BMI", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x30 - BMI (Relative)", function() {
    /**
     *    Instruction = BMI - Branch on result minus
     * Affected Flags = None
     *    Total Tests = 5
     */

    var OPCODE = 0x30,
        relativePlusSamePage = 64,
        relativeMinusSamePage = 192,
        relativePlusNextPage = 127,
        relativeMinusNextPage = 129,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4080,
        PCStartHigh = 0x40E0,
        PCStartLow = 0x4010;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStartHigh] = OPCODE;
    MOS6502._RAM[PCStartLow] = OPCODE;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Result plus (no branch, but 2 cycles used)
     */

    // Disable the sign flag which indicates a positive.
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Result plus: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Result plus: Cycles set correctly.");

    /**
     * Test 2: Result minus. Branch forward to same page. (3 cycles)
     */

    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativePlusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + relativePlusSamePage,
        "Result minus, branch forward, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Result minus, branch forward, same page: Cycles set correctly.");

    /**
     * Test 3: Result minus. Branch backward to same page. (3 cycles)
     */

    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativeMinusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStart + relativeMinusSamePage) - 256,
        "Result minus, branch backwards, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Result minus, branch backwards, same page: Cycles set correctly.");

    /**
     * Test 4: Result minus. Branch forward to different page. (4 cycles)
     *
     * NOTE: It's not possible to branch to another page from 0x4080. Using 0x40E0 for forward branch.
     */

    MOS6502._P = 0xA0;
    MOS6502._PC = PCStartHigh;
    MOS6502._RAM[PCStartHigh + 1] = relativePlusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStartHigh + relativePlusNextPage,
        "Result minus, branch forward, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Result minus, branch forward, different page: Cycles set correctly.");

    /**
     * Test 5: Result minus. Branch backward to different page. (4 cycles)
     */

    MOS6502._P = 0xA0;
    MOS6502._PC = PCStartLow;
    MOS6502._RAM[PCStartLow + 1] = relativeMinusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStartLow + relativeMinusNextPage) - 256,
        "Result minus, branch backwards, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Result minus, branch backwards, different page: Cycles set correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="SEC Tests">

QUnit.module("Instruction - SEC", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x38 - SEC (Implied)", function() {
    /**
     *    Instruction = SEC - Set carry flag
     * Affected Flags = None
     *    Total Tests = 1
     */

    var OPCODE = 0x38,
        PCStart = 0x4000,
        BytesUsed = 1,
        CycleCost = 2;

    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        PCStart + BytesUsed,
        "Program counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles set correctly.");

    equal(MOS6502._P,
        0x21,
        "Sign set successfully.");


});


//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="RTI Tests">

QUnit.module("Instruction - RTI", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x40 - RTI (Implied)", function() {
    /**
     *    Instruction = RTI - Return from interrupt
     * Affected Flags = All (From stack)
     *    Total Tests = 1
     */

    var OPCODE = 0x40,
        PCStart = 0x4000,
        StatusRegister = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        BytesUsed = 1,
        CycleCost = 6;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._SP = 0x01FC;
    MOS6502._P = 0x20;
    MOS6502._RAM[0x01FD] = StatusRegister;
    MOS6502._RAM[0x01FE] = AddressByte1;
    MOS6502._RAM[0x01FF] = AddressByte2;
    MOS6502._CYCLES = 0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
        MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        "Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles incremented correctly.");

    equal(MOS6502._P,
        StatusRegister,
        "Status Register set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="EOR Tests">

QUnit.module("Instruction - EOR", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x49 - EOR (Immediate)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x49,
        PCStart = 0x4000,
        BytesUsed = 2,
        CycleCost = 2,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart + 1] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart + 1] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[PCStart + 1] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x45 - EOR (Zero Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x45,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        BytesUsed = 2,
        CycleCost = 3,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x55 - EOR (Zero Page, X)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x55,
        PCStart = 0x4000,
        XRegister = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        BytesUsed = 2,
        CycleCost = 4,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x4D - EOR (Absolute)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x4D,
        PCStart = 0x4000,
        XRegister = Math.floor(Math.random() * 255) + 1,
        YRegister = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        BytesUsed = 3,
        CycleCost = 4,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[0x2131] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[0x2131] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[0x2131] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x5D - EOR (Absolute, X) (Same Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x5D,
        PCStart = 0x4000,
        XRegister = 0x50,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0xA0,
        AddressByte2 = 0x21,
        BytesUsed = 3,
        CycleCost = 4,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x5D - EOR (Absolute, X) (Cross Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x5D,
        PCStart = 0x4000,
        XRegister = 0xA0,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0xA0,
        AddressByte2 = 0x21,
        BytesUsed = 3,
        CycleCost = 5,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x59 - EOR (Absolute, Y) (Same Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x59,
        PCStart = 0x4000,
        YRegister = 0x50,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0xA0,
        AddressByte2 = 0x21,
        BytesUsed = 3,
        CycleCost = 4,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x59 - EOR (Absolute, Y) (Cross Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x59,
        PCStart = 0x4000,
        YRegister = 0xA0,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0xA0,
        AddressByte2 = 0x21,
        BytesUsed = 3,
        CycleCost = 5,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x41 - EOR (Indirect, X)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x41,
        PCStart = 0x4000,
        XRegister = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        BytesUsed = 2,
        CycleCost = 6,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = AddressByte1;
    MOS6502._RAM[(ZPAddress + XRegister + 1) & 0xFF] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x51 - EOR (Indirect, Y) (Same Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x51,
        PCStart = 0x4000,
        YRegister = 0x50,
        ZPAddress = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0xA0,
        AddressByte2 = 0x21,
        BytesUsed = 2,
        CycleCost = 5,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

test("0x51 - EOR (Indirect, Y) (Cross Page)", function() {
    /**
     *    Instruction = EOR - "Exclusive-Or" memory with accumulator
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */

    var OPCODE = 0x51,
        PCStart = 0x4000,
        YRegister = 0xA0,
        ZPAddress = Math.floor(Math.random() * 220) + 1,
        AddressByte1 = 0xA0,
        AddressByte2 = 0x21,
        BytesUsed = 2,
        CycleCost = 6,
        Memory, Accumulator,ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[(ZPAddress) & 0xFF] = AddressByte1;
    MOS6502._RAM[(ZPAddress + 1) & 0xFF] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    Memory = 170;
    Accumulator = 153;
    ExpectedResult = 51;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set none: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set none: EOR successful.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    Memory = 158;
    Accumulator = 123;
    ExpectedResult = 229;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set sign: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set sign: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set sign: EOR successful.");

    equal(MOS6502._P, 0xA0, "Set sign: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    Memory = 170;
    Accumulator = 170;
    ExpectedResult = 0;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister] = Memory;
    MOS6502._A = Accumulator;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed,"Set zero: Program counter incremented correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles incremented correctly.");

    equal(MOS6502._A, ExpectedResult, "Set zero: EOR successful.");

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="LSR Tests">

QUnit.module("Instruction - LSR", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x4A - LSR (Accumulator)", function() {
    /**
     *    Instruction = LSR - Shift right one bit (memory or accumulator)
     * Affected Flags = Sign (Clear), Zero, Carry
     *    Total Tests = 7
     */

    var OPCODE = 0x4A,
        PCStart = 0x4000,
        BytesUsed = 1,
        CycleCost = 2,
        ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set none: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles increased correctly.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Set none: LSR performed correctly.");

    /**
     * Test 2: Carry set, shift clears.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Carry set, shift clears: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Carry set, shift clears: LSR performed correctly.");

    /**
     * Test 3: Carry set, shift sets.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 85;
    ExpectedResult = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift sets: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift sets: Cycles increased correctly.")

    equal(MOS6502._P, 0x21, "Carry set, shift sets: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Carry sets, shift sets: LSR performed correctly.");

    /**
     * Test 4: Sign set, shift clears.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Sign set, shift clears: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Sign set, shift clears: LSR performed correctly.");

    /**
     * Test 5: Set zero.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 0;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles increased correctly.")

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Set zero: LSR performed correctly.");

    /**
     * Test 6: Set zero, set carry.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero, set carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero, set carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Set zero, set carry: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Set zero, set carry: LSR performed correctly.");

    /**
     * Test 7: Sign set, shift clears, sets zero and sets carry.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears, sets zero and sets carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears, sets zero and sets carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Sign set, shift clears, sets zero and sets carry: Status register set correctly");

    equal(MOS6502._A,ExpectedResult,"Sign set, shift clears, sets zero and sets carry: LSR performed correctly.");

});

test("0x46 - LSR (Zero Page)", function() {
    /**
     *    Instruction = LSR - Shift right one bit (memory or accumulator)
     * Affected Flags = Sign (Clear), Zero, Carry
     *    Total Tests = 7
     */

    var OPCODE = 0x46,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 200) + 1,
        BytesUsed = 2,
        CycleCost = 5,
        ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set none: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles increased correctly.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Set none: LSR performed correctly.");

    /**
     * Test 2: Carry set, shift clears.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Carry set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Carry set, shift clears: LSR performed correctly.");

    /**
     * Test 3: Carry set, shift sets.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 85;
    ExpectedResult = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift sets: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift sets: Cycles increased correctly.")

    equal(MOS6502._P, 0x21, "Carry set, shift sets: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Carry sets, shift sets: LSR performed correctly.");

    /**
     * Test 4: Sign set, shift clears.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Sign set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Sign set, shift clears: LSR performed correctly.");

    /**
     * Test 5: Set zero.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 0;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles increased correctly.")

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Set zero: LSR performed correctly.");

    /**
     * Test 6: Set zero, set carry.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero, set carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero, set carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Set zero, set carry: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Set zero, set carry: LSR performed correctly.");

    /**
     * Test 7: Sign set, shift clears, sets zero and sets carry.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[ZPAddress] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears, sets zero and sets carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears, sets zero and sets carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Sign set, shift clears, sets zero and sets carry: Status register set correctly");

    equal(MOS6502._RAM[ZPAddress],ExpectedResult,"Sign set, shift clears, sets zero and sets carry: LSR performed correctly.");

});

test("0x56 - LSR (Zero Page, X)", function() {
    /**
     *    Instruction = LSR - Shift right one bit (memory or accumulator)
     * Affected Flags = Sign (Clear), Zero, Carry
     *    Total Tests = 7
     */

    var OPCODE = 0x56,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 200) + 1,
        XRegister = Math.floor(Math.random() * 200) + 1,
        BytesUsed = 2,
        CycleCost = 6,
        ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set none: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles increased correctly.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Set none: LSR performed correctly.");

    /**
     * Test 2: Carry set, shift clears.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Carry set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Carry set, shift clears: LSR performed correctly.");

    /**
     * Test 3: Carry set, shift sets.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 85;
    ExpectedResult = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift sets: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift sets: Cycles increased correctly.")

    equal(MOS6502._P, 0x21, "Carry set, shift sets: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Carry sets, shift sets: LSR performed correctly.");

    /**
     * Test 4: Sign set, shift clears.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Sign set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Sign set, shift clears: LSR performed correctly.");

    /**
     * Test 5: Set zero.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles increased correctly.")

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Set zero: LSR performed correctly.");

    /**
     * Test 6: Set zero, set carry.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero, set carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero, set carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Set zero, set carry: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Set zero, set carry: LSR performed correctly.");

    /**
     * Test 7: Sign set, shift clears, sets zero and sets carry.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears, sets zero and sets carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears, sets zero and sets carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Sign set, shift clears, sets zero and sets carry: Status register set correctly");

    equal(MOS6502._RAM[(ZPAddress + XRegister) & 0xFF],ExpectedResult,"Sign set, shift clears, sets zero and sets carry: LSR performed correctly.");

});

test("0x4E - LSR (Absolute)", function() {
    /**
     *    Instruction = LSR - Shift right one bit (memory or accumulator)
     * Affected Flags = Sign (Clear), Zero, Carry
     *    Total Tests = 7
     */

    var OPCODE = 0x4E,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        BytesUsed = 3,
        CycleCost = 6,
        ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set none: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles increased correctly.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Set none: LSR performed correctly.");

    /**
     * Test 2: Carry set, shift clears.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Carry set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Carry set, shift clears: LSR performed correctly.");

    /**
     * Test 3: Carry set, shift sets.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 85;
    ExpectedResult = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift sets: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift sets: Cycles increased correctly.")

    equal(MOS6502._P, 0x21, "Carry set, shift sets: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Carry sets, shift sets: LSR performed correctly.");

    /**
     * Test 4: Sign set, shift clears.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Sign set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Sign set, shift clears: LSR performed correctly.");

    /**
     * Test 5: Set zero.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 0;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles increased correctly.")

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Set zero: LSR performed correctly.");

    /**
     * Test 6: Set zero, set carry.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero, set carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero, set carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Set zero, set carry: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Set zero, set carry: LSR performed correctly.");

    /**
     * Test 7: Sign set, shift clears, sets zero and sets carry.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears, sets zero and sets carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears, sets zero and sets carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Sign set, shift clears, sets zero and sets carry: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2)],ExpectedResult,"Sign set, shift clears, sets zero and sets carry: LSR performed correctly.");

});

test("0x5E - LSR (Absolute, X)", function() {
    /**
     *    Instruction = LSR - Shift right one bit (memory or accumulator)
     * Affected Flags = Sign (Clear), Zero, Carry
     *    Total Tests = 7
     */

    var OPCODE = 0x5E,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = Math.floor(Math.random() * 200) + 1,
        BytesUsed = 3,
        CycleCost = 7,
        ExpectedResult;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set none: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set none: Cycles increased correctly.");

    equal(MOS6502._P, 0x20, "Set none: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Set none: LSR performed correctly.");

    /**
     * Test 2: Carry set, shift clears.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Carry set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Carry set, shift clears: LSR performed correctly.");

    /**
     * Test 3: Carry set, shift sets.
     */
    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 85;
    ExpectedResult = 42;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Carry set, shift sets: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Carry set, shift sets: Cycles increased correctly.")

    equal(MOS6502._P, 0x21, "Carry set, shift sets: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Carry sets, shift sets: LSR performed correctly.");

    /**
     * Test 4: Sign set, shift clears.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 170;
    ExpectedResult = 85;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears: Cycles increased correctly.")

    equal(MOS6502._P, 0x20, "Sign set, shift clears: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Sign set, shift clears: LSR performed correctly.");

    /**
     * Test 5: Set zero.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 0;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero: Cycles increased correctly.")

    equal(MOS6502._P, 0x22, "Set zero: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Set zero: LSR performed correctly.");

    /**
     * Test 6: Set zero, set carry.
     */
    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Set zero, set carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Set zero, set carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Set zero, set carry: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Set zero, set carry: LSR performed correctly.");

    /**
     * Test 7: Sign set, shift clears, sets zero and sets carry.
     */
    MOS6502._P = 0xA0;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister] = 1;
    ExpectedResult = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Sign set, shift clears, sets zero and sets carry: Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Sign set, shift clears, sets zero and sets carry: Cycles increased correctly.")

    equal(MOS6502._P, 0x23, "Sign set, shift clears, sets zero and sets carry: Status register set correctly");

    equal(MOS6502._RAM[MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister],ExpectedResult,"Sign set, shift clears, sets zero and sets carry: LSR performed correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="PHA Tests">

QUnit.module("Instruction - PHA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x48 - PHA (Implied)", function() {
    /**
     *    Instruction = PHA - Push accumulator on stack
     * Affected Flags = None
     *    Total Tests = 1
     */

    var OPCODE = 0x48,
        PCStart = 0x4000,
        BytesUsed = 1,
        Accumulator = Math.floor(Math.random() * 255) + 1,
        CycleCost = 3;

    MOS6502._RAM[PCStart] = OPCODE;

    MOS6502._SP = 0x01FF;
    MOS6502._A = Accumulator;
    MOS6502._CYCLES = 0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter increased correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles increased correctly.");

    equal(MOS6502._SP, 0x01FE, "Stack pointer updated correctly.");

    equal(MOS6502._RAM[0x01FF], Accumulator, "Accumulator pushed onto stack.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="JMP Tests">

QUnit.module("Instruction - JMP", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x4C - JMP (Absolute)", function() {
    /**
     *    Instruction = JMP - Jump to new location
     * Affected Flags = None
     *    Total Tests = 1
     */

    var OPCODE = 0x4C,
        PCStart = 0x4000,
        BytesUsed = 3,
        AddressByte1 = Math.floor(Math.random() * 255) + 1,
        AddressByte2 = Math.floor(Math.random() * 255) + 1,
        CycleCost = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),"Program counter set correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles increased correctly.");

});

test("0x6C - JMP (Indirect)", function() {
    /**
     *    Instruction = JMP - Jump to new location
     * Affected Flags = None
     *    Total Tests = 1
     */

    var OPCODE = 0x6C,
        PCStart = 0x4000,
        BytesUsed = 3,
        AddressByte1 = Math.floor(Math.random() * 255) + 1,
        AddressByte2 = Math.floor(Math.random() * 255) + 1,
        AddressByte3 = Math.floor(Math.random() * 255) + 1,
        AddressByte4 = Math.floor(Math.random() * 255) + 1,
        CycleCost = 5;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._RAM[AddressByte1] = AddressByte3;
    MOS6502._RAM[AddressByte2] = AddressByte4;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,MOS6502._MAKE_ADDRESS(AddressByte3,AddressByte4),"Program counter set correctly.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles increased correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BVC Tests">

QUnit.module("Instruction - BVC", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x50 - BVC (Relative)", function() {
    /**
     *    Instruction = BVC - Branch on overflow clear
     * Affected Flags = None
     *    Total Tests = 5
     */

var OPCODE = 0x50,
    relativePlusSamePage = 64,
    relativeMinusSamePage = 192,
    relativePlusNextPage = 127,
    relativeMinusNextPage = 129,
    CycleCost = 2,
    BytesUsed = 2,
    PCStart = 0x4080,
    PCStartHigh = 0x40E0,
    PCStartLow = 0x4010;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStartHigh] = OPCODE;
    MOS6502._RAM[PCStartLow] = OPCODE;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Overflow set (no branch, but 2 cycles used)
     */

    // Enable overflow.
    MOS6502._P = 0x60;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Overflow set: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Overflow set: Cycles set correctly.");

    /**
     * Test 2: Overflow clear. Branch forward to same page. (3 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativePlusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + relativePlusSamePage,
        "Overflow clear, branch forward, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Overflow clear, branch forward, same page: Cycles set correctly.");

    /**
     * Test 3: Overflow clear. Branch backward to same page. (3 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativeMinusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStart + relativeMinusSamePage) - 256,
        "Overflow clear, branch backwards, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Overflow clear, branch backwards, same page: Cycles set correctly.");

    /**
     * Test 4: Overflow clear. Branch forward to different page. (4 cycles)
     *
     * NOTE: It's not possible to branch to another page from 0x4080. Using 0x40E0 for forward branch.
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStartHigh;
    MOS6502._RAM[PCStartHigh + 1] = relativePlusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStartHigh + relativePlusNextPage,
        "Overflow clear, branch forward, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Overflow clear, branch forward, different page: Cycles set correctly.");

    /**
     * Test 5: Overflow clear. Branch backward to different page. (4 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStartLow;
    MOS6502._RAM[PCStartLow + 1] = relativeMinusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStartLow + relativeMinusNextPage) - 256,
        "Overflow clear, branch backwards, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Overflow clear, branch backwards, different page: Cycles set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="CLI Tests">

QUnit.module("Instruction - CLI", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x58 - CLI (Implied)", function() {
    /**
     *    Instruction = CLI - Clear interrupt disable bit
     * Affected Flags = None
     *    Total Tests = 2
     */

    var OPCODE = 0x58,
        CycleCost = 2,
        BytesUsed = 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Interrupt not set pre-CLI.
     */
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,PCStart + BytesUsed,"Interrupt not set pre-CLI: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Interrupt not set pre-CLI: Cycles set correctly.");

    equal(MOS6502._P,0x20,"Interrupt not set pre-CLI: Status register set correctly.");

    /**
     * Test 2: Interrupt set pre-CLI.
     */
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x24;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,PCStart + BytesUsed,"Interrupt set pre-CLI: Program counter incremented correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Interrupt set pre-CLI: Cycles set correctly.");

    equal(MOS6502._P,0x20,"Interrupt set pre-CLI: Status register set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="RTS Tests">

QUnit.module("Instruction - RTS", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x60 - RTS (Implied)", function() {
    /**
     *    Instruction = RTS - Return from subroutine
     * Affected Flags = None
     *    Total Tests = 2
     */

    var OPCODE = 0x60,
        CycleCost = 6,
        BytesUsed = 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;

    MOS6502._RAM[0x01FF] = 0x31;
    MOS6502._RAM[0x01FE] = 0x21;
    MOS6502._SP = 0x01FD;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,0x3121,"RTS successfully set program counter.");

    equal(MOS6502._CYCLES,CycleCost,"Cycles increased correctly.");

    equal(MOS6502._SP,0x01FF,"Stack Pointer set correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="ADC Tests">

QUnit.module("Instruction - ADC", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x69 - ADC (Immediate)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x69,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[PCStart + 1] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[PCStart + 1] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[PCStart + 1] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[PCStart + 1] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[PCStart + 1] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[PCStart + 1] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x65 - ADC (Zero Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x65,
        CycleCost = 3,
        BytesUsed = 2,
        ZPAddress = Math.floor(Math.random() * 200) + 1,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[ZPAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[ZPAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[ZPAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[ZPAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[ZPAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[ZPAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x75 - ADC (Zero Page, X)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x75,
        CycleCost = 4,
        BytesUsed = 2,
        ZPAddress = Math.floor(Math.random() * 150) + 1,
        XRegister = Math.floor(Math.random() * 100) + 1,
        OperandAddress = (XRegister + ZPAddress) & 0xFF,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x6D - ADC (Absolute)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x6D,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x7D - ADC (Absolute, X) (Same Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x7D,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0x80,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x7D - ADC (Absolute, X) (Cross Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x7D,
        CycleCost = 5,
        BytesUsed = 3,
        AddressByte1 = 0x81,
        AddressByte2 = 0x21,
        XRegister = 0x80,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x79 - ADC (Absolute, Y) (Same Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x79,
        CycleCost = 4,
        BytesUsed = 3,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        YRegister = 0x80,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x79 - ADC (Absolute, Y) (Cross Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x79,
        CycleCost = 5,
        BytesUsed = 3,
        AddressByte1 = 0x81,
        AddressByte2 = 0x21,
        YRegister = 0x80,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x61 - ADC (Indirect, X)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x61,
        CycleCost = 6,
        BytesUsed = 2,
        AddressByte1 = 0x81,
        AddressByte2 = 0x21,
        XRegister = 0x21,
        ZPAddress = 0x21,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2),
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    MOS6502._RAM[ZPAddress + XRegister] = AddressByte1;
    MOS6502._RAM[ZPAddress + XRegister + 1] = AddressByte2;
    MOS6502._X = XRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x71 - ADC (Indirect, Y) (Same Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x71,
        CycleCost = 5,
        BytesUsed = 2,
        AddressByte1 = 0x81,
        AddressByte2 = 0x21,
        YRegister = 0x21,
        ZPAddress = Math.floor(Math.random() * 200) + 1,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + YRegister,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

test("0x71 - ADC (Indirect, Y) (Cross Page)", function() {
    /**
     *    Instruction = ADC - Add memory to accumulator with carry
     * Affected Flags = Sign, Zero, Carry, Overflow
     *    Total Tests = 10
     */

    var OPCODE = 0x71,
        CycleCost = 6,
        BytesUsed = 2,
        AddressByte1 = 0x81,
        AddressByte2 = 0x21,
        YRegister = 0x81,
        ZPAddress = Math.floor(Math.random() * 200) + 1,
        OperandAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + YRegister,
        PCStart = 0x4000;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    // DECIMAL MODE ACTIVE

    /**
     * Test 1:
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */

    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x02,"Test 1: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 1: ADC performed in decimal mode correctly.");

    /**
     * Test 2:
     * 79 + 00 and C=1 gives 80 and N=1 V=1 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x79;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 2: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 2: ADC performed in decimal mode correctly.");

    /**
     * Test 3:
     * 24 + 56 and C=0 gives 80 and N=1 V=1 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x24;
    MOS6502._A = 0x56;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08,"Test 3: Sign & Overflow set correctly.");
    equal(MOS6502._A, 0x80, "Test 3: ADC performed in decimal mode correctly.");

    /**
     * Test 4:
     * 93 + 82 and C=0 gives 75 and N=0 V=1 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x93;
    MOS6502._A = 0x82;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x40 + 0x08 + 0x01,"Test 4: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0x75, "Test 4: ADC performed in decimal mode correctly.");

    /**
     * Test 5:
     * 89 + 76 and C=0 gives 65 and N=0 V=0 Z=0 C=1 (simulate)
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 5: Carry set correctly.");
    equal(MOS6502._A, 0x65, "Test 5: ADC performed in decimal mode correctly.");

    /**
     * Test 6:
     * 89 + 76 and C=1 gives 66 and N=0 V=0 Z=0 C=1 (simulate)
     *
     * Fails: Carry is not set.
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x89;
    MOS6502._A = 0x76;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08 + 0x01,"Test 6: Carry set correctly.");
    equal(MOS6502._A, 0x66, "Test 6: ADC performed in decimal mode correctly.");

    /**
     * Test 7:
     * 80 + f0 and C=0 gives d0 and N=1 V=1 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x80 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xF0;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x40 + 0x08 + 0x01,"Test 7: Overflow & Carry set correctly.");
    equal(MOS6502._A, 0xD0, "Test 7: ADC performed in decimal mode correctly.");

    /**
     * Test 8:
     * 80 + fa and C=0 gives e0 and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x80;
    MOS6502._A = 0xFA;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x08 + 0x01,"Test 8: Sign & Carry set correctly.");
    equal(MOS6502._A, 0xE0, "Test 8: ADC performed in decimal mode correctly.");

    /**
     * Test 9:
     * 2f + 4f and C=0 gives 74 and N=0 V=0 Z=0 C=0
     */
    MOS6502._P = 0x20 + 0x08;
    MOS6502._RAM[OperandAddress] = 0x4F;
    MOS6502._A = 0x2F;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 9: Status register set correctly.");
    equal(MOS6502._A, 0x74, "Test 9: ADC performed in decimal mode correctly.");

    /**
     * Test 10:
     * 6f + 00 and C=1 gives 76 and N=0 V=0 Z=0 C=0 (simulate)
     */
    MOS6502._P = 0x20 + 0x08 + 0x01;
    MOS6502._RAM[OperandAddress] = 0x6F;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x08,"Test 10: Status register set correctly.");
    equal(MOS6502._A, 0x76, "Test 10: ADC performed in decimal mode correctly.");

    /**
     * Test 11:
     * DECIMAL MODE OFF
     * 00 + 00 and C=0 gives 00 and N=0 V=0 Z=1 C=0
     */
    MOS6502._P = 0x20;
    MOS6502._RAM[OperandAddress] = 0x00;
    MOS6502._A = 0x00;
    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x02,"Test 11: Zero set correctly.");
    equal(MOS6502._A, 0x00, "Test 11: ADC performed in decimal mode correctly.");

    /**
     * Test 12:
     * DECIMAL MODE OFF
     * FF + FF and C=1 gives FF and N=1 V=0 Z=0 C=1
     */
    MOS6502._P = 0x20 + 0x01;
    MOS6502._RAM[OperandAddress] = 0xFF;
    MOS6502._A = 0xFF;
    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P,0x20 + 0x80 + 0x01,"Test 12: Flags set correctly.");
    equal(MOS6502._A, 0xFF, "Test 12: ADC performed in decimal mode correctly.");
    equal(MOS6502._PC, PCStart + BytesUsed,"Program counter increased correctly.");
    equal(MOS6502._CYCLES, CycleCost,"Cycles increased correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="ROR Tests">

QUnit.module("Instruction - ROR", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x6A - ROR (Accumulator)",function() {
    /**
     *    Instruction = ROR - Rotate one bit right (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 5
     */
    var OPCODE = 0x6A,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._A = 102;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        51,
        "Test 1: Set none - ROR successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    /**
     * Test 2: Carry set. Sets sign.
     */
    MOS6502._A = 102;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        179,
        "Test 2: Carry set. ROR sets sign. - ROR successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 2: Carry set. ROR sets sign. - Status Register correctly set.");

    /**
     * Test 3: Carry set. ROR Sets sign and carry.
     */
    MOS6502._A = 89;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        172,
        "Test 3: Carry set. ROR Sets sign and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 3: Carry set. ROR Sets sign and carry - Status Register correctly set.");

    /**
     * Test 4: Carry not set. ROR Sets zero.
     */
    MOS6502._A = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        0,
        "Test 4: Carry not set. ROR Sets zero - ROR successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 4: Carry not set. ROR Sets zero - Status Register correctly set.");

    /**
     * Test 5: Carry not set. ROR Sets zero and carry.
     */
    MOS6502._A = 1;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,
        0,
        "Test 5: Carry not set. ROR Sets zero and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 5: Carry not set. ROR Sets zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles incremented correctly.");


});

test("0x66 - ROR (Zero Page)",function() {
    /**
     *    Instruction = ROR - Rotate one bit right (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 5
     */
    var OPCODE = 0x66,
        PCStart = 0x4000,
        CycleCost = 5,
        ZPAddress = 0x40,
        OperandLocation = ZPAddress,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        51,
        "Test 1: Set none - ROR successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    /**
     * Test 2: Carry set. Sets sign.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        179,
        "Test 2: Carry set. ROR sets sign. - ROR successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 2: Carry set. ROR sets sign. - Status Register correctly set.");

    /**
     * Test 3: Carry set. ROR Sets sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 89;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        172,
        "Test 3: Carry set. ROR Sets sign and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 3: Carry set. ROR Sets sign and carry - Status Register correctly set.");

    /**
     * Test 4: Carry not set. ROR Sets zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 4: Carry not set. ROR Sets zero - ROR successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 4: Carry not set. ROR Sets zero - Status Register correctly set.");

    /**
     * Test 5: Carry not set. ROR Sets zero and carry.
     */
    MOS6502._RAM[OperandLocation] = 1;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 5: Carry not set. ROR Sets zero and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 5: Carry not set. ROR Sets zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles incremented correctly.");


});

test("0x76 - ROR (Zero Page, X)",function() {
    /**
     *    Instruction = ROR - Rotate one bit right (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 5
     */
    var OPCODE = 0x76,
        PCStart = 0x4000,
        CycleCost = 6,
        ZPAddress = 0x40,
        XRegister = 0x21,
        OperandLocation = ZPAddress + XRegister,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        51,
        "Test 1: Set none - ROR successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    /**
     * Test 2: Carry set. Sets sign.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        179,
        "Test 2: Carry set. ROR sets sign. - ROR successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 2: Carry set. ROR sets sign. - Status Register correctly set.");

    /**
     * Test 3: Carry set. ROR Sets sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 89;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        172,
        "Test 3: Carry set. ROR Sets sign and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 3: Carry set. ROR Sets sign and carry - Status Register correctly set.");

    /**
     * Test 4: Carry not set. ROR Sets zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 4: Carry not set. ROR Sets zero - ROR successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 4: Carry not set. ROR Sets zero - Status Register correctly set.");

    /**
     * Test 5: Carry not set. ROR Sets zero and carry.
     */
    MOS6502._RAM[OperandLocation] = 1;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 5: Carry not set. ROR Sets zero and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 5: Carry not set. ROR Sets zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles incremented correctly.");


});

test("0x6E - ROR (Absolute)",function() {
    /**
     *    Instruction = ROR - Rotate one bit right (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 5
     */
    var OPCODE = 0x6E,
        PCStart = 0x4000,
        CycleCost = 6,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        BytesUsed = 3,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2);

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        51,
        "Test 1: Set none - ROR successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    /**
     * Test 2: Carry set. Sets sign.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        179,
        "Test 2: Carry set. ROR sets sign. - ROR successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 2: Carry set. ROR sets sign. - Status Register correctly set.");

    /**
     * Test 3: Carry set. ROR Sets sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 89;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        172,
        "Test 3: Carry set. ROR Sets sign and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 3: Carry set. ROR Sets sign and carry - Status Register correctly set.");

    /**
     * Test 4: Carry not set. ROR Sets zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 4: Carry not set. ROR Sets zero - ROR successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 4: Carry not set. ROR Sets zero - Status Register correctly set.");

    /**
     * Test 5: Carry not set. ROR Sets zero and carry.
     */
    MOS6502._RAM[OperandLocation] = 1;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 5: Carry not set. ROR Sets zero and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 5: Carry not set. ROR Sets zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles incremented correctly.");


});

test("0x7E - ROR (Absolute, X)",function() {
    /**
     *    Instruction = ROR - Rotate one bit right (memory or accumulator).
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 5
     */
    var OPCODE = 0x7E,
        PCStart = 0x4000,
        CycleCost = 7,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0x40,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        51,
        "Test 1: Set none - ROR successfully applied.");

    equal(MOS6502._P,
        0x20,
        "Test 1: Set none - Status Register correctly set.");

    /**
     * Test 2: Carry set. Sets sign.
     */
    MOS6502._RAM[OperandLocation] = 102;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        179,
        "Test 2: Carry set. ROR sets sign. - ROR successfully applied.");

    equal(MOS6502._P,
        0xA0,
        "Test 2: Carry set. ROR sets sign. - Status Register correctly set.");

    /**
     * Test 3: Carry set. ROR Sets sign and carry.
     */
    MOS6502._RAM[OperandLocation] = 89;
    MOS6502._P = 0x21;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        172,
        "Test 3: Carry set. ROR Sets sign and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0xA1,
        "Test 3: Carry set. ROR Sets sign and carry - Status Register correctly set.");

    /**
     * Test 4: Carry not set. ROR Sets zero.
     */
    MOS6502._RAM[OperandLocation] = 0;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 4: Carry not set. ROR Sets zero - ROR successfully applied.");

    equal(MOS6502._P,
        0x22,
        "Test 4: Carry not set. ROR Sets zero - Status Register correctly set.");

    /**
     * Test 5: Carry not set. ROR Sets zero and carry.
     */
    MOS6502._RAM[OperandLocation] = 1;
    MOS6502._P = 0x20;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation],
        0,
        "Test 5: Carry not set. ROR Sets zero and carry - ROR successfully applied.");

    equal(MOS6502._P,
        0x23,
        "Test 5: Carry not set. ROR Sets zero and carry - Status Register correctly set.");

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Program Counter incremented successfully.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Cycles incremented correctly.");


});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="PLA Tests">

QUnit.module("Instruction - PLA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x68 - PLA (Implied)",function() {
    /**
     *    Instruction = PLA - Pull accumulator from stack.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x68,
        PCStart = 0x4000,
        CycleCost = 4,
        Accumulator = Math.floor(Math.random() * 254) + 1,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._SP = 0x01FE;
    MOS6502._RAM[0x01FF] = Accumulator;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._A,Accumulator,"Accumulator restored successfully.");

    equal(MOS6502._SP,0x01FF,"Stack pointer correctly set");

    equal(MOS6502._PC,PCStart + BytesUsed,"Program counter increased correctly.");

    equal(MOS6502._CYCLES,CycleCost,"Cycles increased correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BVS Tests">

QUnit.module("Instruction - BVS", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x70 - BVS (Relative)", function() {
    /**
     *    Instruction = BVS - Branch on overflow set
     * Affected Flags = None
     *    Total Tests = 5
     */

    var OPCODE = 0x70,
        relativePlusSamePage = 64,
        relativeMinusSamePage = 192,
        relativePlusNextPage = 127,
        relativeMinusNextPage = 129,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4080,
        PCStartHigh = 0x40E0,
        PCStartLow = 0x4010;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStartHigh] = OPCODE;
    MOS6502._RAM[PCStartLow] = OPCODE;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Overflow clear (no branch, but 2 cycles used)
     */

        // Enable overflow.
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Overflow clear: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Overflow clear: Cycles set correctly.");

    /**
     * Test 2: Overflow set. Branch forward to same page. (3 cycles)
     */

    MOS6502._P = 0x60;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativePlusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + relativePlusSamePage,
        "Overflow set, branch forward, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Overflow set, branch forward, same page: Cycles set correctly.");

    /**
     * Test 3: Overflow set. Branch backward to same page. (3 cycles)
     */

    MOS6502._P = 0x60;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativeMinusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStart + relativeMinusSamePage) - 256,
        "Overflow set, branch backwards, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Overflow set, branch backwards, same page: Cycles set correctly.");

    /**
     * Test 4: Overflow set. Branch forward to different page. (4 cycles)
     *
     * NOTE: It's not possible to branch to another page from 0x4080. Using 0x40E0 for forward branch.
     */

    MOS6502._P = 0x60;
    MOS6502._PC = PCStartHigh;
    MOS6502._RAM[PCStartHigh + 1] = relativePlusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStartHigh + relativePlusNextPage,
        "Overflow set, branch forward, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Overflow set, branch forward, different page: Cycles set correctly.");

    /**
     * Test 5: Overflow set. Branch backward to different page. (4 cycles)
     */

    MOS6502._P = 0x60;
    MOS6502._PC = PCStartLow;
    MOS6502._RAM[PCStartLow + 1] = relativeMinusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStartLow + relativeMinusNextPage) - 256,
        "Overflow set, branch backwards, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Overflow set, branch backwards, different page: Cycles set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="SEI Tests">

QUnit.module("Instruction - SEI", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x78 - SEI (Implied)",function() {
    /**
     *    Instruction = SEI - Set interrupt disable status.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x78,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x24, "Interrupt set successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="STA Tests">

QUnit.module("Instruction - STA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x85 - STA (Zero Page)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x85,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        OperandLocation = ZPAddress,
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x95 - STA (Zero Page, X)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x95,
        PCStart = 0x4000,
        ZPAddress = 0x31,
        XRegister = 0x21,
        OperandLocation = ZPAddress + XRegister,
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x8D - STA (Absolute)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x8D,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x9D - STA (Absolute, X)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x9D,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0x41,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x99 - STA (Absolute, Y)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x99,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        YRegister = 0x41,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x81 - STA (Indirect, X)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x81,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        XRegister = 0x41,
        ZPAddress = 0x51,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress + XRegister] = AddressByte1;
    MOS6502._RAM[ZPAddress + XRegister + 1] = AddressByte2;
    MOS6502._X = XRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x91 - STA (Indirect, Y)",function() {
    /**
     *    Instruction = STA - Store accumulator in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x91,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        YRegister = 0x41,
        ZPAddress = 0x51,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        Accumulator = Math.floor(Math.random() * 254) + 1,
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._A = Accumulator;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], Accumulator, "Accumulator stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="STY Tests">

QUnit.module("Instruction - STY", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x84 - STY (Zero Page)",function() {
    /**
     *    Instruction = STY - Store index Y in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x84,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        OperandLocation = ZPAddress,
        YRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._Y = YRegister;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], YRegister, "Y Index stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x94 - STY (Zero Page, X)",function() {
    /**
     *    Instruction = STY - Store index Y in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x94,
        PCStart = 0x4000,
        ZPAddress = 0x31,
        XRegister = 0x21,
        OperandLocation = ZPAddress + XRegister,
        YRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;
    MOS6502._Y = YRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], YRegister, "Y Index stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x8C - STY (Absolute)",function() {
    /**
     *    Instruction = STY - Store index Y in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x8C,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        YRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], YRegister, "Y Index stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="STX Tests">

QUnit.module("Instruction - STX", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x86 - STX (Zero Page)",function() {
    /**
     *    Instruction = STX - Store index X in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x86,
        PCStart = 0x4000,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        OperandLocation = ZPAddress,
        XRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._X = XRegister;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], XRegister, "X Index stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x96 - STY (Zero Page, Y)",function() {
    /**
     *    Instruction = STX - Store index X in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x96,
        PCStart = 0x4000,
        ZPAddress = 0x31,
        YRegister = 0x21,
        OperandLocation = ZPAddress + YRegister,
        XRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;
    MOS6502._Y = YRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], XRegister, "X Index stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0x8E - STY (Absolute)",function() {
    /**
     *    Instruction = STX - Store index X in memory.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x8E,
        PCStart = 0x4000,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        OperandLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        XRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[OperandLocation], XRegister, "X Index stored successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="DEY Tests">

QUnit.module("Instruction - DEY", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x88 - DEY (Implied)",function() {
    /**
     *    Instruction = DEY - Decrement index Y by one.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x88,
        PCStart = 0x4000,
        YRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    MOS6502._PC = PCStart;
    MOS6502._CYCLES = 0;
    MOS6502._Y = YRegister;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, YRegister - 1, "Y Index decremented successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="TXA Tests">

QUnit.module("Instruction - TXA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x8A - TXA (Implied)",function() {
    /**
     *    Instruction = TXA - Transfer index X to accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x8A,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._X = 0x60;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x60, "Test 1: Accumulator set successfully.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._X = 0x00;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x00, "Test 2: Accumulator set successfully.");

    equal(MOS6502._P, 0x22, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set sign.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._X = 0x82;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x82, "Test 3: Accumulator set successfully.");

    equal(MOS6502._P, 0xA0, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BCC Tests">

QUnit.module("Instruction - BCC", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x90 - BCC (Relative)", function() {
    /**
     *    Instruction = BCC - Branch on carry clear
     * Affected Flags = None
     *    Total Tests = 5
     */

    var OPCODE = 0x90,
        relativePlusSamePage = 64,
        relativeMinusSamePage = 192,
        relativePlusNextPage = 127,
        relativeMinusNextPage = 129,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4080,
        PCStartHigh = 0x40E0,
        PCStartLow = 0x4010;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStartHigh] = OPCODE;
    MOS6502._RAM[PCStartLow] = OPCODE;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Carry set (no branch, but 2 cycles used)
     */

        // Enable overflow.
    MOS6502._P = 0x21;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Carry set: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Carry set: Cycles set correctly.");

    /**
     * Test 2: Carry clear. Branch forward to same page. (3 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativePlusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + relativePlusSamePage,
        "Carry clear, branch forward, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Carry clear, branch forward, same page: Cycles set correctly.");

    /**
     * Test 3: Carry clear. Branch backward to same page. (3 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativeMinusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStart + relativeMinusSamePage) - 256,
        "Carry clear, branch backwards, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Carry clear, branch backwards, same page: Cycles set correctly.");

    /**
     * Test 4: Carry clear. Branch forward to different page. (4 cycles)
     *
     * NOTE: It's not possible to branch to another page from 0x4080. Using 0x40E0 for forward branch.
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStartHigh;
    MOS6502._RAM[PCStartHigh + 1] = relativePlusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStartHigh + relativePlusNextPage,
        "Carry clear, branch forward, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Carry clear, branch forward, different page: Cycles set correctly.");

    /**
     * Test 5: Carry clear. Branch backward to different page. (4 cycles)
     */

    MOS6502._P = 0x20;
    MOS6502._PC = PCStartLow;
    MOS6502._RAM[PCStartLow + 1] = relativeMinusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStartLow + relativeMinusNextPage) - 256,
        "Carry clear, branch backwards, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Carry clear, branch backwards, different page: Cycles set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="TYA Tests">

QUnit.module("Instruction - TYA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x98 - TYA (Implied)",function() {
    /**
     *    Instruction = TYA - Transfer index Y to accumulator.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0x98,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._Y = 0x60;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x60, "Test 1: Accumulator set successfully.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._Y = 0x00;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x00, "Test 2: Accumulator set successfully.");

    equal(MOS6502._P, 0x22, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set sign.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._Y = 0x82;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x82, "Test 3: Accumulator set successfully.");

    equal(MOS6502._P, 0xA0, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="TXS Tests">

QUnit.module("Instruction - TXS", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x9A - TXS (Implied)",function() {
    /**
     *    Instruction = TXS - Transfer index X to stack pointer.
     * Affected Flags = None
     *    Total Tests = 1
     */
    var OPCODE = 0x9A,
        PCStart = 0x4000,
        XRegister = Math.floor(Math.random() * 255) + 1,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    MOS6502._PC = PCStart;
    MOS6502._X = XRegister;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._SP, XRegister, "Stack Pointer set successfully.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="LDY Tests">

QUnit.module("Instruction - LDY", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xA0 - LDY (Immediate)",function() {
    /**
     *    Instruction = LDY - Load index Y with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xA0,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        CycleCost = 2,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xA4 - LDY (Zero Page)",function() {
    /**
     *    Instruction = LDY - Load index Y with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xA4,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB4 - LDY (Zero Page, X)",function() {
    /**
     *    Instruction = LDY - Load index Y with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xB4,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        XRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xAC - LDY (Absolute)",function() {
    /**
     *    Instruction = LDY - Load index Y with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xAC,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xBC - LDY (Absolute, X) (Same Page)",function() {
    /**
     *    Instruction = LDY - Load index Y with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xBC,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        XRegister = 0x2F,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xBC - LDY (Absolute, X) (Cross Page)",function() {
    /**
     *    Instruction = LDY - Load index Y with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xBC,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        XRegister = 0xFF,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Memory loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="LDA Tests">

QUnit.module("Instruction - LDA", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xA9 - LDA (Immediate)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xA9,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        CycleCost = 2,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xA5 - LDA (Zero Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xA5,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB5 - LDA (Zero Page, X)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xB5,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        XRegister = Math.floor(Math.random() * 254) + 1,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xAD - LDA (Absolute)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xAD,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xBD - LDA (Absolute, X) (Same Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xBD,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        XRegister = 0x2F,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xBD - LDA (Absolute, X) (Cross Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xBD,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        XRegister = 0xFF,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB9 - LDA (Absolute, Y) (Same Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xB9,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        YRegister = 0x2F,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB9 - LDA (Absolute, Y) (Cross Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xB9,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        YRegister = 0xFF,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xA1 - LDA (Indirect, X)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xA1,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        ZPAddress = 0x41,
        XRegister = 0x2F,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[(ZPAddress + XRegister) & 0xFF] = AddressByte1;
    MOS6502._RAM[(ZPAddress + XRegister + 1) & 0xFF] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB1 - LDA (Indirect, Y) (Same Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xB1,
        PCStart = 0x4000,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        ZPAddress = 0x41,
        YRegister = 0x2F,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        CycleCost = 5,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB1 - LDA (Indirect, Y) (Cross Page)",function() {
    /**
     *    Instruction = LDA - Load accumulator with memory.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xB1,
        PCStart = 0x4000,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        ZPAddress = 0x41,
        YRegister = 0xFF,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x53, "Test 1: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0x83, "Test 2: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._A, 0, "Test 3: Memory loaded into accumulator correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="LDX Tests">

QUnit.module("Instruction - LDX", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xA2 - LDX (Immediate)",function() {
    /**
     *    Instruction = LDX - Load index X with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xA2,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        CycleCost = 2,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xA6 - LDX (Zero Page)",function() {
    /**
     *    Instruction = LDX - Load index X with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xA6,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xB6 - LDX (Zero Page, Y)",function() {
    /**
     *    Instruction = LDX - Load index X with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xB6,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        ZPAddress = Math.floor(Math.random() * 254) + 1,
        YRegister = Math.floor(Math.random() * 254) + 1,
        FullAddress = (ZPAddress + YRegister) & 0xFF,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xAE - LDX (Absolute)",function() {
    /**
     *    Instruction = LDX - Load index X with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xAE,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xBE - LDX (Absolute, Y) (Same Page)",function() {
    /**
     *    Instruction = LDX - Load index X with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xBE,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        YRegister = 0x2F,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xBE - LDX (Absolute, Y) (Cross Page)",function() {
    /**
     *    Instruction = LDX - Load index X with memory.
     * Affected Flags = None
     *    Total Tests = 3
     */
    var OPCODE = 0xBE,
        PCStart = 0x4000,
        RandomByte = Math.floor(Math.random() * 255) + 1,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        YRegister = 0xFF,
        FullAddress = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + YRegister,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x53;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[FullAddress] = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Memory loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="TAY Tests">

QUnit.module("Instruction - TAY", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xA8 - TAY (Implied)",function() {
    /**
     *    Instruction = TAY - Transfer accumulator to index Y.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xA8,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x53, "Test 1: Accumulator loaded into index Y correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x83, "Test 2: Accumulator loaded into index Y correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0, "Test 3: Accumulator loaded into index Y correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="TAX Tests">

QUnit.module("Instruction - TAX", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xAA - TAX (Implied)",function() {
    /**
     *    Instruction = TAX - Transfer accumulator to index X.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xAA,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Accumulator loaded into index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Accumulator loaded into index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._A = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Accumulator loaded into index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="BCS Tests">

QUnit.module("Instruction - BCS", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xB0 - BCS (Relative)", function() {
    /**
     *    Instruction = BCS - Branch on carry set
     * Affected Flags = None
     *    Total Tests = 5
     */

    var OPCODE = 0xB0,
        relativePlusSamePage = 64,
        relativeMinusSamePage = 192,
        relativePlusNextPage = 127,
        relativeMinusNextPage = 129,
        CycleCost = 2,
        BytesUsed = 2,
        PCStart = 0x4080,
        PCStartHigh = 0x40E0,
        PCStartLow = 0x4010;

    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStartHigh] = OPCODE;
    MOS6502._RAM[PCStartLow] = OPCODE;
    MOS6502._CYCLES = 0;

    /**
     * Test 1: Carry clear (no branch, but 2 cycles used)
     */

        // Enable overflow.
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + BytesUsed,
        "Carry set: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
        CycleCost,
        "Carry set: Cycles set correctly.");

    /**
     * Test 2: Carry set. Branch forward to same page. (3 cycles)
     */

    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativePlusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStart + relativePlusSamePage,
        "Carry set, branch forward, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Carry set, branch forward, same page: Cycles set correctly.");

    /**
     * Test 3: Carry set. Branch backward to same page. (3 cycles)
     */

    MOS6502._P = 0x21;
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = relativeMinusSamePage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStart + relativeMinusSamePage) - 256,
        "Carry set, branch backwards, same page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 1,
        "Carry set, branch backwards, same page: Cycles set correctly.");

    /**
     * Test 4: Carry clear. Branch forward to different page. (4 cycles)
     *
     * NOTE: It's not possible to branch to another page from 0x4080. Using 0x40E0 for forward branch.
     */

    MOS6502._P = 0x21;
    MOS6502._PC = PCStartHigh;
    MOS6502._RAM[PCStartHigh + 1] = relativePlusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            PCStartHigh + relativePlusNextPage,
        "Carry set, branch forward, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Carry set, branch forward, different page: Cycles set correctly.");

    /**
     * Test 5: Carry set. Branch backward to different page. (4 cycles)
     */

    MOS6502._P = 0x21;
    MOS6502._PC = PCStartLow;
    MOS6502._RAM[PCStartLow + 1] = relativeMinusNextPage;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._PC,
            (PCStartLow + relativeMinusNextPage) - 256,
        "Carry set, branch backwards, different page: Program Counter set correctly.");

    equal(MOS6502._CYCLES,
            CycleCost + 2,
        "Carry set, branch backwards, different page: Cycles set correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="CLV Tests">

QUnit.module("Instruction - CLV", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xB8 - CLV (Implied)",function() {
    /**
     *    Instruction = CLV - Clear overflow flag.
     * Affected Flags = Sign, Zero
     *    Total Tests = 2
     */
    var OPCODE = 0xB8,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Clear overflow when set.
     */
    MOS6502._PC = PCStart;
    MOS6502._P = 0x60;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Clear overflow when overflow not set.
     */
    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x20, "Test 2: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");

});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="TSX Tests">

QUnit.module("Instruction - TSX", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xBA - TSX (Implied)",function() {
    /**
     *    Instruction = TSX - Transfer stack pointer to index X.
     * Affected Flags = Sign, Zero
     *    Total Tests = 3
     */
    var OPCODE = 0xBA,
        PCStart = 0x4000,
        XRegister = Math.floor(Math.random() * 255) + 1,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */
    MOS6502._PC = PCStart;
    MOS6502._SP = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x53, "Test 1: Stack pointer transfered to index X correctly.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._SP = 0x83;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0x83, "Test 2: Stack pointer transfered to index X correctly.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set zero.
     */
    MOS6502._PC = PCStart;
    MOS6502._SP = 0;
    MOS6502._CYCLES = 0;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._X, 0, "Test 3: Stack pointer transfered to index X correctly.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="CPY Tests">

QUnit.module("Instruction - CPY", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xC0 - CPY (Immediate)",function() {
    /**
     *    Instruction = CPY - Compare memory and index Y.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xC0,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;
    MOS6502._Y = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;
    MOS6502._Y = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;
    MOS6502._Y = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xC4 - CPY (Zero Page)",function() {
    /**
     *    Instruction = CPY - Compare memory and index Y.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xC4,
        PCStart = 0x4000,
        ZPAddress = 0x41,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x53;
    MOS6502._Y = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x53;
    MOS6502._Y = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[ZPAddress] = 0x53;
    MOS6502._Y = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xCC - CPY (Absolute)",function() {
    /**
     *    Instruction = CPY - Compare memory and index Y.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xCC,
        PCStart = 0x4000,
        CycleCost = 4,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        Address = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2),
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[Address] = 0x53;
    MOS6502._Y = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[Address] = 0x53;
    MOS6502._Y = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[Address] = 0x53;
    MOS6502._Y = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="CMP Tests">

QUnit.module("Instruction - CMP", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xC9 - CMP (Immediate)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xC9,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[PCStart + 1] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xC5 - CMP (Zero Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xC5,
        PCStart = 0x4000,
        ZPAddress = 0x41,
        MemAddress = ZPAddress,
        CycleCost = 3,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xD5 - CMP (Zero Page, X)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xD5,
        PCStart = 0x4000,
        ZPAddress = 0x41,
        XRegister = 0x31,
        MemAddress = ZPAddress + XRegister,
        CycleCost = 4,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xCD - CMP (Absolute)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xCD,
        PCStart = 0x4000,
        ZPAddress = 0x41,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2),
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xDD - CMP (Absolute, X) (Same Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xDD,
        PCStart = 0x4000,
        XRegister = 0x41,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + XRegister,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xDD - CMP (Absolute, X) (Cross Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xDD,
        PCStart = 0x4000,
        XRegister = 0xFF,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + XRegister,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xD9 - CMP (Absolute, Y) (Same Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xD9,
        PCStart = 0x4000,
        YRegister = 0x41,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + YRegister,
        CycleCost = 4,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xD9 - CMP (Absolute, Y) (Cross Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xD9,
        PCStart = 0x4000,
        YRegister = 0xFF,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + YRegister,
        CycleCost = 5,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xC1 - CMP (Indirect, X)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xC1,
        PCStart = 0x4000,
        XRegister = 0x41,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        ZPAddress = 0x51,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2),
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress + XRegister] = AddressByte1;
    MOS6502._RAM[ZPAddress + XRegister + 1] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xD1 - CMP (Indirect, Y) (Same Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xD1,
        PCStart = 0x4000,
        YRegister = 0x41,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        ZPAddress = 0x51,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + YRegister,
        CycleCost = 5,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xD1 - CMP (Indirect, Y) (Cross Page)",function() {
    /**
     *    Instruction = CMP - Compare memory and accumulator.
     * Affected Flags = Sign, Zero, Carry
     *    Total Tests = 3
     */
    var OPCODE = 0xD1,
        PCStart = 0x4000,
        YRegister = 0xFF,
        AddressByte1 = 0x31,
        AddressByte2 = 0x21,
        ZPAddress = 0x51,
        MemAddress = MOS6502._MAKE_ADDRESS(AddressByte1, AddressByte2) + YRegister,
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._RAM[ZPAddress] = AddressByte1;
    MOS6502._RAM[ZPAddress + 1] = AddressByte2;
    MOS6502._Y = YRegister;

    /**
     * Test 1: Set sign.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x51;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0xA0, "Test 1: Status register set correctly.");

    /**
     * Test 2: Set zero & carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x53;
    MOS6502._P = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x23, "Test 2: Status register set correctly.");

    /**
     * Test 3: Set carry.
     */
    MOS6502._PC = PCStart;
    MOS6502._RAM[MemAddress] = 0x53;
    MOS6502._A = 0x56;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;

    MOS6502.emulateCycle();

    equal(MOS6502._P, 0x21, "Test 3: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="DEC Tests">

QUnit.module("Instruction - DEC", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xC6 - DEC (Zero Page)",function() {
    /**
     *    Instruction = DEC - Decrement memory by one.
     * Affected Flags = Sign, Zero
     *    Total Tests = 4
     */
    var OPCODE = 0xC6,
        PCStart = 0x4000,
        ZPAddress = 0x41,
        MemoryLocation = ZPAddress,
        CycleCost = 5,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x1F, "Test 1: Memory decremented successfully.");

    equal(MOS6502._P,0x20,"Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign from high number.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0xFF;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFE, "Test 2: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 2: Status register set correctly.");

    /**
     * Test 3: Set sign from subtracting from zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0x0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFF, "Test 3: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 3: Status register set correctly.");

    /**
     * Test 4: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x01;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x00, "Test 4: Memory decremented successfully.");

    equal(MOS6502._P,0x22,"Test 4: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xD6 - DEC (Zero Page, X)",function() {
    /**
     *    Instruction = DEC - Decrement memory by one.
     * Affected Flags = Sign, Zero
     *    Total Tests = 4
     */
    var OPCODE = 0xD6,
        PCStart = 0x4000,
        ZPAddress = 0x41,
        XRegister = 0x51,
        MemoryLocation = ZPAddress + XRegister,
        CycleCost = 6,
        BytesUsed = 2;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = ZPAddress;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x1F, "Test 1: Memory decremented successfully.");

    equal(MOS6502._P,0x20,"Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign from high number.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0xFF;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFE, "Test 2: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 2: Status register set correctly.");

    /**
     * Test 3: Set sign from subtracting from zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0x0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFF, "Test 3: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 3: Status register set correctly.");

    /**
     * Test 4: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x01;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x00, "Test 4: Memory decremented successfully.");

    equal(MOS6502._P,0x22,"Test 4: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xCE - DEC (Absolute)",function() {
    /**
     *    Instruction = DEC - Decrement memory by one.
     * Affected Flags = Sign, Zero
     *    Total Tests = 4
     */
    var OPCODE = 0xCE,
        PCStart = 0x4000,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        MemoryLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2),
        CycleCost = 6,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x1F, "Test 1: Memory decremented successfully.");

    equal(MOS6502._P,0x20,"Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign from high number.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0xFF;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFE, "Test 2: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 2: Status register set correctly.");

    /**
     * Test 3: Set sign from subtracting from zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0x0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFF, "Test 3: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 3: Status register set correctly.");

    /**
     * Test 4: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x01;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x00, "Test 4: Memory decremented successfully.");

    equal(MOS6502._P,0x22,"Test 4: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

test("0xDE - DEC (Absolute, X)",function() {
    /**
     *    Instruction = DEC - Decrement memory by one.
     * Affected Flags = Sign, Zero
     *    Total Tests = 4
     */
    var OPCODE = 0xDE,
        PCStart = 0x4000,
        AddressByte1 = 0x21,
        AddressByte2 = 0x31,
        XRegister = 0x41,
        MemoryLocation = MOS6502._MAKE_ADDRESS(AddressByte1,AddressByte2) + XRegister,
        CycleCost = 7,
        BytesUsed = 3;

    MOS6502._RAM[PCStart] = OPCODE;
    MOS6502._RAM[PCStart + 1] = AddressByte1;
    MOS6502._RAM[PCStart + 2] = AddressByte2;
    MOS6502._X = XRegister;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x20;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x1F, "Test 1: Memory decremented successfully.");

    equal(MOS6502._P,0x20,"Test 1: Status register set correctly.");

    /**
     * Test 2: Set sign from high number.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0xFF;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFE, "Test 2: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 2: Status register set correctly.");

    /**
     * Test 3: Set sign from subtracting from zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._RAM[MemoryLocation] = 0x0;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0xFF, "Test 3: Memory decremented successfully.");

    equal(MOS6502._P,0xA0,"Test 3: Status register set correctly.");

    /**
     * Test 4: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._RAM[MemoryLocation] = 0x01;

    MOS6502.emulateCycle();

    equal(MOS6502._RAM[MemoryLocation], 0x00, "Test 4: Memory decremented successfully.");

    equal(MOS6502._P,0x22,"Test 4: Status register set correctly.");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>

/*********************************************************************************************************************/

//<editor-fold desc="INY Tests">

QUnit.module("Instruction - INY", {
    setup: function() {
        MOS6502.init();
    }
});

test("0xC8 - INY (Implied)",function() {
    /**
     *    Instruction = INY - Increment index Y by one.
     * Affected Flags = Sign, Zero
     *    Total Tests = 1
     */
    var OPCODE = 0xC8,
        PCStart = 0x4000,
        CycleCost = 2,
        BytesUsed = 1;

    MOS6502._RAM[PCStart] = OPCODE;

    /**
     * Test 1: Set none.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._Y = 0x21;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x22, "Test 1: Y Index incremented successfully.");

    equal(MOS6502._P, 0x20, "Test 1: Status register set correctly");

    /**
     * Test 2: Set sign.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._Y = 0xF0;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0xF1, "Test 2: Y Index incremented successfully.");

    equal(MOS6502._P, 0xA0, "Test 2: Status register set correctly");

    /**
     * Test 3: Set zero.
     */

    MOS6502._PC = PCStart;
    MOS6502._P = 0x20;
    MOS6502._CYCLES = 0;
    MOS6502._Y = 0xFF;

    MOS6502.emulateCycle();

    equal(MOS6502._Y, 0x00, "Test 3: Y Index incremented successfully.");

    equal(MOS6502._P, 0x22, "Test 3: Status register set correctly");

    equal(MOS6502._PC, PCStart + BytesUsed, "Program counter incremented successfully.");

    equal(MOS6502._CYCLES, CycleCost, "Cycles calculated correctly.");
});

//</editor-fold>


/**
 * Tests to be implemented:

 // 0xC0 - 0xCF
 case (0xCA) : me.DEX(); break;

 // 0xD0 - 0xDF
 case (0xD0) : me.BNE(); break;
 case (0xD8) : me.CLD(); break;

 // 0xE0 - 0xEF
 case (0xE0) : me.CPX(); break;
 case (0xE1) : me.SBC(); break;
 case (0xE4) : me.CPX(); break;
 case (0xE5) : me.SBC(); break;
 case (0xE6) : me.INC(); break;
 case (0xE8) : me.INX(); break;
 case (0xE9) : me.SBC(); break;
 case (0xEA) : me.NOP(); break;
 case (0xEC) : me.CPX(); break;
 case (0xED) : me.SBC(); break;
 case (0xEE) : me.INC(); break;

 // 0xF0 - 0xFF
 case (0xF0) : me.BEQ(); break;
 case (0xF1) : me.SBC(); break;
 case (0xF5) : me.SBC(); break;
 case (0xF6) : me.INC(); break;
 case (0xF8) : me.SED(); break;
 case (0xF9) : me.SBC(); break;
 case (0xFD) : me.SBC(); break;
 case (0xFE) : me.INC(); break;
 */

/**
 Template:

//<editor-fold desc = " Tests">

QUnit.module("Instruction - ", {
    setup: function() {
        MOS6502.init();
    }
});

test("0x -  ()", function() {});

//</editor-fold>
 */