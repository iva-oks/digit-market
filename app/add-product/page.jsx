"use client";

import React, { useState } from "react";
import Form from "@components/Form";
import Header from "@components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  // отримуємо інформацію про автентифікованого користувача
  const { data: sessionData } = useSession();
  const navRouter = useRouter();

  const [product, setProduct] = useState({
    createdBy: "",
    title: "",
    description: "",
    category: "",
    price: "",
    pictures: [],
    //file:  "",
    files: [],
  });

  // зареєстрований користувач автоматично встановлюється автором товару
  if (sessionData) {
    product.createdBy = sessionData?.user?._id;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // об'єкт містить введені дані про продукт разом з файлами
      const productFormData = new FormData();

      for (let property in product) {
        productFormData.append(property, product[property]);
      }

      // заповнюємо список зображень товару
      product.pictures.forEach((picture) => {
        productFormData.append("productPics", picture);
      });

      product.files.forEach((file) => {
        productFormData.append("productFile", file);
      });

      const fetchAddProduct = await fetch("/api/product/add", {
        method: "POST",
        body: productFormData,
      });

      // якщо створення товару пройшло успішно, користувач перенаправляється на сторінку своїх товарів
      if (fetchAddProduct.ok) {
        navRouter.push(`/my-products?id=${sessionData?.user?._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Form
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddProduct;
