import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { useCart } from "./hooks/useCart";
import Cart from "./components/Cart";

const sampleMenu = [
  { id: "1", name: "Margherita Pizza", price: 9.99 },
  { id: "2", name: "Veg Burger", price: 6.99 },
  { id: "3", name: "Cold Coffee", price: 3.49 },
];

function MenuTestList() {
  const { addItem } = useCart();
  return (
    <div style={{ padding: 20 }}>
      <h2>Menu (test)</h2>
      {sampleMenu.map((item) => (
        <div key={item.id} style={{ marginBottom: 8 }}>
          {item.name} — ${item.price.toFixed(2)}{" "}
          <button onClick={() => addItem(item, 1)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <div style={{ display: "flex", gap: 40, padding: 20 }}>
        <MenuTestList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;