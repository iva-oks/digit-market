// import {
//   ArrowBackIosNew,
//   ArrowForwardIos,
//   Delete,
//   Favorite,
//   FavoriteBorder,
// } from "@mui/icons-material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "@styles/WorkCard.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// превью товару на домашній сторінці
const ProductCard = ({ product }) => {
  const navRouter = useRouter();

  // отримуємо інформацію про зареєстрованого користувача
  const { data: userSession, update } = useSession();
  const userId = userSession?.user?._id;
  const wishlist = userSession?.user?.wishlist;

  // видалити товар
  const handleDelProduct = async () => {
    const confirmDelete = confirm("Ви точно бажаєте видалити товар?");

    // товар видаляється лише після підтвердження
    if (confirmDelete) {
      try {
        await fetch(`api/product/${product._id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(error);
      }
      window.location.reload();
    }
  };

  // Слайдер для зображень
  const [index, setIndex] = useState(0);

  // наступне зображення
  const nextPicture = () => {
    setIndex((currIndex) => (currIndex + 1) % product.productPics.length);
  };

  // попереднє зображення
  const prevPicture = () => {
    setIndex(
      (currIndex) =>
        (currIndex - 1 + product.productPics.length) %
        product.productPics.length
    );
  };

  // чи додано товар до обраного
  const isWished = wishlist?.find(
    (wishedProduct) => wishedProduct?._id === product._id
  );

  // якщо користувач не автентифікований, опція додати до обраного не активна
  const checkAddToWish = async () => {
    if (!userSession) {
      navRouter.push("/login");
      return;
    }

    // const response = await fetch(`api/user/${userId}/wishlist/${product._id}`, {
    //   method: "PATCH",
    // });

    // зберегти оновлений вішліст
    const updatedUser = await fetch(
      `api/user/${userId}/wishlist/${product._id}`,
      {
        method: "PATCH",
      }
    ).json();

    // оновити дані про вішліст в сесії поточного користувача
    update({ user: { wishlist: updatedUser.wishlist } });
  };

  return (
    <div
      className="work-card"
      onClick={() => {
        navRouter.push(`/product-info?id=${product._id}`);
      }}
    >
      {/* Слайдер з зображеннями */}
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {product.productPics?.map((picture, i) => (
            <div className="slide" key={i}>
              <img src={picture} alt="зображення товару" />
              <div
                className="prev-button"
                onClick={(event) => {
                  event.stopPropagation();
                  prevPicture(event);
                }}
              >
                {/* <ArrowBackIosNew sx={{ fontSize: "15px" }} /> */}
                <KeyboardArrowLeftIcon />
              </div>
              <div
                className="next-button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextPicture(event);
                }}
              >
                {/* <ArrowForwardIos sx={{ fontSize: "15px" }} /> */}
                <KeyboardArrowRightIcon />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Деталі товару */}
      <div className="info">
        <div>
          <h3>{product.title}</h3>
          <div className="creator">
            <img src={product.createdBy.profilePic} alt="автор" />
            <span>{product.createdBy.login}</span>
            <span>в {product.category}</span>
          </div>
        </div>
        <div className="price">{product.price} ₴</div>
      </div>

      {/* якщо поточний користувач створив даний товар, доступна опція видалення */}
      {userId === product?.createdBy._id ? (
        <div
          className="icon"
          onClick={(event) => {
            event.stopPropagation();
            handleDelProduct();
          }}
        >
          {/* <Delete sx={{ borderRadius: "50%", backgroundColor: "white", padding: "5px", fontSize: "30px", }}/> */}
          <DeleteIcon />
        </div>
      ) : (
        <div
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            checkAddToWish();
          }}
        >
          {/* якщо поточний користувач не є автором товару, доступна опція додати до обраного/видалити з обраного */}
          {isWished ? (
            // <Favorite
            //   sx={{
            //     borderRadius: "50%",
            //     backgroundColor: "white",
            //     color: "red",
            //     padding: "5px",
            //     fontSize: "30px",
            //   }}
            // />
            <FavoriteIcon />
          ) : (
            // <FavoriteBorder
            //   sx={{
            //     borderRadius: "50%",
            //     backgroundColor: "white",
            //     padding: "5px",
            //     fontSize: "30px",
            //   }}
            // />
            <FavoriteBorderIcon />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
