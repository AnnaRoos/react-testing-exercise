import React from 'react';

import SummaryForm from './SummaryForm';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = ({ changePhaseHandler }) => {
  const [orderDetails] = useOrderDetails();

  const scoopsList = [...orderDetails.scoops].map((scoop) => {
    return (
      <li key={scoop[0]}>
        {scoop[1]} {scoop[0]}
      </li>
    );
  });

  const toppingsList = [...orderDetails.toppings].map((topping) => {
    return <li key={topping[0]}>{topping[0]}</li>;
  });

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopsList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingsList}</ul>
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm changePhaseHandler={changePhaseHandler} />
    </div>
  );
};

export default OrderSummary;
