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
 * everywhere willy-nilly. Flags will be bitmasked from a byte.
 *
 * In addition, the PC will point to a single byte and incremented according to the length of the command.
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
    this._P = 0x20; // Bit 5 is supposed to be always at logical 1...

    /* Stack */
    this._STACK = new Uint8Array(0xFF);  // Thinking to put this in the RAM where it's supposed to be...
    this._SP = 0x01FF;  // For some reason the stack starts at the end and works backwards according to docs...

    /* Program Counter */
    this._PC = 0x0000;  // This is usually PCL and PCH, but we can combine them here into one.

    /* CPU Cycles */
    this._CYCLES = 0;

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
     *
     * Moving from a simple integer to a function that will return the operand. It seems that the addressing mode is
     * only responsible to obtaining the operand for working on and not for directing where the result will be saved.
     */
    this._ADDR_MODE = {
           ACC : 0,  // Accumulator Addressing (op. No operand, but works with Accumulator value)
           REL : 1,  // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
           IMM : 2,  // Immediate Addressing (op | operand. Operand is in the second byte)
           ABS : 3,  // Absolute Addressing (op | low | high. Operand at that address)
            ZP : 4,  // Zero Page Addressing (op | low. Operand in zero page at byte referenced)
           ABX : 5,  // Absolute Indexed by X (op | low | high. Operand is located at address given PLUS the offest stored in the X register)
           ABY : 6,  // Absolute Indexed by Y (op | low | high. Operand is located at address given PLUS the offest stored in the Y register)
           ZPX : 7,  // Zero Page Indexed by X (op | low. Operand is located at zp address PLUS the offset stored in the X register)
           ZPY : 8,  // Zero Page Indexed by Y (op | low. Operand is located at zp address PLUS the offset stored in the Y register)
           INX : 9,  // Indexed Indirect Addressing (op | low. Read address from given location in ZP offset by X. Operand at that address)
           INY : 10, // Indirect Indexed Addressing (op | low. Read address from given location in ZP. Operand is at that address PLUS the offest stored in the Y register)
           ABI : 11, // Absolute Indirect Addressing (op | low | high. Read the address from the given location. Reads TWO bytes)
           IMP : 12  // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
    }

};

MOS6502.prototype.emulateCycle = function() {
    // Let's do this thing...

}

// Some special functions for checking and setting/toggling flags and statuses.
MOS6502.prototype._IF_CARRY = function(){ return (this._P & 0x01 === 1); };

MOS6502.prototype._SET_CARRY = function(condition) { (condition) ? this._P |= 0x01 : this._P &= 0x01; };

MOS6502.prototype._IF_ZERO = function() { return ((this._P & 0x02) >> 1 === 1); };

MOS6502.prototype._SET_ZERO = function(value) { (value == 0) ? this._P |= 0x02 : this._P &= 0x02;};

MOS6502.prototype._IF_INTERRUPT = function() { return ((this._P & 0x04) >> 2 === 1); };

MOS6502.prototype._SET_INTERRUPT = function(condition) { (condition) ? this._P |= 0x04 : this._P &= 0x04; };

MOS6502.prototype._IF_DECIMAL = function() { return ((this._P & 0x08) >> 3 === 1); };

MOS6502.prototype._SET_DECIMAL = function(condition) { (condition) ? this._P |= 0x0 : this._P &= 0x0; };

MOS6502.prototype._IF_BREAK = function() { return ((this._P & 0x10) >> 4 === 1); };

MOS6502.prototype._SET_BREAK = function(condition) { (condition) ? this._P |= 0x10 : this._P &= 0x10; };

MOS6502.prototype._IF_OVERFLOW = function() { return ((this._P & 0x40) >> 6 === 1); };

MOS6502.prototype._SET_OVERFLOW = function(condition) { (condition) ? this._P |= 0x40 : this._P &= 0x40; };

