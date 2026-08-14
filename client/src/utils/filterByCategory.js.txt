/**
 * filterByCategory
 * Pure utility — no side effects, safe to unit test in isolation.
 *
 * @param {Array<Object>} menu - full list of menu items
 * @param {string} activeCategory - the category to filter by.
 *   Pass "All" (or leave undefined) to return the full menu unchanged.
 * @returns {Array<Object>} the filtered list, same item references
 */
export function filterByCategory(menu, activeCategory) {
  if (!Array.isArray(menu)) return [];
  if (!activeCategory || activeCategory === "All") return menu;

  return menu.filter(
    (item) => item.category?.toLowerCase() === activeCategory.toLowerCase()
  );
}

/**
 * getCategories
 * Derives a unique, stably-ordered list of categories from the menu data,
 * with "All" always first. Order otherwise follows first appearance in
 * the data so the tab order stays predictable as items are added.
 *
 * @param {Array<Object>} menu
 * @returns {string[]}
 */
export function getCategories(menu) {
  if (!Array.isArray(menu)) return ["All"];

  const seen = new Set();
  const categories = [];

  for (const item of menu) {
    if (item.category && !seen.has(item.category)) {
      seen.add(item.category);
      categories.push(item.category);
    }
  }

  return ["All", ...categories];
}

export default filterByCategory;
