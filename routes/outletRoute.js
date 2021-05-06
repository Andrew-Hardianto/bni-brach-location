const express = require('express');
const {
    getAllOutlet,
    createOutlet,
    getByIdOutlet,
    updateOutlet,
    deleteOutlet
} = require('../controllers/outletControllers');

const router = express.Router();

router.route('/')
    .get(getAllOutlet)
    .post(createOutlet)

router.route('/:id')
    .get(getByIdOutlet)
    .put(updateOutlet)
    .delete(deleteOutlet)

module.exports = router;