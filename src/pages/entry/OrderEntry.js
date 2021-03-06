import React from 'react';

import Button from 'react-bootstrap/Button';
import Options from './Options';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = ({ changePhaseHandler }) => {
  const [orderDetails] = useOrderDetails();

  const hasScoops = Array.from(orderDetails.scoops.values()).find(
    (value) => value > 0
  );

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={!hasScoops}
        onClick={() => changePhaseHandler('review')}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
