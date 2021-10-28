const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy;
const{Users} = require('../../models/index')

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    function(login, password, done) {
        Users.findOne({where: {login}})
            .then((user)=> {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user.login);
        }).catch((err)=>{
            return done(err);
        });
    }
));
module.exports = passport