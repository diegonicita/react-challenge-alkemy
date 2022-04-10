import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeMessage from "../Home/HomeMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dish from "./Dish"

function Dishes({flag, isTrue, isFalse, platos}) {  

  return (
    <Row>
      {platos && platos.length > 0 ? (
        platos.map((item, index) => {
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
          isFalse="No se encontraron platos"
        />
      )}
    </Row>
  );
}

export default Dishes;
