/**
 *  RIOCH - RP2C02 (NTSC)
 *
 *  This is the Picture Processing Unit found in the Nintendo Entertainment System / Famicom.
 *
 *  Once this is complete, then we should be able to hook up with the CPU and display something.
 *  Give this bad boy a canvas ID in the constructor so that it can render its output.
 */

var RP2C02 = function() {

    this._CANVAS = document.getElementById("#NES-Screen");
    this._CTX = this._CANVAS.getContext('2d');

    /** The MOS6502 consists of 64 pre-set colours. 56 of these are unique and only 25 can be displayed on screen at any one time. **/
    this._PALETTE = [
        /*          00       01       02       03       04       05       06       07       08       09       0A       0B       0C       0D       0E       0F    */
        /* 00 */ '7C7C7C','0000FC','0000BC','4428BC','940084','A80020','A81000','881400','503000','007800','006800','005800','004058','000000','000000','000000',
        /* 10 */ 'BCBCBC','0078F8','0058F8','6844FC','D800CC','E40058','F83800','E45C10','AC7C00','00B800','00A800','00A844','008888','000000','000000','000000',
        /* 20 */ 'F8F8F8','3CBCFC','6888FC','9878F8','F878F8','F85898','F87858','FCA044','F8B800','B8F818','58D854','58F898','00E8D8','787878','000000','000000',
        /* 30 */ 'FCFCFC','A4E4FC','B8B8F8','D8B8F8','F8B8F8','F8A4C0','F0D0B0','FCE0A8','F8D878','D8F878','B8F8B8','B8F8D8','00FCFC','F8D8F8','000000','000000'
    ];

    this._RAM = new Uint8Array(0x4000); // 16k of RAM for the PPU.

    this._SCANLINE = 0;
    this._VBLANK = 248;

    this._REGISTER2000 = [0, 0, 0, 0, 0, 0, 0, 0];
    this._REGISTER2001 = [0, 0, 0, 0, 0, 0, 0, 0];
    this._REGISTER2006 = [0, 0, 0, 0, 0, 0, 0, 0];
    this._SCROLL_REGISTER = [0, 0, 0, 0, 0, 0, 0, 0];

    this._NAME_TABLES = new Uint8Array(0xF00);

    var i, len;
    // Blank the RAM and Name Tables.
    for(i = 0, len = this._RAM.length; i < len; i++) {
        this._RAM[i] = 0x00;
    }

    for(i = 0, len = this._NAME_TABLES; i < len; i++) {
        this._NAME_TABLES[i] = 0x00;
    }
};