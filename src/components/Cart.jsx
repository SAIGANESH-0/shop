import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../cartSlice";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ItemName = styled.span`
  flex-grow: 1;
  margin-right: 10px;
`;

const ItemPrice = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  padding: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
`;

const Quantity = styled.span`
  margin: 0 5px;
`;

const RemoveButton = styled.button`
  padding: 4px 8px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TotalPrice = styled.p`
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  color: #333;
`;

const CheckoutButton = styled.button`
  padding: 8px 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const Cart = ({ setPrice }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const Navigate = useNavigate();

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item.id));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const calculateTotalPrice = () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setPrice(totalPrice);
    return totalPrice.toFixed(2);
  };

  return (
    <CartContainer>
      <Title>Cart Summary</Title>

      {cart.map((item) => (
        <CartItemContainer key={item.id}>
          <ItemName>{item.title}</ItemName>
          <ItemPrice>${item.price}</ItemPrice>
          <QuantityContainer>
            <QuantityButton onClick={() => handleIncreaseQuantity(item)}>
              +
            </QuantityButton>
            <Quantity>{item.quantity}</Quantity>
            <QuantityButton onClick={() => handleDecreaseQuantity(item)}>
              -
            </QuantityButton>
          </QuantityContainer>
          <RemoveButton onClick={() => handleRemoveFromCart(item)}>
            Remove
          </RemoveButton>
        </CartItemContainer>
      ))}

      <TotalPrice>Total Price: ${calculateTotalPrice()}</TotalPrice>
      <CheckoutButton onClick={() => Navigate("payment")}>
        Checkout
      </CheckoutButton>
    </CartContainer>
  );
};

export default Cart;
