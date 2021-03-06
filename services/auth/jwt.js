const jwtGen = require('jsonwebtoken');
const jwt = require('koa-jwt')
require("dotenv").config();

const secret = process.env.SECRET || 'another secret';


module.exports={
    jwtToken: (login)=>{
        return jwtGen.sign({ sub: login }, secret, { expiresIn: '5m' });
    },
    jwtValidate: (token)=>{
        return  jwtGen.verify(token, secret)
    }
}