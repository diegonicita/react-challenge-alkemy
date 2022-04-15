import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { DataContext } from "../../Auth/DataContext";
import "./Dish.css";

function Dish({
  id,
  title,
  description,
  image,
  price,
  time,
  health,
  vegan,
  group,
  buttonAdd,
  buttonDelete,
  buttonDetails,
}) {
  const { dispatch } = useContext(DataContext);

  return (
    <div className="card m-2 myDish">
      <div class="card-block">
        <img className="card-img-top" src={image} />
        <div className="card-body">
          <div className="card-title">{title}</div>

          {/* <Card.Text>Codigo: {id}</Card.Text> */}
          {/* <Card.Text>{description}</Card.Text> */}
          <div className="card-text">Price: ${price}</div>
          {/* <Card.Text>Time: {time} minutes</Card.Text> */}
          {/* <Card.Text>Health Score: {health} points</Card.Text> */}
          {/* <Card.Text>Vegan: {vegan ? "Apto" : "No Apto"}</Card.Text> */}
          {/* <Card.Text>Grupo: {group}</Card.Text> */}
          <div className="text-center">
            {buttonDetails == "true" ? (
              <button className="btn btn-primary">Detalles</button>
            ) : (
              ""
            )}
            {buttonDelete == "true" ? (
              <button
                className="btn btn-danger m-1"
                onClick={(e) => dispatch({ type: "deleteDish", id: id })}
              >
                Eliminar
              </button>
            ) : (
              ""
            )}
            {buttonAdd == "true" ? (
              <button
                className="btn btn-primary m-1"
                onClick={() =>
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
                      group: "inMenu",
                    },
                  })
                }
              >
                Agregar
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dish;
