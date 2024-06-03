"use client";
import "@styles/Navbar.scss";
// import { Menu, Person, Search, ShoppingCart } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut as logout, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const navRouter = useRouter();

  // отримуємо інформацію про автентифікованого користувача
  const { data: sessionData } = useSession();
  const user = sessionData?.user;
  // отримуємо інформацію про продукти в кошику користувача
  const shoppingCart = user?.cart;
  const role = user?.role;

  // опції в меню навігації залежать від того, користувач автентифікований, чи ні
  const [nav, setNav] = useState(false);

  // запит при пошуку товару
  const [searchQuery, setSearchQuery] = useState("");
  // перенаправлення на сторінку результатів пошуку
  const searchForProduct = async () => {
    navRouter.push(`/search/${searchQuery}`);
  };

  // після натискання кнопки вийти користувач перенаправляється на сторінку входу
  const handleExit = async () => {
    logout({ to: "/login" });
  };

  return (
    <div className="navbar">
      <a href="/">
        {/* <img src="logo.png" alt="На головну" /> */}
        <svg
          id="logo-79"
          className="gradient"
          width="125"
          height="40"
          viewBox="0 0 125 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            className="ccustom"
            d="M88.861 37.225c.759 0 1.208-.575 1.208-1.474 0-.932-.482-1.474-1.192-1.474-.406 0-.688.18-.899.466h-.01V33.27h-.44v3.873h.44v-.368h.01c.228.314.504.45.883.45Zm-.032-.369c-.596 0-.889-.471-.889-1.1 0-.606.282-1.105.894-1.105.531 0 .786.477.786 1.105 0 .634-.255 1.1-.791 1.1Zm1.983 1.214c.341 0 .558-.12.785-.7l1.198-3.028h-.466l-.64 1.745c-.086.233-.184.547-.184.547h-.01s-.104-.314-.19-.547l-.661-1.745h-.477l1.094 2.72-.108.276c-.108.271-.233.342-.417.342a.616.616 0 0 1-.298-.06h-.022v.39c.12.049.228.06.396.06Zm3.106-.927h.737V33.27h-.737v3.873Zm2.539.082c.861 0 1.452-.64 1.452-1.469 0-.829-.59-1.468-1.452-1.468-.861 0-1.452.64-1.452 1.468 0 .83.59 1.469 1.452 1.469Zm0-.564c-.455 0-.704-.363-.704-.905 0-.541.249-.91.704-.91.45 0 .704.369.704.91 0 .542-.254.905-.704.905Zm3.019 1.43c.412 0 .769-.097 1.002-.314.206-.19.331-.455.331-.845v-2.568h-.71v.293h-.011c-.168-.233-.422-.369-.77-.369-.703 0-1.202.531-1.202 1.36 0 .84.607 1.327 1.225 1.327.352 0 .563-.14.725-.325h.017v.304c0 .379-.2.58-.618.58-.341 0-.498-.136-.558-.31h-.731c.075.542.541.867 1.3.867Zm-.01-1.706c-.38 0-.63-.276-.63-.748 0-.466.25-.758.624-.758.444 0 .661.346.661.753 0 .412-.19.753-.656.753Zm3.134.84c.861 0 1.452-.64 1.452-1.469 0-.829-.591-1.468-1.452-1.468-.862 0-1.452.64-1.452 1.468 0 .83.59 1.469 1.452 1.469Zm0-.564c-.455 0-.705-.363-.705-.905 0-.541.25-.91.705-.91.449 0 .704.369.704.91 0 .542-.255.905-.704.905Zm1.794.482h.737v-2.779h-.737v2.78Zm0-3.212h.737v-.661h-.737v.66Zm1.212 4.122h.737V36.83h.01c.158.239.412.396.802.396.715 0 1.203-.57 1.203-1.469 0-.867-.471-1.468-1.208-1.468a.972.972 0 0 0-.818.423h-.016v-.347h-.71v3.69Zm1.392-1.44c-.439 0-.672-.331-.672-.835 0-.498.185-.894.645-.894.455 0 .639.368.639.894s-.238.834-.612.834Zm2.83.612c.693 0 1.17-.336 1.17-.894 0-.65-.515-.78-.981-.878-.395-.081-.763-.103-.763-.341 0-.2.189-.31.476-.31.315 0 .504.11.537.407h.666c-.054-.558-.46-.92-1.192-.92-.634 0-1.132.286-1.132.888 0 .606.487.742.986.84.379.075.731.102.731.368 0 .195-.184.32-.509.32-.33 0-.558-.141-.607-.461h-.682c.043.59.493.98 1.3.98Zm3.968-.082v-2.779h-.737v1.604c0 .368-.212.628-.558.628-.314 0-.461-.179-.461-.504v-1.728h-.731v1.853c0 .607.347 1.002.964 1.002.39 0 .607-.146.797-.4h.016v.324h.71Zm.476 0h.737V35.53c0-.369.2-.607.498-.607.271 0 .428.163.428.477v1.744h.737V35.53c0-.369.19-.607.499-.607.271 0 .428.163.428.477v1.744h.737v-1.869c0-.607-.331-.986-.916-.986-.352 0-.645.184-.834.488h-.011a.83.83 0 0 0-.77-.488.908.908 0 0 0-.807.45h-.016v-.374h-.71v2.78Z"
            fill="#E5708C"
          ></path>{" "}
          <path
            d="M118.481 2.149c0-1.183.959-2.143 2.142-2.143h1.429a2.142 2.142 0 0 1 0 4.286h-1.429a2.142 2.142 0 0 1-2.142-2.143ZM58.49 14.29c0 7.888-6.394 14.283-14.283 14.283-7.888 0-14.283-6.395-14.283-14.283C29.924 6.4 36.319.007 44.207.007 52.096.007 58.49 6.4 58.49 14.29Zm-31.352-.071c.79 0 1.436.64 1.357 1.426A14.283 14.283 0 1 1 12.857.007c.785-.08 1.426.568 1.426 1.356V12.79c0 .79.64 1.429 1.429 1.429h11.426ZM78.487 31.43a4.285 4.285 0 1 1 0 8.57h-7.141a4.285 4.285 0 0 1 0-8.57h7.141Zm-4.285-2.857c7.889 0 14.284-6.395 14.284-14.283a14.22 14.22 0 0 0-1.789-6.925l2.36-2.36a2.928 2.928 0 1 0-4.142-4.14l-2.06 2.06A14.22 14.22 0 0 0 74.201.006C66.314.007 59.92 6.4 59.92 14.29c0 7.888 6.395 14.283 14.283 14.283Zm44.279-14.283c0 7.888-6.395 14.283-14.284 14.283-7.888 0-14.283-6.395-14.283-14.283 0-7.89 6.395-14.283 14.283-14.283 7.889 0 14.284 6.394 14.284 14.283Z"
            fill="url(#gradient_a1234)"
          ></path>{" "}
          <defs>
            {" "}
            <linearGradient
              id="gradient_a1234"
              x1="0"
              y1="16"
              x2="119"
              y2="16"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop className="ccompli1" stopColor="#64C2DB"></stop>{" "}
              <stop
                className="ccompli2"
                offset=".307"
                stopColor="#7476ED"
              ></stop>{" "}
              <stop
                className="ccustom"
                offset=".604"
                stopColor="#C994DF"
              ></stop>{" "}
              <stop className="ccompli1" offset="1" stopColor="#E56F8C"></stop>{" "}
            </linearGradient>{" "}
          </defs>
        </svg>
      </a>

      <div className="adminButton">
        {role === "admin" && (
          <Link href="/admin-panel">Панель адміністратора</Link>
        )}
      </div>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Пошук..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <IconButton disabled={searchQuery === ""}> */}
        {/* <Search sx={{ color: "red" }} onClick={searchForProduct} /> */}
        <SearchIcon color="blue" onClick={searchForProduct} />
        {/* </IconButton> */}
      </div>

      <div className="navbar_right">
        {/* if user is logged in, show cart */}
        {/* якщо користувач автентифікований, відображається кнопка кошика */}
        {user && (
          <Link href="/cart" className="cart">
            {/* <ShoppingCart sx={{ color: "gray" }} /> */}
            <ShoppingCartIcon color="gray" />
            Кошик <span>({shoppingCart?.length})</span>
          </Link>
        )}

        {/* Кнопка відобразити меню навігації */}
        <button className="navbar_right_account" onClick={() => setNav(!nav)}>
          {/* <Menu color="gray" /> */}
          <MenuIcon color="gray" />
          {!user ? (
            // <Person sx={{ color: "gray" }} />
            <AccountCircleIcon color="gray" />
          ) : (
            <img
              src={user.profilePic}
              alt="користувач"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {/* гість може  Увійти або Зареєструватися*/}
        {nav && !user && (
          <div className="navbar_right_accountmenu">
            <Link href="/sign-up">Зареєструватися</Link>
            <Link href="/login">Увійти</Link>
          </div>
        )}

        {/* Навігація по сайту доступна зареєстрованому користувачу*/}
        {nav && user && (
          <div className="navbar_right_accountmenu">
            <Link href="/add-product">Додати товар</Link>
            <Link href={`/my-products?id=${user._id}`}>Ваші товари</Link>
            <Link href="/wishlist">Обране</Link>
            <Link href="/cart">Кошик</Link>
            <Link href="/order">Замовлення</Link>
            <a onClick={handleExit}>Вийти</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
