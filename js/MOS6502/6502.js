/**
 * MOS Technology 6502 processor.
 *
 * Well, here's the next project... To emulate the 6502 used in the Apple II, Atari 2600, Commodore 64 and the NES.
 *
 * Admittedly, some of these systems use a modified version of this CPU, but let's just make notes for now:
 *
 * 1. Variable length instrucitons - Whereas the CHIP-8 had fixed, two-byte opcodes and vars, this one has a one byte
 *    opcode followed by a variable length argument address. This probably means that the OPCODE will dictate how much
 *    further we read in the memory.
 *
 * 2. 56 total instructions - Only slightly bigger than the CHIP-8. Maybe a good choice as a second project? They
 *    include 12 jump/branch/return codes, 16 arithmetic/logic codes, 11 status flag interactions, 12 load/store/move
 *    codes, 4 stak manipulation codes and a NOP... Which basically does nothing.
 *
 * Addressing types:
 *      - Implied addressing (One byte opcodes used by some miscellaeous instructions)
 *      - Accumulator addressing (One byte opcodes used by shift and rotate instrucitons)
 *      - Relative addressing (Two byte opcodes used by all branch instructions [OPCODE][OFFSET])
 *      - Immediate addressing (Two byte opcodes with argument in second byte [OPCODE][ARG])
 *      - Absolute addressing (Three byte instruction - addresses are stored little endian [OPCODE][LOW BYTE][HIGH BYTE])
 *      - Zero page addressing (Two byte instructions for memory access from 0x00 to 0xFF [OPCODE][LOW BYTE])
 *      - Absolute indexed by X/Y (Three byte instruction for accessing at memory + X or Y offset [OPCODE][LOW BYTE][HIGH BYTE])
 *      - Zero page indexed by X/Y (Two byte instruction similar to above but 0x00 - 0xFF [OPCODE][LOW BYTE])
 *      \-o-\-o-\-o-\-o-\-o-\-o-\ BRAINFUCK BEGIN \-o-\-o-\-o-\-o-\-o-\-o-\
 *      - Indexed indirect addressing (Two byte instruction - FFS... Read an argument's address from a given location
 *          in page zero, offest by the X index register then read the argument at that address... [OPCODE][LOW BYTE]
 *      - Indirect indexed addressing (Two byte instruction - Read a base address from a given offset into page zero,
 *          then read the argument from that address + the Y index register. [OPCODE][LOW BYTE]
 *      - Absolute indirect addressing (Three byte instruction reads an argument's address from a given location and
 *          then reads the argument from that address [OPCODE][LOW BYTE][HIGH BYTE])
 */

var MOS6502 = function() {

    // Let's map out parts of the processor...

    /* Interrupts */
    this._RES = false;
    this._IRQ = false;
    this._NMI = false;

    /* Registers */
    this._X = 0x00;
    this._Y = 0x00;
    this._P = {
        "N" : false,  // Negative
        "V" : false,  // Overflow
        "B" : false,  // Break
        "D" : false,  // Decimal mode
        "I" : false,  // IRQ disable
        "Z" : false,  // Zero
        "C" : false   // Carry
    };
    this._A = 0x00; // Accumulator

    /* Stack */
    this._stack = new Array(0xFF);
    this._sp = 0x00;

    /* Program Counter */
    this._PC = 0x0000;  // This is usualy PCL and PCH, but we can combine them here into one.

    /* Memory */
    /* Here's the suggested allocation:
     * 0x0000 - 0x00FF = Zero Page
     * 0x0100 - 0x01FF = Stack
     * 0x0200 - 0x3FFF = RAM
     * 0x4000 - 0x7FFF = I/O Devices
     * 0x8000 - 0xFFFF = ROM
     */
    this._RAM = new Uint8Array(0xFFFF);  // 64k of RAM. NES uses more, but works around it.

}