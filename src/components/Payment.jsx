import React, { useState, useEffect } from "react";
import Web3 from "web3";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../cartSlice";
import { addToOrders } from "../ordersSlice";
import { useNavigate } from "react-router-dom";

const PaymentContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PriceLabel = styled.p`
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PaymentStatus = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

const SuccessMessage = styled.h1`
  margin-top: 20px;
  text-align: center;
  color: green;
`;

const Payment = ({ price }) => {
  const [paymentStatus, setPaymentStatus] = useState("In progress");
  const [cartPriceETH, setCartPriceETH] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/ethereum"
        );
        const data = await response.data;
        console.log(data);
        const exchangeRate = data.market_data.current_price.usd;
        const priceETH = parseInt(price) / parseInt(exchangeRate);
        setCartPriceETH(priceETH);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExchangeRate();
  }, [price]);

  const handlePayment = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];
        const recipientAddress = "0x1d4EC641Ecd1F7e0EA5f01d5cAbE63B371296482";
        const amount = web3.utils.toWei(cartPriceETH.toString(), "ether"); // Replace with the desired payment amount
        const transaction = {
          from: senderAddress,
          to: recipientAddress,
          value: amount,
          gasPrice: "20000000000",
          gasLimit: 500000,
        };
        await web3.eth.sendTransaction(transaction);
        setPaymentStatus("Payment successful");
        dispatch(addToOrders(cart));
        dispatch(removeCart());
        Navigate("orders");
      } catch (error) {
        console.error(error);
        setPaymentStatus("Payment failed");
      }
    } else {
      setPaymentStatus("Metamask not detected");
    }
  };

  return (
    <>
      {paymentStatus === "In progress" ? (
        <PaymentContainer>
          <PriceLabel>Cart Price in USD: ${price}</PriceLabel>
          <PriceLabel>Cart Price in ETH: {cartPriceETH} ETH</PriceLabel>
          <Button onClick={handlePayment}>Pay with Metamask</Button>
          <PaymentStatus>Payment Status: {paymentStatus}</PaymentStatus>
        </PaymentContainer>
      ) : (
        <SuccessMessage>Payment Successful!</SuccessMessage>
      )}
    </>
  );
};

export default Payment;
