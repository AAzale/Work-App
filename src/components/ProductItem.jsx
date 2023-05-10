import "../styles/productItem.css";

const ProductItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating: { rate, count },
}) => {
  return (
    <>
      <div key={id} className="product-item">
        <h2>{title}</h2>
        <div className="product-image">
          <img src={image} />
        </div>

        <span>Descripcion:</span>
        <p>{description}</p>

        <div className="product-others">
          <h3>Categoría: {category}</h3>
          <h3>Precio: {price}</h3>
          <div className="product-rate-count">
            <span>Calificación: {rate}</span>
            <span>Cantidad: {count}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
