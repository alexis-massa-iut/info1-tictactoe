const path = require('path');
module.exports = {
    mode: 'development',
    entry: './www/js/index.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'js/tictactoe.bundle.js',
    },
    devtool: 'inline-source-map',
};