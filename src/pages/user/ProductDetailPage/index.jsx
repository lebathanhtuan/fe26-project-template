import { useEffect } from "react";
import { useParams, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { getProductDetailAction } from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
  }, [id]);

  return (
    <div>
      <h3>{productDetail.data.name}</h3>
      <p>{productDetail.data.category?.name}</p>
      <p>{productDetail.data.price?.toLocaleString()}</p>
      <S.ProductContent
        dangerouslySetInnerHTML={{
          __html: productDetail.data.content,
        }}
      />
      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 2 })}>
        <Button>Sản phẩm tương tự</Button>
      </Link>
    </div>
  );
};

export default ProductDetailPage;
