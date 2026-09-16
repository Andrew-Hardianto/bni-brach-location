import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getKodepos,
    createKodepos,
    getByIdKodepos,
    updateKodepos,
    deleteKodepos,
 } from '../controllers/kodeposControllers';

const router = express.Router();

router.route('/')
    .get(getKodepos)
    .post(createKodepos)

router.route('/:id')
    .get(getByIdKodepos)
    .put(updateKodepos)
    .delete(deleteKodepos)

export default router;