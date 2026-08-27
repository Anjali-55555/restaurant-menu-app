import { useState } from "react";
import "./App.css";
import CategoryFilter from "./components/CategoryFilter";
import MenuGrid from "./components/MenuGrid";
import Header from "./components/Header";

const sampleMenu = [
  {
    id: "1",
    name: "Margherita Pizza",
    category: "Pizza",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
    description: "Tomato, mozzarella, basil",
  },
  {
    id: "2",
    name: "Veg Burger",
    category: "Burgers",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    description: "Grilled patty, lettuce, tomato",
  },
  {
    id: "3",
    name: "Cold Coffee",
    category: "Drinks",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
    description: "Chilled and creamy",
  },
  {
    id: "4",
    name: "Cheese Pizza",
    category: "Pizza",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    description: "Extra mozzarella",
  },
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