const User = require('../modals/userModal.js')
const bycrypt = require('bcrypt')

const add = (user) => {
    user.password = bycrypt.hashSync(user.password, 10)
    return User.create(user)
}

module.exports = {
    add: add
}