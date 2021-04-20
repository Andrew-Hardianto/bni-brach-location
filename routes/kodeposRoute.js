const express = require('express');
const {
    getKodepos,
    createKodepos,
    getByIdKodepos,
    updateKodepos,
    deleteKodepos,
} = require('../controllers/kodeposControllers');

const router = express.Router();

router.route('/')
    .get(getKodepos)
    .post(createKodepos)

router.route('/:id')
    .get(getByIdKodepos)
    .put(updateKodepos)
    .delete(deleteKodepos)

module.exports = router;