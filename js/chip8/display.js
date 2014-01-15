var Chip8Display = function() {}

Chip8Display.prototype = {
    init: function(canvasID) {
        this.width = 64;
        this.height = 32;
        this.context = document.getElementById(canvasID).getContext('2d');
        this.context.fillStyle = '#FFF';
        this.scaleX = (this.context.clientWidth) / this.width;
        this.scaleY = (this.context.clientHeight) / this.height;
    },

    drawPixel: function(x,y) {
        this.context.fillRect(x, y, this.scaleX, this.scaleY);
    }
}