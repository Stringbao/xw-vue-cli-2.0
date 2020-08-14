const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
module.exports = {
    mode: "production",
    devtool: "source-map",
    context: path.resolve(__dirname, ".."),
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'leComponent.min.js',
        library: 'LeComponent',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.vue$/,
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
    externals: { // 对象
        // jquery: { // UMD
        //     commonjs: "jQuery",
        //     commonjs2: "jQuery",
        //     amd: "jQuery",
        //     root: "$"
        // }
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src/"),
            "@components": path.resolve(__dirname, "../src/components"),
            "@assets": path.resolve(__dirname, "../src/assets"),
        },
        extensions: ['.vue', '.js', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new SimpleProgressWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ]
}