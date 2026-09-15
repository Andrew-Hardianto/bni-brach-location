const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const Kelurahan = db.Kelurahan;
const Kecamatan = db.Kecamatan;
const Op = db.Sequelize.Op;
const fs = require('fs');

// get all data
exports.getKelurahan = asyncHandler(async (req, res) => {
        // const kelurahan = await Kelurahan.findAll({ include: ["kota", "provinsi", "kecamatan"] });
        const kelurahan = await Kelurahan.findAll({ include: ["kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
})

// get by id data
exports.getByIdKelurahan = asyncHandler(async (req, res) => {
        const kelurahan = await Kelurahan.findByPk(req.params.id, { include: ["kota", "provinsi", "kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
})

// add Kelurahan
exports.createKelurahan = asyncHandler(async (req, res, next) => {
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
exports.updateKelurahan = asyncHandler(async (req, res, next) => {
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
exports.deleteKelurahan = asyncHandler(async (req, res, next) => {
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
exports.getListKelurahan = asyncHandler(async (req, res) => {
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