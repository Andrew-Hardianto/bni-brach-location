const express = require('express');
const { getKota, addKota, getByIdKota, updateKota, deleteKota, getListKota } = require('../controllers/kotaControllers');

const router = express.Router();

router.get('/kabupaten', getListKota)

router.route('/')
    .get(getKota)
    .post(addKota)

router.route('/:id')
    .get(getByIdKota)
    .put(updateKota)
    .delete(deleteKota)

module.exports = router;