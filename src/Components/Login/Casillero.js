import Form from "react-bootstrap/Form";

const Casillero = ({
  tipo,
  texto,
  value,
  error,
  mensajeError,
  dispatch,
}) => {

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }  

  return (
    <Form.Group className="m-3" controlId={"form" + tipo}>
      <Form.Label className="fw-bold text-black">{capitalize(texto)}</Form.Label>
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
