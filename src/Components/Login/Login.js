import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useEffect, useReducer } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Casillero from "./Casillero";
import reducer from "./LoginReducer.js";

const axios = require("axios");
const API = process.env.REACT_APP_API || "http://challenge-react.alkemy.org/";
// constantes para identificar los elementos en data[]
const EMAIL = 0;
const PASSWORD = 1;

function Login({ saveApiToken, saveUserEmail }) {
  const navigate = useNavigate();

  // loginData contiene:
  // data: contiene el value de los inputs y los stilos de los label de error,
  // isLoading: flag para activar o desactivar el boton submit durante el Fetch
  // isError: flag que controlar si existen errores en los inputs o esta todo listo para el submit

  const [loginData, dispatchLogin] = useReducer(reducer, {
    data: [
      { value: "", errorStyle: "invisible" },
      { value: "", errorStyle: "invisible" },
    ],
    isLoading: false,
    isError: false,
  });

  // para cancelar el effect
  const controller = new AbortController();

  // funcion asincronica para chequear el login
  async function myFetch() {
    let response = null;

    try {
      response = await axios(
        {
          method: "post",
          url: API,
          data: {
            email: loginData.data[EMAIL].value,
            password: loginData.data[PASSWORD].value,
          },
        },
        { signal: controller.signal }
      );
    } catch (error) {
      // respuesta de la API con errores //
      alert("acceso no autorizado");
      dispatchLogin({ type: "LOGIN_END" });
    }
    // respuesta de la API sin errores: guarde los datos //
    if (response != null) {
      saveApiToken(response.data.token);
      saveUserEmail(loginData.data[EMAIL].value);
      dispatchLogin({ type: "LOGIN_END" });
      // redirija el HOME //
      navigate("/", { replace: true });
    }
  }


  // Realice el fetch si se presiono el boton y no hay errores en los inputs //
  useEffect(() => {
    if (loginData.isLoading && !loginData.isError) {
      myFetch();
    } else {
      dispatchLogin({ type: "LOGIN_END" });
    }
    return function cleanup() {
      console.log("Cancel Clean Effect");
      controller.abort();
    };
  }, [loginData.isLoading]);

  const submitForm = () => {
    dispatchLogin({ type: "LOGIN_START" });
  };

  return (
    <React.Fragment>
      <div className="login_body text-center">
        <br />
        <Container className="login_form_container">
          <Form className="w-50 shadow p-3 mb-5 bg-white rounded">
            <Casillero
              key="1"
              texto="correo electronico"
              tipo="email"
              value={loginData.data[EMAIL].value}
              error={loginData.data[EMAIL].errorStyle}
              dispatch={dispatchLogin}
            />
            <Casillero
              key="2"
              texto="contraseña"
              tipo="password"
              value={loginData.data[PASSWORD].value}
              error={loginData.data[PASSWORD].errorStyle}
              dispatch={dispatchLogin}
            />
            <Button
              variant="primary"
              size="lg"
              disabled={loginData.isLoading}
              onClick={!loginData.isLoading ? submitForm : null}
            >
              Enviar
            </Button>
            <br></br>
            <Form.Group>
              <Form.Text>
                {loginData.isLoading
                  ? "   Autenticando..."
                  : "Tranquilo, nunca compartiremos tus datos "}
              </Form.Text>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Login;
