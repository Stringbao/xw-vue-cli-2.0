const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    mode:"development",
    devtool:'eval-source-map',
    context: path.resolve(__dirname, ".."),
    entry: "./app/index.js",
    output:{
        path: path.resolve(__dirname, '../dist'),
    },
    module:{
        rules:[
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
                test: /\.(sc|sa|c)ss$/,
                use: [
                    'vue-style-loader',
                    "css-loader",
                    'sass-loader'
                ],
           }
        ]
    },
    resolve:{
        alias:{
            "@root":path.resolve(__dirname,".."),
            "@":path.resolve(__dirname,"../src/"),
            "@components":path.resolve(__dirname,"../src/components-v2"),
            // "@components":path.resolve(__dirname,"../src/components"),
            "@assets":path.resolve(__dirname,"../src/assets"),
            "@route":path.resolve(__dirname,"../app/route"),
            "@pages":path.resolve(__dirname,"../app/pages"),
            "@util":path.resolve(__dirname,"../src/tool"),
        },
        extensions: ['.vue', '.js','.json']
    },
    devServer: {
        contentBase: "./dist",
        compress: true,
        watchContentBase: true,
        openPage:"./index.html",
        port: 9000,
        open:true,
        hot:true,
        proxy:{
            '/': {
                target: 'https://admin.gl.lenovouat.cn',
                // target: 'https://admin.nec.lenovouat.cn',
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'test title',
            filename: 'index.html',
            template:"./src/index.html",
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin( {
            patterns:[ {
                from : path.join(__dirname,'../static'),
                to : 'static'
            },
            ]
        })
    ],
    watchOptions: {
        ignored: /node_modules/
    }
}