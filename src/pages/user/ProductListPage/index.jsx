import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Card,
  Checkbox,
  Space,
  Tag,
} from "antd";
import { Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIST_LIMIT } from "../../../constants/pagination";
import * as S from "./styles";

const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: "",
    price: [0, 100000000],
  });
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

  const handleFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      [key]: value,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          [key]: value,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
  };

  const handleClearCategoryFilter = (id) => {
    const newCategoryId = filterParams.categoryId.filter((item) => item !== id);
    setFilterParams({
      ...filterParams,
      categoryId: newCategoryId,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          categoryId: newCategoryId,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
  };

  const handleClearKeywordFilter = () => {
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          keyword: "",
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
        },
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
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
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.id}`,
            })}
          >
            <Card size="small" title={item.name}>
              {item.price.toLocaleString()}
            </Card>
          </Link>
        </Col>
      );
    });
  };

  const renderCategoryOptions = () => {
    return categoryList.data.map((item, index) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  };

  const renderFilterCategory = () => {
    return filterParams.categoryId.map((filterItem) => {
      const categoryData = categoryList.data.find(
        (categoryItem) => categoryItem.id === filterItem
      );
      return (
        <Tag
          key={filterItem}
          closable
          onClose={() => handleClearCategoryFilter(filterItem)}
        >
          {categoryData.name}
        </Tag>
      );
    });
  };

  return (
    <S.Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card size="small" title="Filter">
            <h4>Categories</h4>
            <Checkbox.Group
              onChange={(value) => handleFilter("categoryId", value)}
              value={filterParams.categoryId}
            >
              <Row>{renderCategoryOptions()}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input
                onChange={(e) => handleFilter("keyword", e.target.value)}
                value={filterParams.keyword}
              />
            </Col>
            <Col span={8}>
              <Select style={{ width: "100%" }}></Select>
            </Col>
          </Row>
          <Space style={{ marginBottom: 16 }}>
            {renderFilterCategory()}
            {filterParams.keyword && (
              <Tag closable onClose={() => handleClearKeywordFilter()}>
                Keyword: {filterParams.keyword}
              </Tag>
            )}
          </Space>
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
