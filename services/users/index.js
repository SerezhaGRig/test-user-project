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
    static register(user_data){
        if(!validator.validate(user_data.login)){
            return "Input value wasn't email"
        }
        if(!schema.validate(user_data.password)){
            return "Password minimum length is 8"
        }
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