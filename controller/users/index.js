const Service = require('../../services/users/index')

class Controller{
    static index(){
        return Service.hello();
    }
    static register(login, password, username){
        return Service.register(login, password, username)

    }
    static login(login, password){
        return Service.login(login, password)
    }
}
module.exports = Controller
