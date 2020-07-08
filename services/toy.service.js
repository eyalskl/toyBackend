const fs = require('fs')
var toys = require('../data/toy.json')
const utilService = require('./util.service')

module.exports = {
    query,
    getById,
    remove,
    save
}

function query() {
    return Promise.resolve(toys);
}

function getById(id) {
    const toy = toys.find(toy => toy._id === id)
    return Promise.resolve(toy);
}

function remove(id) {
    const idx = toys.findIndex(toy => toy._id === id)
    if (idx >= 0) toys.splice(idx, 1)
    _saveToysToFile()
    return Promise.resolve();
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys.splice(idx, 1, toy)
    } else {
        toy._id = utilService.makeId()
        toys.unshift(toy)
    }
    _saveToysToFile()
    return Promise.resolve(toy);
}


function _saveToysToFile() {
    fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2));
}