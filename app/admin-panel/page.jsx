"use client";

import Downloading from "@components/Downloading";
import Header from "@components/Header";
import ProductList from "@components/ProductList";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import "@styles/Search.scss";

const SearchResults = () => {
  const [load, setLoad] = useState(true);

  // список знайдених товарів
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const results = await fetch(`/api/product/pending/`, {
        // method: "GET",
      });

      const finded = await results.json();
      setProducts(finded);
      setLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [0]);

  return load ? (
    <Downloading />
  ) : (
    <>
      <Header />

      <h1 className="title-list">Результати пошуку</h1>

      <ProductList productCards={products} />
    </>
  );
};

export default SearchResults;
