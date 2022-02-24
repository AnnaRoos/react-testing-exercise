import React, { useEffect, useState } from 'react';

import axios from 'axios';

import AlertBanner from '../common/AlertBanner';
import Button from 'react-bootstrap/Button';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ changePhaseHandler }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner message={null} variant={null} />;
  }

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
