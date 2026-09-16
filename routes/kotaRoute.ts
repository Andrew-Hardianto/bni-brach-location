import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getKota, addKota, getByIdKota, updateKota, deleteKota, getListKota  } from '../controllers/kotaControllers';

const router = express.Router();

router.get('/kabupaten', getListKota)

router.route('/')
    .get(getKota)
    .post(addKota)

router.route('/:id')
    .get(getByIdKota)
    .put(updateKota)
    .delete(deleteKota)

export default router;