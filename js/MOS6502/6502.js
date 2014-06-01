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
    this._RAM = new Uint8Array(0xFFFF);  // 64k of RAM.

};

MOS6502.prototype.emulateCycle = function() {
    // Let's do this thing...
    var me = this,
        OPCODE = me._RAM[ me._PC ];

    switch (OPCODE) {

        // 0x00 - 0x0F
        case (0x00) : me.BRK(); break;
        case (0x01) : me.ORA(); break;
        case (0x02) : break;  // Future expansion
        case (0x03) : break;  // Future expansion
        case (0x04) : break;  // Future expansion
        case (0x05) : me.ORA(); break;
        case (0x06) : me.ASL(); break;
        case (0x07) : break;  // Future expansion
        case (0x08) : me.PHP(); break;
        case (0x09) : me.ORA(); break;
        case (0x0A) : me.ASL(); break;
        case (0x0B) : break;  // Future expansion
        case (0x0C) : break;  // Future expansion
        case (0x0D) : me.ORA(); break;
        case (0x0E) : me.ASL(); break;
        case (0x0F) : break;  // Future expansion

        // 0x10 - 0x1F
        case (0x10) : break;
        case (0x11) : break;
        case (0x12) : break;  // Future expansion
        case (0x13) : break;  // Future expansion
        case (0x14) : break;  // Future expansion
        case (0x15) : me.ORA(); break;
        case (0x16) : break;
        case (0x17) : break;  // Future expansion
        case (0x18) : break;
        case (0x19) : me.ORA(); break;
        case (0x1A) : break;  // Future expansion
        case (0x1B) : break;  // Future expansion
        case (0x1C) : break;  // Future expansion
        case (0x1D) : me.ORA(); break;
        case (0x1E) : break;
        case (0x1F) : break;  // Future expansion

        // 0x20 - 0x2F
        case (0x20) : break;
        case (0x21) : break;
        case (0x22) : break;  // Future expansion
        case (0x23) : break;  // Future expansion
        case (0x24) : break;
        case (0x25) : break;
        case (0x26) : break;
        case (0x27) : break;  // Future expansion
        case (0x28) : break;
        case (0x29) : break;
        case (0x2A) : break;
        case (0x2B) : break;  // Future expansion
        case (0x2C) : break;
        case (0x2D) : break;
        case (0x2E) : break;
        case (0x2F) : break;  // Future expansion

        // 0x30 - 0x3F
        case (0x30) : break;
        case (0x31) : break;
        case (0x32) : break;  // Future expansion
        case (0x33) : break;  // Future expansion
        case (0x34) : break;  // Future expansion
        case (0x35) : break;
        case (0x36) : break;
        case (0x37) : break;  // Future expansion
        case (0x38) : break;
        case (0x39) : break;
        case (0x3A) : break;  // Future expansion
        case (0x3B) : break;  // Future expansion
        case (0x3C) : break;  // Future expansion
        case (0x3D) : break;
        case (0x3E) : break;
        case (0x3F) : break;  // Future expansion

        // 0x40 - 0x4F
        case (0x40) : break;
        case (0x41) : break;
        case (0x42) : break;
        case (0x43) : break;
        case (0x44) : break;
        case (0x45) : break;
        case (0x46) : break;
        case (0x47) : break;
        case (0x48) : break;
        case (0x49) : break;
        case (0x4A) : break;
        case (0x4B) : break;
        case (0x4C) : break;
        case (0x4D) : break;
        case (0x4E) : break;
        case (0x4F) : break;

        // 0x50 - 0x5F
        case (0x50) : break;
        case (0x51) : break;
        case (0x52) : break;
        case (0x53) : break;
        case (0x54) : break;
        case (0x55) : break;
        case (0x56) : break;
        case (0x57) : break;
        case (0x58) : break;
        case (0x59) : break;
        case (0x5A) : break;
        case (0x5B) : break;
        case (0x5C) : break;
        case (0x5D) : break;
        case (0x5E) : break;
        case (0x5F) : break;

        // 0x60 - 0x6F
        case (0x60) : break;
        case (0x61) : break;
        case (0x62) : break;
        case (0x63) : break;
        case (0x64) : break;
        case (0x65) : break;
        case (0x66) : break;
        case (0x67) : break;
        case (0x68) : break;
        case (0x69) : break;
        case (0x6A) : break;
        case (0x6B) : break;
        case (0x6C) : break;
        case (0x6D) : break;
        case (0x6E) : break;
        case (0x6F) : break;

        // 0x70 - 0x7F
        case (0x70) : break;
        case (0x71) : break;
        case (0x72) : break;
        case (0x73) : break;
        case (0x74) : break;
        case (0x75) : break;
        case (0x76) : break;
        case (0x77) : break;
        case (0x78) : break;
        case (0x79) : break;
        case (0x7A) : break;
        case (0x7B) : break;
        case (0x7C) : break;
        case (0x7D) : break;
        case (0x7E) : break;
        case (0x7F) : break;

        // 0x80 - 0x8F
        case (0x80) : break;
        case (0x81) : break;
        case (0x82) : break;
        case (0x83) : break;
        case (0x84) : break;
        case (0x85) : break;
        case (0x86) : break;
        case (0x87) : break;
        case (0x88) : break;
        case (0x89) : break;
        case (0x8A) : break;
        case (0x8B) : break;
        case (0x8C) : break;
        case (0x8D) : break;
        case (0x8E) : break;
        case (0x8F) : break;

        // 0x90 - 0x9F
        case (0x90) : break;
        case (0x91) : break;
        case (0x92) : break;
        case (0x93) : break;
        case (0x94) : break;
        case (0x95) : break;
        case (0x96) : break;
        case (0x97) : break;
        case (0x98) : break;
        case (0x99) : break;
        case (0x9A) : break;
        case (0x9B) : break;
        case (0x9C) : break;
        case (0x9D) : break;
        case (0x9E) : break;
        case (0x9F) : break;

        // 0xA0 - 0xAF
        case (0xA0) : break;
        case (0xA1) : break;
        case (0xA2) : break;
        case (0xA3) : break;
        case (0xA4) : break;
        case (0xA5) : break;
        case (0xA6) : break;
        case (0xA7) : break;
        case (0xA8) : break;
        case (0xA9) : break;
        case (0xAA) : break;
        case (0xAB) : break;
        case (0xAC) : break;
        case (0xAD) : break;
        case (0xAE) : break;
        case (0xAF) : break;

        // 0xB0 - 0xBF
        case (0xB0) : break;
        case (0xB1) : break;
        case (0xB2) : break;
        case (0xB3) : break;
        case (0xB4) : break;
        case (0xB5) : break;
        case (0xB6) : break;
        case (0xB7) : break;
        case (0xB8) : break;
        case (0xB9) : break;
        case (0xBA) : break;
        case (0xBB) : break;
        case (0xBC) : break;
        case (0xBD) : break;
        case (0xBE) : break;
        case (0xBF) : break;

        // 0xC0 - 0xCF
        case (0xC0) : break;
        case (0xC1) : break;
        case (0xC2) : break;
        case (0xC3) : break;
        case (0xC4) : break;
        case (0xC5) : break;
        case (0xC6) : break;
        case (0xC7) : break;
        case (0xC8) : break;
        case (0xC9) : break;
        case (0xCA) : break;
        case (0xCB) : break;
        case (0xCC) : break;
        case (0xCD) : break;
        case (0xCE) : break;
        case (0xCF) : break;

        // 0xD0 - 0xDF
        case (0xD0) : break;
        case (0xD1) : break;
        case (0xD2) : break;
        case (0xD3) : break;
        case (0xD4) : break;
        case (0xD5) : break;
        case (0xD6) : break;
        case (0xD7) : break;
        case (0xD8) : break;
        case (0xD9) : break;
        case (0xDA) : break;
        case (0xDB) : break;
        case (0xDC) : break;
        case (0xDD) : break;
        case (0xDE) : break;
        case (0xDF) : break;

        // 0xE0 - 0xEF
        case (0xE0) : break;
        case (0xE1) : break;
        case (0xE2) : break;
        case (0xE3) : break;
        case (0xE4) : break;
        case (0xE5) : break;
        case (0xE6) : break;
        case (0xE7) : break;
        case (0xE8) : break;
        case (0xE9) : break;
        case (0xEA) : break;
        case (0xEB) : break;
        case (0xEC) : break;
        case (0xED) : break;
        case (0xEE) : break;
        case (0xEF) : break;

        // 0xF0 - 0xFF
        case (0xF0) : break;
        case (0xF1) : break;
        case (0xF2) : break;
        case (0xF3) : break;
        case (0xF4) : break;
        case (0xF5) : break;
        case (0xF6) : break;
        case (0xF7) : break;
        case (0xF8) : break;
        case (0xF9) : break;
        case (0xFA) : break;
        case (0xFB) : break;
        case (0xFC) : break;
        case (0xFD) : break;
        case (0xFE) : break;
        case (0xFF) : break;

        default:
            console.error("Illegal OPCODE: " + OPCODE);
            break;
    }
};

