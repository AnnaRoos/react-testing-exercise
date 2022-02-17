import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('SummaryForm component', () => {
  test('checkbox is unchecked by default and button is disabled', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: /confirm order/i });

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('checkbox enables the button when checked and disables it when unchecked', async () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', {
      name: /terms and conditions/i,
    });
    const button = screen.getByRole('button', { name: /confirm order/i });
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(button).toBeEnabled();

    await user.click(checkbox);
    expect(button).toBeDisabled();
  });

  test('popover responds to hover', async () => {
    render(<SummaryForm />);
    //popover starts hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    //appears when mouseover checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    const user = userEvent.setup();
    await user.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
    //disappears when mouse leaves
    await user.unhover(termsAndConditions);
    const nullPopoverAgain = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopoverAgain).not.toBeInTheDocument();

    //in the course the test failed becuase the disapperance happened
    //after the test had finished
    //probably because the old userevent is not async-await
    //if that happens and you have to wait for disappearance you can use this code:
    /*     await waitForElementToBeRemoved(() => screen.queryByText(
      /no ice cream will actually be delivered/i
    )); */
    //no assertion needed
  });
});
