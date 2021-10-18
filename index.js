'use strict';

const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
let Router = require('koa-router');
const port = 8080

let users = []

app.use(bodyParser());

var router = Router();
router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
})

router.post('/register', (ctx, next) => {
    users.push(ctx.request.body)
    ctx.body = "Congratulations"
})
router.post('/login', (ctx, next) => {
    let user = ctx.request.body;
    if(users.find((element)=>(element.login===user.login && element.password === user.password)))
        ctx.body = 'Hello World!';
    else
        ctx.body = 'Unauthorized';
})

app.listen(port,function () {
    console.log(`Example app listening at http://localhost:${port}`)
})
app
    .use(router.routes())
    .use(router.allowedMethods());

