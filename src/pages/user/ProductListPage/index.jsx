import { useEffect } from "react";
import { Row, Col, Button, Table, Space, Pagination, Avatar, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";
import { PRODUCT_LIST_LIMIT } from "../../../constants/pagination";
import * as S from "./styles";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        params: {
          page: productList.meta.page + 1,
          limit: PRODUCT_LIST_LIMIT,
        },
        more: true,
      })
    );
  };

  const renderProductList = () => {
    return productList.data.map((item) => {
      return (
        <Col span={6} key={item.id}>
          <Card size="small" title={item.name}>
            {item.price.toLocaleString()}
          </Card>
        </Col>
      );
    });
  };

  // const renderCategoryOptions = () => {
  //   return categoryList.data.map((item, index) => {
  //     return (
  //       <Select.Option key={item.id} values={item.id}>
  //         {item.name}
  //       </Select.Option>
  //     );
  //   });
  // };

  return (
    <S.Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card size="small">Filter</Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>{renderProductList()}</Row>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center">
              <Button
                style={{ marginTop: 16 }}
                onClick={() => handleShowMore()}
              >
                Show more
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default ProductListPage;
