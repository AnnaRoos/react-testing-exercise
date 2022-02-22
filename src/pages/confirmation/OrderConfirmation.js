import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ changePhaseHandler }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderDetails, updateItemCount, resetOrder] = useOrderDetails();

  //Need to reset context Maps
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
    <div>
      {orderNumber ? (
        <>
          <h2>Thank you!</h2>
          <h3>Your order number is {orderNumber}</h3>
          <p>as per our terms and conditions, nothing will happen now</p>
          <Button variant="primary" onClick={createNewOrderHandler}>
            Create new order
          </Button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default OrderConfirmation;
