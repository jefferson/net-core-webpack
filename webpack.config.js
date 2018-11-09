const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

module.exports = {
    mode: 'development',
    entry: './Assets/es6/home.js',
    output: {
        path: path.resolve(__dirname, './wwwroot/js'),
        publicPath: path.resolve(__dirname, './wwwroot'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

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
                    formatter: require("eslint/lib/formatters/stylish"),
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
                use: 'file-loader'
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
            modules: __dirname + '/node_modules',
        }
    },
    // devServer: {
    //     port: 2828,
    //     contentBase: './public',
    //     historyApiFallback: true,
    //     hot: true,
    //     open: true,
    //     overlay: {
    //         warnings: false,
    //         errors: true
    //     },
    // }
};