MOS6502.prototype._IF_SIGN = function() { return ((this._P & 0x80) >> 7 === 1); };

MOS6502.prototype._SET_SIGN = function(value) { ( (value & 0x80) >> 7 === 1) ? this._P |= 0x80 : this._P &= 0x80; };

MOS6502.prototype._MAKE_ADDRESS = function(byte1, byte2) { return (byte2 << 8) + byte1; };
/**
 * Addressing Mode Functions
 *
 * Each one of these is for the different addressing modes. It will return the correct operand required. Still a work
 * in progress, but I think it might be easier than coding in the same stuff over and over again. I have also had to
 * create functions which write to the correct addresses as well... This is heavily involved... What was I thinking?
 */

/** Read Address **/
MOS6502.prototype.ReadZeroPage = function(byte1) {
    return this._RAM[ byte1 ];
}

MOS6502.prototype.ReadZeroPageX = function(byte1) {
    return this._RAM[ 0xFF & ( byte1 + this._X ) ];
}

MOS6502.prototype.ReadZeroPageY = function(byte1) {
    return this._RAM [ 0xFF & ( byte1 + this._Y ) ];
}

MOS6502.prototype.ReadAbsolute = function(byte1, byte2) {
    return this._RAM[ this._MAKE_ADDRESS(byte1, byte2) ];
}

MOS6502.prototype.ReadAbsoluteX = function(byte1, byte2, checkpage) {
    var me = this;
    if(checkpage) {
        if( ( me._MAKE_ADDRESS(byte1, byte2) & 0xFF00 ) !== ( me._MAKE_ADDRESS(byte1, byte2) + me._X) & 0xFF00 ) {
            // Crossing page boundary. Add one cycle.
            me._CYCLES += 1;
        }
    }
    return me._RAM[ me._MAKE_ADDRESS(byte1, byte2) + me._X ];
}

MOS6502.prototype.ReadAbsoluteY = function(byte1, byte2, checkpage) {
    var me = this;
    if(checkpage) {
        if( ( me._MAKE_ADDRESS(byte1, byte2) & 0xFF00 ) !== ( me._MAKE_ADDRESS(byte1, byte2) + me._Y) & 0xFF00 ) {
            // Crossing page boundary. Add one cycle.
            me._CYCLES += 1;
        }
    }
    return me._RAM[ me._MAKE_ADDRESS(byte1, byte2) + me._Y ];
}

MOS6502.prototype.ReadIndirectX = function(byte1) {
    var me = this,
        OPER_ADDR = me._MAKE_ADDRESS( me._RAM[ 0xFF & (byte1 + me._X) ] , me._RAM[ 0xFF & (byte1 + me._X + 1) ]);
    return me._RAM[ OPER_ADDR ];
}

MOS6502.prototype.ReadIndirectY = function(byte1, checkpage) {
    var me = this,
        OPER_ADDR = me._MAKE_ADDRESS( me._RAM[byte1] , me._RAM[byte1 + 1]);
    if (checkpage) {
        if(OPER_ADDR & 0xFF00 !== (OPER_ADDR + me._Y) & 0xFF00) {
            // Crossing page boundary. Add one cycle.
            me._CYCLES += 1;
        }
    }
    return me._RAM[ OPER_ADDR + me._Y ];
}

/** Write Address **/
MOS6502.prototype.WriteZeroPage = function(ZPADDR, DATA) {
    this._RAM[ZPADDR & 0xFF] =  DATA & 0xFF;
}

MOS6502.prototype.WriteZeroPageX = function(ZPADDR, DATA) {
    var me = this;
    me._RAM[(ZPADDR + me._X) & 0xFF] =  DATA & 0xFF;
}

MOS6502.prototype.WriteZeroPageY = function(ZPADDR, DATA) {
    var me = this;
    me._RAM[(ZPADDR + me._Y) & 0xFF] = DATA & 0xFF;
}

