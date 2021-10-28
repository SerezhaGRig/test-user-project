const Service = require('../../services/users/index')

class Controller{
    static async hello(){
        return await Service.hello();
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
}
module.exports = Controller
