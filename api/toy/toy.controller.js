const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id)
    res.json(toy)
}

async function getToys(req, res) {
    console.log('wogoogooo', req.session.user);
    const toys = await toyService.query(req.query)
    logger.debug(toys);
    res.json(toys)
}

async function deleteToy(req, res) {
    await toyService.remove(req.params.id)
    res.end()
}

async function updateToy(req, res) {
    const toy = req.body;
    await toyService.update(toy)
    res.json(toy)
}

async function addToy(req, res) {
    const toy = req.body;
    await toyService.add(toy)
    res.json(toy)
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy
}