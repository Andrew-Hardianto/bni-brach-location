import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
import geocoder from '../utils/geocoder';
const Outlet = db.Outlet;
const Cabang = db.Cabang;
const Op = db.Sequelize.Op;

// get all outlet
export const getAllOutlet = asyncHandler(async (req: any, res: any) => {
        const page = req.query.page ? parseInt(req.query.page as string) : null;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
        
        let queryOptions: any = {
            include: [
                "cabang"
            ]
        
        
        };
        
        if (req.query.keyword) {
            queryOptions.where = {
                Outlet_Name: {
                    [Op.like]: `%${req.query.keyword}%`
                }
            };
        }

        if (page && limit) {
            queryOptions.offset = (page - 1) * limit;
            queryOptions.limit = limit;
        }

        const { count, rows } = await Outlet.findAndCountAll(queryOptions);

res.status(200).json({
            success: true,
            outlet: rows,
            pagination: page && limit ? {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            } : null
        })
})

// get all outlet
export const getByIdOutlet = asyncHandler(async (req: any, res: any) => {
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
export const createOutlet = asyncHandler(async (req: any, res: any, next: any) => {
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
export const updateOutlet = asyncHandler(async (req: any, res: any, next: any) => {
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
export const deleteOutlet = asyncHandler(async (req: any, res: any) => {
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