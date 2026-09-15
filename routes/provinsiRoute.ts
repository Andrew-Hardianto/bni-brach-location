import express from 'express';
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