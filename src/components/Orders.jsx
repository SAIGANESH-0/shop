import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const OrdersContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const OrderItem = styled.li`
  margin-bottom: 20px;
`;

const OrderTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const OrderDetail = styled.p`
  margin-bottom: 4px;
`;

const NoOrdersText = styled.p`
  text-align: center;
  color: #999;
`;

const Orders = () => {
  const orders = useSelector((state) => state.orders).flat();
  return (
    <OrdersContainer>
      <h2>Orders</h2>
      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <OrderItem key={index}>
              <OrderTitle>Order #{index + 1}</OrderTitle>
              <OrderDetail>Product: {order.title}</OrderDetail>
              <OrderDetail>Quantity: {order.quantity}</OrderDetail>
            </OrderItem>
          ))}
        </ul>
      ) : (
        <NoOrdersText>No orders found.</NoOrdersText>
      )}
    </OrdersContainer>
  );
};

export default Orders;
