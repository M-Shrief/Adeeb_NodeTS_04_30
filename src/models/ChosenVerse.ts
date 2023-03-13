import mongoose from 'mongoose';
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
    verse: [
      {
        first: String,
        sec: String,
      },
    ],
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ChosenVerse = mongoose.model('ChosenVerse', chosenVerseSchema);
export default ChosenVerse;
