import mongoose from 'mongoose';
import type Verse from './__Verse';
const Schema = mongoose.Schema;

const poemSchema = new Schema(
  {
    intro: {
      type: String,
      required: true,
    },
    poet: { type: Schema.Types.ObjectId, ref: 'Poet', required: true },
    verses: [] as Verse[],
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Poem = mongoose.model('Poem', poemSchema);
export default Poem;
