var JSEmuDisplay = function() {}

JSEmuDisplay.prototype = {
    init: function(width, height, stride, format) {
        this.width = width;
        this.height = height;
        this.stride = stride;
        this.format = format;
    },

    drawPixel: function(x,y) {
        this.context
    }
}