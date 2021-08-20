const db = require('../config/db');
const Kota = db.Kota;
const Op = db.Sequelize.Op;

// get all kota
exports.getKota = async (req, res) => {
    try {
        const kota = await Kota.findAll({ include: ["provinsi"] });

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get kota by id
exports.getByIdKota = async (req, res, next) => {
    try {
        const kota = await Kota.findByPk(req.params.id, { include: ["provinsi"] });

        if (!kota) return next(new Error(`Kota dengan id ${req.params.id} idak ditemukan`, 404));

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// add kota
exports.addKota = async (req, res, next) => {
    try {
        const { Kabkota_Code, Kabkota_Name, Kabkota_Flag } = req.body;

        const checkkode = await Kota.findOne(
            {
                where: {
                    Kabkota_Code
                }
            }
        )

        if (!Kabkota_Code || !Kabkota_Name || !Kabkota_Flag) return next(new Error('Kode Kota/Nama Kota harus diisi!'));

        if (checkkode) return next(new Error('Kode Kota sudah digunakan!'));

        const kota = await Kota.create(req.body);

        res.status(201).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// update kota 
exports.updateKota = async (req, res, next) => {
    try {
        const { Kabkota_Code, Kabkota_Name } = req.body;

        if (!Kabkota_Code || !Kabkota_Name) return next(new Error('Kode Kota/Nama Kota harus diisi!'));

        const kota = await Kota.update(req.body, {
            where: {
                ID_Kabkota: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete kota
exports.deleteKota = async (req, res, next) => {
    try {
        const kota = await Kota.findByPk(req.params.id);

        if (!kota) return next(new Error(`Kota dengan id ${req.params.id} idak ditemukan`, 404));

        await Kota.destroy({
            where: {
                ID_Kabkota: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// kota
exports.getListKota = async (req, res) => {
    try {
        const kota = await Kota.findAll();

        res.status(200).json({
            success: true,
            kota
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}