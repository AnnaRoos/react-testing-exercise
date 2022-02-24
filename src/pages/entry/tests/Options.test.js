import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

describe('Options component', () => {
  test('should display image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    //always use await and findBy when search for asynchronous content
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);

    const altTexts = scoopImages.map((el) => el.alt);

    expect(altTexts).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  test('should display image for each topping option from server', async () => {
    render(<Options optionType="toppings" />);

    //always use await and findBy when search for asynchronous content
    const toppingImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    });

    expect(toppingImages).toHaveLength(3);

    const altTexts = toppingImages.map((el) => el.alt);

    expect(altTexts).toEqual([
      'Strawberry topping',
      'Fudge topping',
      'M&Ms topping',
    ]);
  });

  test('should not update scoops subtotal if invalid amount is entered', async () => {
    render(<Options optionType="scoops" />);

    const scoopsSubtotal = screen.getByText('Scoops total: $', {
      exact: false,
    });

    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });

    const user = userEvent.setup();
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '-1');

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2.7');

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    //The tutorial does not test this, for me this gave an error with the tutorial react solution
    //since the scoops number is updated when the first digit is typed and not set to zero when
    //the second one is added, so my react solution updates the context even on invalid numbers and
    //set it to zero
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '11');

    expect(scoopsSubtotal).toHaveTextContent('0.00');
  });
});
