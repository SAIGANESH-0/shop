import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  margin: 0;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 10px;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
`;

const CartCount = styled.span`
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 50%;
  font-size: 12px;
`;

const Header = ({ cartCount }) => {
  return (
    <HeaderContainer>
      <Logo>Shop App</Logo>
      <Navigation>
        <NavItem to="/">Products</NavItem>
        <NavItem to="/cart">
          Cart {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
        </NavItem>
        <NavItem to="/orders">Orders</NavItem>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
