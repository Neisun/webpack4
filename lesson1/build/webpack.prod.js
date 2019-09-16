// 合并配置的插件
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
// 提取css文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 提取出来还得压缩css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 引入PWA模块
const workboxPlugin = require("workbox-webpack-plugin");
module.exports = merge(commonConfig,{
    mode:"production",
    devtool:"cheap-module-source-map",
    // 生产环境为了避免浏览器的缓存问题，需要添加contenthash配置
    // 顾名思义，如若文件的内容变换了，那么就改变hash值
    output:{
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].[contenthash].js'
    },
    module:{
        rules:[
            {
                test:/\.(less|css)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // 'css-loader',
                    {
                        loader:'css-loader',
                        options:{
                            // 是否开启css 模块化
                            // modules:true,
                            // 在处理css文件的时候，可以引入别的loader进行处理，数字表示css-loader之前有几个loader
                            importLoaders:2,
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            },
        ]
    },
    optimization:{
        // 配置tree shaking
        usedExports:true,
        // 配置压缩，目前仅仅只是压缩了css文件
        minimizer:[
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
        }),
        new workboxPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
        })
    ]
})