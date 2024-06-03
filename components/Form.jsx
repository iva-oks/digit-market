import { categories } from "@data";
// import { IoIosFiling, IoIosImages } from "react-icons/io";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
// import { BiTrash } from "react-icons/bi";
import "@styles/Form.scss";

// убрать type,
const Form = ({ product, setProduct, handleSubmit }) => {
  // завантажене зображення додається в список та відображається на сторінці
  const handleAddPic = (e) => {
    const newPic = e.target.files;
    setProduct((prevProduct) => {
      return {
        ...prevProduct, // всі попередньо додані зображення
        pictures: [...prevProduct.pictures, ...newPic],
      };
    });
  };

  // видалене зображення видаляється зі списку по індексу та не відображається на сторінці
  const handleDelPic = (i) => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        pictures: prevProduct.pictures.filter(
          (_, currentIndex) => currentIndex !== i
        ),
      };
    });
  };

  // завантаження файлу товару
  const handleAddFiles = (e) => {
    const newFiles = e.target.files;
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        files: [...prevProduct.files, ...newFiles],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  return (
    <div className="form">
      <h1> Додати товар</h1>
      <form onSubmit={handleSubmit}>
        <h3>Оберіть категорію:</h3>
        <div className="category-list">
          {categories?.map((category, i) => (
            <p
              key={i}
              className={`${product.category === category ? "selected" : ""}`}
              onClick={() => {
                setProduct({ ...product, category: category });
              }}
            >
              {category}
            </p>
          ))}
        </div>

        <h3>Додайте зображення</h3>
        {/* якщо список зображень порожній */}
        {product.pictures.length < 1 && (
          <div className="photos">
            <label htmlFor="pictureInput" className="alone">
              <div className="icon">
                {/* <IoIosImages /> */}
                <CropOriginalIcon color="black" />
              </div>
              <p>Завантажити</p>
            </label>
            <input
              id="pictureInput"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAddPic}
              multiple
            />
          </div>
        )}

        {/* якщо сже є додані зображення, вони відображаються */}
        {product.pictures.length > 0 && (
          <div className="photos">
            {product?.pictures?.map((picture, i) => (
              <div key={i} className="photo">
                {picture instanceof Object ? (
                  // зображення, завантажені з пристрою - об'єкти (при створенні товару)
                  <img
                    src={URL.createObjectURL(picture)}
                    alt="зображення товару"
                  />
                ) : (
                  // зображення, завантажені з бази даних - string (при редагуванні товару)
                  <img src={picture} alt="зображення товару" />
                )}
                <button type="button" onClick={() => handleDelPic(i)}>
                  {/* <BiTrash /> */}
                  <DeleteIcon color="black" />
                </button>
              </div>
            ))}

            <label htmlFor="picture" className="together">
              <div className="icon">
                {/* <IoIosImages /> */}
                <CropOriginalIcon color="black" />
              </div>
              <p>Завантажити</p>
            </label>
            <input
              id="picture"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAddPic}
              multiple
            />
          </div>
        )}

        <h3>Інформація про товар</h3>
        <div className="description">
          <p>Назва</p>
          <input
            type="text"
            placeholder="Назва товару"
            onChange={handleChange}
            name="title"
            value={product.title}
            required
          />
          <p>Про товар</p>
          <textarea
            cols={4}
            rows={20}
            type="text"
            placeholder="Опис товару"
            onChange={handleChange}
            name="description"
            value={product.description}
            required
          />
          <p>Вкажіть ціну</p>
          <span>₴</span>
          <input
            type="number"
            placeholder="Ціна"
            onChange={handleChange}
            name="price"
            value={product.price}
            required
            className="price"
          />
        </div>

        <h3 className="addFile">
          Додайте файл. Обов'язково додайте документ, що підтверджує авторське
          право
        </h3>
        <div className="photos">
          <label htmlFor="file" className="file-label">
            <div className="icon">
              {/* <IoIosFiling /> */}
              <AttachFileIcon color="black" />
            </div>
            <p>Завантажити</p>
          </label>
          <input
            id="file"
            type="file"
            style={{ display: "none" }}
            accept="image/*,application/*,text/*, */*"
            onChange={handleAddFiles}
          />
        </div>

        <button className="submit_btn" type="submit">
          Опублікувати
        </button>
      </form>
    </div>
  );
};

export default Form;
