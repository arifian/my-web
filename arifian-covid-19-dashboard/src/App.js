import React, { Component } from 'react';
import './App.css';
import { getLatestCovidData, getLatestCovidProvinceData, getLatestCovidTimeSeries } from "./redux/actions";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import clsx from "clsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { Latest } from "./view/latest";
import { Provinces } from "./view/provinces";
import { TimeSeries } from "./view/time-series";

const _styles = (theme) => ({
  ...styles,
  debug: {
    border: "1px solid red",
  },
  w50d: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50%",
    },
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: 1200,
    },
    topBox: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        "flex-direction": "column",
      },
      [theme.breakpoints.up("md")]: {
        "flex-direction": "column",
      },
      [theme.breakpoints.up("lg")]: {
        "flex-direction": "row",
      },
    }
  },
});

class App extends Component {
  componentDidMount() {
    this.props.getLatestCovidData();
    this.props.getLatestCovidProvinceData();
    this.props.getLatestCovidTimeSeries();
  }

  _appBar = () => {
    const c = this.props.classes;
    return (
      <AppBar position="relative" className={c.mbOne}>
        <Toolbar>
          <CameraIcon className={c.mrOne}/>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
    )
  };

  render() {
    const c = this.props.classes;
    return (
      <div className="App">
        { this._appBar() }
        <div className={clsx(c.debug, c.container)}>
          <div className={clsx(c.debug, c.topBox)}>
            <div className={clsx(c.debug, c.w50d, c.pOne)}><Latest/></div>
            <div className={clsx(c.debug, c.w50d, c.pOne)}><Provinces/></div>
          </div>
          <div className={clsx(c.debug, c.pOne)}><TimeSeries/></div>
        </div>
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
const _comp2 = withStyles(_styles)(_comp1);
export const Application = _comp2;
