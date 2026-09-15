const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const geocoder = require('../utils/geocoder');
const Outlet = db.Outlet;
const Cabang = db.Cabang;
const Op = db.Sequelize.Op;

// get all outlet
exports.getAllOutlet = asyncHandler(async (req, res) => {
        const outlet = await Outlet.findAll({
            include: [
                "cabang"
            ]
        });

        res.status(200).json({
            success: true,
            outlet
        })
})

// get all outlet
exports.getByIdOutlet = asyncHandler(async (req, res) => {
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
})

// add outlet
exports.createOutlet = asyncHandler(async (req, res, next) => {
        const { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude, Status } = req.body;

        const checkId = await Outlet.findOne(
            {
                where: {
                    Outlet_Code: Outlet_Code
                }
            }
        )

        if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
        if (!Outlet_Code) return next(new ErrorResponse('Field Outlet code tidak boleh kosong!', 400));
        if (!Outlet_Name) return next(new ErrorResponse('Field Outlet name tidak boleh kosong!', 400));
        if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));

        if (checkId) return next(new ErrorResponse('Kode outlet sudah digunakan!', 400))

        const cabang = await Cabang.findOne({ where: { Branch_Code } });

        const outlet = await Outlet.create({
            Outlet_Code,
            Outlet_Name,
            Address,
            Branch_Code,
            Region_Code: cabang.Region_Code,
            Latitude,
            Longitude,
            Status
        })

        res.status(201).json({
            success: true,
            outlet
        })
})

// update outlet
exports.updateOutlet = asyncHandler(async (req, res, next) => {
        const { Outlet_Code, Outlet_Name, Address, Branch_Code, Latitude, Longitude, Status, Outlet_level } = req.body;

        if (!Branch_Code) return next(new ErrorResponse('Field Branch Code tidak boleh kosong!', 400));
        if (!Outlet_Code) return next(new ErrorResponse('Field Outlet code tidak boleh kosong!', 400));
        if (!Outlet_Name) return next(new ErrorResponse('Field Outlet name tidak boleh kosong!', 400));
        if (!Address) return next(new ErrorResponse('Field Address tidak boleh kosong!', 400));

        const cabang = await Cabang.findOne({ where: { Branch_Code } });

        const outlet = await Outlet.update({
            Outlet_Code,
            Outlet_Name,
            Address,
            Branch_Code,
            Region_Code: cabang.Region_Code,
            Latitude,
            Longitude,
            Outlet_level,
            Status
        }, {
            where: {
                ID_Outlet: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            outlet
        })
})

// delete outlet
exports.deleteOutlet = asyncHandler(async (req, res) => {
        await Outlet.destroy({
            where: {
                ID_Outlet: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })
})