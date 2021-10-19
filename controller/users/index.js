const Service = require('../../services/users/index')

class Controller{
    static index(){
        return Service.hello();
    }
    static register(user_data){
        return Service.register(user_data)
    }
    static login(user_data){
        return Service.login(user_data)
    }
}
module.exports = Controller
