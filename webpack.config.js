const path = require('path');

module.exports = {
    mode: "production",
    entry: ['./Scripts/es6/PortalCobranca.js'],
    output: {
        path: path.resolve(__dirname, './wwwroot/js'),
        filename: 'site.js'
    },
    // IMPORTANT NOTE: If you are using Webpack 2 or above, replace "loaders" with "rules"
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }]
    }
}