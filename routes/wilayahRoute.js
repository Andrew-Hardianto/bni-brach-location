const express = require('express');
const { getAllWilayah, createWilayah, getByIdWilayah } = require('../controllers/wilayahControllers');

const router = express.Router();

router.route('/')
    .get(getAllWilayah)
    .post(createWilayah)

router.route('/:kode')
    .get(getByIdWilayah)

module.exports = router;