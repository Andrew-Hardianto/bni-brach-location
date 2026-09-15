import jwt from 'jsonwebtoken';

const generateToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: process.env.EXPIRES_IN } as any)
}

export default generateToken;