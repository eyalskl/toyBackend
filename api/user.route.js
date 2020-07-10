const userService = require('../services/user.service.js');
const express = require('express');
const router = express.Router();

module.exports = router;


//user LIST
router.get('/', (req, res) => {
        userService.query()
            .then(users => {
                res.json(users);
            })
    })
    //user READ
    // router.get('/:id', (req, res) => {
    //         const userId = req.params.id
    //         userService.getById(userId)
    //             .then(user => {
    //                 res.json(user);
    //             })
    //             .catch(() => {
    //                 res.status(404).send('This id does not exist');
    //             })
    //     })
    //user DELETE
    // router.delete('/:id', (req, res) => {
    //         const userId = req.params.id
    //         userService.remove(userId)
    //             .then(() => {
    //                 res.end();
    //             })
    //             .catch(() => {
    //                 res.status(500).send(`Couldn't delete user... ERROR!`);
    //             })
    //     })
    //user CREATE
    // router.post('/:id', (req, res) => {
    //         const user = req.body
    //         userService.save(user)
    //             .then(savedUser => {
    //                 res.json(savedUser);
    //             })
    //             .catch(() => {
    //                 res.status(500).send(`Couldn't add user... ERROR!`);
    //             })
    //     })
    // user UPDATE
router.put('/', (req, res) => {
    const user = req.body
    userService.save(user)
        .then(savedUser => {
            res.json(savedUser);
        })
        .catch(() => {
            res.status(500).send(`Couldn't update user... ERROR!`);
        })
})