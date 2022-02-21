import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

describe('subtotals', () => {
  test('scoops subtotal should update when scoops change', async () => {
    render(<Options optionType="scoops" />);

    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    const user = userEvent.setup();
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    expect(scoopsSubtotal).toHaveTextContent('6.00');
  });

  test('toppings subtotal should update when toppings change', async () => {
    render(<Options optionType="toppings" />);

    //check that subtotals start at zero
    const toppingsSubtotals = screen.getByText('Toppings total: $', {
      exact: false,
    });

    expect(toppingsSubtotals).toHaveTextContent('0.00');

    //check one box
    const strawberryCheckbox = await screen.findByRole('checkbox', {
      name: 'Strawberry',
    });

    const user = userEvent.setup();
    await user.click(strawberryCheckbox);

    expect(toppingsSubtotals).toHaveTextContent('1.50');

    //check another box
    const fudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Fudge',
    });

    await user.click(fudgeCheckbox);

    expect(toppingsSubtotals).toHaveTextContent('3.00');

    //check off one box

    await user.click(strawberryCheckbox);

    expect(toppingsSubtotals).toHaveTextContent('1.50');
  });
});

describe('grand total', () => {
  test('grand total should start at 0.00update properly when scoops are added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');

    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    const user = userEvent.setup();
    await user.clear(chocolateInput);
    await user.type(chocolateInput, '2');

    expect(grandTotal).toHaveTextContent('4.00');

    const mAndMsCheckbox = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });

    await user.click(mAndMsCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total should update properly when toppings are added first', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    const fudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Fudge',
    });

    const user = userEvent.setup();
    await user.click(fudgeCheckbox);

    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '3');

    expect(grandTotal).toHaveTextContent('7.50');
  });

  test('grand total should update properly when items are removed', async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    const chocolateInput = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });

    const user = userEvent.setup();

    await user.clear(chocolateInput);
    await user.type(chocolateInput, '4');

    const strawberryCheckbox = await screen.findByRole('checkbox', {
      name: 'Strawberry',
    });
    const fudgeCheckbox = await screen.findByRole('checkbox', {
      name: 'Fudge',
    });

    await user.click(strawberryCheckbox);
    await user.click(fudgeCheckbox);

    expect(grandTotal).toHaveTextContent('11.00');

    await user.type(chocolateInput, '2');

    expect(grandTotal).toHaveTextContent('7.00');

    await user.click(strawberryCheckbox);

    expect(grandTotal).toHaveTextContent('5.50');

    await user.click(fudgeCheckbox);

    expect(grandTotal).toHaveTextContent('4.00');

    await user.type(chocolateInput, '0');

    expect(grandTotal).toHaveTextContent('0.00');
  });
});
