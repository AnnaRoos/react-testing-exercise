import { render, screen } from '../../../test-utils/testing-library-utils';
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
});
