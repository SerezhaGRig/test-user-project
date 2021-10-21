const Service = require('../../services/users/index')

class Controller{
    static hello(){
        return Service.hello();
    }
    static register({login, password, username}){
        return Service.register({login, password, username})

    }
    static login({login, password}){
        return Service.login({login, password})
    }
    static rename({ newName}){
        return Service.rename({token, newName,login})
    }
}
module.exports = Controller
