var chip8 = function() {
    this.reset();
}

chip8.prototype.reset = function() {
    /* Memory allocation
     * Chip-8 has 4k RAM from 0x000 (0) to 0xFFF (4095).
     * The first 512 bytes (0x000 - 0x1FF) are where the original interpreter were located
     * and should not be used by any programs built for Chip-8.
     * Most programs start at 0x200, but some begin at 0x600.
     * Programs beginning at 0x600 are intended for the ETI 660 computer.
     */
    this.memory = new Array(4096); // Chip-8 has 4k RAM from 0x000 (0) to 0xFFF (4095)

    /* General Purpose Registers
     * Chip-8 has 16 general purpose 8-bit registers usually referred to as Vx, where x is a HEX digit (0-F).
     * There is also a 16-bit register called I which is generally used to store memory addresses.
     *
     * There are also two special purpose registers for the delay and sound timers. When these registers are
     * non-zero, they are automatically decremented at a rate of 60Hz.
     *
     * There are also some "pseudo-registers" which are not accessible from Chip-8 programs:
     * - The Program Counter (PC) should be 16-bit and is used to store the currently executing address.
     * - The Stack Pointer (SP) can be 8-bit and it is used to point to the topmost level of the stack.
     *
     * The stack is an array of 16 16-bit values, used to store the address that the interpreter should
     * return to when finishing a subroutine. As a result, Chip-8 allows for up to 16 levels of nesting.
     */

    this.v = new Array(16);  // General purpose v[0] - v[15]
    this.i = 0; // Store memory addresses
    this.delay = 0; // Special - Delay timer
    this.sound = 0; // Special - Sound timer
    this.pc = 0; // Program Counter
    this.sp = 0; // Stack Pointer
    this.stack = new Array(16); // The stack

}

