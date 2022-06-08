import React from "react";
import { useContext } from "react";
import { DataContext } from "../../Auth/DataContext";

export default function ButtonAdd(props) {

  const { dispatch } = useContext(DataContext);

  return (
    <button
      className="btn btn-primary m-1"
      onClick={() =>
        dispatch({
          type: "addDish",
          data: {
            id: 1000 + props.id,
            title: props.title,
            servings: 1,
            image: props.image,
            time: props.time,
            vegan: props.vegan,
            health: props.health,
            price: props.price,
            description: props.description,
            group: "inMenu",
          },
        })
      }
    >
      Agregar
    </button>
  );
}
