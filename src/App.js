import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  //phases are 'inProgress', 'review' or 'complete'
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const changePhaseHandler = (phase) => {
    setOrderPhase(phase);
  };

  return (
    <OrderDetailsProvider>
      <Container>
        {orderPhase === 'inProgress' && (
          <OrderEntry changePhaseHandler={changePhaseHandler} />
        )}
        {orderPhase === 'review' && (
          <OrderSummary changePhaseHandler={changePhaseHandler} />
        )}
        {orderPhase === 'complete' && (
          <OrderConfirmation changePhaseHandler={changePhaseHandler} />
        )}
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;

//Tutorial version:

/* let Component = OrderEntry;
switch (orderPhase) {
  case 'inProgress':
    Component = OrderEntry;
    break;
  case 'review':
    Component = OrderSummary;
    break;
  case 'complete':
    Component = OrderConfirmation;
    break;
  default:
    break;
}

return (
  <OrderDetailsProvider>
    <Container>
      {<Component setOrderPhase={setOrderPhase} />}
    </Container>
  </OrderDetailsProvider>
); */
