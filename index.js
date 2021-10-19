'use strict';

const Koa = require('koa');
const app = new Koa();
const port = 1234


console.log(("it will break marging"))
app.use(ctx => {
    ctx.body = 'Hello World';
});

app.listen(port,function () {
    console.log(`Example app listening at http://localhost:${port}`)
})
