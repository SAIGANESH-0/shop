import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../productsSlice";
import useApi from "../fetchData";
import { BallTriangle } from "react-loader-spinner";
import Product from "./Product";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const Container = styled.div`
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Products = () => {
  const { data, isLoading, error } = useApi("https://dummyjson.com/products");
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedAndFilteredProducts, setSortedAndFilteredProducts] = useState(
    []
  );

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  const products = useSelector((state) => state.products).products;

  useEffect(() => {
    const searchValue = searchQuery.toLowerCase();
    const filteredProducts = products
      .slice()
      .filter((product) => product.title.toLowerCase().includes(searchValue));

    let sortedAndFilteredProducts = filteredProducts.slice().sort((a, b) => {
      if (sortBy === "price-low-to-high") {
        return a.price - b.price;
      } else if (sortBy === "price-high-to-low") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

    if (filterBy === "laptops") {
      sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
        (product) => product.category === "laptops"
      );
    } else if (filterBy === "smartphones") {
      sortedAndFilteredProducts = sortedAndFilteredProducts.filter(
        (product) => product.category === "smartphones"
      );
    }

    setSortedAndFilteredProducts(sortedAndFilteredProducts);
  }, [sortBy, filterBy, searchQuery, products]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchQuery(searchValue);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <BallTriangle color="#007bff" height={120} width={120} />
      </LoadingContainer>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <Heading>Products</Heading>
      <FiltersContainer>
        <FilterLabel>
          Sort by:
          <Select value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </Select>
        </FilterLabel>
        <FilterLabel>
          Filter by:
          <Select value={filterBy} onChange={handleFilterChange}>
            <option value="">None</option>
            <option value="laptops">Laptops</option>
            <option value="smartphones">Smartphones</option>
          </Select>
        </FilterLabel>
      </FiltersContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          handleSearchChange(e);
        }}
      />
      <Product products={sortedAndFilteredProducts} />
    </Container>
  );
};

export default Products;
