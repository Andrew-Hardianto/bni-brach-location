const jwt = require('jsonwebtoken')
const db = require('../config/db');
const User = db.User;

const protect = async (req, res, next) => {
  let token
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findByPk(decoded.id)

        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }

    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }


}


module.exports = protect
