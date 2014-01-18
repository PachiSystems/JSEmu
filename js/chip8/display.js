var Chip8Display = function() {};

Chip8Display.prototype = {

    init: function(canvasID) {
        this.context = document.getElementById(canvasID).getContext('2d');
        this.width = 64;
        this.height = 32;
        this.context.fillStyle = '#FFF';
        this.scaleX = 10; //(this.context.clientWidth) / this.width;
        this.scaleY = 10; //(this.context.clientHeight) / this.height;

        this.clearScreen();

    },

    renderScreen: function(vRam) {
        /**
         * Drawing shizzles!... Badly!
         * There must be some way to not have to itterate through the WHOLE array every time... This is moved from the
         * chip8.js in order to have a little more separation.
         */
        var me = this,
            i, len,
            y = 0;

        for (i = 0 , len = vRam.length; i < len ; i++) {

            if(vRam[i] == 1) {

                me.drawPixel(i % 64, y,'#FFF');

            } else {

                me.drawPixel(i % 64, y,'#000');

            }

            if(i % 64 == 0 && i % 32 == 0 && i != 0) { y++; }

        }

    },

    drawPixel: function(x,y,colour) {
        this.context.fillStyle = colour;
        this.context.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);
    },

    clearScreen: function(colour) {
        // This might take some of the computer cycles away from that horrid clear screen function in the CPU.
        this.context.fillStyle = colour || '#000';
        this.context.fillRect(0, 0, this.width * this.scaleX, this.height * this.scaleY);
    }

}