MOS6502.prototype.WriteAbsolute = function(byte1, byte2, DATA) {
    var me = this;
    me._RAM[me._MAKE_ADDRESS(byte1,byte2)] = DATA & 0xFF;
}

MOS6502.prototype.WriteAbsoluteX = function(byte1, byte2, DATA) {
    var me = this;
    me._RAM[me._MAKE_ADDRESS(byte1, byte2) + me._X] = DATA & 0xFF;
}

MOS6502.prototype.WriteAbsoluteY = function(byte1, byte2, DATA) {
    var me = this;
    me._RAM[me._MAKE_ADDRESS(byte1,byte2) + me._Y] = DATA & 0xFF;
}

MOS6502.prototype.WriteIndirectX = function(byte1, DATA) {
    var me = this,
        WRITE_ADDR = me._MAKE_ADDRESS(me._RAM[(byte1 + me._X) & 0xFF],me._RAM[(byte1 + me_X + 1) & 0xFF]);
    me._RAM[ WRITE_ADDR ] = DATA & 0xFF;
}

MOS6502.prototype.WriteIndirectY = function(byte1, DATA) {
    var me = this,
        WRITE_ADDR = me._MAKE_ADDRESS(me._RAM[byte1 & 0xFF] , me._RAM[byte1 + 1 & 0xFF]);
    me._RAM[WRITE_ADDR + me._Y ] = DATA & 0xFF;
}

