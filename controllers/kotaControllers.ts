import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Kota = db.Kota;
const Op = db.Sequelize.Op;

// get all kota
export const getKota = asyncHandler(async (req: any, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string) : null;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
        
        let queryOptions: any = { include: ["provinsi"] };
        
        if (req.query.keyword) {
            queryOptions.where = {
                ...queryOptions.where,
                Kabkota_Name: {
                    [Op.like]: `%${req.query.keyword}%`
                }
            };
        }

        if (page && limit) {
            queryOptions.offset = (page - 1) * limit;
            queryOptions.limit = limit;
        }

        const { count, rows } = await Kota.findAndCountAll(queryOptions);

res.status(200).json({
            success: true,
            kota: rows,
            pagination: page && limit ? {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            } : null
        })
})

// get kota by id
export const getByIdKota = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const kota = await Kota.findByPk(req.params.id, { include: ["provinsi"] });

        if (!kota) return next(new ErrorResponse(`Kota dengan id ${req.params.id} idak ditemukan`, 404));

        res.status(200).json({
            success: true,
            kota
        })
})

// add kota
export const addKota = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const { Kabkota_Code, Kabkota_Name, Kabkota_Flag } = req.body;

        const checkkode = await Kota.findOne(
            {
                where: {
                    Kabkota_Code
                }
            }
        )

        if (!Kabkota_Code || !Kabkota_Name || !Kabkota_Flag) return next(new ErrorResponse('Kode Kota/Nama Kota harus diisi!', 400));

        if (checkkode) return next(new ErrorResponse('Kode Kota sudah digunakan!', 400));

        const kota = await Kota.create(req.body);

        res.status(201).json({
            success: true,
            kota
        })
})

// update kota 
export const updateKota = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const { Kabkota_Code, Kabkota_Name } = req.body;

        if (!Kabkota_Code || !Kabkota_Name) return next(new ErrorResponse('Kode Kota/Nama Kota harus diisi!', 400));

        const kota = await Kota.update(req.body, {
            where: {
                ID_Kabkota: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            kota
        })
})

// delete kota
export const deleteKota = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const kota = await Kota.findByPk(req.params.id);

        if (!kota) return next(new ErrorResponse(`Kota dengan id ${req.params.id} idak ditemukan`, 404));

        await Kota.destroy({
            where: {
                ID_Kabkota: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })
})

// kota
export const getListKota = asyncHandler(async (req: any, res: Response) => {
        const kota = await Kota.findAll();

        res.status(200).json({
            success: true,
            kota
        })
})