import "@styles/WorkList.scss";
import ProductCard from "./ProductCard";

const ProductList = ({ productCards }) => {
  return (
    <div className="work-list">
      {productCards.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
