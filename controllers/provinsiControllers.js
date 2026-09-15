const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const Provinsi = db.Provinsi;
const Op = db.Sequelize.Op;

// get all data
exports.getProvinsi = asyncHandler(async (req, res) => {
        const provinsi = await Provinsi.findAll();

        res.status(200).json({
            success: true,
            provinsi
        })
})

// get by id data
exports.getByIdProvinsi = asyncHandler(async (req, res, next) => {
        const provinsi = await Provinsi.findByPk(req.params.id);
        // const provinsi = await Provinsi.findOne({ where: { ID_Provinsi: req.params.id } });
        if (!provinsi) return next(new ErrorResponse('Provinsi tidak ditemukan!', 400))

        res.status(200).json(provinsi)
})

// add Provinsi
exports.createProvinsi = asyncHandler(async (req, res, next) => {
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
exports.updateProvinsi = asyncHandler(async (req, res, next) => {
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
exports.deleteProvinsi = asyncHandler(async (req, res, next) => {
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