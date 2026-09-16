import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getAllWilayah,
    createWilayah,
    getByIdWilayah,
    updateWilayah,
    deleteWilayah
 } from '../controllers/wilayahControllers';

const router = express.Router();

router.route('/')
    .get(advancedResults(db.Wilayah, { searchableField: 'Region_Name' }), getAllWilayah)
    .post(createWilayah)

router.route('/:id')
    .get(getByIdWilayah)
    .put(updateWilayah)
    .delete(deleteWilayah)

export default router;