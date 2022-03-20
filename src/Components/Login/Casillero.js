import Form from "react-bootstrap/Form";

const Casillero = ({
  tipo,
  texto,
  value,
  error,
  set,
}) => {
  return (
    <Form.Group className="mb-3" controlId={"form" + tipo}>
      <Form.Label className="fw-bold text-black">{texto}</Form.Label>
      <Form.Control
        type={tipo}
        placeholder={texto}
        value={value}
        onChange={set(tipo)}
        autoComplete="off"
      />
      <Form.Text className={error}>
        {"Debes escribir un "+ texto}
      </Form.Text>
    </Form.Group>
  );
};

export default Casillero;