MOS6502.prototype.opcodeMap = {
    // 0x0X
    0x00 : MOS6502.BRK(this._ADDR_MODE.IMP),
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
    0x10 : MOS6502.BPL(this._ADDR_MODE.REL),
    0x11 : MOS6502.ORA(this._ADDR_MODE.INY),
    0x12 : "",
    0x13 : "",
    0x14 : "",
    0x15 : MOS6502.ORA(this._ADDR_MODE.ZPX),
    0x16 : MOS6502.ASL(this._ADDR_MODE.ZPX),
    0x17 : "",
    0x18 : MOS6502.CLC(this._ADDR_MODE.IMP),
    0x19 : MOS6502.ORA(this._ADDR_MODE.ABY),
    0x1A : "",
    0x1B : "",
    0x1C : "",
    0x1D : MOS6502.ORA(this._ADDR_MODE.ABX),
    0x1E : MOS6502.ASL(this._ADDR_MODE.ABX),
    0x1F : "",

    // 0x2X
    0x20 : MOS6502.JSR(this._ADDR_MODE.ABS),
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
    0x30 : MOS6502.BMI(this._ADDR_MODE.REL),
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
    0x50 : MOS6502.BVC(this._ADDR_MODE.IMP),
    0x51 : MOS6502.EOR(this._ADDR_MODE.INY),
    0x52 : "",
    0x53 : "",
    0x54 : "",
    0x55 : MOS6502.EOR(this._ADDR_MODE.ZPX),
    0x56 : MOS6502.LSR(this._ADDR_MODE.ZPX),
    0x57 : "",
    0x58 : MOS6502.CLI(this._ADDR_MODE.IMP),
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
    0x6C : MOS6502.JMP(this._ADDR_MODE.ABI),
    0x6D : MOS6502.ADC(this._ADDR_MODE.ABS),
    0x6E : MOS6502.ROR(this._ADDR_MODE.ABS),
    0x6F : "",

    // 0x7X
    0x70 : MOS6502.BVS(this._ADDR_MODE.IMP),
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
    0x88 : MOS6502.DEY(this._ADDR_MODE.IMP),
    0x89 : "",
    0x8A : MOS6502.TXA(),
    0x8B : "",
    0x8C : MOS6502.STY(this._ADDR_MODE.ABS),
    0x8D : MOS6502.STA(this._ADDR_MODE.ABS),
    0x8E : MOS6502.STX(this._ADDR_MODE.ABS),
    0x8F : "",

    // 0x9X
    0x90 : MOS6502.BCC(this._ADDR_MODE.REL),
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
    0xB0 : MOS6502.BCS(this._ADDR_MODE.REL),
    0xB1 : MOS6502.LDA(this._ADDR_MODE.INY),
    0xB2 : "",
    0xB3 : "",
    0xB4 : MOS6502.LDY(this._ADDR_MODE.ZPX),
    0xB5 : MOS6502.LDA(this._ADDR_MODE.ZPX),
    0xB6 : MOS6502.LDX(this._ADDR_MODE.ZPY),
    0xB7 : "",
    0xB8 : MOS6502.CLV(this._ADDR_MODE.IMP),
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
    0xC8 : MOS6502.INY(this._ADDR_MODE.IMP),
    0xC9 : MOS6502.CMP(this._ADDR_MODE.IMM),
    0xCA : MOS6502.DEX(this._ADDR_MODE.IMP),
    0xCB : "",
    0xCC : MOS6502.CPY(this._ADDR_MODE.ABS),
    0xCD : MOS6502.CMP(this._ADDR_MODE.ABS),
    0xCE : MOS6502.DEC(this._ADDR_MODE.ABS),
    0xCF : "",

    // 0xDX
    0xD0 : MOS6502.BNE(this._ADDR_MODE.REL),
    0xD1 : MOS6502.CMP(this._ADDR_MODE.INY),
    0xD2 : "",
    0xD3 : "",
    0xD4 : "",
    0xD5 : MOS6502.CMP(this._ADDR_MODE.ZPX),
    0xD6 : MOS6502.DEC(this._ADDR_MODE.ZPX),
    0xD7 : "",
    0xD8 : MOS6502.CLD(this._ADDR_MODE.IMP),
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
    0xE8 : MOS6502.INX(this._ADDR_MODE.IMP),
    0xE9 : MOS6502.SBC(this._ADDR_MODE.IMM),
    0xEA : MOS6502.NOP(),
    0xEB : "",
    0xEC : MOS6502.CPX(this._ADDR_MODE.ABS),
    0xED : MOS6502.SBC(this._ADDR_MODE.ABS),
    0xEE : MOS6502.INC(this._ADDR_MODE.ABS),
    0xEF : "",

    // 0xFX
    0xF0 : MOS6502.BEQ(this._ADDR_MODE.REL),
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

/* Placeholder functions for the instruction set. */

MOS6502.prototype.ADC = function (ADDR_MODE) {
    // Add memory to accumulator with carry

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {

        case (0x61): OPER = me.ReadIndirectX(byte1); break;
        case (0x65): OPER = me.ReadZeroPage(byte1); break;
        case (0x69): OPER = byte1; break;
        case (0x6D): OPER = me.ReadAbsolute(byte1, byte2); break;
        case (0x71): OPER = me.ReadIndirectY(byte1, true); break;
        case (0x75): OPER = me.ReadZeroPageX(byte1); break;
        case (0x79): OPER = me.ReadAbsoluteY(byte1, byte2, true); break;
        case (0x7D): OPER = me.ReadAbsoluteX(byte1, byte2, true); break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    var temp = OPER + me._A + (me._IF_CARRY() ? 1 : 0);

    if( me._IF_DECIMAL() ) {
        if ( ( ( me._A & 0xF) + (OPER & 0XF) + (me._IF_CARRY() ? 1 : 0) ) > 9 ) {
            temp += 6;
        }
        me._SET_SIGN(temp);
        me._SET_OVERFLOW( !( (me._A ^ OPER) & 0x80) && ( ( me._A ^ temp) & 0x80) );
        if ( temp > 0x99) {
            temp += 96;
        }
        me._SET_CARRY(temp & 0x99);
    } else {
       me._SET_SIGN(temp);
       me._SET_OVERFLOW( !( (me._A ^ OPER) & 0x80) && ( ( me._A ^ temp) & 0x80) );
       me._SET_CARRY(temp > 0xFF);
    }

    switch (opCode) {

        case (0x61): me._CYCLES += 6; me._PC += 2; break;
        case (0x65): me._CYCLES += 3; me._PC += 2; break;
        case (0x69): me._CYCLES += 2; me._PC += 2; break;
        case (0x6D): me._CYCLES += 4; me._PC += 3; break;
        case (0x71): me._CYCLES += 5; me._PC += 2; break;
        case (0x75): me._CYCLES += 4; me._PC += 2; break;
        case (0x79): me._CYCLES += 4; me._PC += 3; break;
        case (0x7D): me._CYCLES += 4; me._PC += 3; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.AND = function(ADDR_MODE) {
    var srcByte;

    switch (ADDR_MODE) {
        case(this._ADDR_MODE.IMM):
            // Immediate Addressing (op | operand. Operand is in the second byte)
            break;
        case(this._ADDR_MODE.ZP):
            // Zero Page Addressing (op | low. Operand in zero page at byte referenced)
            break;
        case(this._ADDR_MODE.ZPX):
            // Zero Page Indexed by X (op | low. Operand is located at zp address PLUS the offset stored in the X register)
            break;
        case(this._ADDR_MODE.ABS):
            // Absolute Addressing (op | low | high. Operand at that address)
            break;
        case(this._ADDR_MODE.ABX):
            // Absolute Indexed by X (op | low | high. Operand is located at address given PLUS the offest stored in the X register)
            break;
        case(this._ADDR_MODE.ABY):
            // Absolute Indexed by Y (op | low | high. Operand is located at address given PLUS the offest stored in the Y register)
            break;
        case(this._ADDR_MODE.INX):
            // Indexed Indirect Addressing (op | low. Read address from given location in ZP offset by X. Operand at that address)
            break;
        case(this._ADDR_MODE.INY):
            // Indirect Indexed Addressing (op | low. Read address from given location in ZP. Operand is at that address PLUS the offest stored in the Y register)
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

MOS6502.prototype.BCC = function(ADDR_MODE) {
    // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
};

MOS6502.prototype.BCS = function(ADDR_MODE) {
    // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
};

MOS6502.prototype.BEQ = function(ADDR_MODE) {
    // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
};

MOS6502.prototype.BIT = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ZP):
            break;
        case(this._ADDR_MODE.ABS):
            break;
    }
};

MOS6502.prototype.BMI = function(ADDR_MODE) {
    // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
};

MOS6502.prototype.BNE = function(ADDR_MODE) {
    // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
};

MOS6502.prototype.BPL = function(ADDR_MODE) {
    // Relative Addressing (op | offset. Normally used in branches. Second byte contains an offset for branching)
};

MOS6502.prototype.BRK = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.BVC = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.BVS = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.CLC = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.CLD = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.CLI = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.CLV = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
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

MOS6502.prototype.DEX = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.DEY = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
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

MOS6502.prototype.INX = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.INY = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.JMP = function(ADDR_MODE) {
    switch (ADDR_MODE) {
        case(this._ADDR_MODE.ABS):
            break;
        case(this._ADDR_MODE.ABI):
            break;
    }
};

MOS6502.prototype.JSR = function(ADDR_MODE) {
    // Absolute Addressing (op | low | high. Operand at that address)
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

MOS6502.prototype.NOP = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
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

MOS6502.prototype.PHA = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.PHP = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.PLA = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.PLP = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
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

MOS6502.prototype.RTI = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.RTS = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
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

MOS6502.prototype.SEC = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.SED = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.SEI = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
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

MOS6502.prototype.TAX = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.TAY = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.TSX = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.TXA = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.TXS = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};

MOS6502.prototype.TYA = function(ADDR_MODE) {
    // Implied Addressing (No arguments, no operands... Just a single opcode... Don't really need this, but just to be complete...)
};