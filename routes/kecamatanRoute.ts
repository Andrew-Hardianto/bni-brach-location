import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';

import { getKecamatan,
    createKecamatan,
    getByIdKecamatan,
    updateKecamatan,
    deleteKecamatan
 } from '../controllers/kecamatanControllers';

const router = express.Router();

router.route('/')
    .get(getKecamatan)
    .post(createKecamatan)

router.route('/:id')
    .get(getByIdKecamatan)
    .put(updateKecamatan)
    .delete(deleteKecamatan)

export default router;