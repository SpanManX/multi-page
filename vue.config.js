/*let path = require("path");
let glob = require("glob");
// console.log(path)
// 配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {},
        basename,
        tmp,
        pathname,
        appname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        // console.log(entry)
        tmp = entry.split("/").splice(-3);
        console.log(tmp);
        pathname = basename; // 正确输出js和html的路径

        // console.log(pathname)
        entries[pathname] = {
            entry: "src/" + tmp[0] + "/" + tmp[1] + "/main.js",
            template: "src/" + tmp[0] + "/" + tmp[1] + "/" + tmp[2],
            title: tmp[2],
            filename: tmp[2],
        };
    });
    return entries;
}

let pages = getEntry("src/pages/!**?/!*.html");
console.log(pages);*/

// let path = require("path");

let fs = require("fs")
let os = require("os")
let path = require("path")
let localPath = path.resolve().split('\\').join('/') // 获取项目路径，并将 "\" 转换为 "/"

/**
 * 重写路由文件和 main.js 文件
 * os.tmpdir()为系统临时文件夹路径
 * @param {String}     key - 模块名称
 * @param {String} mainStr - main.js文件内容
 **/
function write(key, mainStr) {
    let mode = null
    const routerStr = fs.readFileSync('src/router/index.js', {encoding: 'utf-8'}) // 读取路由文件
    let regularContent = routerStr.match(/\bmode:\s*'history'/g) //截取路由mode模式

    /**
     * vue-router默认为 mode:hash 模式，所以只需要匹配 mode:history 模式，
     * mode:'history' 不为注释状态且 regularContent 不为null
     **/
    if (!/\/\/\s*\bmode:\s*'history'/g.test(routerStr) && regularContent) {
        mode = regularContent[0]
    }

    let routerArr = routerStr.split(/\r?\n/g) // 字符串转为数组
    let routerLen = routerArr.length
    let interfaceName = ''
    let intercept = null
    let routerContext = null
    let variable = null

    for (let i = 0; i < routerLen; i++) {
        // 获取 import xxxx from 'vue-router' 接口名称
        if (routerArr[i].indexOf('vue-router') > -1) {
            interfaceName = routerArr[i].split(/\s/g)[1]
        }

        if (routerArr[i].indexOf(`new ${interfaceName}`) > -1) {
            // 从 new VueRouter 截取到数组结尾，在转为字符串
            intercept = routerArr.splice(i).join('\n')
            // 从第一个 }) 位置开始截取
            routerContext = intercept.substring(intercept.search(/\}\s*\)/) + 2, intercept.length)
            // 匹配变量 = new VueRouter
            variable = intercept.match(/\w*\s(?==)/g)[0]
            break
        }
    }

    // 写入路由文件
    fs.writeFileSync(`${os.tmpdir()}/${key}Router.js`,
        "import Vue from 'vue'\n" +
        "import VueRouter from 'vue-router'\n" +
        `import index from '${localPath}/src/pages/${key}/router'\n` +
        "Vue.use(VueRouter)\n" +
        `const routes = [{
            path: '/',
            component: () => import('${localPath}/src/views/layout'),
            children: [
                ...index,
                 ]
            }]\n` +
        `const ${variable} = new VueRouter({\n` +
        `${mode ? mode + ',' : ''}\n` +
        "routes\n" +
        "})\n" +
        routerContext, {encoding: 'utf-8'})

    let arr = mainStr.split(/\r?\n/g)
    let len = arr.length
    for (let i = 0; i < len; i++) {
        // 修改app.vue文件路径
        if (arr[i].indexOf("import App from './app'") > -1) {
            arr[i] = `import App from '${localPath}/src/app'`
        }
        // 修改路由文件名称
        if (arr[i].indexOf("import router from './router'") > -1) {
            arr[i] = `import router from './${key}Router.js'`
            break
        }
    }
    // 写入 main.js 文件
    fs.writeFileSync(`${os.tmpdir()}/${key}Main.js`, arr.join('\n'), {encoding: 'utf-8'})
}

/**
 * 动态设置页面路径和文件名
 * @param {String}   key - 模块名称
 * @param {Number} index - 当前元素的索引值
 **/
function setPage(key, index) {
    return {
        entry: `${os.tmpdir()}/${key}Main.js`,
        // entry: `src/main.js`,
        template: `public/index.html`,
        // template: `src/pages/${key}/index.html`,
        filename: `${index ? key : 'index'}.html`, // 第一个页面设置为index.html
        title: key,
    }
}

// 默认页面路径
let pages = {
    page1: {
        entry: `src/main.js`,
        // template: `src/pages/${key}/index.html`,
        template: `public/index.html`,
        filename: `index.html`,
        // title: key,
    },
}

let argv = process.argv.splice(3) // 获取命令

// 判断命令是否存在
if (argv.length && (argv[0] === '--page1' || argv[0] === '--page2')) {
    const mainStr = fs.readFileSync('src/main.js', {encoding: 'utf-8'}) // 读取main.js文件内容

    argv = [...new Set(argv)] // 去重

    let key = ''

    argv.map((item, i) => {
        key = item.substring(2, item.length)  // 截取字符串，排除 -- 字符
        pages[key] = setPage(key, i) // 动态设置页面路径

        write(key, mainStr)
    })
}

module.exports = {
    publicPath: './',
    lintOnSave: false,
    pages,
}

/**
 * vue-router4 处理逻辑
 **/
let testRouter = fs.readFileSync('src/testRouter4/index.js', {encoding: 'utf-8'})
let df = testRouter.match(/(\/\/\s*\bhistory:\s*\w*|\bhistory:\s*\w*\(\))/g)
let gf = null
for (let item of df) {
    if (item.indexOf('//') === -1) {
        gf = item
    }
}

let interceptPosition = testRouter.search(/\bcreateRouter\s*\(\s*\{/)
let kl = testRouter.substring(interceptPosition,testRouter.length)
let bianlian = testRouter.match(/\w*\W*\s*(?==)?\s*\bcreateRouter\s*\(\s*\{/g)[0].match(/\w*\W*\s(?==)/g)[0].trim()

let a = "import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'\n" +
    "import index from '${localPath}/src/pages/${key}/router'\n" +
    "const routes = [\n" +
    "...index\n"+
    "]\n" +
    `const ${bianlian} = createRouter({\n` +
    `${gf},\n`+
    "routes\n" +
    "})\n" +
    `${kl.substring(kl.search(/\}\s*\)/) + 2, kl.length)}`
console.log(a)
