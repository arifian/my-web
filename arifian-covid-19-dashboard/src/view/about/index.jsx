import {styles} from "../../styles";
import React, {Component} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { config } from "../../config";

const _styles = (theme) => ({
  ...styles
});

class _About extends Component {
    render() {
	const c = this.props.classes;
	return (
		<div className={clsx(c.textLeft, c.mbOne)}
		>
		<h1>Tentang situs ini</h1>
		<p>Covid 19 Status In Indonesia, situs ini dikembangkan sebagai salah satu bagian dari pengembangan alat pada pengerjaan tugas akhir oleh Arifian Rahardianda, mahasiswa kelas karyawan Universitas Bakrie. Tahun kelulusan 2020.</p>
		<p>Source pengerjaan tugas akhir tersebut dapat didapatkan di https://github.com/arifian/my-web</p>
	    <p>Adapun sumber data yang digunakan pada situs ini :
		<li>https://api.kawalcorona.com/indonesia</li>
		<li>https://api.kawalcorona.com/indonesia/provinsi</li>
		<li>https://api.covid19api.com/total/dayone/country/indonesia</li>
	    </p>
	    </div>
	);
    }
}

const mapDispatchToProps = (dispatch) => ({
  // getLatestCovidData: () => dispatch(getLatestCovidData()),
  // getLatestCovidProvinceData: () => dispatch(getLatestCovidProvinceData()),
  // getLatestCovidTimeSeries: () => dispatch(getLatestCovidTimeSeries()),
});

const mapStateToProps = (state) => ({
  ...state,
});

const _comp1 = connect(mapStateToProps, mapDispatchToProps)(_About);
const _comp2 = withStyles(_styles)(_comp1);
export const About = _comp2;
