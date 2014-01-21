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
    this._X = 0x00; // X Register
    this._Y = 0x00; // Y Register
    this._A = 0x00; // Accumulator

    /* Status Register */
    /* This one requires a little explanation.
     * The status register is a single byte. Each bit represents a state:
     *
     *   Bit: 7  6  5  4  3  2  1  0
     * State: S  V     B  D  I  Z  C
     *
     *     C: Carry flag.               (Mask: 0x01)
     *     Z: Zero flag.                (Mask: 0x02)
     *     I: Interrupt enable/disable. (Mask: 0x04)
     *     D: Decimal / BCD mode.       (Mask: 0x08)
     *     B: Software interrupt (BRK)  (Mask: 0x10)
     *     V: Overflow flag.            (Mask: 0x40)
     *     S: Sign (Negative) Flag      (Mask: 0x80)
     *
     */
    this._P = 0x00;

    /* Stack */
    this._STACK = new Uint8Array(0xFF);
    this._SP = 0x00;

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

/**
 *
 What follows is a list of all instructions. Depending on the addressing mode will dictate the OPCODE. Where there is
 only one opcode, it will be listed along with the addressing mode.

 ADC - Add memory to accumulator with carry.
 AND - "AND" memory with accumulator.
 ASL - Shift Left One Bit (Memory or Accumulator).
 BCC - Branch on carry clear.
 BCS - Branch on carry set.  [B0 - Relative Addressing]
 BEQ - Branch on result zero.  [F0 - Relative Addressing]
 BIT - Test bits in memory with accumulator.
 BMI - Branch on result minus.  [30 - Relative Addressing]
 BNE - Branch on result not zero.  [D0 - Relative Addressing]
 BPL - Branch on result plus.  [10 - Relative Addressing]
 BRK - Force break.  [00 - Implied]
 BVC - Branch on overflow clear.  [50 - Relative Addressing]
 BVS - Branch on overflow set.  [70 - Relative Addressing]
 CLC - Clear carry flag.  [18 - Implied Addressing]
 CLD - Clear decimal mode. [D8 - Implied Addressing]
 CLI - Clear interrupt disable bit.  [58 - Implied Addressing]
 CLV - Clear overflow flag.  [B8 - Implied Addressing]
 CMP - Compare memory and accumulator.
 CPX - Compare memory and index X.
 CPY - Compare memory and index Y.
 DEC - Decrement memory by one.
 DEX - Decrement index X by one.  [CA - Implied Addressing]
 DEY - Decrement index Y by one.  [88 - Implied Addressing]
 EOR - "Exclusive-Or" memory with accumulator.
 INC - Increment memory by one.
 INX - Increment index X by one.  [E8 - Implied Addressing]
 INY - Increment index Y by one.  [C8 - Implied Addressing]
 JMP - Jump to new location.
 JSR - Jump to new location, saving return address.  [20 - Absolute Addressing]
 LDA - Load accumulator with memory.
 LDX - Load index X with memory.
 LDY - Load index Y with memory.
 LSR - Shift right one bit (memory or accumulator).
 NOP - No operation.  [EA - Implied Addressing]
 ORA - "OR" memory with accumulator.
 PHA - Push accumulator on stack.  [48 - Implied Addressing]
 PHP - Push processor status on stack.  [08 - Implied Addressing]
 PLA - Pull accumulator from stack.  [68 - Implied Addressing]
 PLP - Pull processor status from stack.  [28 - Implied Addressing]
 ROL - Rotate one bit left (memory or accumulator).
 ROR - Rotate one bit right (memory or accumulator).
 RTI - Return from interrupt.  [4D - Implied Addressing]
 RTS - Return from subroutine.  [60 - Implied Addressing]
 SBC - Subtract memory from accumulator with borrow.
 SEC - Set carry flag.  [38 - Implied Addressing]
 SED - Set decimal mode.  [F8 - Implied Addressing]
 SEI - Set interrupt disable status.  [78 - Implied Addressing]
 STA - Store accumulator in memory.
 STX - Store index X in memory.
 STY - Store index Y in memory.
 TAX - Transfer accumulator to index X.  [AA - Implied Addressing]
 TAY - Transfer accumulator to index Y.  [A8 - Implied Addressing]
 TSX - Transfer stack pointer to index X.  [BA - Implied Addressing]
 TXA - Transfer index X to accumulator.  [8A - Implied Addressing]
 TXS - Transfer index X to stack pointer.  [9A - Implied Addressing]
 TYA - Transfer index Y to accumulator.  [98 - Implied Addressing]

 */

var allTheOpcodes = {
    // 0x0X
    0x00 : "BRK",
    0x01 : "ORA - (Indirect, X)",
    0x02 : "",
    0x03 : "",
    0x04 : "",
    0x05 : "ORA - Zero Page",
    0x06 : "ASL - Zero Page",
    0x07 : "",
    0x08 : "PHP",
    0x09 : "ORA - Immediate",
    0x0A : "ASL - Accumulator",
    0x0B : "",
    0x0C : "",
    0x0D : "ORA - Absolute",
    0x0E : "ASL - Absolute",
    0x0F : "",

    // 0x1X
    0x10 : "BPL",
    0x11 : "ORA - (Indirect), Y",
    0x12 : "",
    0x13 : "",
    0x14 : "",
    0x15 : "ORA - Zero Page, X",
    0x16 : "ASL - Zero Page, X",
    0x17 : "",
    0x18 : "CLC",
    0x19 : "ORA - Absolute, Y",
    0x1A : "",
    0x1B : "",
    0x1C : "",
    0x1D : "ORA - Absolute, X",
    0x1E : "ASL - Absolute, X",
    0x1F : "",

    // 0x2X
    0x20 : "JSR",
    0x21 : "AND - (Indirect, X)",
    0x22 : "",
    0x23 : "",
    0x24 : "BIT - Zero Page",
    0x25 : "AND - Zero Page",
    0x26 : "ROL - Zero Page",
    0x27 : "",
    0x28 : "PLP",
    0x29 : "AND - Immediate",
    0x2A : "ROL - Accumulator",
    0x2B : "",
    0x2C : "BIT - Absolute",
    0x2D : "AND - Absolute",
    0x2E : "ROL - Accumulator",
    0x2F : "",

    // 0x3X
    0x30 : "BMI",
    0x31 : "AND - (Indirect), Y",
    0x32 : "",
    0x33 : "",
    0x34 : "",
    0x35 : "AND - Zero Page, X",
    0x36 : "ROL - Zero Page, X",
    0x37 : "",
    0x38 : "SEC",
    0x39 : "AND - Absolute, Y",
    0x3A : "",
    0x3B : "",
    0x3C : "",
    0x3D : "AND - Absolute, X",
    0x3E : "ROL - Absolute, X",
    0x3F : ""
};