import React, { Component } from "react";
import "./Automat.css";
import { connect } from "react-redux";
import valuesIn from "lodash/valuesIn";
import keys from "lodash/keys";
import keysIn from "lodash/keys";
import xor from "lodash/xor";
import union from "lodash/union";
// import forEach from "lodash/forEach";
// import concat from "lodash/concat";

class Automat extends Component {
  state = {
    ndfa: false,
    dfa: false,
    table1: null,
    table2: null,
    gjFundme: []
  };

  shfaqAutomatNDFA = () => {
    var tab1 = [];
    var gjendje = ["0"];
    var e1;
    var char;
    var e2;
    var temp;

    var relacione = this.props.relacione;
    var alfabet = this.props.alfabet;
    var newGj = this.state.gjFundme,
      w;

    for (w = 0; w < this.props.gjendje.length; w++) {
      if (this.props.gjendje[w].fundore) {
        console.log(this.props.gjendje[w].name);

        newGj.push(this.props.gjendje[w].name);
        this.setState({
          ...this.state,
          gjFundme: newGj
        });
      }
    }
    console.log(this.state.gjFundme);

    for (var i = 0; i < gjendje.length; i++) {
      e1 = [];
      char = {};
      e2 = [];
      temp = [];

      e1.push(gjendje[i]);

      for (var j = 0; j < relacione.length; j++) {
        if (relacione[j].nga === gjendje[i]) {
          if (relacione[j].me === "-") {
            e1.push(relacione[j].ne);
            temp.push(relacione[j].ne);
          }

          // Prove
          if (this.state.gjFundme.includes(relacione[j].ne)) {
            newGj.push(relacione[j].nga);
            this.setState({
              ...this.state,
              gjFundme: newGj
            });
          }
        }
      }

      while (temp.length !== 0) {
        var index = temp.length - 1;
        for (var k = 0; k < relacione.length; k++) {
          if (relacione[k].nga === temp[index]) {
            if (relacione[k].me === "-") {
              if (!e1.includes(relacione[k].ne)) {
                e1.push(relacione[k].ne);
              }
              if (!temp.includes(relacione[k].ne)) {
                temp.push(relacione[k].ne);
              }
            }
          }
        }
        temp.splice(index, 1);
      }

      for (var l = 0; l < relacione.length; l++) {
        if (relacione[l].me !== "-") {
          if (e1.includes(relacione[l].nga)) {
            if (!char[relacione[l].me]) {
              char[relacione[l].me] = [relacione[l].ne];
            } else {
              if (
                char[relacione[l].me] &&
                !char[relacione[l].me].includes(relacione[l].ne)
              ) {
                char[relacione[l].me].push(relacione[l].ne);
              }
            }
          }
        }
      }

      var obj = { [gjendje[i]]: {} };

      for (var m = 0; m < alfabet.length; m++) {
        e2 = [];
        if (char[alfabet[m]]) {
          for (var n = 0; n < char[alfabet[m]].length; n++) {
            if (e2.length === 0) {
              e2[0] = char[alfabet[m]][n];
            } else {
              if (!e2.includes(char[alfabet[m]][n])) {
                e2.push(char[alfabet[m]][n]);
                temp.push(char[alfabet[m]][n]);
              }
            }
            for (var p = 0; p < relacione.length; p++) {
              if (relacione[p].nga === char[alfabet[m]][n]) {
                if (relacione[p].me === "-") {
                  if (!e2.includes(relacione[p].ne)) {
                    e2.push(relacione[p].ne);
                    temp.push(relacione[p].ne);
                  }
                }
              }
            }
          }

          while (temp.length !== 0) {
            var index1 = temp.length - 1;
            for (w = 0; w < relacione.length; w++) {
              if (relacione[w].nga === temp[index1]) {
                if (relacione[w].me === "-") {
                  if (!e2.includes(relacione[w].ne)) {
                    e2.push(relacione[w].ne);
                  }
                  if (!temp.includes(relacione[w].ne)) {
                    temp.push(relacione[w].ne);
                  }
                }
              }
            }
            temp.splice(index1, 1);
          }

          obj[gjendje[i]][alfabet[m]] = e2;
          for (let e = 0; e < e2.length; e++) {
            if (!gjendje.includes(e2[e])) {
              gjendje.push(e2[e]);
            }
          }
        } else {
          obj[gjendje[i]][alfabet[m]] = [];
        }
      }
      tab1.push(obj);
    }
    // console.log(tab1);

    this.setState({
      ...this.state,
      ndfa: true,
      table1: tab1
    });
  };

