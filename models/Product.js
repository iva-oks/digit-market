import { Schema, model, models } from "mongoose";

const SchemaForProducts = new Schema({
  // Містить id користувача, що створив товар
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // Містить категорію товару. Обов'язкове
  category: {
    type: String,
    required: [true, "Категорія обов'язкова"],
  },
  // Містить назву товару. Обов'язкове
  title: {
    type: String,
    required: [true, "Назва обов'язкова"],
  },
  // Містить текстовий опис товару. Обов'язкове
  description: {
    type: String,
    required: [true, "Опис товару обов'язковий"],
  },
  // Містить статус товару
  status: {
    type: String,
    default: "pending",
  },
  // Містить ціну товару. Обов'язкове
  price: {
    type: Number,
    required: [true, "Ціна обов'язкова"],
  },
  // Містить список посилань на зображення товару
  productPics: [{ type: String }],
  // Містить список посилань на файли товару
  productFile: [{ type: String }],
});

// Створити нову модель Товар, якщо дана модель ще не створена
const Product = models.Product || model("Product", SchemaForProducts);
export default Product;
