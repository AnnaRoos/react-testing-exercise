import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('App', () => {
  test('should display order phases for happy path', async () => {
    render(<App />);

    //add ice cream and toppings

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    //I don't really need to await chocolate since the vanilla comes from same endpoint
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    const user = userEvent.setup();
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '1');

    const strawberryCheckbox = await screen.findByRole('checkbox', {
      name: 'Strawberry',
    });
    await user.click(strawberryCheckbox);

    //find and click order button

    const orderButton = screen.getByRole('button', { name: /order sundae/i });
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

    //Or - first option in tutorial:
    expect(screen.getByText('2 Vanilla')).toBeInTheDocument();

    //Or - alternative in tutorial:
    const listItemTexts = listItems.map((item) => item.textContent);
    expect(listItemTexts).toEqual(['2 Vanilla', '1 Chocolate', 'Strawberry']);

    const scoopsHeading = screen.getByRole('heading', {
      name: 'Scoops: $6.00',
    });
    const toppingsHeading = screen.getByRole('heading', {
      name: 'Toppings: $1.50',
    });
    expect(scoopsHeading).toBeInTheDocument();
    expect(toppingsHeading).toBeInTheDocument();

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

    const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
    const toppingsSubtotal = screen.getByText('Toppings total: $0.00');
    expect(scoopsSubtotal).toBeInTheDocument();
    expect(toppingsSubtotal).toBeInTheDocument();

    //do we need to await anything to avoid test errors?
    //wait for axios calls to return so somthing doesn't happen after test is finished
    await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await screen.findByRole('checkbox', { name: 'Strawberry' });
  });
});
