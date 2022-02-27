import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

function CardItem({title, value, unidad}) {
return(
<Card style={{ width: '18rem', margin: '0 auto', marginBottom: '1rem' }}>  
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      {value} {" "} {unidad}
    </Card.Text>
    </Card.Body>
</Card>);
}

export default CardItem;