import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Kodepos = db.Kodepos;
const Kelurahan = db.Kelurahan;
const Op = db.Sequelize.Op;

// get all data
export const getKodepos = asyncHandler(async (req: any, res: any) => {
        // const kodepos = await Kodepos.findAll({ include: ["kota", "provinsi", "kecamatan", "kelurahan"] });
        const kodepos = await Kodepos.findAll();

        res.status(200).json({
            success: true,
            kodepos
        })
})

// get by id data
export const getByIdKodepos = asyncHandler(async (req: any, res: any) => {
        const kodepos = await Kodepos.findByPk(req.params.id, { include: ["kota", "provinsi", "kecamatan", "kelurahan"] });

        res.status(200).json({
            success: true,
            kodepos
        })
})

// add Kodepos
export const createKodepos = asyncHandler(async (req: any, res: any, next: any) => {
        const { Postcode, Kelurahan_Code, Status } = req.body;

        if (!Postcode) return next(new ErrorResponse('Kodepos harus diisi!', 400));

        // const checkkode = await Kodepos.findOne({ where: { Postcode } });

        // if (checkkode) return next(new ErrorResponse('kodepos sudah digunakan!', 400));

        const kelurahan = await Kelurahan.findOne({
            where: {
                Kelurahan_Code
            }
        });

        if (!kelurahan) return next(new ErrorResponse(`Kelurahan dengan kode ${Kelurahan_Code} tidak ditemukan!`, 404));

        const kodepos = await Kodepos.create({
            Postcode: Postcode,
            Kelurahan_Code,
            Kecamatan_Code: kelurahan.Kecamatan_Code,
            Kabkota_Code: kelurahan.Kabkota_Code,
            Provinsi_Code: kelurahan.Provinsi_Code,
            Status: Status
        });

        res.status(201).json({
            success: true,
            kodepos
        })
})

// update Kodepos
export const updateKodepos = asyncHandler(async (req: any, res: any, next: any) => {
        const { Postcode, Kelurahan_Code, Status } = req.body;

        if (!Postcode) return next(new ErrorResponse('Kodepos harus diisi!', 400));

        const kelurahan = await Kelurahan.findOne({
            where: {
                Kelurahan_Code
            }
        });

        if (!kelurahan) return next(new ErrorResponse(`Kelurahan dengan kode ${Kelurahan_Code} tidak ditemukan!`, 404));

        const kodepos = await Kodepos.update(
            {
                Postcode: Postcode,
                Kelurahan_Code,
                Kecamatan_Code: kelurahan.Kecamatan_Code,
                Kabupaten_Code: kelurahan.Kabupaten_Code,
                Provinsi_Code: kelurahan.Provinsi_Code,
                Status: Status
            }, {
            where: {
                ID_Postcode: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kodepos
        })
})

// delete Kodepos
export const deleteKodepos = asyncHandler(async (req: any, res: any, next: any) => {
        const id = await Kodepos.findAll({
            where: {
                ID_Postcode: req.params.id
            }
        });

        if (!id) return next(new ErrorResponse(`Kodepos dengan Id ${req.params.id} tidak ditemukan!`, 404))

        await Kodepos.destroy({
            where: {
                ID_Postcode: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })
})