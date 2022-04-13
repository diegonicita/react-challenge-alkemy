import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeMessage from "../Home/HomeMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dish from "./Dish"

function Dishes({title, flag, isTrue, isFalse, dishes, group, children}) {  

  let dishesGroup = undefined;
  if (dishes && dishes.length > 0)
  { 
    dishesGroup = dishes.filter( (item) => item.group == group)
  }

  return (
    <Row>
      <h3 className="text-center">{title}</h3>  
      {children}    
      {dishesGroup && dishesGroup.length > 0 ? (
        dishesGroup.map((item, index) => {
          return (
            <Col key={new Date() + 100 + index}>
              <Dish {...item} key={new Date() + index} />
            </Col>
          );
        })
      ) : (
        <HomeMessage
          flag={flag}
          isTrue=""
          isFalse={"No se encontraron platos"}
        />
      )}
    </Row>
  );
}

export default Dishes;