  shfaqAutomatDFA = () => {
    var i, j, k, l;
    var gjendje = [["0"]];
    var tab1 = this.state.table1;
    var tab2 = [tab1[0]];

    var vals = valuesIn(valuesIn(tab1[0]));
    var vals2 = valuesIn(vals[0]);

    var flag = false;
    for (i = 0; i < vals2.length; i++) {
      for (j = 0; j < gjendje.length; j++) {
        if (xor(gjendje[j], vals2[i]).length === 0) {
          flag = true;
        }
      }
      if (!flag) {
        gjendje.push(vals2[i]);
      }
    }

    var gj, obj, arr;
    for (i = 1; i < gjendje.length; i++) {
      gj = gjendje[i];
      obj = {};
      for (j = 0; j < gj.length; j++) {
        for (k = 0; k < tab1.length; k++) {
          if (tab1[k][gj[j]]) {
            for (l = 0; l < this.props.alfabet.length; l++) {
              if (!obj[this.props.alfabet[l]]) {
                obj[this.props.alfabet[l]] = [
                  tab1[k][gj[j]][this.props.alfabet[l]]
                ];
              } else {
                obj[this.props.alfabet[l]].push(
                  tab1[k][gj[j]][this.props.alfabet[l]]
                );
              }
            }
          }
        }
      }

      var key = keysIn(obj);
      var newArr;
      for (j = 0; j < key.length; j++) {
        flag = false;
        newArr = [];
        arr = obj[key[j]];
        for (k = 0; k < arr.length; k++) {
          newArr = union(newArr, arr[k]);
        }
        obj[key[j]] = newArr;
        for (l = 0; l < gjendje.length; l++) {
          if (xor(gjendje[l], newArr).length === 0) {
            flag = true;
          }
        }
        if (!flag) {
          gjendje.push(newArr);
        }
      }

      tab2.push({ [gjendje[i]]: obj });
    }
    // console.log(tab2);
    this.setState({
      ...this.state,
      dfa: true,
      table2: tab2
    });
  };
  
  render() {
    var gjFundme = this.state.gjFundme;
    var ndfa = this.state.ndfa ? (
      <table className="table">
        <thead>
          <tr>
            <th>Gjendjet</th>
            {this.props.alfabet.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.table1.map((value, index) => {
            return (
              <tr key={index}>
                {/* {if(gjFundme.includes(keys(value))){
                  return 
                }} */}
                <td className={ gjFundme.includes(keys(value)+"") ? "fundore" : "" }>{keys(value)}</td>
                {valuesIn(valuesIn(value)[0]).map((val, ind) => {
                  return <td key={ind}>{val.join(",")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : null;

    var flag;
    var dfa = this.state.dfa ? (
      <table className="table">
        <thead>
          <tr>
            <th>Gjendjet</th>
            {this.props.alfabet.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.table2.map((value, index) => {
            return (
              <tr key={index}>
                <td>{keys(value)}</td>
                {valuesIn(valuesIn(value)[0]).map((val, ind) => {
                  flag = false;
                  for (var n = 0; n < val.length; n++) {
                    // console.log(val[n]);
                    if (gjFundme.includes(val[n])) {
                      flag = true;
                      // console.log(flag);
                    }
                  }
                  if (flag) {
                    return (
                      <td className="fundore" key={ind}>
                        {val.join(",")}
                      </td>
                    );
                  } else {
                    return <td key={ind}>{val.join(",")}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : null;

    return (
      <div>
        <button onClick={this.shfaqAutomatNDFA}>Shfaq Automatin NDFA</button>
        <br />
        <br />
        <button onClick={this.shfaqAutomatDFA}>Shfaq Automatin DFA</button>
        <br />
        <br />
        {ndfa}
        <br />
        <br />
        {dfa}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    alfabet: state.alfabet,
    gjendje: state.gjendje,
    relacione: state.relacione
  };
};

export default connect(mapStateToProps)(Automat);
