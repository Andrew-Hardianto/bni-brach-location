import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getAllCabang,
    createCabang,
    getByIdCabang,
    updateCabang,
    deleteCabang
 } from '../controllers/cabangControllers';

const router = express.Router();

router.route('/')
    .get(advancedResults(db.Cabang, { include: ['wilayah'], searchableField: 'Branch_Name' }), getAllCabang)
    .post(createCabang)

router.route('/:id')
    .get(getByIdCabang)
    .put(updateCabang)
    .delete(deleteCabang)

export default router;