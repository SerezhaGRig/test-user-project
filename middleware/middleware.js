const {jwtValidate}=require('../services/auth/jwt')

module.exports = {
    authMiddleware: async (ctx, next) => {
        const authHeader = ctx.request.headers.authorization
        if (authHeader) {
            const token = authHeader.slice(7);
            try {
                const {sub} = jwtValidate(token)
                ctx.request.sub = sub;
                await next();
            } catch (e) {
                ctx.body = e.message;
            }

        } else {
            ctx.body = "auth header doesnt exist";
        }
    },
    errorMiddleware: async (ctx, next) => {
        ctx.status = 404
        ctx.body = ctx.myData.error.message
    },
    responseMiddleware: async (ctx, next) => {
        if (ctx.myData.error) {
            await next()
        } else {
            ctx.status = 200
            ctx.body = ctx.myData.result
        }
    }
}