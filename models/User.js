import { Schema, model, models } from "mongoose";

const SchemaForUsers = new Schema({
  // Містить ім'я користувача в системі. Обов'язкове, унікальне
  login: {
    type: String,
    required: [true, "Поле логін обов'язкове для заповнення"],
    unique: [true, "Логін вже існує"],
  },
  // Містить електронну пошту користувача. Обов'язкове, унікальне
  email: {
    type: String,
    required: [true, "Поле електронна пошта обов'язкове для заповнення"],
    unique: [true, "Електронна пошта вже існує"],
  },
  // Містить пароль користувача. Обов'язкове
  password: {
    type: String,
    required: [true, "Поле пароль обов'язкове для заповнення"],
  },
  // Містить роль користувача
  role: {
    type: String,
    default: "user",
  },
  // Містить посилання на зображення профілю користувача
  profilePic: {
    type: String,
    //required: [true, "Profile image is required"],
  },
  // Містить список товарів, створених користувачем. Список об'єктів
  products: {
    type: Array,
    default: [],
  },
  // Містить список замовлень користувача. Список об'єктів
  orders: {
    type: Array,
    default: [],
  },
  // Містить список товарів в кошику користувача. Список об'єктів
  cart: {
    type: Array,
    default: [],
  },
  // Містить список обраних товарів користувача. Список об'єктів
  wishlist: {
    type: Array,
    default: [],
  },
});

// Створити нову модель Користувач, якщо дана модель ще не створена
const User = models.User || model("User", SchemaForUsers);

export default User;
