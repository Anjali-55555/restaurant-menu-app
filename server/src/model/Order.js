// Simple in-memory order model (swap for a real DB later)
class Order {
  constructor({ items, customerName }) {
    this.id = `order_${Date.now()}`;
    this.items = items;                 // [{ id, name, price, quantity }]
    this.customerName = customerName || "Guest";
    this.total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Order;