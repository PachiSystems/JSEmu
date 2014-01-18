/**
 * requestAnimationFrame - Since not all browsers support it and since it's impossible to update the UI from a while
 * loop or any kind of blocking loop, then we're going to use a polyfill to make requestAnimationFrame a universal
 * thing.
 */

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 0);
           }
})();