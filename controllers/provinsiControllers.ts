import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Provinsi = db.Provinsi;
const Op = db.Sequelize.Op;

// get all data
export const getProvinsi = asyncHandler(async (req: any, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string) : null;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
        
        let queryOptions: any = {};
        
        if (req.query.keyword) {
            queryOptions.where = {
                ...queryOptions.where,
                Provinsi_Name: {
                    [Op.like]: `%${req.query.keyword}%`
                }
            };
        }

        if (page && limit) {
            queryOptions.offset = (page - 1) * limit;
            queryOptions.limit = limit;
        }

        const { count, rows } = await Provinsi.findAndCountAll(queryOptions);

res.status(200).json({
            success: true,
            provinsi: rows,
            pagination: page && limit ? {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            } : null
        })
})

// get by id data
export const getByIdProvinsi = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const provinsi = await Provinsi.findByPk(req.params.id);
        // const provinsi = await Provinsi.findOne({ where: { ID_Provinsi: req.params.id } });
        if (!provinsi) return next(new ErrorResponse('Provinsi tidak ditemukan!', 400))

        res.status(200).json(provinsi)
})

// add Provinsi
export const createProvinsi = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const { Provinsi_Code, Provinsi_Name } = req.body;

        const checkkode = await Provinsi.findOne(
            {
                where: {
                    Provinsi_Code
                }
            }
        )

        if (!Provinsi_Code || !Provinsi_Name) return next(new ErrorResponse('kode provinsi/Nama harus diisi', 400))

        if (checkkode) return next(new ErrorResponse('kode provinsi sudah digunakan!', 400))

        const provinsi = await Provinsi.create(req.body);

        res.status(201).json({
            success: true,
            provinsi
        })
})

// update Provinsi
export const updateProvinsi = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const { Provinsi_Code, Provinsi_Name } = req.body;

        if (!Provinsi_Code || !Provinsi_Name) return next(new ErrorResponse('kode provinsi/Nama harus diisi', 400))

        const id = await Provinsi.findByPk(req.params.id)

        if (!id) return next(new ErrorResponse('Data tidak ditemukan!', 400))

        const provinsi = await Provinsi.update(req.body, {
            where: {
                ID_Provinsi: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            provinsi
        })
})

// delete Provinsi
export const deleteProvinsi = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const id = await Provinsi.findAll({
            where: {
                ID_Provinsi: req.params.id
            }
        });

        if (!id) return next(new ErrorResponse(`Provinsi dengan Id ${id} tidak ditemukan!`, 404))

        await Provinsi.destroy({
            where: {
                ID_Provinsi: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: { }
        })
})