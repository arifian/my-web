import axios from "axios";
import { config } from "../../config";

export const fetchLatestCovidData = async () => {
  try {
    return await axios.get(`${config.apiEndpoint}/data/indonesia/now.json`);
  } catch (e) {
    return e?.response;
  }
};

export const fetchLatestCovidProvinceData = async () => {
  try {
    return await axios.get(`${config.apiEndpoint}/data/indonesia/now-province.json`);
  } catch (e) {
    return e?.response;
  }
};

export const fetchLatestCovidTimeSeriesData = async () => {
  try {
    return await axios.get(`${config.apiEndpoint}/data/indonesia/time-series.json`);
  } catch (e) {
    return e?.response;
  }
};