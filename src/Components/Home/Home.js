import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DataContext } from "../Context/DataContext";
import "./Home.css";
import Dish from "../Dish/Dish";
import MyCards from "../Cards/MyCards";
import SearchBar from "../SearchBar/SearchBar";
import { useReducer, useEffect, useState } from "react";
import reducer from "./HomeReducer.js";
import { fetchRecipes } from "./recipesHelper.js";
import HomeMessage from "./HomeMessage";

function Home() {
  // almacena los datos de las recetas y las cards (precio total, health score y tiempo de preparacion //
  const [{ platos, total, health, time }, dispatch] = useReducer(reducer, []);
  // para saber si se esta realizando el fetching //
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const myFetch = async () => {
      // true = usa la API
      // dispatch = para actualizar los platos
      // setIsFetching para el flag isFetching
      fetchRecipes(false, dispatch, setIsFetching);
    };
    myFetch();
  }, []);

  return (
    <DataContext.Provider value={{ platos, total, health, time, dispatch }}>
      <div className="home_body">
        <Container fluid className="py-3">
          {/* <HomeFetch /> */}
          <MyCards />
          <SearchBar />
          <HomeMessage flag={isFetching} isTrue="Conectandose a la API..." isFalse=""/>
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
              <HomeMessage flag={isFetching} isTrue="" isFalse="No se encontraron platos"/>              
            )}
          </Row>
        </Container>
      </div>
    </DataContext.Provider>
  );
}

export default Home;
