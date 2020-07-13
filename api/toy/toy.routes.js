const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToy, getToys, deleteToy, updateToy, addToy } = require('./toy.controller')
const router = express.Router()

router.get('/', getToys);
router.get('/:id', getToy);
router.post('/', addToy);
router.put('/:id', requireAuth, requireAdmin, updateToy)
router.delete('/:id', requireAuth, requireAdmin, deleteToy)

module.exports = router