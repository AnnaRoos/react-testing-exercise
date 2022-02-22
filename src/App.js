import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const changePhaseHandler = (phase) => {
    setOrderPhase(phase);
  };

  return (
    <Container>
      <OrderDetailsProvider>
        {orderPhase === 'inProgress' && (
          <OrderEntry changePhaseHandler={changePhaseHandler} />
        )}
        {orderPhase === 'review' && (
          <OrderSummary changePhaseHandler={changePhaseHandler} />
        )}
        {orderPhase === 'complete' && (
          <OrderConfirmation changePhaseHandler={changePhaseHandler} />
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
