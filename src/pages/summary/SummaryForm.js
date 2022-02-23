import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const SummaryForm = ({ changePhaseHandler }) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxHandler = (event) => {
    setIsChecked(event.target.checked);
  };

  const popover = (
    <Popover id="terms-and-conditions-popover">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and conditions</span>
      </OverlayTrigger>
    </span>
  );

  const submitHandler = (event) => {
    event.preventDefault();
    changePhaseHandler('complete');
  };
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={checkboxHandler}
          label={checkboxLabel}
        />
        <Button disabled={!isChecked} type="submit" onClick={submitHandler}>
          Confirm order
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SummaryForm;
