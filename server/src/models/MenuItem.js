/**
 * MenuItem.js
 *
 * Plain-object "model" for a menu item. It has no persistence logic of
 * its own (that lives in db.js) — its job is to define the shape of a
 * menu item, validate raw records, and normalize them into a clean
 * response format.
 *
 * When you swap in a real database/ORM (Mongoose schema, Sequelize
 * model, Prisma type, etc.), this file is the one to replace — the
 * controller only ever calls MenuItem.fromRaw() / MenuItem.validate(),
 * so the rest of the app doesn't need to change.
 */

const REQUIRED_FIELDS = ['id', 'name', 'category', 'price'];

class MenuItem {
  constructor({ id, name, category, price, description = '', available = true }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.available = available;
  }

  /**
   * Validates a raw record has the minimum required shape.
   * Throws a descriptive Error if invalid.
   */
  static validate(raw) {
    if (!raw || typeof raw !== 'object') {
      throw new Error('Menu item must be an object');
    }

    for (const field of REQUIRED_FIELDS) {
      if (raw[field] === undefined || raw[field] === null || raw[field] === '') {
        throw new Error(`Menu item is missing required field: "${field}"`);
      }
    }

    if (typeof raw.price !== 'number' || raw.price < 0) {
      throw new Error(`Menu item "${raw.id}" has an invalid price`);
    }

    if (typeof raw.category !== 'string') {
      throw new Error(`Menu item "${raw.id}" has an invalid category`);
    }

    return true;
  }

  /**
   * Builds a clean MenuItem instance from a raw record (e.g. straight
   * out of the JSON seed, or a future DB row/document).
   */
  static fromRaw(raw) {
    MenuItem.validate(raw);
    return new MenuItem(raw);
  }

  /**
   * Maps an array of raw records into validated MenuItem instances.
   * Skips (and logs) any record that fails validation rather than
   * crashing the whole request over one bad row.
   */
  static fromRawList(rawList) {
    const items = [];
    for (const raw of rawList) {
      try {
        items.push(MenuItem.fromRaw(raw));
      } catch (err) {
        console.warn(`[MenuItem] Skipping invalid record: ${err.message}`);
      }
    }
    return items;
  }

  /** Shapes the instance into the exact JSON sent to clients. */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      description: this.description,
      available: this.available,
    };
  }
}

module.exports = MenuItem;