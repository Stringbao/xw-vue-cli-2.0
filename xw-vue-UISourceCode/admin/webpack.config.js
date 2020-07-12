let path = require('path');
let webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env = {}) =>{
    console.log(`------------------- ${env.Generative?'生产':'开发'}环境 -------------------`);
    let plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(['dist']),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ])
    if(!env.Generative){
        plugins = [];
    }
    plugins.push(new CopyWebpackPlugin([{
        // from: './src/static',
        // to: 'static'
        from : path.join(__dirname,'./src/static'),
        to : 'static'
    }]));
    plugins.push(new HtmlWebpackPlugin({template: './src/index.html'}));

    const ver = new Date().getTime();
    return {
        entry: ['babel-polyfill','./src/main.js'],//入口
        output: {
            path: path.resolve(__dirname, './dist'),//输出结果
            publicPath: env.production ? './' : '/', //文件路径
            filename: '[name].js?v='+ver,
            chunkFilename: '[id].chunk.js?v='+ver
        },
        module: {
            rules: [
                //  使用vue-loader 加载 .vue 结尾的文件
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                        },
                        // other vue-loader options go here
                        presets: ['es2015'],
                        plugins: ['transform-runtime', 'transform-object-rest-spread']
                    },
                    // query: {
                        
                    // }
                },
                // 使用babel 加载 .js 结尾的文件
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    include: [
                        path.join(__dirname,"../Core_UI_Lib/*"),
                        path.join(__dirname,"./src")
                    ]
                },
                // 加载图标
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        limit: 8192,
                        outputPath: 'static/images/'
                    }
                },
                //加载css
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader",
                    // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    // exclude: /node_modules/
                },
                {
                    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                    loader:'url-loader',
                    options:{name:'fonts/[name].[hash:8].[ext]'}//项目设置打包到dist下的fonts文件夹下

                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.vue', '.js', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                "@CoreUILib":path.resolve(__dirname,"../Core_UI_Lib/dist"),
                "@":path.resolve(__dirname,"./src")
            }
        },
        externals: {
            "BMap": "BMap"
        },
        devServer: {
            inline: true, //检测文件变化，实时构建并刷新浏览器
            port: "9999",
            proxy: {
                '/': {
                    // target:"http://localhost:9998/",
                    target: 'https://admin.nec.lenovouat.com/',
                    // target: 'http://admin.lenovouat.com/',
                    // pathRewrite: {
                    //     "^/api": ""
                    // },
                    secure: false,
                    changeOrigin: true
                },
            },
            //404 页面返回 index.html
            historyApiFallback: true,
        },
        performance: {
            hints: false
        },
        plugins:plugins,
        // devtool: '#eval-source-map'//开发模式下更方便定位错误
        devtool:env.Generative?false:'#eval-source-map'
    }
}
