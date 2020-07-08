const toyService = require('../services/toy.service.js');
const express = require('express');
const router = express.Router();

module.exports = router;


//TOY LIST
router.get('/', (req, res) => {
        const filterBy = req.query;
        console.log('filterBy:', filterBy)
        toyService.query()
            .then(toys => {
                res.json(toys);
            })
    })
    //TOY READ
router.get('/:id', (req, res) => {
        const toyId = req.params.id
        toyService.getById(toyId)
            .then(toy => {
                res.json(toy);
            })
            .catch(() => {
                res.status(404).send('This id does not exist');
            })
    })
    //TOY DELETE
router.delete('/:id', (req, res) => {
        const toyId = req.params.id
        toyService.remove(toyId)
            .then(() => {
                res.end();
            })
            .catch(() => {
                res.status(500).send(`Couldn't delete toy... ERROR!`);
            })
    })
    //TOY CREATE
router.post('/', (req, res) => {
        const toy = req.body
        toyService.save(toy)
            .then(savedToy => {
                res.json(savedToy);
            })
            .catch(() => {
                res.status(500).send(`Couldn't add toy... ERROR!`);
            })
    })
    //TOY UPDATE
router.put('/:id', (req, res) => {
    const toy = req.body
    toyService.save(toy)
        .then(savedToy => {
            res.json(savedToy);
        })
        .catch(() => {
            res.status(500).send(`Couldn't update toy... ERROR!`);
        })
})