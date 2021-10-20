const User = require('../../model/model')
const {jwtToken} = require('../../utils/jwt')




let users = []

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
        users.find((element)=>(element.login===user.login && element.password === user.password))
        if(users.find((element)=>(element.login===user.login && element.password === user.password))){
            const token = jwtToken(login)
            return {
                token,
                login
            };
        }
        return 'Unautorized'
    }
}

module.exports = Service