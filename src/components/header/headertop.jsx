import { useEffect, useState } from "react";
import "./header.css";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const Headertop = (props) => {
  const history = useHistory();
  const [log, setLog] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLog(true);
      } else {
        setLog(false);
      }
    });
  }, []);

  const logOut = () => {
    auth.signOut();
    history.push("/");
  };

  const myOrder = () => {
    history.push("/Order");
  };

  if (log === true) {
    return (
      <Row className="pl-3 black">
        <Col xs="5" md="7" sm="5" className="pt-3"></Col>
        <Col xs="1" md="2" sm="1"></Col>
        <Col xs="6" md="3" sm="6" className="pt-1">
          <Button className="ml-2 mb-1" onClick={() => myOrder()}>
            My Orders
          </Button>
          <Button className="ml-1 mb-1" onClick={() => logOut()}>
            Logout
          </Button>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row className="pl-3">
        <Col xs="12" md="12" sm="12" className="black">
          <div>
            <h6 className="txt-wht font-fam">Start Buying</h6>
          </div>
        </Col>
      </Row>
    );
  }
};

export default Headertop;
