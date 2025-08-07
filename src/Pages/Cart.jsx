import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, getTotal } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="p-6 mt-12 text-center sm:mt-20">
        <FaShoppingCart className="mx-auto text-5xl text-gray-400 mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>
        <p className="mb-4 text-gray-600">
          Looks like you haven’t added anything yet.
        </p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pt-24 max-w-4xl mx-auto sm:mt-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-4 mb-4"
        >
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-700">
              ${item.price} x {item.quantity}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                -
              </button>
              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 py-1 bg-gray-300 rounded hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>

          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-24 h-24 object-cover rounded mx-auto sm:mx-0"
          />
        </div>
      ))}

      <h2 className="text-lg sm:text-xl font-bold mt-6 text-right">
        Total: ${getTotal()}
      </h2>
    </div>
  );
};

export default Cart;
