const {jwtToken}=require('../auth/jwt')
const logger = require('../../utils/logger')
const CryptoJS = require("crypto-js");
const {Users} = require('../../models/index')
const {Op} = require('sequelize')

let users = {}

class Service{
    static async hello(){
        return {result:'Hello World!'};
    }
    static async register({login, password, username}){
        try{
            await Users.create({login, password:CryptoJS.MD5(password).toString(), username});
        }
        catch (e){
            return {error:e}
        }
        return {result:"Congratulation"}
    }
    static async login({login, password}){
        let user  = await Users.findOne({
                where: {
                    [Op.and]: [
                        { login },
                        { password:CryptoJS.MD5(password).toString()}
                    ]
                }
            })
        if(user){
            const token = jwtToken(login)
            return {result:{token, login}};
        }
        return {result:'Unautorized'}
    }
    static async rename({newName,login}){
            let answare = await Users.update(
                { username: newName }, {
                    where: {
                        login
                    }
                }
            )
            logger.info(answare[0])
            if(answare[0]){
                return {result:'Sucsessifully renamed'}
            }
            return {result:'Invalide user'}


    }
}

module.exports = Service