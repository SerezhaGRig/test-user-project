const users = require('../../model/model')
const service = require('../../services/users/index')

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