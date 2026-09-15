import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const Kota = db.Kota;
const Kecamatan = db.Kecamatan;
const Op = db.Sequelize.Op;

// get all data
export const getKecamatan = asyncHandler(async (req: any, res: any) => {
    const kecamatan = await Kecamatan.findAll({ include: ["kota", "provinsi"] });

    res.status(200).json({
        success: true,
        kecamatan
    })
})

// get by id data
export const getByIdKecamatan = asyncHandler(async (req: any, res: any, next: any) => {
    const kecamatan = await Kecamatan.findByPk(req.params.id, { include: ["kota", "provinsi"] });

    if (!kecamatan) return next(new ErrorResponse(`Kecamatan dengan id ${req.params.id} idak ditemukan`, 404));

    res.status(200).json({
        success: true,
        kecamatan
    })
})

// add kecamatan
export const createKecamatan = asyncHandler(async (req: any, res: any, next: any) => {
    const { Kecamatan_Code, Kecamatan_Name, Kabkota_Code, BI_Location_Code, Antasena_Code, Status } = req.body;

    const checkkode = await Kecamatan.findOne(
        {
            where: {
                Kecamatan_Code
            }
        }
    )

    if (!Kecamatan_Code || !Kecamatan_Name) return next(new ErrorResponse('Kode Kecamatan/Nama Kecamatan harus diisi!', 400));
    if (checkkode) return next(new ErrorResponse('Kode Kecamatan sudah ada!', 400));

    const kota = await Kota.findOne(
        {
            where: {
                Kabkota_Code
            }
        }
    )

    if (!kota) return next(new ErrorResponse(`Kota/kabupaten dengan kode ${Kabkota_Code} tidak ditemukan!`, 404))

    const kecamatan = await Kecamatan.create({
        Kecamatan_Code,
        Kecamatan_Name,
        Kabkota_Code,
        Provinsi_Code: kota.Provinsi_Code,
        BI_Location_Code,
        Antasena_Code,
        Status
    });

    res.status(201).json({
        success: true,
        kecamatan
    })
})

// update kecamatan
export const updateKecamatan = asyncHandler(async (req: any, res: any, next: any) => {
    const { Kecamatan_Code, Kecamatan_Name, Kabkota_Code, BI_Location_Code, Antasena_Code, Status } = req.body;

    if (!Kecamatan_Code || !Kecamatan_Name) return next(new ErrorResponse('Kode Kecamatan/Nama Kecamatan harus diisi!', 400));

    const kota = await Kota.findOne(
        {
            where: {
                Kabkota_Code
            }
        }
    )

    if (!kota) return next(new ErrorResponse(`Kota/kabupaten dengan kode ${Kabkota_Code} tidak ditemukan!`, 404))

    const kecamatan = await Kecamatan.update(
        {
            Kecamatan_Code,
            Kecamatan_Name,
            Kabkota_Code,
            Provinsi_Code: kota.Provinsi_Code,
            BI_Location_Code,
            Antasena_Code,
            Status
        }, {
        where: {
            ID_Kecamatan: req.params.id
        }
    });

    res.status(200).json({
        success: true,
        kecamatan
    })
})

// delete kecamatan
export const deleteKecamatan = asyncHandler(async (req: any, res: any, next: any) => {
    const id = await Kecamatan.findAll({
        where: {
            ID_Kecamatan: req.params.id
        }
    });

    if (!id) return next(new ErrorResponse(`Kecamatan dengan Id ${req.params.id} tidak ditemukan!`, 404))

    await Kecamatan.destroy({
        where: {
            ID_Kecamatan: req.params.id
        }
    });

    res.status(200).json({
        success: true,
        data: {}
    })
})