// 添加热模块更新，所谓热模块更新，就是指，加载的模块如果有改动或者更新不用刷新整个页面
const webpack = require('webpack');
// 合并配置的插件
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig,{
    mode:"development",
    devtool:'cheap-module-eval-source-map',
    devServer:{
        contentBase:'../dist',
        // 自动开启浏览器
        open:true,
        // 开启热模块更新
        hot:true
    },
    // 配置tree shaking
    // 理论上在dev环境中不需要配置，就是为了演示需要，因为在production环境中会自动进行tree shaking
    // optimization:{
    //     usedExports:true
    // },
    // 开发环境下无需考虑到缓存问题，就不需要添加contenthash
    output:{
        filename:'[name].js',
        chunkFilename:'[name].js'
    },
    plugins:[
        // 使用热模块更新插件
        new webpack.HotModuleReplacementPlugin()
    ]
});