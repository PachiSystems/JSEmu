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
     * 0x8000 - 0xFFF9 = ROM
     *
     * 0xFFFA = Vector address for NMI (low byte)
     * 0xFFFB = Vector address for NMI (high byte)
     * 0xFFFC = Vector address for RESET (low byte)
     * 0xFFFD = Vector address for RESET (high byte)
     * 0xFFFE = Vector address for IRQ & BRK (low byte)
     * 0xFFFF = Vector address for IRQ & BRK (high byte)
     */
    this._RAM = new Uint8Array(0xFFFF);  // 64k of RAM.

};

MOS6502.prototype.init = function() {
    /**
     * CPU Start Up
     *
     * According to 6502 Programmer's Reference, this is how the CPU should initialise:
     * 1. Processor sets INTERRUPT to false an places the RESET Vector address in the PC.
     * 2. CPU executes whatever it finds there.
     * 3. Programmer should init the stack, init I/O, enable interrupts and set arithmetic mode.
     *
     * In this case, the only thing that needs doing, really, is to load the ROM, grab the address in the RESET
     * vector and set the PC and stack pointer to the right place.
     */

    var me = this;

    // Blank out the stack.
    for(var i = 0x0100; i <= 0x01F; i++) {
        me._RAM[i] = 0;
    }

    // Set INTERRUPT to false
    me._SET_INTERRUPT(false);

};

MOS6502.prototype.beginEmulation = function(romImage, renderer) {
    var me = this;

    // Set the rendering engine of this CPU.
    me.renderer = renderer;

    // Load the romImage and then commence execution on successful load.
    me.loadImage(romImage);
};

