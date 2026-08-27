/**
 * MenuCard
 * Renders a single menu item. Purely presentational — no cart logic,
 * no internal state. Parent supplies the item shape:
 *   { id, name, category, price, image, description }
 * No CSS import here — className hooks only, styling owned elsewhere.
 */
export default function MenuCard({ item }) {
  const { name, category, price, image, description } = item;

  return (
    <article className="menu-card">
      <div className="menu-card__image-wrap">
        {image ? (
          <img className="menu-card__image" src={image} alt={name} loading="lazy" />
        ) : (
          <div className="menu-card__image menu-card__image--placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="menu-card__body">
        <p className="menu-card__eyebrow">{category}</p>

        <div className="menu-card__title-row">
          <h3 className="menu-card__name">{name}</h3>
          <span className="menu-card__price">
            {typeof price === "number" ? `$${price.toFixed(2)}` : price}
          </span>
        </div>

        {description && <p className="menu-card__description">{description}</p>}
      </div>
    </article>
  );
}
