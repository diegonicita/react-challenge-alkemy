import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";

function Dish({ id, title, description, image, price, time, health }) {
  const { dispatch } = useContext(DataContext);

  return (
    <Card style={{ width: "20rem", margin: "0 auto", marginBottom: "1rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Health Score: {health}</Card.Text>
        <Button variant="primary">Detalles</Button>{" "}
        <Button
          variant="primary"
          onClick={(e) => dispatch({ type: "deletePlato", id: id })}
        >
          Eliminar
        </Button>{" "}
        <Button
          variant="primary"
          onClick={(e) =>
            dispatch({
              type: "addPlato",
              data: {
                title: "New Dish",
                image: "platillo001.jpeg",
                description: "none",
                price: 10,
                health: 2,
                time: 10,
              },
            })
          }
        >
          Agregar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Dish;
