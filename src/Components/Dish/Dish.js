import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dish.css";
import ButtonAdd from "./ButtonAdd";
import ButtonDelete from "./ButtonDelete";
import ButtonDetails from "./ButtonDetails";

function Dish(props) {
  return (
    <div className="card m-2 myDish">
      <div className="card-block">
        <img className="card-img-top myDishImg" src={props.image} />
          <div className="myDishPrice">$ {props.price}</div>
          <div className={props.vegan?"myDishVegan":""}>{props.vegan?"Vegano":""}</div>
        <div className="card-body">
          <div className="card-title">{props.title}</div>
          <div className="card-text">Price: ${props.price}</div>
          <div className="text-center">
            {props.buttonDetails == "true" ? <ButtonDetails {...props} /> : ""}
            {props.buttonDelete == "true" ? <ButtonDelete {...props} /> : ""}
            {props.buttonAdd == "true" ? <ButtonAdd {...props} /> : ""}
          </div>
        </div>
      </div>      
    </div>
  );
}

export default Dish;
