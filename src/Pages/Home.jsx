import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });
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
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-left mt-20">
        All Products
      </h1>

      <div className="flex flex-col sm:flex-row items-center  gap-6 mb-6">
        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-auto border border-gray-300 bg-white rounded-md px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

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

      <div className="text-sm text-left mb-6 text-gray-600 flex flex-wrap items-center gap-4">
        <div>
          Showing: <strong>{selectedCategory}</strong> | Search:{" "}
          <strong>{searchTerm || "none"}</strong>
        </div>
        <button
          onClick={() => {
            setSelectedCategory("all");
            setSearchTerm("");
            setCurrentPage(1);
          }}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Clear Filters
        </button>
      </div>

      {currentProducts.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10">
            {currentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 transition"
            >
              Prev
            </button>

            {pagesToShow.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
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
              className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50 transition"
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
