const db = require('../config/db');
const Kota = db.Kota;
const Kecamatan = db.Kecamatan;
const Op = db.Sequelize.Op;

// get all data
exports.getKecamatan = async (req, res) => {
    try {
        const kecamatan = await Kecamatan.findAll({ include: ["kota", "provinsi"] });

        res.status(200).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdKecamatan = async (req, res) => {
    try {
        const kecamatan = await Kecamatan.findByPk(req.params.id, { include: ["kota", "provinsi"] });

        if (!kecamatan) return next(new Error(`Kecamatan dengan id ${req.params.id} idak ditemukan`, 404));

        res.status(200).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}

// add kecamatan
exports.createKecamatan = async (req, res, next) => {
    try {
        const { Kecamatan_Code, Kecamatan_Name, Kabupaten_Code, BI_Location_Code, Antasena_Code } = req.body;

        const checkkode = await Kecamatan.findOne(
            {
                where: {
                    Kecamatan_Code
                }
            }
        )

        if (!Kecamatan_Code || !Kecamatan_Name) return next(new Error('Kode Kecamatan/Nama Kecamatan harus diisi!'));
        if (checkkode) return next(new Error('Kode Kecamatan sudah ada!'));

        const kota = await Kota.findOne(
            {
                where: {
                    Kabupaten_Code
                }
            }
        )

        if (!kota) return next(new Error(`Kota/kabupaten dengan kode ${Kabupaten_Code} tidak ditemukan!`, 404))

        const kecamatan = await Kecamatan.create({
            Kecamatan_Code,
            Kecamatan_Name,
            Kabupaten_Code,
            Provinsi_Code: kota.Provinsi_Code,
            BI_Location_Code,
            Antasena_Code
        });

        res.status(201).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update kecamatan
exports.updateKecamatan = async (req, res, next) => {
    try {
        const { Kecamatan_Code, Kecamatan_Name, Kabupaten_Code, BI_Location_Code, Antasena_Code } = req.body;

        if (!Kecamatan_Code || !Kecamatan_Name) return next(new Error('Kode Kecamatan/Nama Kecamatan harus diisi!'));

        const kota = await Kota.findOne(
            {
                where: {
                    Kabupaten_Code
                }
            }
        )

        if (!kota) return next(new Error(`Kota/kabupaten dengan kode ${Kabupaten_Code} tidak ditemukan!`, 404))

        const kecamatan = await Kecamatan.update(
            {
                Kecamatan_Code,
                Kecamatan_Name,
                Kabupaten_Code,
                Provinsi_Code: kota.Provinsi_Code,
                BI_Location_Code,
                Antasena_Code
            }, {
            where: {
                ID_Kecamatan: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kecamatan
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete kecamatan
exports.deleteKecamatan = async (req, res, next) => {
    try {

        const id = await Kecamatan.findAll({
            where: {
                ID_Kecamatan: req.params.id
            }
        });

        if (!id) return next(new Error(`Kecamatan dengan Id ${req.params.id} tidak ditemukan!`, 404))

        await Kecamatan.destroy({
            where: {
                ID_Kecamatan: req.params.id
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