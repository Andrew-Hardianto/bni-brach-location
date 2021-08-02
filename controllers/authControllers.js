const db = require('../config/db');
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
// login
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username || !password) return next(new Error('Mohon isi semua kolom', 400))

        const user = await User.findOne({ where: { Username: username } })

        if (!user) return next(new Error('username tidak ada!', 404))

        const matchPassword = bcrypt.compareSync(password, user.Password)

        if (!matchPassword) {
            return next(new Error('Password salah!', 400))
        }

        res.status(200).json({
            success: true,
            token: generateToken(user.ID_User),
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// current user
exports.getMe = async (req, res) => {
    try {

        const user = await User.findByPk(req.user.ID_User)

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// create user
exports.createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username || !password) return next(new Error('Mohon isi semua kolom', 400))

        const checkUser = await User.findOne({ where: { Username: username } })

        if (checkUser) return next(new Error('username sudah digunakan!', 404))

        const user = await User.create({
            Username: username,
            Password: bcrypt.hashSync(password, 10)
        })

        res.status(201).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get All user
exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.findAll()

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get user
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get user
exports.updateUser = async (req, res, next) => {
    try {

        const user = await User.update(req.body, {
            where: {
                ID_Branch: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get update user
exports.updateUser = async (req, res, next) => {
    try {

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


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get delete user
exports.deleteUser = async (req, res, next) => {
    try {
        await User.destroy({
            where: {
                ID_User: req.params.id
            }
        })

        res.status(200).json({
            success: true,
            data: {}
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}