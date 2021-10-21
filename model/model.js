class User{
    constructor(login,password,username) {
        this.login=login;
        this.password=password;
        this.username=username;
    }
    static userFromJs(js_data){
       return new User(js_data.login, js_data.password, js_data.username)
    }

}
module.exports=User