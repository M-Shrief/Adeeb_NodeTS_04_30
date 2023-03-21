import { Request, Response } from 'express';
import Poet from '../models/Poet';
import Poem from '../models/Poem';
import ChosenVerse from '../models/ChosenVerse';
import Prose from '../models/Prose';

export const index = (req: Request, res: Response) => {
  Poet.find({}, { name: 1, time_period: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

export const indexOneWithLiterature = async (req: Request, res: Response) => {
  try {
    // insteading of awaiting every constant alone, we do it concurrently. (still learning it and experiementing it so.)
    const [poet, authoredPoems, authoredProses, authoredChosenVerses] =
      await Promise.allSettled([
        Poet.find({ _id: req.params.id }, { name: 1, bio: 1, time_period: 1 }),
        Poem.find({ poet: req.params.id }, { intro: 1, reviewed: 1 }),
        Prose.find({ poet: req.params.id }, { tags: 1, qoute: 1 }),
        ChosenVerse.find(
          { poet: req.params.id },
          { reviewed: 1, tags: 1, verse: 1, poem: 1 }
        ),
      ]);

    res.send({
      details: poet[0],
      authoredPoems,
      authoredChosenVerses,
      authoredProses,
    });
  } catch (err) {
    return console.log(err);
  }
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
