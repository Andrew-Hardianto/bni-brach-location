import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getKelurahan,
    getByIdKelurahan,
    createKelurahan,
    updateKelurahan,
    deleteKelurahan,
    getListKelurahan,
 } from '../controllers/kelurahanControllers';

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

export default router;