const express = require('express');
const {
    getProvinsi,
    createProvinsi,
    getByIdProvinsi,
    updateProvinsi,
    deleteProvinsi
} = require('../controllers/provinsiControllers');

const router = express.Router();

router.route('/')
    .get(getProvinsi)
    .post(createProvinsi)

router.route('/:id')
    .get(getByIdProvinsi)
    .put(updateProvinsi)
    .delete(deleteProvinsi)

module.exports = router;