import React from "react";
import { useContext } from "react";
import { DataContext } from "../../Auth/DataContext";

export default function ButtonAdd(props) {
  const { dispatch } = useContext(DataContext);

  return (
    <button
      className="btn btn-danger m-1"
      onClick={() => dispatch({ type: "deleteDish", id: props.id })}
    >
      Borrar
    </button>
  );
}
