import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
import geocoder from '../utils/geocoder';
const Outlet = db.Outlet;
const Cabang = db.Cabang;
const Op = db.Sequelize.Op;

// get all outlet
export const getAllOutlet = asyncHandler(async (req: any, res: Response) => {
    const responseData = (res as any).advancedResults;
    res.status(200).json({
        success: responseData.success,
        outlet: responseData.data,
        pagination: responseData.pagination
    })
})
// get all outlet
export const getByIdOutlet = asyncHandler(async (req: any, res: Response) => {
    const outlet = await Outlet.findByPk(req.params.id, {
        include: [
            "wilayah",
            "cabang"
        ]
    });

    res.status(200).json({
        success: true,
        outlet
    })
})

// add outlet
export const createOutlet = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude, Status } = req.body;

    const checkId = await Outlet.findOne(
        {
            where: {
                Outlet_Code: Outlet_Code
            }
        }
    )

    if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
    if (!Outlet_Code) return next(new ErrorResponse('Field Outlet code tidak boleh kosong!', 400));
    if (!Outlet_Name) return next(new ErrorResponse('Field Outlet name tidak boleh kosong!', 400));
    if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));

    if (checkId) return next(new ErrorResponse('Kode outlet sudah digunakan!', 400))

    const cabang = await Cabang.findOne({ where: { Branch_Code } });

    const outlet = await Outlet.create({
        Outlet_Code,
        Outlet_Name,
        Address,
        Branch_Code,
        Region_Code: cabang.Region_Code,
        Latitude,
        Longitude,
        Status
    })

    res.status(201).json({
        success: true,
        outlet
    })
})

// update outlet
export const updateOutlet = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude, Status, Outlet_level } = req.body;

    if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
    if (!Outlet_Code) return next(new ErrorResponse('Field Outlet code tidak boleh kosong!', 400));
    if (!Outlet_Name) return next(new ErrorResponse('Field Outlet name tidak boleh kosong!', 400));
    if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));

    const cabang = await Cabang.findOne({ where: { Branch_Code } });

    const outlet = await Outlet.update({
        Outlet_Code,
        Outlet_Name,
        Address,
        Branch_Code,
        Region_Code: cabang.Region_Code,
        Latitude,
        Longitude,
        Outlet_level,
        Status
    }, {
        where: {
            ID_Outlet: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        outlet
    })
})

// delete outlet
export const deleteOutlet = asyncHandler(async (req: any, res: Response) => {
    await Outlet.destroy({
        where: {
            ID_Outlet: req.params.id
        }
    })

    res.status(200).json({
        success: true,
        data: {}
    })
})