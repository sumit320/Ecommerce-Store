import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext"; 

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleCartClick = (e) => {
    e.preventDefault();
    addToCart(product);
    navigate("/cart");
  };

  return (
    <Link to={`/product/${product.id}`} className="w-full">
      <div className="border rounded-xl shadow-2xl border-none p-4 flex flex-col items-center hover:scale-105 transition transform delay-100 ease-in cursor-pointer">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-42 object-cover mb-4 rounded"
        />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className=" flex justify-between  items-center mt-2 text-center w-full">
          <span className="text-green-600 font-bold text-lg">
            ${product.price}
          </span>
          <button
            className="border-0 bg-blue-600 p-2 m-2 rounded text-white hover:bg-blue-700 cursor-pointer"
            onClick={handleCartClick}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
