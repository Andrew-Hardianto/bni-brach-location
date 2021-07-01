const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Outlet = db.Outlet;
const Cabang = db.Cabang;
const Op = db.Sequelize.Op;

// get all outlet
exports.getAllOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findAll({
            include: [
                "cabang",
                "wilayah"
            ]
        });

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get all outlet
exports.getByIdOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findByPk(req.params.id, {
            include: [
                "wilayah",
                "cabang"
            ]
        });

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// add outlet
exports.createOutlet = async (req, res, next) => {
    try {
        const { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude } = req.body;

        const checkId = await Outlet.findOne(
            {
                where: {
                    Outlet_Code: Outlet_Code
                }
            }
        )

        if (!Branch_Code) return next(new Error('Field Branch Code tidak boleh kosong!'));
        if (!Outlet_Code) return next(new Error('Field Outlet code tidak boleh kosong!'));
        if (!Outlet_Name) return next(new Error('Field Outlet name tidak boleh kosong!'));
        if (!Address) return next(new Error('Field Address tidak boleh kosong!'));

        if (checkId) return next(new Error('Kode outlet sudah digunakan!'))

        const cabang = await Cabang.findOne({ where: { Branch_Code } });

        const outlet = await Outlet.create({
            Outlet_Code,
            Outlet_Name,
            Address,
            Branch_Code,
            Region_Code: cabang.Region_Code,
            Latitude,
            Longitude,
        })

        res.status(201).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

// update outlet
exports.updateOutlet = async (req, res, next) => {
    try {
        const { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude } = req.body;

        if (!Branch_Code) return next(new Error('Field Branch Code tidak boleh kosong!'));
        if (!Outlet_Code) return next(new Error('Field Outlet code tidak boleh kosong!'));
        if (!Outlet_Name) return next(new Error('Field Outlet name tidak boleh kosong!'));
        if (!Address) return next(new Error('Field Address tidak boleh kosong!'));

        const cabang = await Cabang.findOne({ where: { Branch_Code } });

        const outlet = await Outlet.update({
            Outlet_Code,
            Outlet_Name,
            Address,
            Branch_Code,
            Region_Code: cabang.Region_Code,
            Latitude,
            Longitude,
        }, {
            where: {
                ID_Outlet: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete outlet
exports.deleteOutlet = async (req, res) => {
    try {
        await Outlet.destroy({
            where: {
                ID_Outlet: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}