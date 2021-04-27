const db = require('../config/db');
const Kelurahan = db.Kelurahan;
const Op = db.Sequelize.Op;
// const fs = require('fs')
// get all data
exports.getKelurahan = async (req, res) => {
    try {
        const kelurahan = await Kelurahan.findAll({ include: ["kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// get by id data
exports.getByIdKelurahan = async (req, res) => {
    try {
        const kelurahan = await Kelurahan.findByPk(req.params.id);

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        })
    }
}

// add Kelurahan
exports.createKelurahan = async (req, res, next) => {
    try {
        const { id, nama } = req.body;

        const checkId = await Kelurahan.findOne(
            {
                where: {
                    id
                }
            }
        )

        if (!id || !nama) return next(new Error('ID/Nama Kelurahan harus diisi!'));
        
        if (checkId) return next(new Error('ID sudah ada!'));

        const kelurahan = await Kelurahan.create(req.body);

        res.status(201).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

// update Kelurahan
exports.updateKelurahan = async (req, res, next) => {
    try {

        const kelurahan = await Kelurahan.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        res.status(201).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

// delete Kelurahan
exports.deleteKelurahan = async (req, res, next) => {
    try {

        const id = await Kelurahan.findAll({
            where: {
                id: req.params.id
            }
        });

        if (!id) return next(new Error(`Kelurahan dengan Id ${id} tidak ditemukan!`, 404))

        await Kelurahan.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(201).json({
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// exports.insertKelurahan = async(req,res) => {
//     const kelurahan = JSON.parse(fs.readFileSync(`${__dirname}/kelurahan.json`, 'utf-8'))
//     try {
//         const kel = await Kelurahan.bulkCreate(kelurahan)
//         res.status(201).json(kel)
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }