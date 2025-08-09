import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between fixed top-0 left-0 w-full bg-blue-600 py-4 px-4 text-white shadow z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-2xl font-bold cursor-pointer mx-8">
          My Store
        </Link>
       
      </div>

      <Link to="/cart" className="relative mx-8">
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
