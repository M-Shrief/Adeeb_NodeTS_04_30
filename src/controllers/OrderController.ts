import { Request, Response } from 'express';
import Order from '../models/Order';
import DOMPurify from 'isomorphic-dompurify';

export const getOrder = (req: Request, res: Response) => {
  Order.find({
    name: req.params.name,
    phone: req.params.phone,
  }).then((order) => {
    res.send(order);
  });
};

export const getPartnerOrder = (req: Request, res: Response) => {
  Order.find({
    partner: req.params.partner,
  }).then((order) => {
    res.send(order);
  });
};

export const post = async (req: Request, res: Response) => {
  let name = DOMPurify.sanitize(req.body.name);
  let phone = DOMPurify.sanitize(req.body.phone);
  let address = DOMPurify.sanitize(req.body.address);
  let partner = req.body.partner;
  let order;
  if (partner) {
    order = new Order({
      partner,
      name,
      phone,
      address,
      reviewed: req.body.reviewed,
      completed: req.body.completed,
      products: req.body.products,
    });
  } else {
    order = new Order({
      name,
      phone,
      address,
      reviewed: req.body.reviewed,
      completed: req.body.completed,
      products: req.body.products,
    });
  }

  try {
    const newOrder = await order.save();
    return res.status(201).json({
      success: true,
      Order: newOrder,
    });
  } catch (err) {
    return console.log(err);
  }
};

export const update = (req: Request, res: Response) => {
  const order = Order.find({ _id: req.params.id });

  order
    .updateOne({ $set: req.body })
    .then((updatedOrder) => {
      return res.status(201).json({
        success: true,
        Order: updatedOrder,
      });
    })
    .catch((err) => console.log(err));
};

export const destroy = (req: Request, res: Response) => {
  const id = req.params.id;
  Order.findByIdAndRemove(id)
    .then((result) => {
      res.send('Deleted Successfully');
    })
    .catch((err) => console.log(err));
};