// Some special functions for checking and setting/toggling flags and statuses.
MOS6502.prototype._IF_CARRY = function(){ return (this._P & 0x01 === 1); };

MOS6502.prototype._SET_CARRY = function(condition) { (condition) ? this._P |= 0x01 : this._P &= ~(0x01); };

MOS6502.prototype._IF_ZERO = function() { return ((this._P & 0x02) >> 1 === 1); };

MOS6502.prototype._SET_ZERO = function(value) { (value === 0) ? this._P |= 0x02 : this._P &= ~(0x02);};

MOS6502.prototype._IF_INTERRUPT = function() { return ((this._P & 0x04) >> 2 === 1); };

MOS6502.prototype._SET_INTERRUPT = function(condition) { (condition) ? this._P |= 0x04 : this._P &= ~(0x04); };

MOS6502.prototype._IF_DECIMAL = function() { return ((this._P & 0x08) >> 3 === 1); };

MOS6502.prototype._SET_DECIMAL = function(condition) { (condition) ? this._P |= 0x08 : this._P &= ~(0x08); };

MOS6502.prototype._IF_BREAK = function() { return ((this._P & 0x10) >> 4 === 1); };

MOS6502.prototype._SET_BREAK = function(condition) { (condition) ? this._P |= 0x10 : this._P &= ~(0x10); };

