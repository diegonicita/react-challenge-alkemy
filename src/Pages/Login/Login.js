import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useEffect, useReducer } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Casillero from "../../Components/Casillero/Casillero";
import reducer from "../../Reducers/LoginReducer.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const axios = require("axios");
const API = process.env.REACT_APP_API || "http://challenge-react.alkemy.org/";
// constantes para identificar los elementos en data[]
const EMAIL = 0;
const PASSWORD = 1;

function Login({ saveApiToken, saveUserEmail }) {
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

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
      mySwal.fire({
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-danger mr-2",
        },
        icon: "error",
        title: "Lo siento...",
        text: "e-mail y/o password incorrectos!",
        showConfirmButton: true,
        buttonsStyling: false,
      });

      //alert("acceso no autorizado");
      dispatchLogin({ type: "LOGIN_END" });
    }
    // respuesta de la API sin errores: guarde los datos //
    if (response != null) {
      mySwal.fire({
        icon: "success",
        position: "top-end",
        title: "Ingresando...",
        timer: 1000,
        showConfirmButton: false,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      // redirija el HOME //
      setTimeout(() => {
        saveApiToken(response.data.token);
        saveUserEmail(loginData.data[EMAIL].value);
        dispatchLogin({ type: "LOGIN_END" });
        navigate("/", { replace: true });
      }, 1000);
    }
  }

  // Realice el fetch si se presiono el boton y no hay errores en los inputs //
  useEffect(() => {
    if (loginData.isLoading && !loginData.isError) {
      myFetch();
    } else {
      dispatchLogin({ type: "LOGIN_END" });
      if (loginData.isError) {
        mySwal.fire({
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-danger mr-2",
          },
          icon: "error",
          title: "Debes completar los campos correctamente...",
          showConfirmButton: true,
          buttonsStyling: false,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      }
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
      <div className="text-center">
        <br />
        <Container>
          <Row>
            <Col className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <Card className="border-0 shadow rounded-3 my-5">
                <Form className="p-3">
                  <Casillero
                    key="1"
                    texto="correo electronico"
                    tipo="email"
                    value={loginData.data[EMAIL].value}
                    error={loginData.data[EMAIL].errorStyle}
                    mensajeError="Debes escribir un email valido."
                    dispatch={dispatchLogin}
                  />
                  <Casillero
                    key="2"
                    texto="contraseña"
                    tipo="password"
                    value={loginData.data[PASSWORD].value}
                    error={loginData.data[PASSWORD].errorStyle}
                    mensajeError="Debes escribir una contraseña valida."
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
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Login;
