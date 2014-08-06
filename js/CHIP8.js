/** CHIP8 System **/
require(['CHIP8/CHIP8.js','CHIP8/CHIP8Renderer.js'],function(Chip8CPU,Chip8GPU){
    var CHIP8 = CHIP8 || {};

    CHIP8.CPU = new Chip8CPU.Chip8Emu();
    CHIP8.GPU = new Chip8GPU.Chip8Display();

    renderer.init('chip8Screen');

    emu.beginEmulation("roms/chip8/spaceinv.ch8",renderer);
});