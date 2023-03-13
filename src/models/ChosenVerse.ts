import mongoose from 'mongoose';
import type Verse from './__Verse';
const Schema = mongoose.Schema;

const chosenVerseSchema = new Schema(
  {
    poet: {
      type: Schema.Types.ObjectId,
      ref: 'Poet',
      required: true,
    },
    poem: {
      type: Schema.Types.ObjectId,
      ref: 'Poem',
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    verse: [] as Verse[],
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ChosenVerse = mongoose.model('ChosenVerse', chosenVerseSchema);
export default ChosenVerse;
