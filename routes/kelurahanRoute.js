const express = require('express');
const {
    getKelurahan,
    getByIdKelurahan,
    createKelurahan,
    updateKelurahan,
    deleteKelurahan,
    getListKelurahan,
} = require('../controllers/kelurahanControllers');

const router = express.Router();

// router.post('/bulk', bulkCreateKelurahan)
router.get('/list', getListKelurahan)

router.route('/')
    .get(getKelurahan)
    .post(createKelurahan)

router.route('/:id')
    .get(getByIdKelurahan)
    .put(updateKelurahan)
    .delete(deleteKelurahan)

module.exports = router;