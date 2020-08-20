import React, { Component } from 'react';
import './App.css';
import { getLatestCovidData, getLatestCovidProvinceData, getLatestCovidTimeSeries } from "./redux/actions";
import { connect } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import clsx from "clsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Latest } from "./view/latest";
import { About } from "./view/about";
import { Provinces } from "./view/provinces";
import { TimeSeries } from "./view/time-series";
import { config } from "./config";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Switch, Route, withRouter } from "react-router-dom";
import DeviceOrientation, { Orientation } from 'react-screen-orientation'

const _styles = (theme) => ({
  ...styles,
  mb100: {
    marginBottom: 100,
  },
  debug: {
    border: config?.dev ? "1px solid red" : 0,
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
});

const useStyles = makeStyles({
  ...styles,
  fixed: {
    bottom: 0,
    width: "100%",
    position: "fixed",
  }
});

const _MyBottomNavigation = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
	    <BottomNavigation
	value={value}
	onChange={(event, newValue) => {
            setValue(newValue);
	}}
	showLabels
	className={classes.fixed}
	    >
	    <BottomNavigationAction
        onClick={() => props.history.push("/")}
        label="Latest" icon={<RestoreIcon />} />
	    <BottomNavigationAction
        onClick={() => props.history.push("/time-series")}
        label="Time Series" icon={<TimelineIcon />} />
	    <BottomNavigationAction
        onClick={() => props.history.push("/provinces")}
	label="Provinces" icon={<LocationOnIcon />} />
	    <BottomNavigationAction
        onClick={() => props.history.push("/about")}
        label="About" icon={<FavoriteIcon />} />
	    </BottomNavigation>
    );
};

const MyBottomNavigation = withRouter(_MyBottomNavigation);

class App extends Component {

  componentDidMount() {
    // this.props.getLatestCovidData();
    // this.props.getLatestCovidProvinceData();
    // this.props.getLatestCovidTimeSeries();
    // if (!window.navigator.xr && window.screen.orientation && window.screen.orientation.lock) {
    //   window.screen.orientation.lock('landscape');
    // }
  }

  _appBar = () => {
    const c = this.props.classes;
    return (
      <AppBar position="relative" className={c.mbOne}>
        <Toolbar>
          <TimelineIcon className={c.mrOne}/>
          <Typography variant="h6" color="inherit" noWrap>
            Covid 19 Status In Indonesia
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  render() {
    const c = this.props.classes;

    return (
      <div className="App" style={{position: "relative"}}>
        { this._appBar() }
        <div className={clsx(c.debug, c.container)}>
          <Switch>
            <Route exact path={"/"}>
              <Typography component={"h2"} variant={"h5"}>Latest</Typography>
              <div className={clsx(c.debug, c.pOne, c.mb100)}><Latest/></div>
            </Route>
            <Route exact path={"/time-series"}>
              <Typography component={"h2"} variant={"h5"}>Time Series</Typography>
              <div className={clsx(c.debug, c.pOne, c.mb100)} style={{width: "100%", overflowX: "auto"}}
              >
                <TimeSeries/>
              </div>
            </Route>
            <Route exact path={"/provinces"}>
              <Typography component={"h2"} variant={"h5"}>Province</Typography>
              <div className={clsx(c.debug, c.pOne, c.mb100)} style={{width: "100%", overflowX: "auto"}}>
                <Provinces/>
              </div>
            </Route>
	    <Route exact path={"/about"}>
              <Typography component={"h2"} variant={"h5"}>About</Typography>
            <div className={clsx(c.debug, c.pOne, c.mb100)} style={{width: "100%", overflowX: "auto"}}>
	    <About/>
              </div>
            </Route>
          </Switch>
        </div>
        <MyBottomNavigation/>
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
