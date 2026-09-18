import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function Cart() {
  const { items } = useCart();

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-neutral-900 mb-2">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500 py-6 text-center">
          Your cart is empty. Add something from the menu to get started.
        </p>
      ) : (
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <CartSummary />
    </div>
  );
}
