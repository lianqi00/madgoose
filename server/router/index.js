const fs = require('fs')

const Router = require('koa-router')

const router = new Router()
console.log(__dirname);
fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
        let r = require('./' + file)
        router.use(r.routes())
        // console.log(r.routes());
    }
    // console.log(r);
})

module.exports = router