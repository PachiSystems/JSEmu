const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        main: 'js/**/*.js'
    },
    output: {
        path: '/dist/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {},
    plugins: [],
    watch: true
}
