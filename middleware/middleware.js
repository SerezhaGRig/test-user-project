const {jwtValidate}=require('../services/auth/jwt')
const CustoError = require('../errors/customError')
const logger = require('../utils/logger')


function errorHandler (ctx, e){
    if(e.status)
        ctx.status = e.status
    logger.info( e.message)
    ctx.body = e.message

}
function resultHandler (ctx, res){
    ctx.status=200
    ctx.body = res
    logger.info( res)
}

module.exports = {
    authMiddleware: async (ctx, next) => {
        const authHeader = ctx.request.headers.authorization
        if (authHeader) {
            const token = authHeader.split('Bearer ')[1]
            try {
                const {sub} = jwtValidate(token)
                ctx.request.sub = sub;
                return await next();
            } catch {
                throw new CustoError({code:401,message:"jwt authentification error"})
            }

        } else {
            throw CustomError({code:401,message:"auth header doesnt exist"})
        }
    },
    responseMiddleware: async (ctx, next) => {
            try {
                let result = await next()
                resultHandler(ctx, result)
            }
            catch (e){
                errorHandler(ctx, e)
            }

    },
    loggedIn: async (ctx, next)=> {
    if (ctx.isAuthenticated()) {
       return await next();
    }
    throw new CustoError({code:404,message:"Unautorized"})
}

}
