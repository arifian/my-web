import { styles } from "../../styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const _styles = (theme) => ({
  ...styles
});

class _Latest extends Component {

  render() {
    return (
      <div {...this.props}>
        <h1>Zehahaha 1</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});


const mapDispatchToProps = (dispatch) => ({

});

const _comp1 = connect(mapStateToProps, mapDispatchToProps)(_Latest);
const _comp2 = withStyles(_styles)(_comp1);
export const Latest = _comp2;
