const Service = require('../../services/users/index')

class Controller{
    static async hello(){
        return await Service.hello();
    }
    static async register({login, password, username}){
        return await Service.register({login, password, username})
    }
    static async login({login, password}){
        return await Service.login({login, password})
    }
    static async rename({ newName,login}){
        return await Service.rename({newName,login})
    }
}
module.exports = Controller
