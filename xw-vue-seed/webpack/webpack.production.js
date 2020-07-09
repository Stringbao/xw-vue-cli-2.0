const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

module.exports = merge(common,{
    mode:"production",
    devtool:"source-map",
    output:{
        
    },  
    plugins:[
        new CleanWebpackPlugin(),
        new SimpleProgressWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization:{
        splitChunks:{
            cacheGroups: {
                vendors: {
                    test: /[\/]node_modules[\/]/,
                    minChunks:1,
                    priority: -10,
                    name:'vendors',
                    chunks: "all"
                }
            },
        }, 
        runtimeChunk: {
            name: 'runtime'
        }  
    }
})