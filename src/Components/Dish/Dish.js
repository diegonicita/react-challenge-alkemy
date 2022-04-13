import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";

function Dish({ id, title, description, image, price, time, health, vegan, group }) {
  const { dispatch } = useContext(DataContext);

  return (
    <Card style={{ width: "20rem", margin: "0 auto", marginBottom: "1rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Codigo: {id}</Card.Text>        
        {/* <Card.Text>{description}</Card.Text> */}
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>Time: {time} minutes</Card.Text>
        <Card.Text>Health Score: {health} points</Card.Text>
        <Card.Text>Vegan: {vegan?"Apto":"No Apto"}</Card.Text>
        <Card.Text>Grupo: {group}</Card.Text>
        <Button variant="primary">Detalles</Button>{" "}
        <Button
          variant="primary"
          onClick={(e) => dispatch({ type: "deleteDish", id: id })}
        >
          Eliminar
        </Button>{" "}  

        <Button
          variant="primary"
          onClick={(e) =>
            dispatch({
              type: "addDish",
              data: {
                id: 1000 + id,
                title: title,
                servings: 1,
                image: image,                
                time: time,
                vegan: vegan,
                health: health,
                price: price,
                description: description,
                group: "inMenu"
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
