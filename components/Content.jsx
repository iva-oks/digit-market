"use client";

import { categories } from "@data";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import "@styles/Categories.scss";
import Downloading from "./Downloading";

const Content = () => {
  // Якщо елементи завантажуються, на сторінці відображається анімація завантаження
  const [loader, setLoader] = useState(true);
  // Обрана категорія для фільтрації
  const [activeCat, setActiveCat] = useState("All");
  // Список всіх товарів за категорією
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    const result = await fetch(`/api/product/list/${activeCat}`);
    const productList = await result.json();
    setProductList(productList);
    setLoader(false);
  };

  useEffect(() => {
    getProductList();
  }, [activeCat]);

  return loader ? (
    <Downloading />
  ) : (
    <>
      <div className="categories">
        {categories?.map((category, i) => (
          <p
            key={i}
            onClick={() => setActiveCat(category)}
            className={`${category === activeCat ? "selected" : ""}`}
          >
            {category === "All" ? "Всі товари" : category}
          </p>
        ))}
      </div>

      <ProductList productCards={productList} />
    </>
  );
};

export default Content;
