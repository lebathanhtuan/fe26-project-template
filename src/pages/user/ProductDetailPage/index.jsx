import { useEffect, useMemo, useState } from "react";
import { useParams, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Radio, InputNumber } from "antd";

import {
  getProductDetailAction,
  addToCartAction,
} from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

const ProductDetailPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  const { id } = useParams();
  const productId = parseInt(id.split(".")[1]);
  const dispatch = useDispatch();

  const { productDetail } = useSelector((state) => state.product);

  const hasOptions = !!productDetail.data.options?.length;
  const selectedOptionData = productDetail.data.options?.find(
    (item) => item.id === selectedOptionId
  );
  const bonusPrice = selectedOptionData ? selectedOptionData.bonusPrice : 0;
  const productPrice = (productDetail.data.price || 0) + bonusPrice;

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
  }, [productId]);

  useEffect(() => {
    if (hasOptions) {
      setSelectedOptionId(productDetail.data.options[0].id);
    }
  }, [productDetail.data, hasOptions]);

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        productId: productId,
        name: productDetail.data.name,
        quantity: productQuantity,
        price: productPrice,
        slug: productDetail.data.slug,
      })
    );
  };

  const renderProductOptions = useMemo(() => {
    return productDetail.data.options?.map((item) => {
      return (
        <Radio key={item.id} value={item.id}>
          {item.name}
        </Radio>
      );
    });
  }, [productDetail.data]);

  return (
    <div>
      <h3>{productDetail.data.name}</h3>
      <p>{productDetail.data.category?.name}</p>
      <p>{productPrice?.toLocaleString()}</p>
      {hasOptions && (
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setSelectedOptionId(e.target.value)}
          value={selectedOptionId}
        >
          {renderProductOptions}
        </Radio.Group>
      )}
      <InputNumber
        min={1}
        onChange={(value) => setProductQuantity(value)}
        value={productQuantity}
      />
      <Button type="primary" onClick={() => handleAddToCart()}>
        Add to cart
      </Button>
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
