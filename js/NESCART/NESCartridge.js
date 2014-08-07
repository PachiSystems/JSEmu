/**
 * NES cartridge loader.
 *
 * So... Looking at some other emulators, it seems they use a cartridge loader due to some header information that
 * changes depending on the game and thus maps differently... So I'll do the same.
 *
 * This file contains a loadCart() function which takes a string for the path of the file. It returns the file as
 * a UInt8Array ready to be acted upon by the CPU. It's up to the calling script to place the return of this function
 * into the correct place in memory and then fire the emulation.
 *
 */

var NESCartridge = function () {

    this.prgCount = 0;
    this.chrCount = 0;
    this.controlByte1 = 0;
    this.controlByte2 = 0;
    this.mapperNumber = 0;
    this.trainerData = [];
    this.prgData = [];
    this.chrData = [];

    this._TRAINER_SIZE = 0x200; // 512 bytes
    this._PRG_SIZE = 0x4000; // 16k
    this._CHR_SIZE = 0x2000; // 8k
    this._MIRRORING_MASK = 1;
    this._SRAM_MASK = 2;
    this._TRAINER_MASK = 4;
    this._FOUR_SCREEN_MASK = 8;

};

NESCartridge.prototype.loadCart = function (romImage) {

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