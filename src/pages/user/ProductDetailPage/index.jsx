import { useEffect, useMemo, useState } from "react";
import { useParams, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Space,
  Breadcrumb,
  Card,
  Button,
  Radio,
  InputNumber,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import moment from "moment";

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
    if (!productDetail.data.options?.length) return null;
    return productDetail.data.options?.map((item) => {
      return (
        <Radio key={item.id} value={item.id}>
          {item.name}
        </Radio>
      );
    });
  }, [productDetail.data]);

  const renderProductImages = useMemo(() => {
    if (!productDetail.data.images?.length) return null;
    return productDetail.data.images?.map((item) => {
      return (
        <img
          key={item.id}
          src={item.url}
          alt={item.name}
          width="100%"
          height="auto"
        />
      );
    });
  }, [productDetail.data]);

  return (
    <S.Wrapper>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to={ROUTES.USER.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={ROUTES.USER.PRODUCT_LIST}>Product List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link
            to={ROUTES.USER.PRODUCT_LIST}
            state={{ categoryId: [productDetail.data.category?.id] }}
          >
            {productDetail.data.category?.name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{productDetail.data.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card size="small" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col span={10}>{renderProductImages}</Col>
              <Col span={14}>
                <h1>{productDetail.data.name}</h1>
                <h3>{productDetail.data.category?.name}</h3>
                <h2>{productPrice?.toLocaleString()} VND</h2>
                {hasOptions && (
                  <Row style={{ margin: "16px 0" }}>
                    <Col flex="100px">
                      <h3>Option</h3>
                    </Col>
                    <Col flex="auto">
                      <Radio.Group
                        optionType="button"
                        buttonStyle="solid"
                        onChange={(e) => setSelectedOptionId(e.target.value)}
                        value={selectedOptionId}
                      >
                        {renderProductOptions}
                      </Radio.Group>
                    </Col>
                  </Row>
                )}
                <Row style={{ margin: "16px 0" }}>
                  <Col flex="100px">
                    <h3>Quantity</h3>
                  </Col>
                  <Col flex="auto">
                    <InputNumber
                      min={1}
                      onChange={(value) => setProductQuantity(value)}
                      value={productQuantity}
                    />
                  </Col>
                </Row>
                <Space size={16}>
                  <Button
                    size="large"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart()}
                  >
                    Add to cart
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={16}>
          <Card size="small" bordered={false} title="Infomation">
            <S.ProductContent
              dangerouslySetInnerHTML={{
                __html: productDetail.data.content,
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" bordered={false} title="Specification"></Card>
        </Col>
        <Col span={16}>
          <Card size="small" bordered={false} title="Review"></Card>
        </Col>
      </Row>
      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 2 })}>
        <Button>Sản phẩm tương tự</Button>
      </Link>
    </S.Wrapper>
  );
};

export default ProductDetailPage;
