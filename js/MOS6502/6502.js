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
 *    codes, 4 stack manipulation codes and a NOP... Which basically does nothing.
 *
 * Where possible, every variable will be dealt with as HEX even though JS will throw integers and decimals around
 * everywhere willy-nilly. Flags will be boolean.
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
    this._STACK = new Uint8Array(0xFF);  // Thinking to put this in the RAM where it's supposed to be...
    this._SP = 0x01FF;  // For some reason the stack starts at the end and works backwards according to docs...

    /* Program Counter */
    this._PC = 0x0000;  // This is usually PCL and PCH, but we can combine them here into one.

    /* Memory */
    /* Here's the suggested allocation:
     * 0x0000 - 0x00FF = Zero Page
     * 0x0100 - 0x01FF = Stack
     * 0x0200 - 0x3FFF = RAM
     * 0x4000 - 0x7FFF = I/O Devices
     * 0x8000 - 0xFFFF = ROM
     */
    this._RAM = new Uint8Array(0xFFFF);  // 64k of RAM. NES uses more, but works around it.

    /* Addressing Mode */
    /* This may seem odd, but here's my reasoning:
     * The opcodes are referenced in an object (instead of a massive switch block) for this CPU. Since some opcodes
     * operate in exactly the same way, just differing in where data is stored and read, it made sense to pass the
     * addressing mode as a param and have this to check within the block. If it doesn't work, I'll refactor it a bit.
     * I am also open to suggestions as this emulation malarkey is all new to me.
     */
    this._ADDR_MODE = {
           ACC : 0,  // Accumulator
           IMM : 1,  // Immediate
            ZP : 2,  // Zero Page
           ZPX : 3,  // Zero Page, X
           ZPY : 4,  // Zero Page, Y
           ABS : 5,  // Absolute
           ABX : 6,  // Absolute, X
           ABY : 7,  // Absolute, Y
           IMP : 8,  // Implied
           REL : 9,  // Relative
           INX : 10, // (Indirect, X)
           INY : 11, // (Indirect), Y
           ABI : 12, // Absolute Indirect
           IND : 13  // Indirect
    }
};

