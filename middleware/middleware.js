const {jwtValidate}=require('../services/auth/jwt')

module.exports = {
    authMiddleware: (ctx, next) => {
        const authHeader = ctx.request.headers.authorization
        if (authHeader) {
            const token = authHeader.slice(7);
            try {
                const {sub} = jwtValidate(token)
                ctx.request.sub = sub;
                next();
            } catch (e) {
                ctx.customError = e;
                next()
            }

        } else {
            ctx.customError = "auth header doesnt exist";
            next()
        }
    },
    errorMiddleware: (ctx, next) => {
        ctx.status = 404
        ctx.body = ctx.customError.message
    },
    responseMiddleware: (ctx, next) => {
        if (ctx.customError) {
            next()
        } else {
            ctx.status = 200
            ctx.body = ctx.myData
        }
    }
}