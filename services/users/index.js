const {jwtToken}=require('../auth/jwt')
const logger = require('../../utils/logger')
const {Users} = require('../../models/index')
const SeqErrorWrapper = require('../../errors/seqErrorWraper')
const CustomError = require('../../errors/customError')
const {Op} = require('sequelize')

let users = {}

class Service{
    static async hello(){
        return 'Hello World!';
    }
    static async register({login, password, username}){
        try{
            await Users.create({login, password, username});
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
        return "Congratulation"
    }
    static async login(){
        return 'you are logged in';
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
                return 'Sucsessifully renamed'
            }
            throw new CustomError({code:401,message:'Invalide user'})


    }
    static async logout(){
        return 'you are logged out';
    }
}

module.exports = Service