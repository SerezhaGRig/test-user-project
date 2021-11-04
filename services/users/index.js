const {jwtToken}=require('../auth/jwt')
const logger = require('../../utils/logger')
const {Users} = require('../../models/index')
const SeqErrorWrapper = require('../../errors/seqErrorWraper')
const CustomError = require('../../errors/customError')
const {Op,QueryType} = require('sequelize')

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
    static async add({ brand, year, model,regnum, login }){

        try{
            let user  = await Users.findOne({where: {login}})
            let model  = await Users.findOne({where:{model_name: model}})
            await Cars.create({user_id:user.user_id,model_id:model.model_id,reg_num:regnum,pr_year:year});
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
        return "Car Added"
    }
    static async getCars(){

        try{
            let cars  = await Cars.query("select cars.*,model_name from Cars inner join Models on Cars.Model_id = Models.model_id;")
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
        return cars.toString()
    }
}

module.exports = Service