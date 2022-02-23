import React from 'react';

import SummaryForm from './SummaryForm';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = ({ changePhaseHandler }) => {
  const [orderDetails] = useOrderDetails();

  const scoopsList = [...orderDetails.scoops].map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  const hasToppings = orderDetails.toppings.size > 0;
  let toppingsContent = null;
  if (hasToppings) {
    const toppingsList = [...orderDetails.toppings.keys()].map((topping) => {
      return <li key={topping}>{topping}</li>;
    });

    toppingsContent = (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>{toppingsList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopsList}</ul>
      {toppingsContent}
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm changePhaseHandler={changePhaseHandler} />
    </div>
  );
};

export default OrderSummary;
