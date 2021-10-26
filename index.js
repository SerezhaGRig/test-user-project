'use strict';

const Koa = require('koa');
const app = new Koa();
const router = require('./routers/users/index')
const bodyParser = require('koa-bodyparser');
const logger = require('./utils/logger')
require("dotenv").config();
const db = require('./models/index')

const port = process.env.PORT || 3000;
db.sequelize.sync({force:true}).then(
    ()=>{
        app
            .use(bodyParser())
            .use(router.routes())
            .use(router.allowedMethods())
            .listen(port, function(){
                logger.info(`Example app listening at http://localhost:${port}`)
            })
    }
)

