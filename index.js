'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./routers/users/index')
const bodyParser = require('koa-bodyparser');
const logger = require('./utils/logger')
require("dotenv").config();
const db = require('./models/index')
const passport = require('./services/auth/passportAuth')
const session = require('koa-session')
const cors = require('koa-cors');
const proxy = require("koa-proxies");

const port = process.env.PORT || 3000;
const secret = process.env.SESSION_KEY || "another secret";

db.sequelize.sync({force:true}).then(
    async ()=>{
        await db['Brands'].create({brand_name:'BMW'})
        await db['Brands'].create({brand_name:'Mercedes'})
        await db['Brands'].create({brand_name:'Audi'})
        await db['Models'].create({model_name:'X5',brand_id:1})
        await db['Models'].create({model_name:'C 300',brand_id:2})
        await db['Models'].create({model_name:'C 320',brand_id:2})
        await db['Models'].create({model_name:'A8',brand_id:3})
        app.proxy=true
        app.keys = [secret]
        app
              .use(cors({
                  origin: 'http://localhost:3000',
                  credentials:true,
                  methods:['GET', 'PUT', 'POST']
              }))
            .use(bodyParser())
            .use(session({httpOnly: true,secure:false}, app))
            .use(passport.initialize())
            .use(passport.session())
            .use(router.routes())
            .use(router.allowedMethods())
            .listen(port, function(){
                logger.info(`Example app listening at http://localhost:${port}`)
            })
    }
)

