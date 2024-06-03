import "@styles/Loader.scss";

// Анімація завантаження, якщо контент ще не завантажився
const Downloading = () => {
  return (
    <div className="loader">
      <div className="loader-inner"></div>
    </div>
  );
};

export default Downloading;
