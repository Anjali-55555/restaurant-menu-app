/**
 * Header
 * Purely presentational masthead for the menu page.
 * No CSS import here — className hooks only, styling owned elsewhere.
 *
 * @param {string} [title]   - restaurant / page name
 * @param {string} [tagline] - short supporting line
 */
export default function Header({ title = "The Board", tagline = "Tonight's menu, chalked up fresh" }) {
  return (
    <header className="menu-header">
      <p className="menu-header__eyebrow">Est. daily</p>
      <h1 className="menu-header__title">{title}</h1>
      <p className="menu-header__tagline">{tagline}</p>
    </header>
  );
}
