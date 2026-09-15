const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const db = require('../config/db');
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
// login
exports.login = asyncHandler(async (req, res, next) => {
        const { username, password } = req.body

        if (!username || !password) return next(new ErrorResponse('Mohon isi semua kolom', 400))

        const user = await User.findOne({ where: { Username: username } })

        if (!user) return next(new ErrorResponse('username tidak ada!', 400))

        const matchPassword = bcrypt.compareSync(password, user.Password)

        if (!matchPassword) {
            return next(new ErrorResponse('Password salah!', 400))
        }

        res.status(200).json({
            success: true,
            token: generateToken(user.ID_User),
            user
        })

})

// current user
exports.getMe = asyncHandler(async (req, res) => {
        const user = await User.findByPk(req.user.ID_User)

        res.status(200).json(user)

})

// create user
exports.createUser = asyncHandler(async (req, res, next) => {
        const { username, password } = req.body

        if (!username || !password) return next(new ErrorResponse('Mohon isi semua kolom', 400))

        const checkUser = await User.findOne({ where: { Username: username } })

        if (checkUser) return next(new ErrorResponse('username sudah digunakan!', 400))

        const user = await User.create({
            Username: username,
            Password: bcrypt.hashSync(password, 10)
        })

        res.status(201).json({
            success: true,
            user
        })

})

// get All user
exports.getAllUser = asyncHandler(async (req, res, next) => {
        const user = await User.findAll()

        res.status(200).json({
            success: true,
            user
        })

})

// get user
exports.getUser = asyncHandler(async (req, res, next) => {
        const user = await User.findByPk(req.params.id)

        res.status(200).json({
            success: true,
            user
        })

})

// get user
// exports.updateUser = asyncHandler(async (req, res, next) => {
//     try {

//         const user = await User.update(req.body, {
//             where: {
//                 ID_Branch: req.params.id
//             }
//         })

//         res.status(200).json({
//             success: true,
//             user
//         })

//})

// get update user
exports.updateUser = asyncHandler(async (req, res, next) => {
        const { username, password } = req.body

        if (password) {
            const user = await User.update({
                Username: username,
                Password: bcrypt.hashSync(password)
            }, {
                where: {
                    ID_User: req.params.id
                }
            })

            res.status(200).json({
                success: true,
                user
            })

        } else {
            const user = await User.update({
                Username: username
            }, {
                where: {
                    ID_User: req.params.id
                }
            })

            res.status(200).json({
                success: true,
                user
            })
        }


})

// get delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
        await User.destroy({
            where: {
                ID_User: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })

})