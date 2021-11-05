const Service = require('../../services/users/index')

class Controller{
    static async hello({login}){
        return await Service.hello({login});
    }
    static async register({login, password, username}){
        return await Service.register({login, password, username})
    }
    static async login(){
        return await Service.login()
    }
    static async rename({ newName,login}){
        return await Service.rename({newName,login})
    }
    static async logout(){
        return await Service.logout()
    }
    static async addCar({ brand, year, model,regnum, login }){
        return await Service.addCar({ brand, year, model,regnum, login })
    }
    static async getCars(){
        return await Service.getCars()
    }
    static async getBrands(){
        return await Service.getBrands()
    }
    static async getModelsByBrand({brand}){

        return await Service.getModelsByBrand({brand})
    }
}
module.exports = Controller
