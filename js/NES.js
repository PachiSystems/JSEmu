/** Nintendo Entertainment System (NES) **/
define(['MOS6502/6502-CPU.js','RP2C02/RP2C02-PPU.js'], function() {
    var NES = NES || {};

    NES.CPU = new MOS6502();
    NES.PPU = new RP2C02();
    NES.APU = null;
    NES.CART = null;
    NES.RAM = null;
    NES.ROM = null;

});

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

MOS6502.prototype.loadImage = function (romImage) {

    if (romImage === undefined) return;

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

        for (i = 0, len = program.length; i < len; i++) {

            if (romImage == "TEST_MODE") {
                me._RAM[(i + 0x4000)] = program[i];
                me._RAM[0xFFFC] = 0x00;
                me._RAM[0xFFFD] = 0x40;
            } else {
                me._RAM[(i + 0x8000)] = program[i];
            }

        }

        // Place address from the RESET vector into the PC ready to commence emulation.
        me._PC = me._MAKE_ADDRESS( me._RAM[0xFFFC], me._RAM[0xFFFD] );

        // Emulation loop to trigger once our ROM has finished loading.

        requestAnimFrame(function cpuCycle() {

            me.emulateCycle();

            requestAnimFrame(cpuCycle);

        });

    };
    xhr.send();
};