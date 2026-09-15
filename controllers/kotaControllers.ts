import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Kota = db.Kota;
const Op = db.Sequelize.Op;

// get all kota
export const getKota = asyncHandler(async (req: any, res: any) => {
        const kota = await Kota.findAll({ include: ["provinsi"] });

        res.status(200).json({
            success: true,
            kota
        })
})

// get kota by id
export const getByIdKota = asyncHandler(async (req: any, res: any, next: any) => {
        const kota = await Kota.findByPk(req.params.id, { include: ["provinsi"] });

        if (!kota) return next(new ErrorResponse(`Kota dengan id ${req.params.id} idak ditemukan`, 404));

        res.status(200).json({
            success: true,
            kota
        })
})

// add kota
export const addKota = asyncHandler(async (req: any, res: any, next: any) => {
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
export const updateKota = asyncHandler(async (req: any, res: any, next: any) => {
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
export const deleteKota = asyncHandler(async (req: any, res: any, next: any) => {
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
export const getListKota = asyncHandler(async (req: any, res: any) => {
        const kota = await Kota.findAll();

        res.status(200).json({
            success: true,
            kota
        })
})