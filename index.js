'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('routing.js')
const bodyParser = require('koa-bodyparser');
const settings = require('settings')

console.log(("it will break marging"));


app
    .use(bodyParser());
    .listen(settings.port,function () {
        console.log(`Example app listening at http://localhost:${settings.port}`)
    })
    .use(router.routes())
    .use(router.allowedMethods());

