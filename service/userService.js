const User = require('../modals/userModal.js')
const bycrypt = require('bcrypt')

const add = (user) => {
    user.password = bycrypt.hashSync(user.password, 10)
    return User.create(user)
}

const getUserByEmail = (email) => {
    const query = {
        email: email
    }

    return User.findOne(query)
}

const getUserById = (id) => {
    return User.findById(id)
}

module.exports = {
    add: add,
    getUserByEmail: getUserByEmail,
    getUserById: getUserById
}