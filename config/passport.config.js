//create file as config to initialize passport 
//now define local strategy
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userService = require('../service/userService')

//this function take email, password and done function as parameter
const authenticateUser = async (email, password, done) => {
    //first we get user by email
    const user = await userService.getUserByEmail(email)
    
    //if user is not present we return false in done
    if(user == null) {
        console.log('User not found with email : ' + email)
        return done(null, false, {message : 'No user with ' + email})
    }

    //else
    try{
        //we compare the passwords asynchronously if matched we returns users else false again
        if(await bcrypt.compare(password, user.password)){
            return done(null, user)
        }
        else {
            console.log('Password doesn\'t match')
            return done(null, false, {message : 'No user with ' + email})
        }
    }
    catch(e) {
        //if any error occurs we return that error
        return done(e)
    }
}
//first parameter is autherization service we want user to authorize via email
//second parameter is authenticate service which use a function that will authenticate 
function initialize(passport) {
    passport.use(new localStrategy({
        usernameField: 'email'
    }, authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, userService.getUserById(id))
    })
}

module.exports = initialize