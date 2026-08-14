import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { submitOrder, ApiError } from "../services/api";

export default function CartSummary() {
  const { items, total, itemCount, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await submitOrder({
        items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        total,
      });
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong placing your order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-4 space-y-3">
      <div className="flex justify-between text-sm text-neutral-600">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>

      <div className="flex justify-between text-lg font-semibold text-neutral-900">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">Order placed! Thanks for your order.</p>}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={items.length === 0 || submitting}
        className="w-full py-2 rounded bg-neutral-900 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800"
      >
        {submitting ? "Placing order..." : "Checkout"}
      </button>
    </div>
  );
}
