const path = require('path');
module.exports = {
    mode:"production",
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"library.js",
        // 可以通过script标签引用
        library:"library",
        // 可以通过cmd amd的方式引用
        libraryTarget:'umd'
    },
    // 在打包的时候把lodash排除在外
    externals:["lodash"],
}