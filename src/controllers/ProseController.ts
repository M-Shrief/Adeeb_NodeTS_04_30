import Prose from '../models/Prose';
import durstenfeldShuffle from '../durstenfeldShuffle';
import { Request, Response } from 'express';

export const indexWithPoet = (req: Request, res: Response) => {
  Prose.find({}, { poet: 1, tags: 1, qoute: 1, reviewed: 1 })
    .populate('poet', 'name')
    .then((result) => {
      durstenfeldShuffle(result);
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexRandom = (req: Request, res: Response) => {
  Prose.aggregate([{ $sample: { size: Number(req.params.size) } }])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexOneWithPoet = (req: Request, res: Response) => {
  Prose.find(
    { _id: req.params.id },
    { poet: 1, tags: 1, qoute: 1, reviewed: 1 }
  )
    .populate('poet', 'name')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const post = async (req: Request, res: Response) => {
  const prose = new Prose({
    poet: req.body.poet,
    tags: req.body.tags,
    qoute: req.body.qoute,
    reviewed: req.body.reviewed,
  });

  try {
    const newProse = await prose.save();
    return res.status(201).json({
      success: true,
      Prose: newProse,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const update = (req: Request, res: Response) => {
  const prose = Prose.find({ _id: req.params.id });

  prose
    .updateOne({ $set: req.body })
    .then((updatedProse) => {
      return res.status(201).json({
        success: true,
        Prose: updatedProse,
      });
    })
    .catch((err) => console.log(err));
};

export const destroy = (req: Request, res: Response) => {
  const id = req.params.id;
  Prose.findByIdAndRemove(id)
    .then((result) => {
      res.send('Deleted Successfully');
    })
    .catch((err) => console.log(err));
};
