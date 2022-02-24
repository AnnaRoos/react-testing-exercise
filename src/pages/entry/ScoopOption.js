import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ScoopOption = ({ imagePath, name, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const currentValue = +event.target.value;
    if (
      0 <= currentValue &&
      currentValue <= 10 &&
      Math.floor(currentValue) === currentValue
    ) {
      setIsValid(true);
      updateItemCount(name, currentValue);
    } else {
      setIsValid(false);
      updateItemCount(name, 0);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        alt={`${name} scoop`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
