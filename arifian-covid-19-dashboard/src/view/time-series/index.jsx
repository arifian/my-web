import {styles} from "../../styles";
import React, {Component} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import { MyResponsiveBar } from "./bar";
import Typography from "@material-ui/core/Typography";
import { config } from "../../config";
import {getLatestCovidData, getLatestCovidProvinceData, getLatestCovidTimeSeries} from "../../redux/actions";

const _styles = (theme) => ({
  ...styles
});

class _TimeSeries extends Component {

  componentDidMount() {
    this.props.getLatestCovidTimeSeries();
  }

  _getData = () => {
    const d = this.props.timeSeries?.data ?? [];
    return d.map((v) => ({
      confirmed: v?.Confirmed ?? 0,
      deaths: v?.Deaths ?? 0,
      recovered: v?.Recovered ?? 0,
      active: v?.Active ?? 0,
      date: (v?.Date ? new Date(v.Date).toDateString() : "-"),
    }))
  };

  _renderRawData = () => {
    if (config.dev) {
      return (
        <pre>
        { JSON.stringify(this.props.timeSeries, null, 2) }
      </pre>
      )
    }
    return null;
  };

  _renderChart = () => {
    const c = this.props.classes;
    return (
      <Card className={c.pOne}>
        <CardContent style={{height: 500}}>
          <MyResponsiveBar data={this._getData()} />
        </CardContent>
      </Card>
    )
  };

  render() {
    const c = this.props.classes;
    return (
      <div className={clsx(c.textLeft, c.mbOne)} style={{width: 1500}}>
        { this._renderChart() }
        { this._renderRawData() }
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

const _comp1 = connect(mapStateToProps, mapDispatchToProps)(_TimeSeries);
const _comp2 = withStyles(_styles)(_comp1);
export const TimeSeries = _comp2;