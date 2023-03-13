import { Request, Response } from 'express';
import Poem from '../models/Poem';

export const indexWithPoet = (req: Request, res: Response) => {
  Poem.find({}, { intro: 1, poet: 1, verses: 1, reviewed: 1 })
    .populate('poet', 'name')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexIntrosWithPoetName = (req: Request, res: Response) => {
  Poem.find({}, { intro: 1, poet: 1, reviewed: 1 })
    .populate('poet', 'name')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexOneWithPoet = (req: Request, res: Response) => {
  Poem.find(
    { _id: req.params.id },
    { intro: 1, poet: 1, verses: 1, reviewed: 1 }
  )
    .populate('poet', ['name', 'bio', 'time_period'])
    .then((poem) => {
      res.send(poem[0]);
    })
    .catch((err) => console.log(err));
};

export const post = (req: Request, res: Response) => {
  const poem = new Poem({
    intro: req.body.intro,
    poet: req.body.poet,
    verses: req.body.verses,
    reviewed: req.body.reviewed,
  });
  return poem
    .save()
    .then((newPoem) => {
      return res.status(201).json({
        success: true,
        Poem: newPoem,
      });
    })
    .catch((err) => console.log(err));
};

export const update = (req: Request, res: Response) => {
  const poem = Poem.find({ _id: req.params.id });

  poem
    .updateOne({ $set: req.body })
    .then((updatedPoem) => {
      return res.status(201).json({
        success: true,
        Poem: updatedPoem,
      });
    })
    .catch((err) => console.log(err));
};

export const destroy = (req: Request, res: Response) => {
  const id = req.params.id;
  Poem.findByIdAndRemove(id)
    .then((result) => {
      res.send('deleted Successfully');
    })
    .catch((err) => console.log(err));
};
