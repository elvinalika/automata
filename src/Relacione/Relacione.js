import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import * as actions from "../Redux/index";
import { connect } from "react-redux";

class Relacion extends Component {
  state = {
    relacione: [{ nga: "", me: "", ne: "" }]
  };

  shtoRelacion = event => {
    event.preventDefault();

    this.setState({
      ...this.state,
      relacione: [...this.state.relacione, { nga: "", me: "", ne: "" }]
    });
  };

  handleInput = event => {
    let relacionRi = [...this.state.relacione];
    relacionRi[event.target.dataset.id][event.target.id] = event.target.value;

    this.setState({
      ...this.state,
      relacione: relacionRi
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.relacione);
    this.props.setRelacione(this.state.relacione);
    this.props.history.push("/automati");
  };

  render() {
    let relacione = this.state.relacione;
    return (
      <Form onSubmit={this.handleSubmit} className="form">
        <Label>Vendosni kalimet mes gjendjeve!</Label>
        <br />
        {relacione.map((val, idx) => {
          let relacionId = `relacion-${idx}`;
          return (
            <div key={idx}>
              <label htmlFor={relacionId}>{`Relacioni ${idx + 1}`}</label>
              <FormGroup>
                <Label>
                  Nga gjendja:
                  <Input
                    type="text"
                    id="nga"
                    onChange={this.handleInput}
                    data-id={idx}
                    required
                  />
                </Label>
                <Label>
                  Ne gjendjen:
                  <Input
                    type="text"
                    id="ne"
                    onChange={this.handleInput}
                    data-id={idx}
                    required
                  />
                </Label>
                <Label>
                  Me karakter:
                  <Input
                    type="text"
                    id="me"
                    onChange={this.handleInput}
                    data-id={idx}
                    required
                  />
                </Label>
              </FormGroup>
            </div>
          );
        })}
        <Button onClick={this.shtoRelacion}>Shto gjendje!</Button>
        <br />
        <br />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRelacione: relacione => dispatch(actions.setRelacione(relacione))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Relacion);
