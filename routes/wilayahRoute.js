const express = require('express');
const {
    getAllWilayah,
    createWilayah,
    getByIdWilayah,
    updateWilayah,
    deleteWilayah
} = require('../controllers/wilayahControllers');

const router = express.Router();

router.route('/')
    .get(getAllWilayah)
    .post(createWilayah)

router.route('/:id')
    .get(getByIdWilayah)
    .put(updateWilayah)
    .delete(deleteWilayah)

module.exports = router;