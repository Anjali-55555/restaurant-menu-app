import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import MenuGrid from "./components/MenuGrid";
import Header from "./components/Header";

const sampleMenu = [
  { id: "1", name: "Margherita Pizza", category: "Pizza", price: 9.99, image: "", description: "Tomato, mozzarella, basil" },
  { id: "2", name: "Veg Burger", category: "Burgers", price: 6.99, image: "", description: "Grilled patty, lettuce, tomato" },
  { id: "3", name: "Cold Coffee", category: "Drinks", price: 3.49, image: "", description: "Chilled and creamy" },
  { id: "4", name: "Cheese Pizza", category: "Pizza", price: 8.49, image: "", description: "Extra mozzarella" },
];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div>
      <Header />
      <CategoryFilter
        menu={sampleMenu}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <MenuGrid menu={sampleMenu} activeCategory={activeCategory} />
    </div>
  );
}

export default App;