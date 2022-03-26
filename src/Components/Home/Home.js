import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DataContext } from "../Context/DataContext";
import "./Home.css";
import Dish from "../Dish/Dish";
import MyCards from "../Cards/MyCards";
import { useReducer, useEffect, useState } from "react";
import reducer from "./HomeReducer.js";
import { fetchRecipes } from "./recipesHelper.js";

function Home() {
  // almacena los datos de las recetas y las cards (precio total, health score y tiempo de preparacion //
  const [{ platos, total, health, time }, dispatch] = useReducer(reducer, []);
  // para saber si se esta realizando el fetching //
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const myFetch = async () => {
      setIsFetching(true);
      // si flag es true usa la api y si es false = use las recetas hardcodeadas
      // dispatch es para guardar las recetas en el reducer
      await fetchRecipes(false, dispatch);
      setIsFetching(false);
    };

    myFetch();
  }, []);

  return (
    <DataContext.Provider value={{ total, health, time, dispatch }}>
      <div className="home_body">
        <Container fluid>
          {/* <HomeFetch /> */}
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          <MyCards />
          <Row>
            <Col sm={8} className="invisible">
              invisible
            </Col>
          </Row>
          {isFetching ? (
            <Row>
              <div
                style={{
                  fontSize: "2rem",
                  width: "30rem",
                  margin: "0 auto",
                  marginBottom: "1rem",
                }}
              >
                Conectandose a la API...
              </div>
            </Row>
          ) : (
            ""
          )}
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
              <div
                style={{
                  fontSize: "2rem",
                  width: "30rem",
                  margin: "0 auto",
                  marginBottom: "1rem",
                }}
              >
                {isFetching ? "" : "No se encontraron platos"}
              </div>
            )}
          </Row>
          {/* <Cards data={initialStateData}/> */}
        </Container>
      </div>
    </DataContext.Provider>
  );
}

export default Home;
