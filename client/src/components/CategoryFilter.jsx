import { useMemo } from "react";
import { getCategories } from "../utils/filterByCategory";

/**
 * CategoryFilter
 * Horizontal pill/tab list. Derives its options from the menu data
 * itself (plus a synthetic "All"), so it never goes stale as
 * categories are added or removed upstream.
 *
 * Presentational only — owns no state. The caller holds activeCategory.
 * No CSS import here — className hooks only, styling owned elsewhere.
 *
 * @param {Array<Object>} menu             - full menu, used only to derive categories
 * @param {string} activeCategory          - currently selected category ("All" by default)
 * @param {(category: string) => void} onSelectCategory - fires on pill click
 */
export default function CategoryFilter({ menu, activeCategory, onSelectCategory }) {
  const categories = useMemo(() => getCategories(menu), [menu]);

  return (
    <nav className="category-filter" aria-label="Filter menu by category">
      <ul className="category-filter__list">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <li key={category}>
              <button
                type="button"
                className={`category-filter__pill${isActive ? " is-active" : ""}`}
                aria-pressed={isActive}
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
