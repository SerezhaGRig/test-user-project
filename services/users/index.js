const User = require('../../model/model')
var validator = require("email-validator");
var passwordValidator = require("password-validator");
var schema = new passwordValidator();


let users = []

schema
    .is().min(8)
class Service{
    static hello(){
        return 'Hello World!';
    }
    static register(login, password, username){
        let user = new User(login, password, username)
        users.push(user)
        return "Congratulation"
    }
    static login(login, password){
        let user = new User(login, password)
        if(users.find((element)=>(element.login===user.login && element.password === user.password)))
            return 'Hello World!';
        else
            return 'Unautorized'
    }
}

module.exports = Service