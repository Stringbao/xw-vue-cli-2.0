let path = require('path');
let webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist']),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin()
])

module.exports =  {
    mode:"production",
    entry: './leComponents.js',//入口
    output: {
        path: path.resolve(__dirname, './dist'),//输出结果
        filename: "le-components.min.js",
        library:"leComponents",
        libraryTarget : "umd",
        libraryExport:"default"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    },
                    presets: ['es2015'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    limit: 8192,
                    outputPath: 'static/images/'
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader:'url-loader',options:{name:'fonts/[name].[hash:8].[ext]'}//项目设置打包到dist下的fonts文件夹下
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "@CoreUILib":path.resolve(__dirname,"../admin/src/core/comps"),
            "@CoreSrc":path.resolve(__dirname,"../admin/src")
        }
    },
    performance: {
        hints: false
    },
    plugins:plugins
}
