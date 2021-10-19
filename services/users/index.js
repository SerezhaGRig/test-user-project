const User = require('../../model/model')

let users = []


class Service{
    static hello(){
        return 'Hello World!';
    }
    static register(user_data){
        let user = User.userFromJs(user_data)
        users.push(user)
        return "Congratulation"
    }
    static login(user_data){
        let user = User.userFromJs(user_data)
        if(users.find((element)=>(element.login===user.login && element.password === user.password)))
            return 'Hello World!';
        else
            return 'Unautorized'
    }
}

module.exports = Service