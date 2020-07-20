const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common,{
    mode:"development",
    devtool:'eval-source-map',
    module:{
        rules:[
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
    devServer:{
        contentBase:["./dist"],
        hot:true,
        watchContentBase: true,
        openPage:"./index.html",
        port:9987,
        proxy:{
            '/v2API': {
                target: 'http://localhost:9876',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/v2API": ""
                },
            }
        }
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    watchOptions: {
        ignored: /node_modules/
    }
})