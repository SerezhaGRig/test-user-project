const {jwtToken}=require('../auth/jwt')
const logger = require('../../utils/logger')
const {Users,Brands,Models,Cars,sequelize} = require('../../models/index')
const SeqErrorWrapper = require('../../errors/seqErrorWraper')
const CustomError = require('../../errors/customError')
const {Op,QueryTypes} = require('sequelize')

let users = {}

class Service{
    static async hello({login}){
        let user = await Users.findOne({where: {login}})
        if(!user){
            throw new CustomError({code:401,message:'Invalide user'})
        }
        return login;
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
    static async addCar({ brand, year, model,regnum, login }){

        try{
            let user  = await Users.findOne({where: {login}})
            let model_dbval  = await Models.findOne({where:{model_name: model}})
            await Cars.create({user_id:user.user_id,model_id:model_dbval.model_id,reg_num:regnum,pr_year:year});
            return "Car Added"
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }

    }
    static async getCars(){

        try{
             let cars  = await sequelize.query('select c.*,model_name,brand_name from public."Cars" as c '+
             'inner join public."Models" as m on c.model_id = m.model_id ' +
             'inner join public."Brands" as b on m.brand_id=b.brand_id;',{ type: QueryTypes.SELECT })
            let response=[]
            for(let car of cars){
                let {createdAt,updatedAt,...another} = car
                response.push(another)
            }
            return JSON.stringify(response)
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
    }
    static async getModelsByBrand({brand}){

        try{
            let response = []
            console.log('brand')
            let brand_dbval = await Brands.findOne({where: {brand_name:brand}})
            console.log(brand)
            let models  = await Models.findAll({where: {brand_id:brand_dbval.brand_id}})
            for(let model of models){
                response.push(model.dataValues.model_name)
            }
            return JSON.stringify(response)
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
    }
    static async getBrands(){

        try{

            let brands = await Brands.findAll()
            let response = []
            for(let brand of brands){
                response.push(brand.dataValues.brand_name)
            }
            return JSON.stringify(response)
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
        return brands.toString()
    }
    static async updateCars({carID, brand, year, model,regnum, login }){
        try{
            let user  = await Users.findOne({where: {login}})
            let model_dbval  = await Models.findOne({where:{model_name: model}})
            await Cars.update({model_id:model_dbval.model_id,reg_num:regnum,pr_year:year},{
                where: {[Op.and]: [
                {car_id:carID},
                {user_id:user.user_id }
            ]}
            })
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
        return "car updated";
    }
    static async getCarById({carID}){

        try{
            let cars  = await sequelize.query('select c.*,model_name,brand_name from public."Cars" as c '+
                'inner join public."Models" as m on c.model_id = m.model_id ' +
                'inner join public."Brands" as b on m.brand_id=b.brand_id where c.car_id = '+carID+' ;',{ type: QueryTypes.SELECT })
            let response=[]
            for(let car of cars){
                let {createdAt,updatedAt,...another} = car
                response.push(another)
            }
            return JSON.stringify(response)
        }
        catch (e) {
            throw new SeqErrorWrapper(e)
        }
    }
}

module.exports = Service