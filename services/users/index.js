const User = require('../../model/model')
const {jwtToken}=require('../auth/jwt')
const logger = require('../../utils/logger')
const CryptoJS = require("crypto-js");

let users = {}

class Service{
    static hello(){
        logger.info(users)
        return 'Hello World!';
    }
    static register({login, password, username}){
        let user = new User(login, CryptoJS.MD5(password).toString(), username)
        users[login]=user
        return "Congratulation"
    }
    static login({login, password}){
        let user = new User(login, CryptoJS.MD5(password).toString())
        if(users[user.login] && users[user.login].password === user.password){
            const token = jwtToken(login)
            return {
                token,
                login
            };
        }
        return 'Unautorized'
    }
    static rename({newName,login}){
            const user = users[login]
            if(user){
                user.username = newName;
                return 'Sucsessifully renamed'
            }
            return 'Invalide user'


    }
}

module.exports = Service