import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Wilayah = db.Wilayah;
const Op = db.Sequelize.Op;

// get all wilayah
export const getAllWilayah = asyncHandler(async (req: any, res: any) => {
        const wilayah = await Wilayah.findAll();

        res.status(200).json({
            success: true,
            wilayah
        })
})

// get by id wilayah
export const getByIdWilayah = asyncHandler(async (req: any, res: any, next: any) => {
        const wilayah = await Wilayah.findByPk(req.params.id);

        if (!wilayah) {
            res.status(404)
            next(new ErrorResponse('Data tidak ditemukan!', 400))
        }

        res.status(200).json({
            success: true,
            wilayah
        })
})

// add Wilayah
export const createWilayah = asyncHandler(async (req: any, res: any, next: any) => {
        const { Region_Code, Region_Subname, Region_Name } = req.body;

        const checkId = await Wilayah.findOne(
            {
                where: {
                    Region_Code
                }
            }
        )

        if (!Region_Code || !Region_Name || !Region_Subname) return next(new ErrorResponse('Kode/Nama harus diisi!', 400))

        if (checkId) return next(new ErrorResponse('Kode tidak boleh sama!', 400))

        const wilayah = await Wilayah.create(req.body);

        res.status(201).json({
            success: true,
            wilayah
        })
})

// Update wilayah
export const updateWilayah = asyncHandler(async (req: any, res: any, next: any) => {
        const checkId = await Wilayah.findByPk(req.params.id)

        if (!checkId) {
            res.status(404)
            return next(new ErrorResponse('Wilayah tidak ditemukan!', 400))
        }

        const wilayah = await Wilayah.update(req.body, {
            where: {
                ID_Region: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            wilayah
        })
})

// delete wilayah
export const deleteWilayah = asyncHandler(async (req: any, res: any) => {
        await Wilayah.destroy({
            where: {
                ID_Region: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
})