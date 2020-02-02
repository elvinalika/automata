import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./InputForm.css";
import * as actions from "../Redux/index";
import { connect } from "react-redux";

class InputForm extends Component {
  state = {
    alfabeti: "",
    gjendje: [{ name: "0", fillestare: false, fundore: false }],
    c: 1
  };

  onsubmit = event => {
    event.preventDefault();
    let elAlfabet = this.state.alfabeti.split(",");

    this.props.setAlfabet(elAlfabet);
    this.props.setGjendje(this.state.gjendje);

    this.props.history.push("/relacione");
  };

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  shtoGjendje = event => {
    event.preventDefault();

    this.setState({
      ...this.state,
      gjendje: [
        ...this.state.gjendje,
        { name: this.state.c+"", fillestare: false, fundore: false }
      ],
      c: this.state.c+1
    });
  };

  handleCheckbox = event => {
    let gjendjeRe = [...this.state.gjendje];
    gjendjeRe[event.target.dataset.id][event.target.id] = !gjendjeRe[
      event.target.dataset.id
    ][event.target.id];

    this.setState({
      ...this.state,
      gjendje: gjendjeRe
    });

    console.log(gjendjeRe[event.target.dataset.id][event.target.id]);
  };

  render() {
    let gjendje = this.state.gjendje;

    return (
      <Form className="form">
        <FormGroup>
          <Label for="alfabeti">
            Vendosni germat e alfabetit duke i ndare me presje:
          </Label>
          <Input
            type="text"
            id="alfabeti"
            value={this.state.alfabeti}
            onChange={this.handleInput}
            required
          />
        </FormGroup>
        <Button onClick={this.shtoGjendje}>Shto gjendje!</Button>
        <br />
        <br />
        {gjendje.map((val, idx) => {
          let gjendjeId = `gjendje-${idx}`;
          return (
            <div key={idx} className="gjendje">
              <label htmlFor={gjendjeId}>{`Gjendja ${idx + 1}`}</label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="fillestare"
                    onChange={this.handleCheckbox}
                    data-id={idx}
                  />{" "}
                  Gjendje fillestare
                </Label>
                <Label check className="inp">
                  <Input
                    type="checkbox"
                    id="fundore"
                    onChange={this.handleCheckbox}
                    data-id={idx}
                  />{" "}
                  Gjendje fundore
                </Label>
              </FormGroup>
              <FormGroup check />
            </div>
          );
        })}
        <br />
        <Button onClick={this.onsubmit} type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAlfabet: alfabet => dispatch(actions.setAlfabet(alfabet)),
    setGjendje: gjendje => dispatch(actions.setGjendje(gjendje))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(InputForm);