MOS6502.prototype.loadImage = function (romImage) {

    if (romImage == "TEST_MODE") return;

    var xhr = new XMLHttpRequest(),
        me = this,
        i, len;

    /**
     * GAME LOADING
     * Load the program into ROM memory. Check to make sure it's not too big as well...
     */
    xhr.open("GET",romImage);
    xhr.responseType = "arraybuffer";

    xhr.onload = function() {

        var program = new Uint8Array(xhr.response);

        if (program.length <= (0x7FFF)) {

            for (i = 0; i < program.length; i++) {

                me.memory[(i + 0x8000)] = program[i];

            }

            // Place address from the RESET vector into the PC ready to commence emulation.
            me._PC = me._MAKE_ADDRESS( me._RAM[0xFFFC], me._RAM[0xFFFD] );

            // Emulation loop to trigger once our ROM has finished loading.

            requestAnimFrame(function cpuCycle() {

                me.emulateCycle();

                requestAnimFrame(cpuCycle);

            });

        } else {

            console.error("This program will not fit into MOS6502 memory.");

        }

    };
    xhr.send();
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
        case (0x10) : me.BPL(); break;
        case (0x11) : me.ORA(); break;
        case (0x12) : break;  // Future expansion
        case (0x13) : break;  // Future expansion
        case (0x14) : break;  // Future expansion
        case (0x15) : me.ORA(); break;
        case (0x16) : me.ASL(); break;
        case (0x17) : break;  // Future expansion
        case (0x18) : me.CLC(); break;
        case (0x19) : me.ORA(); break;
        case (0x1A) : break;  // Future expansion
        case (0x1B) : break;  // Future expansion
        case (0x1C) : break;  // Future expansion
        case (0x1D) : me.ORA(); break;
        case (0x1E) : me.ASL(); break;
        case (0x1F) : break;  // Future expansion

        // 0x20 - 0x2F
        case (0x20) : me.JSR(); break;
        case (0x21) : me.AND(); break;
        case (0x22) : break;  // Future expansion
        case (0x23) : break;  // Future expansion
        case (0x24) : me.BIT(); break;
        case (0x25) : me.AND(); break;
        case (0x26) : me.ROL(); break;
        case (0x27) : break;  // Future expansion
        case (0x28) : me.PLP(); break;
        case (0x29) : me.AND(); break;
        case (0x2A) : me.ROL(); break;
        case (0x2B) : break;  // Future expansion
        case (0x2C) : me.BIT(); break;
        case (0x2D) : me.AND(); break;
        case (0x2E) : me.ROL(); break;
        case (0x2F) : break;  // Future expansion

        // 0x30 - 0x3F
        case (0x30) : me.BMI(); break;
        case (0x31) : me.AND(); break;
        case (0x32) : break;  // Future expansion
        case (0x33) : break;  // Future expansion
        case (0x34) : break;  // Future expansion
        case (0x35) : me.AND(); break;
        case (0x36) : me.ROL(); break;
        case (0x37) : break;  // Future expansion
        case (0x38) : me.SEC(); break;
        case (0x39) : me.AND(); break;
        case (0x3A) : break;  // Future expansion
        case (0x3B) : break;  // Future expansion
        case (0x3C) : break;  // Future expansion
        case (0x3D) : me.AND(); break;
        case (0x3E) : me.ROL(); break;
        case (0x3F) : break;  // Future expansion

        // 0x40 - 0x4F
        case (0x40) : me.RTI(); break;
        case (0x41) : me.EOR(); break;
        case (0x42) : break;  // Future expansion
        case (0x43) : break;  // Future expansion
        case (0x44) : break;  // Future expansion
        case (0x45) : me.EOR(); break;
        case (0x46) : me.LSR(); break;
        case (0x47) : break;  // Future expansion
        case (0x48) : me.PHA(); break;
        case (0x49) : me.EOR(); break;
        case (0x4A) : me.LSR(); break;
        case (0x4B) : break;  // Future expansion
        case (0x4C) : me.JMP(); break;
        case (0x4D) : me.EOR(); break;
        case (0x4E) : me.LSR(); break;
        case (0x4F) : break;  // Future expansion

        // 0x50 - 0x5F
        case (0x50) : me.BVC(); break;
        case (0x51) : me.EOR(); break;
        case (0x52) : break;  // Future expansion
        case (0x53) : break;  // Future expansion
        case (0x54) : break;  // Future expansion
        case (0x55) : me.EOR(); break;
        case (0x56) : me.LSR(); break;
        case (0x57) : break;  // Future expansion
        case (0x58) : me.CLI(); break;
        case (0x59) : me.EOR(); break;
        case (0x5A) : break;  // Future expansion
        case (0x5B) : break;  // Future expansion
        case (0x5C) : break;  // Future expansion
        case (0x5D) : me.EOR(); break;
        case (0x5E) : me.LSR(); break;
        case (0x5F) : break;  // Future expansion

        // 0x60 - 0x6F
        case (0x60) : me.RTS(); break;
        case (0x61) : me.ADC(); break;
        case (0x62) : break;  // Future expansion
        case (0x63) : break;  // Future expansion
        case (0x64) : break;  // Future expansion
        case (0x65) : me.ADC(); break;
        case (0x66) : me.ROR(); break;
        case (0x67) : break;  // Future expansion
        case (0x68) : me.PLA(); break;
        case (0x69) : me.ADC(); break;
        case (0x6A) : me.ROR(); break;
        case (0x6B) : break;  // Future expansion
        case (0x6C) : me.JMP(); break;
        case (0x6D) : me.ADC(); break;
        case (0x6E) : me.ROR(); break;
        case (0x6F) : break;  // Future expansion

        // 0x70 - 0x7F
        case (0x70) : me.BVS(); break;
        case (0x71) : me.ADC(); break;
        case (0x72) : break;  // Future expansion
        case (0x73) : break;  // Future expansion
        case (0x74) : break;  // Future expansion
        case (0x75) : me.ADC(); break;
        case (0x76) : me.ROR(); break;
        case (0x77) : break;  // Future expansion
        case (0x78) : me.SEI(); break;
        case (0x79) : me.ADC(); break;
        case (0x7A) : break;  // Future expansion
        case (0x7B) : break;  // Future expansion
        case (0x7C) : break;  // Future expansion
        case (0x7D) : me.ADC(); break;
        case (0x7E) : me.ROR(); break;
        case (0x7F) : break;  // Future expansion

        // 0x80 - 0x8F
        case (0x80) : break;  // Future expansion
        case (0x81) : me.STA(); break;
        case (0x82) : break;  // Future expansion
        case (0x83) : break;  // Future expansion
        case (0x84) : me.STY(); break;
        case (0x85) : me.STA(); break;
        case (0x86) : me.STX(); break;
        case (0x87) : break;  // Future expansion
        case (0x88) : me.DEY(); break;
        case (0x89) : break;  // Future expansion
        case (0x8A) : me.TXA(); break;
        case (0x8B) : break;  // Future expansion
        case (0x8C) : me.STY(); break;
        case (0x8D) : me.STA(); break;
        case (0x8E) : me.STX(); break;
        case (0x8F) : break;  // Future expansion

        // 0x90 - 0x9F
        case (0x90) : me.BCC(); break;
        case (0x91) : me.STA(); break;
        case (0x92) : break;  // Future expansion
        case (0x93) : break;  // Future expansion
        case (0x94) : me.STY(); break;
        case (0x95) : me.STA(); break;
        case (0x96) : me.STX(); break;
        case (0x97) : break;  // Future expansion
        case (0x98) : me.TYA(); break;
        case (0x99) : me.STA(); break;
        case (0x9A) : me.TXS(); break;
        case (0x9B) : break;  // Future expansion
        case (0x9C) : break;  // Future expansion
        case (0x9D) : me.STA(); break;
        case (0x9E) : break;  // Future expansion
        case (0x9F) : break;  // Future expansion

        // 0xA0 - 0xAF
        case (0xA0) : me.LDY(); break;
        case (0xA1) : me.LDA(); break;
        case (0xA2) : me.LDX(); break;
        case (0xA3) : break;  // Future expansion
        case (0xA4) : me.LDY(); break;
        case (0xA5) : me.LDA(); break;
        case (0xA6) : me.LDX(); break;
        case (0xA7) : break;  // Future expansion
        case (0xA8) : me.TAY(); break;
        case (0xA9) : me.LDA(); break;
        case (0xAA) : me.TAX(); break;
        case (0xAB) : break;  // Future expansion
        case (0xAC) : me.LDY(); break;
        case (0xAD) : me.LDA(); break;
        case (0xAE) : me.LDX(); break;
        case (0xAF) : break;  // Future expansion

        // 0xB0 - 0xBF
        case (0xB0) : me.BCS(); break;
        case (0xB1) : me.LDA(); break;
        case (0xB2) : break;  // Future expansion
        case (0xB3) : break;  // Future expansion
        case (0xB4) : me.LDY(); break;
        case (0xB5) : me.LDA(); break;
        case (0xB6) : me.LDX(); break;
        case (0xB7) : break;  // Future expansion
        case (0xB8) : me.CLV(); break;
        case (0xB9) : me.LDA(); break;
        case (0xBA) : me.TSX(); break;
        case (0xBB) : break;  // Future expansion
        case (0xBC) : me.LDY(); break;
        case (0xBD) : me.LDA(); break;
        case (0xBE) : me.LDX(); break;
        case (0xBF) : break;  // Future expansion

        // 0xC0 - 0xCF
        case (0xC0) : me.CPY(); break;
        case (0xC1) : me.CMP(); break;
        case (0xC2) : break;  // Future expansion
        case (0xC3) : break;  // Future expansion
        case (0xC4) : me.CPY(); break;
        case (0xC5) : me.CMP(); break;
        case (0xC6) : me.DEC(); break;
        case (0xC7) : break;  // Future expansion
        case (0xC8) : me.INY(); break;
        case (0xC9) : me.CMP(); break;
        case (0xCA) : me.DEX(); break;
        case (0xCB) : break;  // Future expansion
        case (0xCC) : me.CPY(); break;
        case (0xCD) : me.CMP(); break;
        case (0xCE) : me.DEX(); break;
        case (0xCF) : break;  // Future expansion

        // 0xD0 - 0xDF
        case (0xD0) : me.BNE(); break;
        case (0xD1) : me.CMP(); break;
        case (0xD2) : break;  // Future expansion
        case (0xD3) : break;  // Future expansion
        case (0xD4) : break;  // Future expansion
        case (0xD5) : me.CMP(); break;
        case (0xD6) : me.DEC(); break;
        case (0xD7) : break;  // Future expansion
        case (0xD8) : me.CLD(); break;
        case (0xD9) : me.CMP(); break;
        case (0xDA) : break;  // Future expansion
        case (0xDB) : break;  // Future expansion
        case (0xDC) : break;  // Future expansion
        case (0xDD) : me.CMP(); break;
        case (0xDE) : me.DEC(); break;
        case (0xDF) : break;  // Future expansion

        // 0xE0 - 0xEF
        case (0xE0) : me.CPX(); break;
        case (0xE1) : me.SBC(); break;
        case (0xE2) : break;  // Future expansion
        case (0xE3) : break;  // Future expansion
        case (0xE4) : me.CPX(); break;
        case (0xE5) : me.SBC(); break;
        case (0xE6) : me.INC(); break;
        case (0xE7) : break;  // Future expansion
        case (0xE8) : me.INX(); break;
        case (0xE9) : me.SBC(); break;
        case (0xEA) : me.NOP(); break;
        case (0xEB) : break;  // Future expansion
        case (0xEC) : me.CPX(); break;
        case (0xED) : me.SBC(); break;
        case (0xEE) : me.INC(); break;
        case (0xEF) : break;  // Future expansion

        // 0xF0 - 0xFF
        case (0xF0) : me.BEQ(); break;
        case (0xF1) : me.SBC(); break;
        case (0xF2) : break;  // Future expansion
        case (0xF3) : break;  // Future expansion
        case (0xF4) : break;  // Future expansion
        case (0xF5) : me.SBC(); break;
        case (0xF6) : me.INC(); break;
        case (0xF7) : break;  // Future expansion
        case (0xF8) : me.SED(); break;
        case (0xF9) : me.SBC(); break;
        case (0xFA) : break;  // Future expansion
        case (0xFB) : break;  // Future expansion
        case (0xFC) : break;  // Future expansion
        case (0xFD) : me.SBC(); break;
        case (0xFE) : me.INC(); break;
        case (0xFF) : break;  // Future expansion

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
        WRITE_ADDR = me._MAKE_ADDRESS(me._RAM[(byte1 + me._X) & 0xFF],me._RAM[(byte1 + me._X + 1) & 0xFF]);
    me._RAM[ WRITE_ADDR ] = DATA & 0xFF;
};

