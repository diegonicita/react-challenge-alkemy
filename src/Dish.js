import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Dish({title, description}) {
return(
<Card style={{ width: '18rem', margin: '0 auto', marginBottom: '1rem' }}>
  <Card.Img variant="top" src="platillo001.jpeg" />
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      {description}
    </Card.Text>
    <Button variant="primary">Detalles</Button>{' '}
    <Button variant="primary">Eliminar</Button>
  </Card.Body>
</Card>);
}

export default Dish;