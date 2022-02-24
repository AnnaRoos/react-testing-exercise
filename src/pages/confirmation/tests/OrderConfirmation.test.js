import { render, screen } from '../../../test-utils/testing-library-utils';

import { rest } from 'msw';
import { server } from '../../../mocks/server';

import OrderConfirmation from '../OrderConfirmation';

describe('OrderConfirmation', () => {
  test('should show an alert if there is an error from the server', async () => {
    server.resetHandlers(
      rest.post('http://localhost:3030/order', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<OrderConfirmation changePhaseHandler={jest.fn()} />);

    const alert = await screen.findByRole('alert');

    expect(alert).toBeInTheDocument();

    //Or I can test the message as the tuturial did

    expect(alert).toHaveTextContent(
      'An unexpected error occurred. Please try again later.'
    );
  });
});
