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
        port:9985,
        proxy:{
            '/': {
                target: 'https://admin.nec.lenovouat.com/',
                secure: false,
                changeOrigin: true
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