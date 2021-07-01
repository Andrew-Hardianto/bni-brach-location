const db = require('../config/db');
const Kodepos = db.Kodepos;
const Kelurahan = db.Kelurahan;
const Op = db.Sequelize.Op;

// get all data
exports.getKodepos = async (req, res) => {
    try {
        const kodepos = await Kodepos.findAll({ include: ["kota", "provinsi", "kecamatan", "kelurahan"] });

        res.status(200).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdKodepos = async (req, res) => {
    try {
        const kodepos = await Kodepos.findByPk(req.params.id, { include: ["kota", "provinsi", "kecamatan", "kelurahan"] });

        res.status(200).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

// add Kodepos
exports.createKodepos = async (req, res, next) => {
    try {
        const { Kodepos_Code, Kelurahan_Code } = req.body;

        if (!Kodepos_Code) return next(new Error('Kodepos harus diisi!'));

        // const checkkode = await Kodepos.findOne({ where: { Kodepos_Code } });

        // if (checkkode) return next(new Error('kodepos sudah digunakan!'));

        const kelurahan = await Kelurahan.findOne({
            where: {
                Kelurahan_Code
            }
        });

        if (!kelurahan) return next(new Error(`Kelurahan dengan kode ${Kelurahan_Code} tidak ditemukan!`, 404));

        const kodepos = await Kodepos.create({
            Kodepos_Code,
            Kelurahan_Code,
            Kecamatan_Code: kelurahan.Kecamatan_Code,
            Kabupaten_Code: kelurahan.Kabupaten_Code,
            Provinsi_Code: kelurahan.Provinsi_Code,
        });

        res.status(201).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update Kodepos
exports.updateKodepos = async (req, res, next) => {
    try {
        const { Kodepos_Code, Kelurahan_Code } = req.body;

        if (!Kodepos_Code) return next(new Error('Kodepos harus diisi!'));

        const kelurahan = await Kelurahan.findOne({
            where: {
                Kelurahan_Code
            }
        });

        if (!kelurahan) return next(new Error(`Kelurahan dengan kode ${Kelurahan_Code} tidak ditemukan!`, 404));

        const kodepos = await Kodepos.update(
            {
                Kodepos_Code: Kodepos_Code,
                Kelurahan_Code,
                Kecamatan_Code: kelurahan.Kecamatan_Code,
                Kabupaten_Code: kelurahan.Kabupaten_Code,
                Provinsi_Code: kelurahan.Provinsi_Code,
            }, {
            where: {
                ID_Kodepos: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kodepos
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete Kodepos
exports.deleteKodepos = async (req, res, next) => {
    try {

        const id = await Kodepos.findAll({
            where: {
                ID_Kodepos: req.params.id
            }
        });

        if (!id) return next(new Error(`Kodepos dengan Id ${req.params.id} tidak ditemukan!`, 404))

        await Kodepos.destroy({
            where: {
                ID_Kodepos: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}