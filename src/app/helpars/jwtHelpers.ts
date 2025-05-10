import jwt, { SignOptions, Secret, JwtPayload } from 'jsonwebtoken';


const generateToken = (
  payload: string | object | Buffer,
  secret: Secret,
  expiresIn: SignOptions['expiresIn'] // ✅ Correctly types expiresIn
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
    algorithm: 'HS256',
  });
};

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload;
}

export const jwtHelpers = {
    generateToken,
    verifyToken
}