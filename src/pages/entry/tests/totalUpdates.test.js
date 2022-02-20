import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

describe('Check total updates', () => {
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
