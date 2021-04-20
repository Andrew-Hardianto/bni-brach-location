const express = require('express');

const {
    getKecamatan,
    createKecamatan,
    getByIdKecamatan,
    updateKecamatan,
    deleteKecamatan
} = require('../controllers/kecamatanControllers');

const router = express.Router();

router.route('/')
    .get(getKecamatan)
    .post(createKecamatan)

router.route('/:id')
    .get(getByIdKecamatan)
    .put(updateKecamatan)
    .delete(deleteKecamatan)

module.exports = router;