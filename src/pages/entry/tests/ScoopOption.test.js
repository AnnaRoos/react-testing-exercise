import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

describe('ScoppOption', () => {
  test('input field should turn red if user enters invalid amount', async () => {
    render(<ScoopOption name="" imagePath="" updateItemCount={jest.fn()} />);

    const input = screen.getByRole('spinbutton');

    expect(input).not.toHaveClass('is-invalid');

    const user = userEvent.setup();
    await user.clear(input);
    await user.type(input, '-1');
    expect(input).toHaveClass('is-invalid');

    await user.clear(input);
    await user.type(input, '3.6');
    expect(input).toHaveClass('is-invalid');

    await user.clear(input);
    await user.type(input, '11');
    expect(input).toHaveClass('is-invalid');

    await user.clear(input);
    await user.type(input, '2');
    expect(input).not.toHaveClass('is-invalid');
  });
});
