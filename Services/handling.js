const users = require('../Model/model')

module.exports = {
    index : (ctx, next) => {
        ctx.body = 'Hello World!';
    },
    register: (ctx, next) => {
        users.push(ctx.request.body)
        ctx.body = "Congratulations"
    },
    login: (ctx, next) => {
        let user = ctx.request.body;
        if(users.find((element)=>(element.login===user.login && element.password === user.password)))
            ctx.body = 'Hello World!';
        else
            ctx.body = 'Unauthorized';
    },

}