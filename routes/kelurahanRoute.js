const express = require('express');
const {
    getKelurahan,
    getByIdKelurahan,
    createKelurahan,
    updateKelurahan,
    deleteKelurahan,
} = require('../controllers/kelurahanControllers');

const router = express.Router();

router.route('/')
    .get(getKelurahan)
    .post(createKelurahan)

router.route('/:id')
    .get(getByIdKelurahan)
    .put(updateKelurahan)
    .delete(deleteKelurahan)

module.exports = router;