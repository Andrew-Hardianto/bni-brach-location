import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Kelurahan = db.Kelurahan;
const Kecamatan = db.Kecamatan;
const Op = db.Sequelize.Op;
import fs from 'fs';

// get all data
export const getKelurahan = asyncHandler(async (req: any, res: any) => {
        const page = req.query.page ? parseInt(req.query.page as string) : null;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : null;
        
        let queryOptions: any = { include: ["kota", "provinsi", "kecamatan"] };
        
        if (req.query.keyword) {
            queryOptions.where = {
                ...queryOptions.where,
                Kelurahan_Name: {
                    [Op.like]: `%${req.query.keyword}%`
                }
            };
        }

        if (page && limit) {
            queryOptions.offset = (page - 1) * limit;
            queryOptions.limit = limit;
        }

        const { count, rows } = await Kelurahan.findAndCountAll(queryOptions);

res.status(200).json({
            success: true,
            kelurahan: rows,
            pagination: page && limit ? {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            } : null
        })
})

// get by id data
export const getByIdKelurahan = asyncHandler(async (req: any, res: any) => {
        const kelurahan = await Kelurahan.findByPk(req.params.id, { include: ["kota", "provinsi", "kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
})

// add Kelurahan
export const createKelurahan = asyncHandler(async (req: any, res: any, next: any) => {
        const { Kelurahan_Code, Kelurahan_Name, Kecamatan_Code, Status } = req.body;

        const checkkode = await Kelurahan.findOne(
            {
                where: {
                    Kelurahan_Code
                }
            }
        )

        if (!Kelurahan_Code || !Kelurahan_Name) {
            return next(new ErrorResponse('Kode Kelurahan/Nama Kelurahan harus diisi!', 400));
        }

        if (checkkode) {
            return next(new ErrorResponse('Kode Kelurahan sudah ada!', 400));
        }

        const kecamatan = await Kecamatan.findOne({
            where: {
                Kecamatan_Code
            }
        });

        if (!kecamatan) {
            return next(new ErrorResponse(`Kecamatan dengan kode ${Kecamatan_Code} tidak ditemukan!`, 404))
        }

        const kelurahan = await Kelurahan.create({
            Kelurahan_Code,
            Kelurahan_Name,
            Kecamatan_Code,
            Kabkota_Code: kecamatan.Kabkota_Code,
            Provinsi_Code: kecamatan.Provinsi_Code,
            Status
        });

        res.status(201).json({
            success: true,
            kelurahan
        })
})

// update Kelurahan
export const updateKelurahan = asyncHandler(async (req: any, res: any, next: any) => {
        const { Kelurahan_Code, Kelurahan_Name, Kecamatan_Code, Status } = req.body;

        if (!Kelurahan_Code || !Kelurahan_Name) return next(new ErrorResponse('Kode Kelurahan/Nama Kelurahan harus diisi!', 400));

        const kecamatan = await Kecamatan.findOne({
            where: {
                Kecamatan_Code
            }
        });

        if (!kecamatan) return next(new ErrorResponse(`Kecamatan dengan kode ${Kecamatan_Code} tidak ditemukan!`, 404));

        const kelurahan = await Kelurahan.update(
            {
                Kelurahan_Code,
                Kelurahan_Name,
                Kecamatan_Code,
                Kabkota_Code: kecamatan.Kabkota_Code,
                Provinsi_Code: kecamatan.Provinsi_Code,
                Status
            }, {
            where: {
                ID_Kelurahan: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kelurahan
        })
})

// delete Kelurahan
export const deleteKelurahan = asyncHandler(async (req: any, res: any, next: any) => {
        const id = await Kelurahan.findAll({
            where: {
                ID_Kelurahan: req.params.id
            }
        });

        if (!id) return next(new ErrorResponse(`Kelurahan dengan Id ${id} tidak ditemukan!`, 404))

        await Kelurahan.destroy({
            where: {
                ID_Kelurahan: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })
})

const getPagination = (page, size) => {
    const limit = size ? +size : 90000;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

// get all data
export const getListKelurahan = asyncHandler(async (req: any, res: any) => {
        let page = parseInt(req.query.page);
        let size = parseInt(req.query.size);
        const Kelurahan_Name = req.query.name
        var condition = Kelurahan_Name ? { Kelurahan_Name: { [Op.like]: `%${Kelurahan_Name}%` } } : null;

        const { limit, offset } = getPagination(page, size);

        // const offset = page ? page * limit : 0;
        const kelurahan = await Kelurahan.findAll({
            attributes: ['Kelurahan_Code', 'Kelurahan_Name'],
            offset,
            limit,
            where: condition
        });

        // const kelurahan = getPagination(kel, limit, offset)

        res.status(200).json({
            success: true,
            kelurahan
        })
})