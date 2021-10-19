'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./routing')
const bodyParser = require('koa-bodyparser');
const settings = require('./settings')

console.log(("it will break marging"));


app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(settings.port,function () {
        console.log(`Example app listening at http://localhost:${settings.port}`)
    })

