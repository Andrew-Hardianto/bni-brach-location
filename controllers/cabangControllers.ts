import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
import geocoder from '../utils/geocoder';
const Cabang = db.Cabang;
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all cabang
export const getAllCabang = asyncHandler(async (req: any, res: Response) => {
    const responseData = (res as any).advancedResults;
    res.status(200).json({
        success: responseData.success,
        cabang: responseData.data,
        pagination: responseData.pagination
    })
})
// get all cabang
export const getByIdCabang = asyncHandler(async (req: any, res: Response) => {
    const cabang = await Cabang.findByPk(req.params.id, { include: ["wilayah"] });

    res.status(200).json({
        success: true,
        cabang
    })
})

// add cabang
export const createCabang = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { Branch_Code, Branch_Name, Address, Region_Code } = req.body;

    const checkId = await Cabang.findOne(
        {
            where: {
                Branch_Code: Branch_Code
            }
        }
    )

    if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
    if (!Branch_Name) return next(new ErrorResponse('Field Branch Name tidak boleh kosong!', 400));
    if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));
    if (!Region_Code) return next(new ErrorResponse('Field Region Code tidak boleh kosong!', 400));

    if (checkId) return next(new ErrorResponse('Kode tidak boleh sama!', 400));

    const cabang = await Cabang.create(req.body);

    res.status(201).json({
        success: true,
        cabang
    })
})

// update cabang
export const updateCabang = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { Branch_Code, Branch_Name, Address, Region_Code } = req.body;

    if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
    if (!Branch_Name) return next(new ErrorResponse('Field Branch Name tidak boleh kosong!', 400));
    if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));
    if (!Region_Code) return next(new ErrorResponse('Field Region Code tidak boleh kosong!', 400));

    const cabang = await Cabang.update(req.body, {
        where: {
            ID_Branch: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        cabang
    })
})

// delete cabang
export const deleteCabang = asyncHandler(async (req: any, res: Response) => {
    await Cabang.destroy({
        where: {
            ID_Branch: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        data: {}
    })
})