import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

export function geneteToken(payload: object) {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid token');
    }
}