import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ changePhaseHandler }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {});
  }, []);

  const createNewOrderHandler = () => {
    resetOrder();
    changePhaseHandler('inProgress');
  };

  return (
    <>
      {orderNumber ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Thank you!</h2>
          <h3>Your order number is {orderNumber}</h3>
          <p>as per our terms and conditions, nothing will happen now</p>
          <Button onClick={createNewOrderHandler}>Create new order</Button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default OrderConfirmation;
