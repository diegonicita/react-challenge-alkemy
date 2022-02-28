import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DataContext } from "../Context/DataContext";
import "./Home.css";
import Dish from "../Dish/Dish";
import CardsList from "../Cards/CardsList";
import { useReducer, useEffect } from "react";

const initialState = {
  platos: [
    {
      id: 1,
      title: "First Dish",
      image: "platillo001.jpeg",
      description: "none",
      price: 10,
      health: 2,
      time: 10,
    },
    {
      id: 2,
      title: "Second Dish",
      image: "platillo001.jpeg",
      description: "none",
      price: 50,
      health: 3,
      time: 15,
    },
    {
      id: 3,
      title: "Third Dish",
      image: "platillo001.jpeg",
      description: "none",
      price: 200,
      health: 4,
      time: 25,
    },
    {
      id: 4,
      title: "Forth Dish",
      image: "platillo001.jpeg",
      description: "none",
      price: 400,
      health: 12,
      time: 45,
    },
  ],
  total: 260,
  health: 9,
  time: 50,
};

function deletePlato(state, action) {
  console.log("delete plato " + action.id);
  let newPlatos = state.platos.filter((item) => item.id != action.id);
  // console.log(newPlatos);
  return {
    ...state,
    platos: newPlatos,
  };
}

function addPlato(state, action) {
  console.log("add plato " + action.data.title);
  const ids = state.platos.map(p => p.id);    
  action.data.id = Math.max(...ids) + 1;      
  let newPlatos = [ ...state.platos, action.data ];  
  return {
    ...state,
    platos: newPlatos,
  };
}

function reduceData(state) {
  let prices = state.platos.map((a) => a.price);
  let times = state.platos.map((a) => a.time);
  let healths = state.platos.map((a) => a.health);
  let sumaPrices = prices.reduce((a, b) => a + b, 0);
  let sumaTime = times.reduce((a, b) => a + b, 0);
  let sumaHealth = healths.reduce((a, b) => a + b, 0);
  return {
    ...state,
    total: sumaPrices,
    time: (sumaTime / times.length).toFixed(2),
    health: (sumaHealth / healths.length).toFixed(2),
  };
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "init":
      newState = reduceData(state);
      return newState;
    case "change":
      newState = reduceData(state);
      return newState;
    case "deletePlato":
      newState = deletePlato(state, action);
      return reduceData(newState);
    case "addPlato":
      newState = addPlato(state, action);
      return reduceData(newState);
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

function Home() {
  const [{ platos, total, health, time }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  return (
    <DataContext.Provider value={{ total, health, time, dispatch }}>
      <div className="home_body">        
        <Container fluid>
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          <CardsList />
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          <Row>
            {(platos.length>0)?(platos.map((item, index) => {
              return (
                <Col sm key={new Date() + 100 + index}>
                  <Dish {...item} key={new Date() + index} />
                </Col>
              );
            })):(<div style={{ fontSize: "2rem", width: "30rem", margin: "0 auto", marginBottom: "1rem" }}>No se encontraron platos</div>)}
          </Row>
          {/* <Cards data={initialStateData}/> */}          
        </Container>
      </div>
    </DataContext.Provider>
  );
}

export default Home;