MOS6502.prototype.WriteIndirectY = function(byte1, DATA) {
    var me = this,
        WRITE_ADDR = me._MAKE_ADDRESS(me._RAM[0xFF & byte1] , me._RAM[0xFF & (byte1 + 1)]);
    me._RAM[WRITE_ADDR + me._Y ] = DATA & 0xFF;
};

/* Placeholder functions for the instruction set. */

MOS6502.prototype.ADC = function ADC() {
    /**

     ADC               Add memory to accumulator with carry                ADC

     Operation:  A + M + C -> A, C                         N Z C I D V
                                                           / / / _ _ /
     (Ref: 2.2.1)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Immediate     |   ADC #Oper           |    69   |    2    |    2     |
     |  Zero Page     |   ADC Oper            |    65   |    2    |    3     |
     |  Zero Page,X   |   ADC Oper,X          |    75   |    2    |    4     |
     |  Absolute      |   ADC Oper            |    60   |    3    |    4     |
     |  Absolute,X    |   ADC Oper,X          |    7D   |    3    |    4*    |
     |  Absolute,Y    |   ADC Oper,Y          |    79   |    3    |    4*    |
     |  (Indirect,X)  |   ADC (Oper,X)        |    61   |    2    |    6     |
     |  (Indirect),Y  |   ADC (Oper),Y        |    71   |    2    |    5*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if page boundary is crossed.

     */
    // Add memory to accumulator with carry

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get the operand to work on.
        case (0x61): OPER = me.ReadIndirectX(byte1); break;
        case (0x65): OPER = me.ReadZeroPage(byte1); break;
        case (0x69): OPER = byte1; break;
        case (0x6D): OPER = me.ReadAbsolute(byte1, byte2); break;
        case (0x71): OPER = me.ReadIndirectY(byte1, true); break;
        case (0x75): OPER = me.ReadZeroPageX(byte1); break;
        case (0x79): OPER = me.ReadAbsoluteY(byte1, byte2, true); break;
        case (0x7D): OPER = me.ReadAbsoluteX(byte1, byte2, true); break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Store Operand + accumulator. Plus one if carry flag is set.
    var temp = OPER + me._A + (me._IF_CARRY() ? 1 : 0);

    if( me._IF_DECIMAL() ) {

        if ( ( ( me._A & 0xF) + (OPER & 0xF) + (me._IF_CARRY() ? 1 : 0) ) > 9 ) {
            temp += 6;
        }

        me._SET_SIGN(temp);
        me._SET_OVERFLOW( !( (me._A ^ OPER) & 0x80 ) && ( ( me._A ^ temp) & 0x80) );

        if ( temp > 0x99) {
            temp += 96;
        }

        me._SET_CARRY(temp & 0x99);

    } else {

       me._SET_ZERO(temp & 0xFF);
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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.AND = function AND() {

    /**

     AND                  "AND" memory with accumulator                    AND

     Operation:  A /\ M -> A                               N Z C I D V
                                                           / / _ _ _ _
     (Ref: 2.2.3.0)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Immediate     |   AND #Oper           |    29   |    2    |    2     |
     |  Zero Page     |   AND Oper            |    25   |    2    |    3     |
     |  Zero Page,X   |   AND Oper,X          |    35   |    2    |    4     |
     |  Absolute      |   AND Oper            |    2D   |    3    |    4     |
     |  Absolute,X    |   AND Oper,X          |    3D   |    3    |    4*    |
     |  Absolute,Y    |   AND Oper,Y          |    39   |    3    |    4*    |
     |  (Indirect,X)  |   AND (Oper,X)        |    21   |    2    |    6     |
     |  (Indirect,Y)  |   AND (Oper),Y        |    31   |    2    |    5     |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if page boundary is crossed.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x21): OPER = me.ReadIndirectX(byte1); break;
        case (0x25): OPER = me.ReadZeroPage(byte1); break;
        case (0x29): OPER = byte1; break;
        case (0x2D): OPER = me.ReadAbsolute(byte1, byte2); break;
        case (0x31): OPER = me.ReadIndirectY(byte1,false); break;
        case (0x35): OPER = me.ReadZeroPageX(byte1); break;
        case (0x39): OPER = me.ReadAbsoluteY(byte1,byte2,true); break;
        case (0x3D): OPER = me.ReadAbsoluteX(byte1,byte2,true); break;

        default: console.error("Illegal AND opcode passed. (0x" + opCode.toSrting(16) + ")" ); break;

    }

    // This is easy. Bitwise AND with the accumulator.
    OPER &= me._A;

    // Set the sign flag if needed.
    me._SET_SIGN(OPER);

    // Set the zero flag if needed.
    me._SET_ZERO(OPER);

    // Store the value in the accumulator.
    me._A = OPER;

    switch (opCode) {
        // Increment the Program Counter and cycles.
        case (0x21): me._PC += 2; me._CYCLES += 6; break;
        case (0x25): me._PC += 2; me._CYCLES += 3; break;
        case (0x29): me._PC += 2; me._CYCLES += 2; break;
        case (0x2D): me._PC += 3; me._CYCLES += 4; break;
        case (0x31): me._PC += 2; me._CYCLES += 5; break;
        case (0x35): me._PC += 2; me._CYCLES += 4; break;
        case (0x39): me._PC += 3; me._CYCLES += 4; break;
        case (0x3D): me._PC += 3; me._CYCLES += 4; break;

        default: console.error("Illegal AND opcode passed. (0x" + opCode.toSrting(16) + ")" ); break;

    }

};

MOS6502.prototype.ASL = function ASL() {

    /**

     ASL          ASL Shift Left One Bit (Memory or Accumulator)           ASL
                      +-+-+-+-+-+-+-+-+
     Operation:  C <- |7|6|5|4|3|2|1|0| <- 0
                      +-+-+-+-+-+-+-+-+                    N Z C I D V
                                                           / / / _ _ _
     (Ref: 10.2)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Accumulator   |   ASL A               |    0A   |    1    |    2     |
     |  Zero Page     |   ASL Oper            |    06   |    2    |    5     |
     |  Zero Page,X   |   ASL Oper,X          |    16   |    2    |    6     |
     |  Absolute      |   ASL Oper            |    0E   |    3    |    6     |
     |  Absolute, X   |   ASL Oper,X          |    1E   |    3    |    7     |
     +----------------+-----------------------+---------+---------+----------+


     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x0A): OPER = me._A; break;
        case (0x06): OPER = me.ReadZeroPage(byte1); break;
        case (0x16): OPER = me.ReadZeroPageX(byte1); break;
        case (0x0E): OPER = me.ReadAbsolute(byte1,byte2); break;
        case (0x1E): OPER = me.ReadAbsoluteX(byte1,byte2,false); break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._SET_CARRY(src & 0x80);
    OPER <<= 1;
    OPER &= 0xFF;
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER);

    switch (opCode) {
        // Get Operand
        case (0x0A): me._A = OPER; me._PC += 1; me._CYCLES += 2; break;
        case (0x06): me.WriteZeroPage(OPER); me._PC += 2; me._CYCLES += 5; break;
        case (0x16): me.WriteZeroPageX(OPER); me._PC += 2; me._CYCLES += 6; break;
        case (0x0E): me.WriteAbsolute(byte1,byte2,OPER); me._PC += 3; me._CYCLES += 6; break;
        case (0x1E): me.WriteAbsoluteX(byte1,byte2,OPER); me._PC += 3; me._CYCLES += 7; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BCC = function BCC() {

    /**

     BCC                     BCC Branch on Carry Clear                     BCC
                                                           N Z C I D V
     Operation:  Branch on C = 0                           _ _ _ _ _ _
     (Ref: 4.1.1.3)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BCC Oper            |    90   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same page.
     * Add 2 if branch occurs to different page.

     */
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Since there isn't an operand to use, just check for legal opcode.
        case (0x90): OPER = byte1; break;

        default: console.error("Illegal BCC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // This is a peculiar one. The address it jumps to is relative to

    if (!me._IF_CARRY()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...
    }

    switch (opCode) {
        // Increment cycles, pc and write operand.

        // Always uses two cycles. Adds one if successful, add an extra one if crossing boundary.
        case (0x90): me._CYCLES += 2; break;

        default: console.error("Illegal BCC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BCS = function() {

    /**

     BCS                      BCS Branch on carry set                      BCS

     Operation:  Branch on C = 1                           N Z C I D V
                                                           _ _ _ _ _ _
     (Ref: 4.1.1.4)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BCS Oper            |    B0   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same  page.
     * Add 2 if branch occurs to next  page.

     */
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xB0): OPER = byte1; break;

        default: console.error("Illegal BCS opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    if (me._IF_CARRY()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...
    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xB0): me._CYCLES += 2; break;

        default: console.error("Illegal BCS opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BEQ = function() {

    /**

     BEQ                    BEQ Branch on result zero                      BEQ
                                                           N Z C I D V
     Operation:  Branch on Z = 1                           _ _ _ _ _ _
     (Ref: 4.1.1.5)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BEQ Oper            |    F0   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same  page.
     * Add 2 if branch occurs to next  page.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xF0): OPER = byte1; break;

        default: console.error("Illegal BEQ opcode passed. (0x" + opCode + ")" ); break;

    }

    if(me._IF_ZERO()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...

    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xF0): me._CYCLES += 2; break;

        default: console.error("Illegal BEQ opcode passed. (0x" + opCode + ")" ); break;

    }
};

MOS6502.prototype.BIT = function() {

    /**

     BIT             BIT Test bits in memory with accumulator              BIT

     Operation:  A /\ M, M7 -> N, M6 -> V

     Bit 6 and 7 are transferred to the status register.        N Z C I D V
     If the result of A /\ M is zero then Z = 1, otherwise      M7/ _ _ _ M6
     Z = 0
     (Ref: 4.2.1.1)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Zero Page     |   BIT Oper            |    24   |    2    |    3     |
     |  Absolute      |   BIT Oper            |    2C   |    3    |    4     |
     +----------------+-----------------------+---------+---------+----------+


     */
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x24): OPER = me.ReadZeroPage(byte1); break;
        case (0x2C): OPER = me.ReadAbsolute(byte1,byte2); break;

        default: console.error("Illegal BIT opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._SET_SIGN(OPER);
    me._SET_OVERFLOW(0x40 & OPER); // Copy bit 6 to overflow flag.
    me._SET_ZERO(OPER & me._A);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x24): me._CYCLES += 3; me._PC += 2; break;
        case (0x2C): me._CYCLES += 4; me._PC += 3; break;

        default: console.error("Illegal BIT opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BMI = function() {

    /**

     BMI                    BMI Branch on result minus                     BMI

     Operation:  Branch on N = 1                           N Z C I D V
                                                           _ _ _ _ _ _
     (Ref: 4.1.1.1)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BMI Oper            |    30   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same page.
     * Add 1 if branch occurs to different page.


     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x30): OPER = byte1; break;

        default: console.error("Illegal BMI opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    if(me._IF_SIGN()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 1 : 1;

        me._PC += relAddress; // The switch is going to add two to this...

    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x30): me._CYCLES += 2; break;

        default: console.error("Illegal BMI opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BNE = function() {

    /**

     BNE                   BNE Branch on result not zero                   BNE

     Operation:  Branch on Z = 0                           N Z C I D V
                                                           _ _ _ _ _ _
     (Ref: 4.1.1.6)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BMI Oper            |    D0   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same page.
     * Add 2 if branch occurs to different page.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xD0): OPER = byte1; break;

        default: console.error("Illegal BNE opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    if(!me._IF_ZERO()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...

    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xD0): me._CYCLES += 2; break;

        default: console.error("Illegal BNE opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BPL = function() {

    /**

     BPL                     BPL Branch on result plus                     BPL

     Operation:  Branch on N = 0                           N Z C I D V
                                                           _ _ _ _ _ _
     (Ref: 4.1.1.2)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BPL Oper            |    10   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same page.
     * Add 2 if branch occurs to different page.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x10): OPER = byte1; break;

        default: console.error("Illegal BPL opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    if(!me._IF_SIGN()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...

    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x10): me._CYCLES += 2; break;

        default: console.error("Illegal BPL opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BRK = function() {

    /**

     BRK                          BRK Force Break                          BRK

     Operation:  Forced Interrupt PC + 2 toS P toS         N Z C I D V
                                                           _ _ _ 1 _ _
     (Ref: 9.11)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   BRK                 |    00   |    1    |    7     |
     +----------------+-----------------------+---------+---------+----------+
     1. A BRK command cannot be masked by setting I.

     */

    var me = this,
        opCode = me._RAM[ me._PC ];

    switch (opCode) {
        // Get Operand
        case (0x00): break;

        default: console.error("Illegal BRK opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._PC++;

    // Push return address onto the stack.
    me._STACK.push( (me._PC >> 8) & 0xFF);
    me._STACK.push( me._PC & 0xFF );

    me._SET_BREAK((1));

    // Push the status register onto the stack.
    me._STACK.push( me._P );

    me._SET_INTERRUPT((1));

    me._PC = me._MAKE_ADDRESS( me._RAM[0xFFFE], me._RAM[0xFFFF]);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 7; break;

        default: console.error("Illegal BRK opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

};

MOS6502.prototype.BVC = function() {

    /**

     BVC                   BVC Branch on overflow clear                    BVC

     Operation:  Branch on V = 0                           N Z C I D V
                                                           _ _ _ _ _ _
     (Ref: 4.1.1.8)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BVC Oper            |    50   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same page.
     * Add 2 if branch occurs to different page.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x50): OPER = byte1; break;

        default: console.error("Illegal BVC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    if(!me._IF_OVERFLOW()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...

    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x50): me._CYCLES += 2; break;

        default: console.error("Illegal BVC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.BVS = function() {

    /**

     BVS                    BVS Branch on overflow set                     BVS

     Operation:  Branch on V = 1                           N Z C I D V
                                                           _ _ _ _ _ _
     (Ref: 4.1.1.7)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Relative      |   BVS Oper            |    70   |    2    |    2*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if branch occurs to same page.
     * Add 2 if branch occurs to different page.

     */
    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x70): OPER = byte1; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    if(me._IF_OVERFLOW()) {

        // So... Since there are no signed numbers in JS... We have to work it out.
        var relAddress = ( (OPER + 2) < 0x80 ) ? me._PC += OPER + 2 : me._PC += OPER + 2 - 256;

        me._CYCLES += ( (me._PC & 0xFF00) !=  (me._PC + relAddress) & 0xFF00) ? 2 : 1;

        me._PC += relAddress; // The switch is going to add two to this...

    }

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x70): me._CYCLES += 2; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CLC = function() {

    /**

     CLC                       CLC Clear carry flag                        CLC

     Operation:  0 -> C                                    N Z C I D V
                                                           _ _ 0 _ _ _
     (Ref: 3.0.2)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   CLC                 |    18   |    1    |    2     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ];

    switch (opCode) {
        // Get Operand
        case (0x18): break;

        default: console.error("Illegal CLC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._SET_CARRY(0);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x18): me._CYCLES += 2; me._PC += 1; break;

        default: console.error("Illegal CLC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CLD = function() {

    /**

     CLD                      CLD Clear decimal mode                       CLD

     Operation:  0 -> D                                    N A C I D V
                                                           _ _ _ _ 0 _
     (Ref: 3.3.2)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   CLD                 |    D8   |    1    |    2     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ];

    switch (opCode) {
        // Get Operand
        case (0xD8): break;

        default: console.error("Illegal CLD opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._SET_DECIMAL(0);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xD8): me._CYCLES += 2; me._PC += 1; break;

        default: console.error("Illegal CLD opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CLI = function() {

    /**

     CLI                  CLI Clear interrupt disable bit                  CLI

     Operation: 0 -> I                                     N Z C I D V
                                                           _ _ _ 0 _ _
     (Ref: 3.2.2)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   CLI                 |    58   |    1    |    2     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ];

    switch (opCode) {
        // Get Operand
        case (0x58): break;

        default: console.error("Illegal CLI opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._SET_INTERRUPT(0);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x58): me._CYCLES += 2; me._PC += 1; break;

        default: console.error("Illegal CLI opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CLV = function() {

    /**

     CLV                      CLV Clear overflow flag                      CLV

     Operation: 0 -> V                                     N Z C I D V
                                                           _ _ _ _ _ 0
     (Ref: 3.6.1)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   CLV                 |    B8   |    1    |    2     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ];

    switch (opCode) {
        // Get Operand
        case (0xB8): break;

        default: console.error("Illegal CLV opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    me._SET_OVERFLOW(0);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xB8): me._CYCLES += 2; me._PC += 1; break;

        default: console.error("Illegal CLV opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CMP = function() {

    /**

     CMP                CMP Compare memory and accumulator                 CMP

     Operation:  A - M                                     N Z C I D V
                                                           / / / _ _ _
     (Ref: 4.2.1)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Immediate     |   CMP #Oper           |    C9   |    2    |    2     |
     |  Zero Page     |   CMP Oper            |    C5   |    2    |    3     |
     |  Zero Page,X   |   CMP Oper,X          |    D5   |    2    |    4     |
     |  Absolute      |   CMP Oper            |    CD   |    3    |    4     |
     |  Absolute,X    |   CMP Oper,X          |    DD   |    3    |    4*    |
     |  Absolute,Y    |   CMP Oper,Y          |    D9   |    3    |    4*    |
     |  (Indirect,X)  |   CMP (Oper,X)        |    C1   |    2    |    6     |
     |  (Indirect),Y  |   CMP (Oper),Y        |    D1   |    2    |    5*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if page boundary is crossed.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xC9): OPER = byte1; break;
        case (0xC5): OPER = me.ReadZeroPage(byte1); break;
        case (0xD5): OPER = me.ReadZeroPageX(byte1); break;
        case (0xCD): OPER = me.ReadAbsolute(byte1,byte2); break;
        case (0xDD): OPER = me.ReadAbsoluteX(byte1,byte2,true); break;
        case (0xD9): OPER = me.ReadAbsoluteY(byte1,byte2,true); break;
        case (0xC1): OPER = me.ReadIndirectX(byte1); break;
        case (0xD1): OPER = me.ReadIndirectY(byte1,true); break;

        default: console.error("Illegal CMP opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER = me._A - OPER;
    me._SET_CARRY(OPER < 0x100);
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER &= 0xFFF);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xC9): me._PC += 2; me._CYCLES += 2; break;
        case (0xC5): me._PC += 2; me._CYCLES += 3; break;
        case (0xD5): me._PC += 2; me._CYCLES += 4; break;
        case (0xCD): me._PC += 3; me._CYCLES += 4; break;
        case (0xDD): me._PC += 3; me._CYCLES += 4; break;
        case (0xD9): me._PC += 3; me._CYCLES += 4; break;
        case (0xC1): me._PC += 2; me._CYCLES += 6; break;
        case (0xD1): me._PC += 2; me._CYCLES += 5; break;

        default: console.error("Illegal CMP opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CPX = function() {

    /**

     CPX                  CPX Compare Memory and Index X                   CPX
                                                           N Z C I D V
     Operation:  X - M                                     / / / _ _ _
     (Ref: 7.8)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Immediate     |   CPX *Oper           |    E0   |    2    |    2     |
     |  Zero Page     |   CPX Oper            |    E4   |    2    |    3     |
     |  Absolute      |   CPX Oper            |    EC   |    3    |    4     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xE0): OPER = byte1; break;
        case (0xE4): OPER = me.ReadZeroPage(byte1); break;
        case (0xEC): OPER = me.ReadAbsolute(byte1,byte2); break;

        default: console.error("Illegal CPX opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER = me._X - OPER;
    me._SET_CARRY(OPER < 0x100);
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER &= 0xFF);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xE0): me._CYCLES += 2; me._PC += 2; break;
        case (0xE4): me._CYCLES += 3; me._PC += 2; break;
        case (0xEC): me._CYCLES += 4; me._PC += 3; break;

        default: console.error("Illegal CPX opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.CPY = function() {

    /**

     CPY                  CPY Compare memory and index Y                   CPY
                                                           N Z C I D V
     Operation:  Y - M                                     / / / _ _ _
     (Ref: 7.9)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Immediate     |   CPY *Oper           |    C0   |    2    |    2     |
     |  Zero Page     |   CPY Oper            |    C4   |    2    |    3     |
     |  Absolute      |   CPY Oper            |    CC   |    3    |    4     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xC0): OPER = byte1; break;
        case (0xC4): OPER = me.ReadZeroPage(byte1); break;
        case (0xCC): OPER = me.ReadAbsolute(byte1,byte2); break;

        default: console.error("Illegal CPY opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER = me._Y - OPER;
    me._SET_CARRY(OPER < 0x100);
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER &= 0xFF);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xC0): me._CYCLES += 2; me._PC += 2; break;
        case (0xC4): me._CYCLES += 3; me._PC += 2; break;
        case (0xCC): me._CYCLES += 4; me._PC += 3; break;

        default: console.error("Illegal CPY opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.DEC = function() {

    /**

     DEC                   DEC Decrement memory by one                     DEC

     Operation:  M - 1 -> M                                N Z C I D V
                                                           / / _ _ _ _
     (Ref: 10.7)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Zero Page     |   DEC Oper            |    C6   |    2    |    5     |
     |  Zero Page,X   |   DEC Oper,X          |    D6   |    2    |    6     |
     |  Absolute      |   DEC Oper            |    CE   |    3    |    6     |
     |  Absolute,X    |   DEC Oper,X          |    DE   |    3    |    7     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xC6): OPER = me.ReadZeroPage(byte1); break;
        case (0xD6): OPER = me.ReadZeroPageX(byte1); break;
        case (0xCE): OPER = me.ReadAbsolute(byte1,byte2); break;
        case (0xDE): OPER = me.ReadAbsoluteX(byte1,byte2,false); break;

        default: console.error("Illegal DEC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER = (OPER - 1) & 0xFF;
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER &= 0xFF);

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xC6): me.WriteZeroPage(byte1,OPER); me._CYCLES += 5; me._PC += 2; break;
        case (0xD6): me.WriteZeroPageX(byte1,OPER); me._CYCLES += 6; me._PC += 2; break;
        case (0xCE): me.WriteAbsolute(byte1,byte2,OPER); me._CYCLES += 6; me._PC += 3; break;
        case (0xDE): me.WriteAbsoluteX(byte1,byte2,OPER); me._CYCLES += 7; me._PC += 3; break;

        default: console.error("Illegal DEC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.DEX = function() {

    /**

     DEX                   DEX Decrement index X by one                    DEX

     Operation:  X - 1 -> X                                N Z C I D V
                                                           / / _ _ _ _
     (Ref: 7.6)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   DEX                 |    CA   |    1    |    2     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0xCA): OPER = me._X; break;

        default: console.error("Illegal DEX opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER = (OPER - 1) & 0xFF;
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER);
    me._X = OPER;

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0xCA): me._CYCLES += 2; me._PC += 1; break;

        default: console.error("Illegal DEX opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.DEY = function() {

    /**

     DEY                   DEY Decrement index Y by one                    DEY

     Operation:  X - 1 -> Y                                N Z C I D V
                                                           / / _ _ _ _
     (Ref: 7.7)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Implied       |   DEY                 |    88   |    1    |    2     |
     +----------------+-----------------------+---------+---------+----------+

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x88): OPER = me._Y; break;

        default: console.error("Illegal DEY opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER = (OPER - 1) & 0xFF;
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER);
    me._Y = OPER;

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x88): me._CYCLES += 2; me._PC += 1; break;

        default: console.error("Illegal DEY opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};

MOS6502.prototype.EOR = function() {

    /**

     EOR            EOR "Exclusive-Or" memory with accumulator             EOR

     Operation:  A EOR M -> A                              N Z C I D V
                                                           / / _ _ _ _
     (Ref: 2.2.3.2)
     +----------------+-----------------------+---------+---------+----------+
     | Addressing Mode| Assembly Language Form| OP CODE |No. Bytes|No. Cycles|
     +----------------+-----------------------+---------+---------+----------+
     |  Immediate     |   EOR #Oper           |    49   |    2    |    2     |
     |  Zero Page     |   EOR Oper            |    45   |    2    |    3     |
     |  Zero Page,X   |   EOR Oper,X          |    55   |    2    |    4     |
     |  Absolute      |   EOR Oper            |    40   |    3    |    4     |
     |  Absolute,X    |   EOR Oper,X          |    5D   |    3    |    4*    |
     |  Absolute,Y    |   EOR Oper,Y          |    59   |    3    |    4*    |
     |  (Indirect,X)  |   EOR (Oper,X)        |    41   |    2    |    6     |
     |  (Indirect),Y  |   EOR (Oper),Y        |    51   |    2    |    5*    |
     +----------------+-----------------------+---------+---------+----------+
     * Add 1 if page boundary is crossed.

     */

    var me = this,
        opCode = me._RAM[ me._PC ],
        byte1 = me._RAM[ me._PC + 1],
        byte2 = me._RAM[ me._PC + 2],
        OPER;

    switch (opCode) {
        // Get Operand
        case (0x49): OPER = byte1; break;
        case (0x45): OPER = me.ReadZeroPage(byte1); break;
        case (0x55): OPER = me.ReadZeroPageX(byte1); break;
        case (0x40): OPER = me.ReadAbsolute(byte1,byte2); break;
        case (0x5D): OPER = me.ReadAbsoluteX(byte1,byte2,true); break;
        case (0x59): OPER = me.ReadAbsoluteY(byte1,byte2,true); break;
        case (0x41): OPER = me.ReadIndirectX(byte1); break;
        case (0x51): OPER = me.ReadIndirectY(byte1,true); break;

        default: console.error("Illegal EOR opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    OPER ^= me._A;
    me._SET_SIGN(OPER);
    me._SET_ZERO(OPER);
    me._A = OPER;

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x49): me._CYCLES += 2; me._PC += 2; break;
        case (0x45): me._CYCLES += 3; me._PC += 2; break;
        case (0x55): me._CYCLES += 4; me._PC += 2; break;
        case (0x40): me._CYCLES += 4; me._PC += 3; break;
        case (0x5D): me._CYCLES += 4; me._PC += 3; break;
        case (0x59): me._CYCLES += 4; me._PC += 3; break;
        case (0x41): me._CYCLES += 6; me._PC += 2; break;
        case (0x51): me._CYCLES += 5; me._PC += 2; break;

        default: console.error("Illegal EOR opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

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

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }

    // Implementation of instruction here

    switch (opCode) {
        // Increment cycles, pc and write operand.
        case (0x00): me._CYCLES += 0; me._PC += 0; break;

        default: console.error("Illegal ADC opcode passed. (0x" + opCode.toString(16) + ")" ); break;

    }
};