MOS6502.prototype._IF_OVERFLOW = function() { return ((this._P & 0x40) >> 6 === 1); };

MOS6502.prototype._SET_OVERFLOW = function(condition) { (condition) ? this._P |= 0x40 : this._P &= ~(0x40); };

MOS6502.prototype._IF_SIGN = function() { return ((this._P & 0x80) >> 7 === 1); };

MOS6502.prototype._SET_SIGN = function(value) { ( (value & 0x80) >> 7 === 1) ? this._P |= 0x80 : this._P &= ~(0x80); };

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
};

MOS6502.prototype.ReadZeroPageX = function(byte1) {
    return this._RAM[ 0xFF & ( byte1 + this._X ) ];
};

MOS6502.prototype.ReadZeroPageY = function(byte1) {
    return this._RAM [ 0xFF & ( byte1 + this._Y ) ];
};

MOS6502.prototype.ReadAbsolute = function(byte1, byte2) {
    return this._RAM[ this._MAKE_ADDRESS(byte1, byte2) ];
};

MOS6502.prototype.ReadAbsoluteX = function(byte1, byte2, checkpage) {
    var me = this;
    if(checkpage) {
        if( ( 0xFF00 & ( me._MAKE_ADDRESS(byte1, byte2) ) ) !== ( 0xFF00 & ( me._MAKE_ADDRESS(byte1, byte2) + me._X) ) ) {
            // Crossing page boundary. Add one cycle.
            me._CYCLES += 1;
        }
    }
    return me._RAM[ me._MAKE_ADDRESS(byte1, byte2) + me._X ];
};

MOS6502.prototype.ReadAbsoluteY = function(byte1, byte2, checkpage) {
    var me = this;
    if(checkpage) {
        if( ( 0xFF00 & ( me._MAKE_ADDRESS(byte1, byte2) ) ) !== ( 0xFF00 & ( me._MAKE_ADDRESS(byte1, byte2) + me._Y) ) ) {
            // Crossing page boundary. Add one cycle.
            me._CYCLES += 1;
        }
    }
    return me._RAM[ me._MAKE_ADDRESS(byte1, byte2) + me._Y ];
};

