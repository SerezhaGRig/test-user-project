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
        if(!validator.validate(login)){
            return "Input value wasn't email"
        }
        if(!schema.validate(password)){
            return "Password minimum length is 8"
        }
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