import express from 'express';
import advancedResults from '../middleware/advancedResults';
import db from '../config/db';
import { getAllOutlet,
    createOutlet,
    getByIdOutlet,
    updateOutlet,
    deleteOutlet
 } from '../controllers/outletControllers';

const router = express.Router();

router.route('/')
    .get(getAllOutlet)
    .post(createOutlet)

router.route('/:id')
    .get(getByIdOutlet)
    .put(updateOutlet)
    .delete(deleteOutlet)

export default router;