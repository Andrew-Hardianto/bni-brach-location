import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponse';
import db from '../config/db';
const User = db.User;
const Op = db.Sequelize.Op;
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
// login
export const login = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
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
export const getMe = asyncHandler(async (req: any, res: Response) => {
        const user = await User.findByPk(req.user.ID_User)

        res.status(200).json(user)

})

// create user
export const createUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
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
export const getAllUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const user = await User.findAll()

        res.status(200).json({
            success: true,
            user
        })

})

// get user
export const getUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const user = await User.findByPk(req.params.id)

        res.status(200).json({
            success: true,
            user
        })

})

// get user
// exports.updateUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
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
export const updateUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
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
export const deleteUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
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