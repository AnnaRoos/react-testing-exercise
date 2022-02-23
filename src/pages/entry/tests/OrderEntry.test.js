import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

import OrderEntry from '../OrderEntry';

describe('OrderEntry component', () => {
  test('should handle errors for scoops and toppings routes by showing an alert', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<OrderEntry changePhaseHandler={jest.fn()} />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });

  test('should disable button if no scoops are added', async () => {
    render(<OrderEntry />);

    const user = userEvent.setup();

    //scoop count starts at 0
    let scoopInputs;
    await waitFor(async () => {
      scoopInputs = await screen.findAllByRole('spinbutton');
    });
    for (const input of scoopInputs) {
      expect(input).toHaveValue(0);
    }

    //button is disabled
    const orderButton = screen.getByRole('button', { name: /order sundae/i });
    expect(orderButton).toBeDisabled();

    //one scoop is added
    await user.type(scoopInputs[0], '1');

    //button is enabled
    expect(orderButton).toBeEnabled();

    //scoop is removed and back to 0
    await user.clear(scoopInputs[0]);
    await user.type(scoopInputs[0], '0');

    //button is disabled
    expect(orderButton).toBeDisabled();
  });
});
