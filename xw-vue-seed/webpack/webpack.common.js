const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
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
                test: /\.(scss|sass|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModules: true,
                            hmr: argv.mode == 'development',
                            reloadAll: true,
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test:/.vue$/,
                loader: 'vue-loader'
            }
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
            template: './src/index.html',
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
    ],
}