// For now, the memory addressing mode (if any) is included in parens. This needs to be addressed properly.
// (forgive the pun).
MOS6502.prototpe.opcodeMap = {
    // 0x0X
    0x00 : MOS6502.BRK(),
    0x01 : MOS6502.ORA(this._ADDR_MODE.INX),
    0x02 : "",
    0x03 : "",
    0x04 : "",
    0x05 : MOS6502.ORA(this._ADDR_MODE.ZP),
    0x06 : MOS6502.ASL(this._ADDR_MODE.ZP),
    0x07 : "",
    0x08 : MOS6502.PHP(),
    0x09 : MOS6502.ORA(this._ADDR_MODE.IMM),
    0x0A : MOS6502.ASL(this._ADDR_MODE.ACC),
    0x0B : "",
    0x0C : "",
    0x0D : MOS6502.ORA(this._ADDR_MODE.ABS),
    0x0E : MOS6502.ASL(this._ADDR_MODE.ABS),
    0x0F : "",

    // 0x1X
    0x10 : MOS6502.BPL(),
    0x11 : MOS6502.ORA(this._ADDR_MODE.INY),
    0x12 : "",
    0x13 : "",
    0x14 : "",
    0x15 : MOS6502.ORA(this._ADDR_MODE.ZPX),
    0x16 : MOS6502.ASL(this._ADDR_MODE.ZPX),
    0x17 : "",
    0x18 : MOS6502.CLC(),
    0x19 : MOS6502.ORA(this._ADDR_MODE.ABY),
    0x1A : "",
    0x1B : "",
    0x1C : "",
    0x1D : MOS6502.ORA(this._ADDR_MODE.ABX),
    0x1E : MOS6502.ASL(this._ADDR_MODE.ABX),
    0x1F : "",

    // 0x2X
    0x20 : MOS6502.JSR(),
    0x21 : MOS6502.AND(this._ADDR_MODE.INX),
    0x22 : "",
    0x23 : "",
    0x24 : MOS6502.BIT(this._ADDR_MODE.ZP),
    0x25 : MOS6502.AND(this._ADDR_MODE.ZP),
    0x26 : MOS6502.ROL(this._ADDR_MODE.ZP),
    0x27 : "",
    0x28 : MOS6502.PLP(),
    0x29 : MOS6502.AND(this._ADDR_MODE.IMM),
    0x2A : MOS6502.ROL(this._ADDR_MODE.ACC),
    0x2B : "",
    0x2C : MOS6502.BIT(this._ADDR_MODE.ABS),
    0x2D : MOS6502.AND(this._ADDR_MODE.ABS),
    0x2E : MOS6502.ROL(this._ADDR_MODE.ABS),
    0x2F : "",

    // 0x3X
    0x30 : MOS6502.BMI(),
    0x31 : MOS6502.AND(this._ADDR_MODE.INY),
    0x32 : "",
    0x33 : "",
    0x34 : "",
    0x35 : MOS6502.AND(this._ADDR_MODE.ZPX),
    0x36 : MOS6502.ROL(this._ADDR_MODE.ZPX),
    0x37 : "",
    0x38 : MOS6502.SEC(),
    0x39 : MOS6502.AND(this._ADDR_MODE.ABY),
    0x3A : "",
    0x3B : "",
    0x3C : "",
    0x3D : MOS6502.AND(this._ADDR_MODE.ABX),
    0x3E : MOS6502.ROL(this._ADDR_MODE.ABX),
    0x3F : "",

    // 0x4X
    0x40 : MOS6502.RTI(),
    0x41 : MOS6502.EOR(this._ADDR_MODE.INX),
    0x42 : "",
    0x43 : "",
    0x44 : "",
    0x45 : MOS6502.EOR(this._ADDR_MODE.ZP),
    0x46 : MOS6502.LSR(this._ADDR_MODE.ZP),
    0x47 : "",
    0x48 : MOS6502.PHA(),
    0x49 : MOS6502.EOR(this._ADDR_MODE.IMM),
    0x4A : MOS6502.LSR(this._ADDR_MODE.ACC),
    0x4B : "",
    0x4C : MOS6502.JMP(this._ADDR_MODE.ABS),
    0x4D : MOS6502.EOR(this._ADDR_MODE.ABS),
    0x4E : MOS6502.LSR(this._ADDR_MODE.ABS),
    0x4F : "",

    // 0x5X
    0x50 : MOS6502.BVC(),
    0x51 : MOS6502.EOR(this._ADDR_MODE.INY),
    0x52 : "",
    0x53 : "",
    0x54 : "",
    0x55 : MOS6502.EOR(this._ADDR_MODE.ZPX),
    0x56 : MOS6502.LSR(this._ADDR_MODE.ZPX),
    0x57 : "",
    0x58 : MOS6502.CLI(),
    0x59 : MOS6502.EOR(this._ADDR_MODE.ABY),
    0x5A : "",
    0x5B : "",
    0x5C : "",
    0x5D : MOS6502.EOR(this._ADDR_MODE.ABX),
    0x5E : MOS6502.LSR(this._ADDR_MODE.ABX),
    0x5F : "",

    // 0x6X
    0x60 : MOS6502.RTS(),
    0x61 : MOS6502.ADC(this._ADDR_MODE.INX),
    0x62 : "",
    0x63 : "",
    0x64 : "",
    0x65 : MOS6502.ADC(this._ADDR_MODE.ZP),
    0x66 : MOS6502.ROR(this._ADDR_MODE.ZP),
    0x67 : "",
    0x68 : MOS6502.PLA(),
    0x69 : MOS6502.ADC(this._ADDR_MODE.IMM),
    0x6A : MOS6502.ROR(this._ADDR_MODE.ACC),
    0x6B : "",
    0x6C : MOS6502.JMP(this._ADDR_MODE.IND),
    0x6D : MOS6502.ADC(this._ADDR_MODE.ABS),
    0x6E : MOS6502.ROR(this._ADDR_MODE.ABS),
    0x6F : "",

    // 0x7X
    0x70 : MOS6502.BVS(),
    0x71 : MOS6502.ADC(this._ADDR_MODE.INY),
    0x72 : "",
    0x73 : "",
    0x74 : "",
    0x75 : MOS6502.ADC(this._ADDR_MODE.ZPX),
    0x76 : MOS6502.ROR(this._ADDR_MODE.ZPX),
    0x77 : "",
    0x78 : MOS6502.SEI(),
    0x79 : MOS6502.ADC(this._ADDR_MODE.ABY),
    0x7A : "",
    0x7B : "",
    0x7C : "",
    0x7D : MOS6502.ADC(this._ADDR_MODE.ABX),
    0x7E : MOS6502.ROR(this._ADDR_MODE.ABX),
    0x7F : "",

    // 0x8X
    0x80 : "",
    0x81 : MOS6502.STA(this._ADDR_MODE.INX),
    0x82 : "",
    0x83 : "",
    0x84 : MOS6502.STY(this._ADDR_MODE.ZP),
    0x85 : MOS6502.STA(this._ADDR_MODE.ZP),
    0x86 : MOS6502.STX(this._ADDR_MODE.ZP),
    0x87 : "",
    0x88 : MOS6502.DEY(),
    0x89 : "",
    0x8A : MOS6502.TXA(),
    0x8B : "",
    0x8C : MOS6502.STY(this._ADDR_MODE.ABS),
    0x8D : MOS6502.STA(this._ADDR_MODE.ABS),
    0x8E : MOS6502.STX(this._ADDR_MODE.ABS),
    0x8F : "",

    // 0x9X
    0x90 : MOS6502.BCC(),
    0x91 : MOS6502.STA(this._ADDR_MODE.INY),
    0x92 : "",
    0x93 : "",
    0x94 : MOS6502.STY(this._ADDR_MODE.ZPX),
    0x95 : MOS6502.STA(this._ADDR_MODE.ZPX),
    0x96 : MOS6502.STX(this._ADDR_MODE.ZPY),
    0x97 : "",
    0x98 : MOS6502.TYA(),
    0x99 : MOS6502.STA(this._ADDR_MODE.ABY),
    0x9A : MOS6502.TXS(),
    0x9B : "",
    0x9C : "",
    0x9D : MOS6502.STA(this._ADDR_MODE.ABX),
    0x9E : "",
    0x9F : "",

    // 0xAX
    0xA0 : MOS6502.LDY(this._ADDR_MODE.IMM),
    0xA1 : MOS6502.LDA(this._ADDR_MODE.INX),
    0xA2 : MOS6502.LDX(this._ADDR_MODE.IMM),
    0xA3 : "",
    0xA4 : MOS6502.LDY(this._ADDR_MODE.ZP),
    0xA5 : MOS6502.LDA(this._ADDR_MODE.ZP),
    0xA6 : MOS6502.LDX(this._ADDR_MODE.ZP),
    0xA7 : "",
    0xA8 : MOS6502.TAY(),
    0xA9 : MOS6502.LDA(this._ADDR_MODE.IMM),
    0xAA : MOS6502.TAX(),
    0xAB : "",
    0xAC : MOS6502.LDY(this._ADDR_MODE.ABS),
    0xAD : MOS6502.LDA(this._ADDR_MODE.ABS),
    0xAE : MOS6502.LDX(this._ADDR_MODE.ABS),
    0xAF : "",

    // 0xBX
    0xB0 : MOS6502.BCS(),
    0xB1 : MOS6502.LDA(this._ADDR_MODE.INY),
    0xB2 : "",
    0xB3 : "",
    0xB4 : MOS6502.LDY(this._ADDR_MODE.ZPX),
    0xB5 : MOS6502.LDA(this._ADDR_MODE.ZPX),
    0xB6 : MOS6502.LDX(this._ADDR_MODE.ZPY),
    0xB7 : "",
    0xB8 : MOS6502.CLV(),
    0xB9 : MOS6502.LDA(this._ADDR_MODE.ABY),
    0xBA : MOS6502.TSX(),
    0xBB : "",
    0xBC : MOS6502.LDY(this._ADDR_MODE.ABX),
    0xBD : MOS6502.LDA(this._ADDR_MODE.ABX),
    0xBE : MOS6502.LDX(this._ADDR_MODE.ABY),
    0xBF : "",

    // 0xCX
    0xC0 : MOS6502.CPY(this._ADDR_MODE.IMM),
    0xC1 : MOS6502.CMP(this._ADDR_MODE.INX),
    0xC2 : "",
    0xC3 : "",
    0xC4 : MOS6502.CPY(this._ADDR_MODE.ZP),
    0xC5 : MOS6502.CMP(this._ADDR_MODE.ZP),
    0xC6 : MOS6502.DEC(this._ADDR_MODE.ZP),
    0xC7 : "",
    0xC8 : MOS6502.INY(),
    0xC9 : MOS6502.CMP(this._ADDR_MODE.IMM),
    0xCA : MOS6502.DEX(),
    0xCB : "",
    0xCC : MOS6502.CPY(this._ADDR_MODE.ABS),
    0xCD : MOS6502.CMP(this._ADDR_MODE.ABS),
    0xCE : MOS6502.DEC(this._ADDR_MODE.ABS),
    0xCF : "",

    // 0xDX
    0xD0 : MOS6502.BNE(),
    0xD1 : MOS6502.CMP(this._ADDR_MODE.INY),
    0xD2 : "",
    0xD3 : "",
    0xD4 : "",
    0xD5 : MOS6502.CMP(this._ADDR_MODE.ZPX),
    0xD6 : MOS6502.DEC(this._ADDR_MODE.ZPX),
    0xD7 : "",
    0xD8 : MOS6502.CLD(),
    0xD9 : MOS6502.CMP(this._ADDR_MODE.ABY),
    0xDA : "",
    0xDB : "",
    0xDC : "",
    0xDD : MOS6502.CMP(this._ADDR_MODE.ABX),
    0xDE : MOS6502.DEC(this._ADDR_MODE.ABX),
    0xDF : "",

    // 0xEX
    0xE0 : MOS6502.CPX(this._ADDR_MODE.IMM),
    0xE1 : MOS6502.SBC(this._ADDR_MODE.INX),
    0xE2 : "",
    0xE3 : "",
    0xE4 : MOS6502.CPX(this._ADDR_MODE.ZP),
    0xE5 : MOS6502.SBC(this._ADDR_MODE.ZP),
    0xE6 : MOS6502.INC(this._ADDR_MODE.ZP),
    0xE7 : "",
    0xE8 : MOS6502.INX(),
    0xE9 : MOS6502.SBC(this._ADDR_MODE.IMM),
    0xEA : MOS6502.NOP(),
    0xEB : "",
    0xEC : MOS6502.CPX(this._ADDR_MODE.ABS),
    0xED : MOS6502.SBC(this._ADDR_MODE.ABS),
    0xEE : MOS6502.INC(this._ADDR_MODE.ABS),
    0xEF : "",

    // 0xFX
    0xF0 : MOS6502.BEQ(),
    0xF1 : MOS6502.SBC(this._ADDR_MODE.INY),
    0xF2 : "",
    0xF3 : "",
    0xF4 : "",
    0xF5 : MOS6502.SBC(this._ADDR_MODE.ZPX),
    0xF6 : MOS6502.INC(this._ADDR_MODE.ZPX),
    0xF7 : "",
    0xF8 : MOS6502.SED(),
    0xF9 : MOS6502.SBC(this._ADDR_MODE.ABY),
    0xFA : "",
    0xFB : "",
    0xFC : "",
    0xFD : MOS6502.SBC(this._ADDR_MODE.ABX),
    0xFE : MOS6502.INC(this._ADDR_MODE.ABX),
    0xFF : ""

};

