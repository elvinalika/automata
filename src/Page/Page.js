import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import InputForm from "../InputForm/InputForm";
import Relacione from "../Relacione/Relacione";
import Automat from "../Automat/Automat";

class Page extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <Route path="/" exact component={InputForm} />
            <Route path="/relacione" component={Relacione} />
            <Route path="/automati" component={Automat} />
          </Col>
        </Row>
        <Row>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(Page);
