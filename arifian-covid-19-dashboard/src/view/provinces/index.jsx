import { styles } from "../../styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { MyResponsivePie } from "../components/pie";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { config } from "../../config";

const _styles = (theme) => ({
  ...styles
});

class _Provinces extends Component {

  _getData = () => {
    const d = this.props.province.data;
    const confirmed = d?.confirmed?.value ?? 0;
    const recovered = d?.recovered?.value ?? 0;
    const deaths = d?.deaths?.value ?? 0;
    return [
      {
        id: "recovered",
        label: "Recovered",
        value: recovered,
        color: "hsl(127,74%,35%)",
      },
      {
        id: "deaths",
        label: "Deaths",
        value: deaths,
        color: "#8f2421",
      },
      {
        id: "confirmed",
        label: "Confirmed",
        value: confirmed,
        color: "hsl(37,85%,46%)"
      },
    ]
  };

  _renderRawData = () => {
    if (config.dev) {
      return (
        <pre>
        { JSON.stringify(this.props.province, null, 2) }
      </pre>
      )
    }
    return null;
  };

  _renderCard = () => {
    const c = this.props.classes;
    const d = this.props.province?.data;
    const lastUpdate = d?.lastUpdate ? new Date(d.lastUpdate) : d?.lastUpdate;

    return (
      <Card className={c.pOne}>
        <CardContent style={{height: 500}}>
          <MyResponsivePie data={this._getData()}/>
        </CardContent>
        <CardActions>
          <Typography variant="body2" component="p">Last Update: </Typography>
          <Button size="small">{ lastUpdate?.toLocaleString() ?? "-" }</Button>
        </CardActions>
      </Card>
    )
  };

  render() {
    const c = this.props.classes;
    return (
      <div className={clsx(c.textLeft)}>
        <Typography component={"h2"} variant={"h5"}>Province</Typography>
        { this._renderCard() }
        { this._renderRawData() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});


const mapDispatchToProps = (dispatch) => ({

});

const _comp1 = connect(mapStateToProps, mapDispatchToProps)(_Provinces);
const _comp2 = withStyles(_styles)(_comp1);
export const Provinces = _comp2;