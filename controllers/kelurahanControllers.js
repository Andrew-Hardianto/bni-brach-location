const db = require('../config/db');
const Kelurahan = db.Kelurahan;
const Kecamatan = db.Kecamatan;
const Op = db.Sequelize.Op;
const fs = require('fs');

// get all data
exports.getKelurahan = async (req, res) => {
    try {
        // const kelurahan = await Kelurahan.findAll({ include: ["kota", "provinsi", "kecamatan"] });
        const kelurahan = await Kelurahan.findAll();

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
        const kelurahan = await Kelurahan.findByPk(req.params.id, { include: ["kota", "provinsi", "kecamatan"] });

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

// add Kelurahan
exports.createKelurahan = async (req, res, next) => {
    try {
        const { Kelurahan_Code, Kelurahan_Name, Kecamatan_Code } = req.body;

        const checkkode = await Kelurahan.findOne(
            {
                where: {
                    Kelurahan_Code
                }
            }
        )

        if (!Kelurahan_Code || !Kelurahan_Name) {
            return next(new Error('Kode Kelurahan/Nama Kelurahan harus diisi!'));
        }

        if (checkkode) {
            return next(new Error('Kode Kelurahan sudah ada!'));
        }

        const kecamatan = await Kecamatan.findOne({
            where: {
                Kecamatan_Code
            }
        });

        if (!kecamatan) {
            return next(new Error(`Kecamatan dengan kode ${Kecamatan_Code} tidak ditemukan!`, 404))
        }

        const kelurahan = await Kelurahan.create({
            Kelurahan_Code,
            Kelurahan_Name,
            Kecamatan_Code,
            Kabupaten_Code: kecamatan.Kabupaten_Code,
            Provinsi_Code: kecamatan.Provinsi_Code,
        });

        res.status(201).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

// update Kelurahan
exports.updateKelurahan = async (req, res, next) => {
    try {

        const { Kelurahan_Code, Kelurahan_Name, Kecamatan_Code } = req.body;

        if (!Kelurahan_Code || !Kelurahan_Name) return next(new Error('Kode Kelurahan/Nama Kelurahan harus diisi!'));

        const kecamatan = await Kecamatan.findOne({
            where: {
                Kecamatan_Code
            }
        });

        if (!kecamatan) return next(new Error(`Kecamatan dengan kode ${Kecamatan_Code} tidak ditemukan!`, 404));

        const kelurahan = await Kelurahan.update(
            {
                Kelurahan_Code,
                Kelurahan_Name,
                Kecamatan_Code,
                Kabupaten_Code: kecamatan.Kabupaten_Code,
                Provinsi_Code: kecamatan.Provinsi_Code,
            }, {
            where: {
                ID_Kelurahan: req.params.id
            }
        });

        res.status(200).json({
            success: true,
            kelurahan
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// delete Kelurahan
exports.deleteKelurahan = async (req, res, next) => {
    try {

        const id = await Kelurahan.findAll({
            where: {
                ID_Kelurahan: req.params.id
            }
        });

        if (!id) return next(new Error(`Kelurahan dengan Id ${id} tidak ditemukan!`, 404))

        await Kelurahan.destroy({
            where: {
                ID_Kelurahan: req.params.id
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
exports.getListKelurahan = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}