import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
    },
    addresses: {
      type: String || Array,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
