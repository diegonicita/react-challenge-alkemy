import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useContext } from "react";
import { DataContext} from "../../Auth/DataContext";

function Item({title, value, unidad}) {
  return(
  <Card style={{ width: '20rem', margin: '0 auto', marginBottom: '1rem' }}>  
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {value} {" "} {unidad}
      </Card.Text>
      </Card.Body>
  </Card>);
  }

function MyCards({title}) {  
 const { total, health, time } = useContext(DataContext);  
  return (      
    <>
      <h3 className="text-center">{title}</h3>  
      <Row>            
        <Item title="Precio total a pagar: " value={total} key={new Date() + 1000} unidad="pesos"> </Item>      
        <Item title="Health-Score Promedio: " value={health} key={new Date() + 1001} unidad="health score"> </Item>
        <Item title="Tiempo Promedio de Preparacion: " value={time} key={new Date() + 1002} unidad="min"> </Item>      
      </Row>
    </>
        
  );
}

export default MyCards
