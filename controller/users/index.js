const users = require('../../Model/model')
const service = require('../../Services/users/index')

module.exports = {
    index : () => {
        return service.hello();
    },
    register: (user) => {
        users.push(user)
        return service.congratulation()
    },
    login: (user) => {
        if(users.find((element)=>(element.login===user.login && element.password === user.password)))
            return service.hello();
        else
            return service.unautorized();
    },

}