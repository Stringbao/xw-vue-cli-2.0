const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require("webpack");
module.exports = {
    context: path.resolve(__dirname, ".."),
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'scripts/[name].[hash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            
            {
                test:/.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    resolve: {
        alias: {
            "@constant":path.resolve(__dirname,"..","./src/constant"),
            "@model":path.resolve(__dirname,"..","./src/model"),
            "@route":path.resolve(__dirname,"..","./src/route"),
            "@css": path.resolve(__dirname,'..','./src/css'),
            "@services": path.resolve(__dirname,'..','./src/services'),
            "@util": path.resolve(__dirname,'..','./src/util'),
            "@helper": path.resolve(__dirname,'..','./src/helper'),
            "@store": path.resolve(__dirname,'..','./src/store'),
            "@pages": path.resolve(__dirname,'..','./src/pages'),
            "@assets": path.resolve(__dirname,'..','./src/assets')
        },
        extensions: ['.vue', '.js','.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'test title',
            filename: 'index.html',
            templateContent:`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <div id="app"></div> 
                </body>
            </html>`,
            chunks:['index','runtime','vendors'],
            inject: true,
            minify: {
               html5: true,
               collapseWhitespace: true,
               preserveLineBreaks: false,
               minifyCSS: true,
               minifyJS: true,
               removeComments: false
            }
        }),
        new webpack.ProvidePlugin({
            Ajax: [path.resolve(__dirname,'..','./src/util/http.js'),"default"],
            // ...
        })
    ],
}
