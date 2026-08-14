import { useCart } from "../hooks/useCart";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-neutral-200">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-neutral-900 truncate">{item.name}</p>
        <p className="text-sm text-neutral-500">${item.price.toFixed(2)} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.name}`}
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-7 h-7 flex items-center justify-center rounded border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
        >
          −
        </button>

        <span className="w-6 text-center text-sm font-medium" aria-live="polite">
          {item.quantity}
        </span>

        <button
          type="button"
          aria-label={`Increase quantity of ${item.name}`}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-7 h-7 flex items-center justify-center rounded border border-neutral-300 text-neutral-600 hover:bg-neutral-100"
        >
          +
        </button>
      </div>

      <p className="w-16 text-right font-medium text-neutral-900">
        ${lineTotal.toFixed(2)}
      </p>

      <button
        type="button"
        aria-label={`Remove ${item.name} from cart`}
        onClick={() => removeItem(item.id)}
        className="text-neutral-400 hover:text-red-600 text-sm"
      >
        Remove
      </button>
    </div>
  );
}
