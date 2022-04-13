import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DataContext } from "../Context/DataContext";
import "./Home.css";
import Dishes from "../Dish/Dishes";
import MyCards from "../Cards/MyCards";
import SearchBar from "../SearchBar/SearchBar";
import { useReducer, useEffect, useState } from "react";
import reducer from "./HomeReducer.js";
import { fetchRecipes } from "./recipesHelper.js";
import HomeMessage from "./HomeMessage";

function Home() {
  // almacena los datos de las recetas y las cards (precio total, health score y tiempo de preparacion //
  const [{ dishes, total, health, time }, dispatch] = useReducer(reducer, []);
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
    <DataContext.Provider value={{ dishes, total, health, time, dispatch }}>
      <div className="home_body">
        <Container fluid className="py-3">
          {/* <HomeFetch /> */}
          <Dishes title="Menu del dia" flag={isFetching} isTrue="" isFalse="No se encontraron platos" dishes={dishes} group="inMenu"/>
          <MyCards />
          {/* <SearchBar /> */}
          <HomeMessage flag={isFetching} isTrue="Conectandose a la API..." isFalse=""/>
          <Dishes title="Platos disponibles (puedes buscar mas platos)" flag={isFetching} isTrue="" isFalse="No se encontraron platos" dishes={dishes} group="found">
            <SearchBar />
          </Dishes>
          
        </Container>
      </div>
    </DataContext.Provider>
  );
}

export default Home;
