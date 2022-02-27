import CardItem from './CardItem';
import Row from "react-bootstrap/Row";
import { useContext } from "react";
import { DataContext} from "../Context/DataContext";

export default function CardsList() {  
 const { total, health, time } = useContext(DataContext);  
  return (      
    <Row>            
      <CardItem title="Precio Total a pagar: " value={total} key={new Date() + 1000} unidad="pesos"> </CardItem>      
      <CardItem title="Health Score: " value={health} key={new Date() + 1001} unidad="health score"> </CardItem>
      <CardItem title="Tiempo de Preparacion: " value={time} key={new Date() + 1002} unidad="min"> </CardItem>      
    </Row>    
  );
}
