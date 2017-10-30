// @ts-check
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const outputPath = path.resolve(__dirname, 'lib');
const development = process.env.NODE_ENV === 'development';

const requirePath = 'M:/projects/th_ext_1/node_modules/requirejs/require.js';

module.exports = {
    entry: path.resolve(__dirname, 'src-gen/frontend/index.js'),
    output: {
        filename: 'bundle.js',
        path: outputPath
    },
    target: 'web',
    node: {
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        crypto: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /node_modules.+xterm.+.map$/,
                loader: 'ignore-loader'
            },
            {
                /* Get rid of :

                   @theia/example-electron: WARNING in /home/emaisin/src/theia/~/xterm/lib/addons/attach/index.html
                   @theia/example-electron: Module parse failed: /home/emaisin/src/theia/node_modules/xterm/lib/addons/attach/index.html Unexpected token (1:0)
                   @theia/example-electron: You may need an appropriate loader to handle this file type.

                   See: https://github.com/theia-ide/theia/pull/688#issuecomment-338289418
                */

                test: /node_modules\/xterm\/lib\/addons\/attach\/index\.html/,
                loader: 'ignore-loader',
            },
            {
                // see https://github.com/theia-ide/theia/issues/556
                test: /source-map-support/,
                loader: 'ignore-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }
        ],
        noParse: /vscode-languageserver-types|vscode-uri/
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from: requirePath,
                to: '.'
            },
        ]),
        new CircularDependencyPlugin({
            exclude: /(node_modules|examples)\/./,
            failOnError: false // https://github.com/nodejs/readable-stream/issues/280#issuecomment-297076462
        })
    ],
    stats: {
        warnings: true
    }
};