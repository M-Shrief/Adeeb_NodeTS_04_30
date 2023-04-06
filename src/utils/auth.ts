import fs from 'fs';
import bcrypt from 'bcryptjs';
// Check PASETO, as an improved alternative for JWT: https://paseto.io/
import jwt from 'jsonwebtoken';

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(); // default 10
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(raw: string, hash: string) {
  return bcrypt.compareSync(raw, hash);
}

const privateKEY = fs.readFileSync('./jwtRS256.key', 'utf8');
const publicKEY = fs.readFileSync('./jwtRS256.key.pub', 'utf8');

export const createToken = (partner: any) => {
  const { fullname, _id } = partner;
  const accessToken = jwt.sign({ fullname, _id }, privateKEY, {
    expiresIn: '2h',
    algorithm: 'RS256',
    // issuer: Domain,
  });
  return accessToken;
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

// Middleware
// const isAuth = (req, res, next) => {
//   const authorization = req.headers['Authorization'];
//   if (!authorization) throw new Error('not authorized');
//   // console.log(authorization);
//   try {
//     const token = authorization.split(' ')[1];
//     const decoded = jwt.verify(token, publicKEY);
//     next(decoded);
//   } catch (err) {
//     console.error(err);
//     throw new Error('not authorized');
//   }
//   next();
// };
