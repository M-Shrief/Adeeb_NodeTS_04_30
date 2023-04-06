import { Request, Response } from 'express';
import Partner from '../models/Partner';
import {
  hashPassword,
  comparePassword,
  createToken,
  decodeToken,
} from '../utils/auth';

export const partnerInfo = (req: Request, res: Response) => {
  Partner.findById(req.params.id, { fullname: 1, addresses: 1, phone: 1 })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

export const signup = async (req: Request, res: Response) => {
  const { fullname, phone, addresses } = req.body;
  const password = hashPassword(req.body.password);
  try {
    const newPartner = new Partner({
      fullname,
      password,
      phone,
      addresses,
    });

    await newPartner.save().then((partner) => {
      const accessToken = createToken(partner);
      const payload = decodeToken(accessToken) as object;
      res
        .cookie('access_token', accessToken, {
          maxAge: 60 * 60 * 2, // 2hours
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .status(200)
        .json({ ...payload, accessToken });
    });
  } catch (err) {
    return console.error(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { phone, password } = req.body;
  const partnerDB = await Partner.findOne(
    { phone },
    { fullname: 1, phone: 1, password: 1 }
  );
  if (!partnerDB) return res.status(401).send('not found');
  const isValid = comparePassword(password, partnerDB.password);

  if (!isValid) return res.send('not logged in');

  const accessToken = createToken(partnerDB);
  const payload = decodeToken(accessToken) as object;
  res
    .cookie('access-token', accessToken, {
      maxAge: 60 * 60 * 2, // 2hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json({ ...payload, accessToken });
};

export const update = (req: Request, res: Response) => {
  const partner = Partner.find({ _id: req.params.id });

  partner
    .updateOne({ $set: req.body })
    .then((updatedPartner) => {
      return res.status(201).json({
        success: true,
        Partner: updatedPartner,
      });
    })
    .catch((err) => console.error(err));
};

export const destroy = (req: Request, res: Response) => {
  const id = req.params.id;
  Partner.findByIdAndRemove(id)
    .then((result) => {
      res.send('Deleted Successfully');
    })
    .catch((err) => console.error(err));
};
