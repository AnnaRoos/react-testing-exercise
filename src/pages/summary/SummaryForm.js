import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxHandler = (event) => {
    setIsChecked(event.target.checked);
  };

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: 'blue' }}>Terms and conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={checkboxHandler}
          label={checkboxLabel}
        />
        <Button variant="primary" type="submit" disabled={!isChecked}>
          Confirm order
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SummaryForm;
