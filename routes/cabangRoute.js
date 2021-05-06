const express = require('express');
const {
    getAllCabang,
    createCabang,
    getByIdCabang,
    updateCabang,
    deleteCabang
} = require('../controllers/cabangControllers');

const router = express.Router();

router.route('/')
    .get(getAllCabang)
    .post(createCabang)

router.route('/:id')
    .get(getByIdCabang)
    .put(updateCabang)
    .delete(deleteCabang)

module.exports = router;