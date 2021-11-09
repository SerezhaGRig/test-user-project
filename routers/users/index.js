const Router = require('koa-router');
const Controller=require('../../controller/users/index')
const validator = require("email-validator");
const {jwtValidate} = require('../../services/auth/jwt')
const {authMiddleware,responseMiddleware}= require('../../middleware/middleware')
const CustomError = require('../../errors/customError')
const passwordValidator = require("password-validator");
const { Sequelize } = require('sequelize');
const passport = require('../../services/auth/passportAuth')

const router = new Router();
const schema = new passwordValidator();
schema.is().min(8)



router.post('/login',passport.authenticate('local'),async (ctx, next)=> {
    return  Controller.login();
})

router.get('/',authMiddleware, async (ctx, next) => {
    return Controller.hello({login:ctx.state.user});
})
router.post('/register', async (ctx, next) => {
    const { body:{ login, password, username } } = ctx.request;
     if(!validator.validate(login)){
         throw new CustomError({code:403,message:"Input value wasn't email"})
     }
     if(!schema.validate(password)){
         throw new CustomError({code:403,message:"Password minimum length is 8"})
     }
    return  Controller.register({login,  password, username });
})

router.post('/logout',authMiddleware,async (ctx, next)=> {
    ctx.logout()
    return  Controller.logout();
})

router.post('/addCar',authMiddleware,async (ctx, next)=> {
    const { body:{ brand, year, model, regnum } } = ctx.request;
    let login = ctx.state.user
    console.log(ctx.request.body)
    return  Controller.addCar({ brand, year, model, regnum, login });
})

router.get('/cars',authMiddleware,async (ctx, next)=> {
    return  Controller.getCars();
})




router.post('/rename',authMiddleware, async (ctx, next) => {
    const { body:{ newName } } = ctx.request;
    return Controller.rename({login:ctx.state.user, newName});
})

router.get('/brands',authMiddleware, async (ctx, next) => {
    return Controller.getBrands();
})

router.get('/models/:brand',authMiddleware, async (ctx, next) => {
    console.log(ctx.params.brand)
    let brand = ctx.params.brand;
    return Controller.getModelsByBrand({brand});
})
router.get('/car/:id',authMiddleware, async (ctx, next) => {
    console.log(ctx.params.brand)
    let carID = ctx.params.id;
    return Controller.getCarById({carID});
})
router.post('/upcar/:id',authMiddleware, async (ctx, next) => {
    let carID = ctx.params.id;
    let login = ctx.state.user
    const { body:{ brand, year, model,regnum } } = ctx.request;
    return Controller.updateCars({carID, brand, year, model,regnum, login });
})

router.get('/carp/:id',authMiddleware, async (ctx, next) => {
    let pageId = ctx.params.id;
    return Controller.carsPage({pageId});
})

module.exports = router