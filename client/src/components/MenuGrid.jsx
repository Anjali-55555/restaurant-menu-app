import { useMemo } from "react";
import { filterByCategory } from "../utils/filterByCategory";
import MenuCard from "./MenuCard";

/**
 * MenuGrid
 * Filters `menu` by `activeCategory` and renders the result as a
 * list of MenuCards. Presentational — filtering is the only logic
 * it owns, and that's delegated to the shared utility so
 * CategoryFilter and MenuGrid can't drift out of sync.
 * No CSS import here — className hooks only, styling owned elsewhere.
 *
 * @param {Array<Object>} menu       - full menu list
 * @param {string} activeCategory    - category to filter by ("All" shows everything)
 */
export default function MenuGrid({ menu, activeCategory }) {
  const items = useMemo(
    () => filterByCategory(menu, activeCategory),
    [menu, activeCategory]
  );

  if (items.length === 0) {
    return (
      <div className="menu-grid__empty">
        <p>Nothing on the board for "{activeCategory}" right now.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
