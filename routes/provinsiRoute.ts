import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getProvinsi,
    createProvinsi,
    getByIdProvinsi,
    updateProvinsi,
    deleteProvinsi
 } from '../controllers/provinsiControllers';

const router = express.Router();

router.route('/')
    .get(getProvinsi)
    .post(createProvinsi)

router.route('/:id')
    .get(getByIdProvinsi)
    .put(updateProvinsi)
    .delete(deleteProvinsi)

export default router;