import { useEffect } from "react";
import { Tabs, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getOrderList } from "../../../redux/actions";
import image1 from "../../../assets/images/image-1.jpg";

import * as S from "./styles";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderList({ userId: userInfo.data.id }));
    }
  }, [userInfo.data]);

  const tableColumns = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Count",
      dataIndex: "orderProducts",
      key: "orderProducts",
      render: (orderProducts) => `${orderProducts.length} products`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];

  return (
    <>
      <div>ProfilePage</div>
      <Tabs tabPosition="left">
        <Tabs.TabPane tab="Info" key="1">
          <S.Image style={{ backgroundImage: `url(${image1})` }} />
          <img
            src={image1}
            width="100%"
            height="100px"
            alt=""
            style={{ objectFit: "cover" }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Order history" key="2">
          <Table
            columns={tableColumns}
            dataSource={orderList.data}
            rowKey="id"
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <ul>
                  {record.orderProducts.map((item) => (
                    <li key={item.id}>
                      {item.productName}
                      {item.optionName && ` - ${item.optionName}`}
                      {` - ${item.price}`}
                      {` - ${item.quantity}`}
                      {` - ${item.price * item.quantity}`}
                    </li>
                  ))}
                </ul>
              ),
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default ProfilePage;
