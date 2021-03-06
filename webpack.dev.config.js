const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');
const glob = require('glob');
const eslintFormatter = require("eslint/lib/formatters/stylish");

const pathResolve = (folder) => {
    return path.resolve(__dirname, folder);
}

module.exports = {
    mode: 'development',
    entry: './Assets/es6/home.js',
    output: {
        path: pathResolve('./wwwroot/js'),
        publicPath: pathResolve('./wwwroot'),
        filename: 'bundle.js',
        hotUpdateChunkFilename: '../../.hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: '../../.hot/[hash].hot-update.json'
    },
    watch: false,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    formatter: eslintFormatter,
                    emitWarning: true,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss|\.css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader",
                        options: {
                            includePaths: ['./node_modules'],
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    //context: pathResolve('./wwwroot'),
                    //useRelativePath: false,
                    outputPath: '../img',
                    publicPath: '/img'
                }
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "./plugin-config/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            modules: pathResolve('/node_modules'),
        }
    }
};