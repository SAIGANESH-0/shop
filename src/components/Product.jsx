import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../cartSlice";
import { useNavigate } from "react-router-dom";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductContainer = styled.div`
  margin: 20px;
  padding: 20px;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled.p`
  margin-bottom: 10px;
  text-align: center;
`;

const Price = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Brand = styled.p`
  margin-bottom: 10px;
`;

const Category = styled.p`
  margin-bottom: 10px;
`;

const Discount = styled.p`
  margin-bottom: 10px;
`;

const Rating = styled.p`
  margin-bottom: 10px;
`;

const Stock = styled.p`
  margin-bottom: 10px;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Product = ({ products }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product, e) => {
    e.stopPropagation();
    dispatch(removeFromCart(product.id));
  };

  const handleProductClick = (productId) => {
    Navigate(`/products/${productId}`);
  };

  return (
    <ProductsContainer>
      {products &&
        products.map((p) => (
          <ProductContainer onClick={() => handleProductClick(p.id)} key={p.id}>
            <Thumbnail src={p.thumbnail} alt={p.title} />
            <Title>{p.title}</Title>
            <Description>{p.description}</Description>
            <Price>Price: ${p.price}</Price>
            <Brand>Brand: {p.brand}</Brand>
            <Category>Category: {p.category}</Category>
            <Discount>Discount: {p.discountPercentage}%</Discount>
            <Rating>Rating: {p.rating}</Rating>
            <Stock>Stock: {p.stock}</Stock>
            {cart.find((cartItem) => cartItem.id === p.id) ? (
              <RemoveButton onClick={(e) => handleRemoveFromCart(p, e)}>
                Remove from Cart
              </RemoveButton>
            ) : (
              <AddToCartButton onClick={(e) => handleAddToCart(p, e)}>
                Add to Cart
              </AddToCartButton>
            )}
          </ProductContainer>
        ))}
    </ProductsContainer>
  );
};

export default Product;
