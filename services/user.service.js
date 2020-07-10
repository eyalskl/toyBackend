const fs = require('fs')
var user = require('../data/user.json')
const utilService = require('./util.service')

module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return Promise.resolve(user);
}

function getById(id) {
    const user = user.find(user => user._id === id)
    return Promise.resolve(user);
}

function remove(id) {
    const idx = user.findIndex(user => user._id === id)
    if (idx >= 0) user.splice(idx, 1)
    _saveUserToFile()
    return Promise.resolve();
}

function save(editedUser) {
    // if (user._id) {
    user = editedUser
        // const idx = user.findIndex(curruser => curruser._id === user._id)
        // user.splice(idx, 1, user)
        // } else {
        //     user._id = utilService.makeId()
        //     user.unshift(user)
        // }
    _saveUserToFile()
    return Promise.resolve(user);
}


function _saveUserToFile() {
    fs.writeFileSync('data/user.json', JSON.stringify(user, null, 2));
}