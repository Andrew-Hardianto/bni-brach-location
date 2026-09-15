import express from 'express';
import { getAllWilayah,
    createWilayah,
    getByIdWilayah,
    updateWilayah,
    deleteWilayah
 } from '../controllers/wilayahControllers';

const router = express.Router();

router.route('/')
    .get(getAllWilayah)
    .post(createWilayah)

router.route('/:id')
    .get(getByIdWilayah)
    .put(updateWilayah)
    .delete(deleteWilayah)

export default router;