import jwt from 'jsonwebtoken';


const privateKey: string = String(process.env.JWT_PRIVATE_KEY);
const publicKey: string = String(process.env.JWT_PUBLIC_KEY);

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
) {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        };

} catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
}
