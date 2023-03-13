import { Request, Response } from 'express';
import { Poet } from '../models/Poet';

export const index = (req: Request, res: Response) => {
  Poet.find({}, { name: 1, time_period: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const post = async (req: Request, res: Response) => {
  const poet = new Poet({
    name: req.body.name,
    time_period: req.body.time_period,
    bio: req.body.bio,
    reviewed: req.body.reviewed,
  });

  try {
    const newPoet = await poet.save();
    return res.status(201).json({
      success: true,
      Poet: newPoet,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const update = (req: Request, res: Response) => {
  const poet = Poet.find({ _id: req.params.id });

  poet
    .updateOne({ $set: req.body })
    .then((updatedPoet) => {
      return res.status(201).json({
        success: true,
        Poet: updatedPoet,
      });
    })
    .catch((err) => console.log(err));
};

export const destroy = (req: Request, res: Response) => {
  const id = req.params.id;
  Poet.findByIdAndRemove(id)
    .then((result) => {
      res.send('Deleted Successfully');
    })
    .catch((err) => console.log(err));
};
