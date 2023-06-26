import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailsContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
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

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 5px;
`;

const Details = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const selectedProduct = products.products.find(
    (product) => product.id.toString() === productId
  );

  if (!selectedProduct) {
    return <div>Product not found.</div>;
  }
  const {
    title,
    description,
    price,
    brand,
    category,
    discountPercentage,
    rating,
    stock,
    thumbnail,
    images,
  } = selectedProduct;

  return (
    <ProductDetailsContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Price>Price: ${price}</Price>
      <Brand>Brand: {brand}</Brand>
      <Category>Category: {category}</Category>
      <Discount>Discount: {discountPercentage}%</Discount>
      <Rating>Rating: {rating}</Rating>
      <Stock>Stock: {stock}</Stock>
      <Thumbnail src={thumbnail} alt={title} />
      {images &&
        images.map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
    </ProductDetailsContainer>
  );
};

export default Details;
