import { useEffect } from "react";
import { Button, Table, Space, Pagination, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";
import { ADMIN_TABLE_LIMIT } from "../../../constants/pagination";
import { ROUTES } from "../../../constants/routes";
import * as S from "./styles";

const AdminProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList, createProductData } = useSelector(
    (state) => state.product
  );
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  const handleChangePage = (page) => {
    dispatch(
      getProductListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
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

  const tableColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space>
            <Avatar />
            <h4>{record.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              onClick={() =>
                navigate(
                  generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: record.id })
                )
              }
            >
              Update
            </Button>
            <Button>Delete</Button>
          </Space>
        );
      },
    },
  ];

  const tableData = productList.data.map((item) => ({ ...item, key: item.id }));

  return (
    <>
      <S.Wrapper>
        <S.TopWrapper>
          <h3>Product List</h3>
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}
          >
            Create Product
          </Button>
        </S.TopWrapper>
        <Table
          columns={tableColumn}
          dataSource={tableData}
          pagination={false}
          style={{ flex: 1 }}
        />
        <Pagination
          current={productList.meta.page}
          pageSize={ADMIN_TABLE_LIMIT}
          total={productList.meta.total}
          onChange={(page) => handleChangePage(page)}
          style={{ margin: "16px auto 0" }}
        />
      </S.Wrapper>
    </>
  );
};

export default AdminProductListPage;
