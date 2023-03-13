import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('order', orderSchema);
export default Order;
