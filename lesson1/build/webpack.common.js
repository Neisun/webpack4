const path = require('path');
// 自动生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除dist文件夹，避免缓存，写法已经改变，使用的时候可以查阅文档
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Webpack = require('webpack');
module.exports = {
    // entry:"./src/index.js",
    // 其实entry默认对应的key是main entry:"./src/index.js" =>entry:{main:"src/index.js"}
    entry:{
        app:"./src/index.js",
    },
    output:{
        // 比如打包之后的js文件需要上传到cdn上，那么我们可以直接配置publicPath
        // 当然也可以让后端同学自己改
        // publicPath:'https://www.cdn.com',
        // publicPath:'./',
        // filename:"[name].js",
        path:path.resolve(__dirname,'../dist')
    },
    optimization:{
        // 配置一下tree shaking，个人感觉dev环境不需要tree shaking
        // usedExports:true,
        //代码分割 code splitting的配置
        // 代码分割其实是有默认配置的，如果不加以修改，那么就会按照默认配置去执行
        splitChunks:{
            // 打包什么模块 async all 
            // 也可以是一个回调函数
            // chunks (chunk) {
            //     // exclude `my-excluded-chunk`
            //     return chunk.name !== 'my-excluded-chunk';
            //   }
            chunks: 'all',
            // 要打包的文件最少30KB，如果小于30kb就不会做代码分割
            minSize: 30000,
            // 要打包的文件最大是多少，超过这个就不要做代码分割
            maxSize: 0,
            // 模块最少用几次才会被分割
            minChunks: 1,
            // Maximum number of parallel requests when on-demand loading.
            maxAsyncRequests: 5,
            // Maximum number of parallel requests at an entry point.
            maxInitialRequests: 3,
            // 连接符
            automaticNameDelimiter: '~',
            // 生成名字的最长长度
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                // 在做静态代码分割的时候需要配置vendors项
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                // 可以直接命名
                // filename:"common.js"
                // 可以不添加连接符
                name:'vendors'
              },
              default: {
                minChunks: 2,
                priority: -20,
                // 重复使用
                reuseExistingChunk: true,
                // filename:"default.js"
              },
            //   提取单独的css文件配置
            //   styles:{
            //       name:"test",
            //       test:/\.(css|less)$/,
            //       chunks:"all",
            //       enforce:true
            //   }
            }
            
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader"
            },
            {
                test:/\.jpg$/,
                use:{
                    // file-loader做的事其实就是把对应的文件复制出来到相应的文件夹
                    // loader:'file-loader'
                    // url-loader是把文件转化为base64格式
                    loader:"url-loader",
                    options:{
                        name:"[name]_[hash].[ext]",
                        outputPath:'images/',
                        limit:10240
                    }
                }
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/,
                use:{
                    loader:'file-loader'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
        }),
        // 关于cleanwebpackplugin的使用最好在出问题的时候去查一下
        // 因为产检更新了。。。
        new CleanWebpackPlugin({
            verbose:true
        }),
        // shimming 用于处理一些不规范的第三方库
        new Webpack.ProvidePlugin({
            "$":"jquery"
        })
    ]
}