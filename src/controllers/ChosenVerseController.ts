import { Request, Response } from 'express';
import ChosenVerse from '../models/ChosenVerse';
import durstenfeldShuffle from '../durstenfeldShuffle';

export const indexWithPoet = (req: Request, res: Response) => {
  ChosenVerse.find({}, { reviewed: 1, tags: 1, verse: 1, poet: 1, poem: 1 })
    .populate('poet', 'name')
    .then((result) => {
      durstenfeldShuffle(result);
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexRandom = (req: Request, res: Response) => {
  ChosenVerse.aggregate([{ $sample: { size: Number(req.params.size) } }])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexOneWithPoet = (req: Request, res: Response) => {
  ChosenVerse.find({ _id: req.params.id }, { reviewed: 1, tags: 1, verse: 1 })
    .populate('poet', 'name')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const post = async (req: Request, res: Response) => {
  const chosenVerse = new ChosenVerse({
    poet: req.body.poet,
    poem: req.body.poem,
    tags: req.body.tags,
    verse: req.body.verse,
    reviewed: req.body.reviewed,
  });

  try {
    const newChoseVerse = await chosenVerse.save();
    return res.status(201).json({
      success: true,
      ChosenVerse: newChoseVerse,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const update = (req: Request, res: Response) => {
  const chosenVerse = ChosenVerse.find({ _id: req.params.id });

  chosenVerse
    .updateOne({ $set: req.body })
    .then((updatedChosenVerse) => {
      return res.status(201).json({
        success: true,
        ChosenVerse: updatedChosenVerse,
      });
    })
    .catch((err) => console.log(err));
};

export const destroy = (req: Request, res: Response) => {
  const id = req.params.id;
  ChosenVerse.findByIdAndRemove(id)
    .then((result) => {
      res.send('deleted Successfully');
    })
    .catch((err) => console.log(err));
};
