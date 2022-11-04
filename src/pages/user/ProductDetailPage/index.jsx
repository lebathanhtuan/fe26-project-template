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
  Form,
  Input,
  Rate,
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import moment from "moment";

import {
  getProductDetailAction,
  addToCartAction,
  favoriteProductAction,
  unFavoriteProductAction,
  getReviewListAction,
  postReviewAction,
} from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

const ProductDetailPage = () => {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  const { id } = useParams();
  const productId = parseInt(id.split(".")[1]);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);

  const hasOptions = !!productDetail.data.options?.length;
  const selectedOptionData = productDetail.data.options?.find(
    (item) => item.id === selectedOptionId
  );
  const bonusPrice = selectedOptionData ? selectedOptionData.bonusPrice : 0;
  const productPrice = (productDetail.data.price || 0) + bonusPrice;

  const isLike = userInfo.data.id
    ? productDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
    dispatch(getReviewListAction({ productId: productId }));
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

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoriteProductAction({
              id: favoriteData.id,
              productId: productDetail.data.id,
            })
          );
        }
      } else {
        dispatch(
          favoriteProductAction({
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  const handlePostReview = (values) => {
    dispatch(
      postReviewAction({
        ...values,
        userId: userInfo.data.id,
        productId: productDetail.data.id,
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

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length) return null;
    return reviewList.data?.map((item) => {
      return (
        <div>
          <Space>
            <h3>{item.user.fullName}</h3>
            <h4>{moment(item.createdAt).fromNow()}</h4>
          </Space>
          <div>
            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          </div>
          <div>{item.comment}</div>
        </div>
      );
    });
  }, [reviewList.data]);

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
        <Col xs={{ span: 24, order: 1 }}>
          <Card size="small" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col md={10} sm={24}>
                {renderProductImages}
              </Col>
              <Col md={14} sm={24}>
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
                  <Button
                    size="large"
                    danger={isLike}
                    icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => handleToggleFavorite()}
                  >
                    {productDetail.data?.favorites?.length || 0} liked
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={{ span: 16, order: 2 }} xs={{ span: 24, order: 3 }}>
          <Card size="small" bordered={false} title="Infomation">
            <S.ProductContent
              dangerouslySetInnerHTML={{
                __html: productDetail.data.content,
              }}
            />
          </Card>
        </Col>
        <Col md={{ span: 8, order: 3 }} xs={{ span: 24, order: 1 }}>
          <Card size="small" bordered={false} title="Specification"></Card>
        </Col>
        <Col md={{ span: 16, order: 4 }} xs={{ span: 24, order: 4 }}>
          <Card size="small" bordered={false} title="Review">
            {userInfo.data.id && (
              <S.CustomForm
                layout="vertical"
                onFinish={(values) => handlePostReview(values)}
              >
                <Form.Item label="Rate" name="rate">
                  <Rate />
                </Form.Item>
                <Form.Item label="Comment" name="comment">
                  <Input.TextArea autoSize={{ maxRows: 6, minRows: 2 }} />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </S.CustomForm>
            )}
            {renderReviewList}
          </Card>
        </Col>
      </Row>
      <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: 2 })}>
        <Button>Sản phẩm tương tự</Button>
      </Link>
    </S.Wrapper>
  );
};

export default ProductDetailPage;
