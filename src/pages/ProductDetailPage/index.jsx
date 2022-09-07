import { useParams, Navigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  // const count = 5;
  // if (count > 0) {
  //   return <Navigate to="/about" />;
  // }
  return <div>Product Detail Page - {id}</div>;
};

export default ProductDetail;
