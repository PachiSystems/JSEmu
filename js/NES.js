/**
 * Nintendo Entertainment System (NES)
 *
 * In order to use this file, you must have the following JavaScript files included in the page:
 *  + 6502-CPU.js       <-- The Central Processing Unit
 *  + RP2C01-PPU.js     <-- The Picture Processing Unit
 *  + NESCartridge.js   <-- The cartridge/ROM loader
 */

var NES = NES || {};

NES.CPU = new MOS6502();
NES.PPU = new RP2C02();
NES.APU = null;
NES.CART = new NESCartridge();
NES.RAM = null;
NES.ROM = null;

/**
 * Right... Here's the idea... Everything is going to be bare bones from now on. The CPU wil ONLY handle OPCODES. The
 * PPU will ONLY handle graphic rendering. It will work on what is given to it from the individual SYSTEM files. This
 * file will provide the RAM/ROM that the CPU will run against. This means modules for cart loading and other functions
 * will have to be written, but it will make the thing a lot better in the long term. We are also switching to RequireJS
 * for module loading.
 */

MOS6502.prototype.beginEmulation = function(romImage, renderer) {
    var me = this;

    // Set the rendering engine of this CPU.
    me.renderer = renderer;

    // Load the romImage and then commence execution on successful load.
    me.loadImage(romImage);
};