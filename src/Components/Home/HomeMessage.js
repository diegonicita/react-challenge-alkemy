import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";

function HomeMessage(props) {

    console.log('llamando a HomeMessage');
    console.log('flag= ' + props.flag);    
return (
    <>
    {props.flag ? (
        <Row>
          <div className="home_mensaje">
            {props.isTrue}
          </div>
        </Row>
      ) : (
        <Row>
          <div className="home_mensaje">
            {props.isFalse}
          </div>
        </Row>
      )
    }
    </>
    )
}

export default HomeMessage;
