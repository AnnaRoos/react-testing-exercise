import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ToppingOption = ({ imagePath, name, updateItemCount }) => {
  const handleChange = (event) => {
    const oneOrZero = event.target.checked ? 1 : 0;
    updateItemCount(name, oneOrZero);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        alt={`${name} topping`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-count`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
