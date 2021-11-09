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
        return Service.getCars()
    }
    static async getBrands(){
        return Service.getBrands()
    }
    static async getModelsByBrand({brand}){

        return Service.getModelsByBrand({brand})
    }
    static async getCarById({carID}){

        return Service.getCarById({carID})
    }
    static async updateCars({carID, brand, year, model,regnum, login }){

        return Service.updateCars({carID, brand, year, model,regnum, login })
    }
    static async carsPage({pageId}){

        return Service.carsPage({pageId})
    }
}
module.exports = Controller
