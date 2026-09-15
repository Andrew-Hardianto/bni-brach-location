import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
import geocoder from '../utils/geocoder';
const Cabang = db.Cabang;
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all cabang
export const getAllCabang = asyncHandler(async (req: any, res: any) => {
    const page = req.query.page ? parseInt(req.query.page) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let queryOptions: any = {
        include: ["wilayah"]
    };

    if (req.query.keyword) {
        queryOptions.where = {
            Branch_Name: {
                [Op.like]: `%${req.query.keyword}%`
            }
        };
    }

    if (page && limit) {
        queryOptions.offset = (page - 1) * limit;
        queryOptions.limit = limit;
    }

    const { count, rows } = await Cabang.findAndCountAll(queryOptions);

    res.status(200).json({
        success: true,
        cabang: rows,
        pagination: page && limit ? {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            limit: limit
        } : null
    })
})

// get all cabang
export const getByIdCabang = asyncHandler(async (req: any, res: any) => {
    const cabang = await Cabang.findByPk(req.params.id, { include: ["wilayah"] });

    res.status(200).json({
        success: true,
        cabang
    })
})

// add cabang
export const createCabang = asyncHandler(async (req: any, res: any, next: any) => {
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
export const updateCabang = asyncHandler(async (req: any, res: any, next: any) => {
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
export const deleteCabang = asyncHandler(async (req: any, res: any) => {
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