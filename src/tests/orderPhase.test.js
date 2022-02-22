import { findByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('App', () => {
  test('should display order phases for happy path', async () => {
    render(<App />);

    //add ice cream and toppings

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    const user = userEvent.setup();
    await user.type(vanillaInput, '2');
    await user.type(chocolateInput, '1');

    const strawberryCheckbox = await screen.findByRole('checkbox', {
      name: 'Strawberry',
    });
    await user.click(strawberryCheckbox);

    //find and click order button

    const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });
    await user.click(orderButton);

    //check summary info based on order

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    expect(
      listItems.find((item) => item.textContent === '2 Vanilla')
    ).toBeInTheDocument();

    expect(
      listItems.find((item) => item.textContent === 'Strawberry')
    ).toBeInTheDocument();

    const summaryTotal = screen.getByRole('heading', { name: /total: /i });

    expect(summaryTotal).toHaveTextContent('7.50');

    //accept terms and conditions and click button to confirm order

    const termsAndConditionsCheckbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    await user.click(termsAndConditionsCheckbox);

    const confirmButton = screen.getByRole('button', {
      name: /confirm order/i,
    });
    await user.click(confirmButton);

    //confirm order number on confirmation page

    const orderNumber = await screen.findByRole('heading', {
      name: /your order number is /i,
    });
    expect(orderNumber).toHaveTextContent(/\d/);

    //click new order button on confirmation page

    const newOrderButton = screen.getByRole('button', {
      name: /create new order/i,
    });
    await user.click(newOrderButton);

    //check that scoops and toppings subtotals have been reset

    const scoopsSubtotal = await screen.findByText('Scoops total: $', {
      exact: false,
    });
    const toppingsSubtotal = await screen.findByText('Toppings total: $', {
      exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent('0.00');
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    //do we need to await anything to avoid test errors?
  });
});
