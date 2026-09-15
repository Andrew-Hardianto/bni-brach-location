import jwt from 'jsonwebtoken';
import db from '../config/db';
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

        var decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any

        (req as any).user = await User.findByPk((decoded as any).id)

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


export default protect;
