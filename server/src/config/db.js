/**
 * db.js
 *
 * Data-access layer for the menu feature.
 *
 * For now this reads from the local JSON seed file, but every function
 * here returns a Promise and takes no knowledge of *how* the data is
 * fetched from the caller's perspective. That means when you're ready
 * to move to a real database (Postgres, MongoDB, etc.), you only need
 * to change the implementation in THIS file — routes, controllers, and
 * the model stay untouched.
 *
 * Example future swap (Postgres w/ pg):
 *
 *   const { Pool } = require('pg');
 *   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
 *
 *   async function getAllMenuItems() {
 *     const { rows } = await pool.query('SELECT * FROM menu_items');
 *     return rows;
 *   }
 *
 * Example future swap (MongoDB w/ mongoose):
 *
 *   async function getAllMenuItems() {
 *     return MenuItemModel.find({}).lean();
 *   }
 */

const path = require('path');
const fs = require('fs/promises');

const SEED_PATH = path.join(__dirname, '..', 'data', 'menu.seed.json');

// Simple in-memory cache so we don't hit disk on every request.
// A real DB driver would handle connection pooling instead of this.
let _cache = null;

async function _loadSeed() {
  if (_cache) return _cache;

  const raw = await fs.readFile(SEED_PATH, 'utf-8');
  _cache = JSON.parse(raw);
  return _cache;
}

/**
 * Fetch all menu items.
 * @returns {Promise<Array<object>>}
 */
async function getAllMenuItems() {
  const items = await _loadSeed();
  return items;
}

/**
 * Fetch menu items belonging to a given category (case-insensitive).
 * @param {string} category
 * @returns {Promise<Array<object>>}
 */
async function getMenuItemsByCategory(category) {
  const items = await _loadSeed();
  const normalized = category.toLowerCase();
  return items.filter((item) => item.category.toLowerCase() === normalized);
}

/**
 * Get the distinct list of categories present in the data.
 * Useful for validating :category params against real values.
 * @returns {Promise<Array<string>>}
 */
async function getKnownCategories() {
  const items = await _loadSeed();
  return [...new Set(items.map((item) => item.category.toLowerCase()))];
}

/**
 * Clears the in-memory cache. Exposed mainly for tests, or for a
 * future admin "reload data" endpoint.
 */
function _clearCache() {
  _cache = null;
}

module.exports = {
  getAllMenuItems,
  getMenuItemsByCategory,
  getKnownCategories,
  _clearCache,
};