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
import { MyResponsiveBar } from "./bar";

const _styles = (theme) => ({
  ...styles
});

// Kasus_Meni: 1349
// Kasus_Posi: 18033
// Kasus_Semb: 8868
// Kode_Provi: 35
// Provinsi: "Jawa Timur"

class _Provinces extends Component {

  _getData = () => {
    const d = this.props.province?.data ?? [];
    return d?.map((el) => {
      const e = el["attributes"] || {};
      return {
        "Provinsi": e["Provinsi"] || 0,
        'Kasus Meninggal': e["Kasus_Meni"] || 0,
        'Kasus Positif': e["Kasus_Posi"] || 0,
        'Kasus Sembuh': e["Kasus_Semb"] || 0,
      }
    })
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
        <CardContent style={{height: 1024}}>
          <MyResponsiveBar data={this._getData()}/>
        </CardContent>
        <CardActions>
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