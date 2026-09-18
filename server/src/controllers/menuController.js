/**
 * menuController.js
 *
 * Handles request/response concerns for the menu endpoints.
 * Delegates data fetching to db.js and shaping/validation to MenuItem.js.
 */

const db = require('../config/db');
const MenuItem = require('../models/MenuItem');

// Category param: letters, numbers, hyphens, underscores only.
// Keeps things safe and predictable regardless of the eventual data source.
const CATEGORY_PATTERN = /^[a-zA-Z0-9_-]+$/;

function sendError(res, status, message) {
  return res.status(status).json({
    success: false,
    error: message,
  });
}

/**
 * GET /api/menu
 * Returns all menu items.
 */
async function getAllMenu(req, res, next) {
  try {
    const rawItems = await db.getAllMenuItems();
    const items = MenuItem.fromRawList(rawItems).map((item) => item.toJSON());

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/menu/:category
 * Returns menu items filtered by category.
 */
async function getMenuByCategory(req, res, next) {
  try {
    const { category } = req.params;

    if (!category || typeof category !== 'string' || !category.trim()) {
      return sendError(res, 400, 'Category parameter is required.');
    }

    const trimmed = category.trim();

    if (!CATEGORY_PATTERN.test(trimmed)) {
      return sendError(
        res,
        400,
        'Category may only contain letters, numbers, hyphens, and underscores.'
      );
    }

    const knownCategories = await db.getKnownCategories();
    if (!knownCategories.includes(trimmed.toLowerCase())) {
      return sendError(
        res,
        404,
        `Unknown category "${trimmed}". Known categories: ${knownCategories.join(', ')}.`
      );
    }

    const rawItems = await db.getMenuItemsByCategory(trimmed);
    const items = MenuItem.fromRawList(rawItems).map((item) => item.toJSON());

    return res.status(200).json({
      success: true,
      category: trimmed.toLowerCase(),
      count: items.length,
      data: items,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllMenu,
  getMenuByCategory,
};