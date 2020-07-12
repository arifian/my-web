import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getLatestCovidData, getLatestCovidProvinceData, getLatestCovidTimeSeries } from "./redux/actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.getLatestCovidData();
    this.props.getLatestCovidProvinceData();
    this.props.getLatestCovidTimeSeries();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});


const mapDispatchToProps = (dispatch) => ({
  getLatestCovidData: () => dispatch(getLatestCovidData()),
  getLatestCovidProvinceData: () => dispatch(getLatestCovidProvinceData()),
  getLatestCovidTimeSeries: () => dispatch(getLatestCovidTimeSeries()),
});

const _comp1 = connect(mapStateToProps, mapDispatchToProps)(App);
export const Application = _comp1;
