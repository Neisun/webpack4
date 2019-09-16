// 可以利用express启动一个服务，来模拟DevServer
// 只是扩展一下知识点，但是最好还是用devServer，比较方便
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const compiler = webpack(config);

const app = express();
app.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath
}))
app.listen(3000,() => {
    console.log("port 3000 is running")
})