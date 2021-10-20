const User = require('../../model/model')
const {jwtToken,jwtValidate} = require('../../utils/jwt')

let users = []

class Service{
    static hello(){
        console.log(users)
        return 'Hello World!';
    }
    static register(login, password, username){
        let user = new User(login, password, username)
        users.push(user)
        return "Congratulation"
    }
    static login(login, password){
        let user = new User(login, password)
        if(users.find((element)=>(element.login===user.login && element.password === user.password))){
            const token = jwtToken(login)
            return {
                token,
                login
            };
        }
        return 'Unautorized'
    }
    static rename(token,newName){
        try {
            const res = jwtValidate(token)
            const user = users.find((element)=>(element.login===res.sub))
            if(user){
                user.username = newName;
                return 'Sucsessifully renamed'
            }
            return 'Invalide user'

        }
        catch (e){
            console.log(e)
        }
        return 'Token validation error'
    }
}

module.exports = Service