import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "./UserContextAuth";
import { useContext } from "react";
import "./Home.css";
import Dish from "./Dish";
import Cards from "./Cards";

function Home() {
  const { user, apiToken, handleUser } = useContext(AuthContext);

  return (
    <div className="home_body">      
      <Container fluid>
          <Row>
          <Col sm={8} className="invisible">invisible</Col>
          </Row>
          <Row>
            <Col sm><Dish title="Plato 1" description="Plato tipico de la comida italiana"/></Col>
            <Col sm><Dish title="Plato 2" description="Plato tipico de la comida italiana"/></Col>
            <Col sm><Dish title="Plato 3" description="Plato tipico de la comida italiana"/></Col>
            <Col sm><Dish title="Plato 4" description="Plato tipico de la comida italiana"/></Col>
          </Row>   

         {/* <Cards />  */}
      </Container>
      
      </div>   
  );
}

export default Home;