/* Placeholder functions. */

MOS6502.prototype.ADC = function (ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.AND = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.ASL = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ACC):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};

MOS6502.prototype.BCC = function() {
    // NO ADDR_MODE. (REL)
};

MOS6502.prototype.BCS = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.BEQ = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.BIT = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ABS):
            break;
    }
};

MOS6502.prototype.BMI = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.BNE = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.BPL = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.BRK = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.BVC = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.BVS = function() {
    // No ADDR_MODE. (REL)
};

MOS6502.prototype.CLC = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.CLD = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.CLI = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.CLV = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.CMP = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.CPX = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ABS):
            break;
    }
};

MOS6502.prototype.CPY = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ABS):
            break;
    }
};

MOS6502.prototype.DEC = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};

MOS6502.prototype.DEX = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.DEY = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.EOR = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.INC = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};

MOS6502.prototype.INX = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.INY = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.JMP = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.IND):
            break;
    }
};

MOS6502.prototype.JSR = function() {
    // No ADDR_MODE. (ABS)
};

MOS6502.prototype.LDA = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.LDX = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPY):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABY):
            break;
    }
};

MOS6502.prototype.LDY = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};

MOS6502.prototype.LSR = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ACC):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};

MOS6502.prototype.NOP = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.ORA = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.PHA = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.PHP = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.PLA = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.PLP = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.ROL = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ACC):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};
MOS6502.prototype.ROR = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ACC):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
    }
};

MOS6502.prototype.RTI = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.RTS = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.SBC = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            break;
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.SEC = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.SED = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.SEI = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.STA = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABX):
            break;
        case(this._ADDR_MODE.ABY):
            break;
        case(this._ADDR_MODE.INX):
            break;
        case(this._ADDR_MODE.INY):
            break;
    }
};

MOS6502.prototype.STX = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPY):
            break;
        case(this._ADDR_MODE.ABS):
            break;
    }
};

MOS6502.prototype.STY = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ZPX):
            break;
        case(this._ADDR_MODE.ABS):
            break;
    }
};

MOS6502.prototype.TAX = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.TAY = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.TSX = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.TXA = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.TXS = function() {
    // No ADDR_MODE. (IMP)
};

MOS6502.prototype.TYA = function() {
    // No ADDR_MODE. (IMP)
};