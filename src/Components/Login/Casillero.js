import Form from "react-bootstrap/Form";

const Casillero = ({
  tipo,
  texto,
  value,
  error,
  mensajeError,
  dispatch,
}) => {
  return (
    <Form.Group className="mb-1" controlId={"form" + tipo}>
      <Form.Label className="fw-bold text-black">{texto}</Form.Label>
      <Form.Control
        type={tipo}
        placeholder={texto}
        value={value}
        onChange={ e => dispatch({type: "LOGIN_UPDATE", payload: {value: e.target.value, tipo: tipo}})}
        autoComplete="off"
      />
      <Form.Text className={error}>
        {mensajeError}
      </Form.Text>
    </Form.Group>
  );
};

export default Casillero;
