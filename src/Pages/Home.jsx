import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=1000"
        );
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const groupSize = 5;
  const currentGroup = Math.floor((currentPage - 1) / groupSize);
  const groupStart = currentGroup * groupSize + 1;
  const groupEnd = Math.min(groupStart + groupSize - 1, totalPages);
  const pagesToShow = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i
  );

  if (loading) {
    return <h1 className="text-center text-4xl mt-24 font-bold">Loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-left mt-24">All Products</h1>

      <div className="flex items-center justify-center my-6 px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-gray-300 rounded-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
        </div>
      </div>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-8">
            {currentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 flex-wrap sm:items-left">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>

            {pagesToShow.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white cursor-pointer"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-center text-2xl mt-8 text-gray-500">
          No products found
        </h1>
      )}
    </div>
  );
};

export default Home;
