const db = require('../config/db');
const Provinsi = db.Provinsi;
const Op = db.Sequelize.Op;

// get all data
exports.getProvinsi = async (req, res) => {
    try {
        const provinsi = await Provinsi.findAll();

        res.status(200).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdProvinsi = async (req, res, next) => {
    try {
        const provinsi = await Provinsi.findByPk(req.params.id);
        // const provinsi = await Provinsi.findOne({ where: { ID_Provinsi: req.params.id } });
        if (!provinsi) return next(new Error('Provinsi tidak ditemukan!', 404))

        res.status(200).json(provinsi)
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}

// add Provinsi
exports.createProvinsi = async (req, res, next) => {
    try {
        const { Provinsi_Code, Provinsi_Name } = req.body;

        const checkkode = await Provinsi.findOne(
            {
                where: {
                    Provinsi_Code
                }
            }
        )

        if (!Provinsi_Code || !Provinsi_Name) return next(new Error('kode provinsi/Nama harus diisi', 401))

        if (checkkode) return next(new Error('kode provinsi sudah digunakan!', 400))

        const provinsi = await Provinsi.create(req.body);

        res.status(201).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update Provinsi
exports.updateProvinsi = async (req, res, next) => {
    try {
        const { Provinsi_Code, Provinsi_Name } = req.body;

        if (!Provinsi_Code || !Provinsi_Name) return next(new Error('kode provinsi/Nama harus diisi', 401))

        const id = await Provinsi.findByPk(req.params.id)

        if (!id) return next(new Error('Data tidak ditemukan!'))

        const provinsi = await Provinsi.update(req.body, {
            where: {
                ID_Provinsi: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            provinsi
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete Provinsi
exports.deleteProvinsi = async (req, res, next) => {
    try {

        const id = await Provinsi.findAll({
            where: {
                ID_Provinsi: req.params.id
            }
        });

        if (!id) return next(new Error(`Provinsi dengan Id ${id} tidak ditemukan!`, 404))

        await Provinsi.destroy({
            where: {
                ID_Provinsi: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: { }
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}