MOS6502.prototype.ReadIndirectX = function(byte1) {
    var me = this,
        OPER_ADDR = me._MAKE_ADDRESS( me._RAM[ 0xFF & (byte1 + me._X) ] , me._RAM[ 0xFF & (byte1 + me._X + 1) ]);
    return me._RAM[ OPER_ADDR ];
};

MOS6502.prototype.ReadIndirectY = function(byte1, checkpage) {
    var me = this,
        OPER_ADDR = me._MAKE_ADDRESS( me._RAM[byte1] , me._RAM[byte1 + 1]);
    if (checkpage) {
        if( (0xFF00 & OPER_ADDR) !== ( 0xFF00 & ( OPER_ADDR + me._Y) ) ) {
            // Crossing page boundary. Add one cycle.
            me._CYCLES += 1;
        }
    }
    return me._RAM[ OPER_ADDR + me._Y ];
};

/** Write Address **/
MOS6502.prototype.WriteZeroPage = function(ZPADDR, DATA) {
    this._RAM[ZPADDR & 0xFF] =  DATA & 0xFF;
};

MOS6502.prototype.WriteZeroPageX = function(ZPADDR, DATA) {
    var me = this;
    me._RAM[(ZPADDR + me._X) & 0xFF] =  DATA & 0xFF;
};

MOS6502.prototype.WriteZeroPageY = function(ZPADDR, DATA) {
    var me = this;
    me._RAM[(ZPADDR + me._Y) & 0xFF] = DATA & 0xFF;
};

MOS6502.prototype.WriteAbsolute = function(byte1, byte2, DATA) {
    var me = this;
    me._RAM[me._MAKE_ADDRESS(byte1,byte2)] = DATA & 0xFF;
};

MOS6502.prototype.WriteAbsoluteX = function(byte1, byte2, DATA) {
    var me = this;
    me._RAM[me._MAKE_ADDRESS(byte1, byte2) + me._X] = DATA & 0xFF;
};

MOS6502.prototype.WriteAbsoluteY = function(byte1, byte2, DATA) {
    var me = this;
    me._RAM[me._MAKE_ADDRESS(byte1,byte2) + me._Y] = DATA & 0xFF;
};

MOS6502.prototype.WriteIndirectX = function(byte1, DATA) {
    var me = this,
        WRITE_ADDR = me._MAKE_ADDRESS(me._RAM[(byte1 + me._X) & 0xFF],me._RAM[(byte1 + me_X + 1) & 0xFF]);
    me._RAM[ WRITE_ADDR ] = DATA & 0xFF;
};

MOS6502.prototype.WriteIndirectY = function(byte1, DATA) {
    var me = this,
        WRITE_ADDR = me._MAKE_ADDRESS(me._RAM[byte1 & 0xFF] , me._RAM[byte1 + 1 & 0xFF]);
    me._RAM[WRITE_ADDR + me._Y ] = DATA & 0xFF;
};

/* Placeholder functions for the instruction set. */

MOS6502.prototype.ADC = function () {
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

    me._A = temp & 0xFF;

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

MOS6502.prototype.AND = function() {

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

};

MOS6502.prototype.ASL = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BCC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BCS = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BEQ = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BIT = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BMI = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BNE = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BPL = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BRK = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BVC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BVS = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CLC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CLD = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CLI = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CLV = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CMP = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CPX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.CPY = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.DEC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.DEX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.DEY = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.EOR = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.INC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.INX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.INY = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.JMP = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.JSR = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.LDA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.LDX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.LDY = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.LSR = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.NOP = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.ORA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.PHA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.PHP = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.PLA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.PLP = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.ROL = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.ROR = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.RTI = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.RTS = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.SBC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.SEC = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.SED = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.SEI = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.STA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.STX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.STY = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.TAX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.TAY = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.TSX = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.TXA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.TXS = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};

MOS6502.prototype.TYA = function(ADDR_MODE) {
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x00): OPER = me; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (" + opCode + ")" ); break;

    }
};