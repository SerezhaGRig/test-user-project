'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./routers/users/index')
const bodyParser = require('koa-bodyparser');
const {jwtInst} = require('./utils/jwt')
require("dotenv").config();

console.log(("it will break marging"));
const port = process.env.PORT || 3000;

app
    .use(jwtInst)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port,function () {
        console.log(`Example app listening at http://localhost:${port}`)
    })

