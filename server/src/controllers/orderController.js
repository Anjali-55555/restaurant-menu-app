const Order = require("../models/Order");

// temporary in-memory store
const orders = [];

function createOrder(req, res, next) {
  try {
    const { items, customerName } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must include at least one item." });
    }

    const order = new Order({ items, customerName });
    orders.push(order);

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    next(err);
  }
}

function getOrders(req, res) {
  res.status(200).json(orders);
}

module.exports = { createOrder, getOrders };