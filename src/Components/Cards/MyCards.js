import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useContext } from "react";
import { DataContext} from "../Context/DataContext";

function Item({title, value, unidad}) {
  return(
  <Card style={{ width: '25rem', margin: '0 auto', marginBottom: '1rem' }}>  
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {value} {" "} {unidad}
      </Card.Text>
      </Card.Body>
  </Card>);
  }

function Minitem({title, value}) {
    return(
    <Card style={{ width: '10rem', margin: '0 auto', marginBottom: '1rem' }}>  
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {value} {" "}
        </Card.Text>
        </Card.Body>
    </Card>);
    }

function MyCards() {  
 const { total, health, time } = useContext(DataContext);  
  return (      
    <>     
      <Row>
        <Minitem title="Plato Vegano 1: " value="Vacio" key={new Date() + 1003}> </Minitem>      
        <Minitem title="Plato Vegano 2: " value="Vacio" key={new Date() + 1004}> </Minitem>      
        <Minitem title="Plato No Vegano 1: " value="Vacio" key={new Date() + 1005}> </Minitem>      
        <Minitem title="Plato No Vegano 2: " value="Vacio" key={new Date() + 1006}> </Minitem>      
      </Row>
      <Row>            
        <Item title="Precio total a pagar: " value={total} key={new Date() + 1000} unidad="pesos"> </Item>      
        <Item title="Health-Score Promedio: " value={health} key={new Date() + 1001} unidad="health score"> </Item>
        <Item title="Tiempo Promedio de Preparacion: " value={time} key={new Date() + 1002} unidad="min"> </Item>      
      </Row>
    </>
        
  );
}

export default MyCards
