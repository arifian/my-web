import { Action } from "./type";
import { getLatestCovidData, getLatestCovidProvinceData, getLatestCovidTimeSeriesData } from "./ajax";

export const isSuccessStatus = (status) => {
  const s = parseInt(status);
  const number = !isNaN(s);
  return (number >= 200 && number < 300);
};

const createErrorFromAxr = (axr) => {
  return {
    errorCode: axr?.status,
    message: axr?.statusText,
  }
};

// GET LATEST COVID DATA
// =============================

const _getLatestCovidRequest = () => ({
  type: Action.GET_LATEST_COVID_DATA_REQ,
  payload: { loading: true, data: null, error: null },
});

const _getLatestCovidSuccess = (res) => ({
  type: Action.GET_LATEST_COVID_DATA_OK,
  payload: { loading: false, data: res, error: null },
});

const _getLatestCovidFailure = (err) => ({
  type: Action.GET_LATEST_COVID_DATA_ERR,
  payload: { loading: false, data: null, error: err },
});

export const getLatestCovidData = () => {
  return (dispatch) =>{
    return new Promise(async (resolve, _) => {
      dispatch(_getLatestCovidRequest());
      const axr = await getLatestCovidData();
      const status = axr?.status ?? 500;

      if (isSuccessStatus(status)) {
        const data = axr?.data;
        dispatch(_getLatestCovidSuccess(data));
      }

      if (!isSuccessStatus(status)) {
        const error = createErrorFromAxr(axr);
        dispatch(_getLatestCovidFailure(error));
      }
    });
  }
};

// GET LATEST COVID PROVINCE DATA
// =============================

const _getLatestCovidProvinceRequest = () => ({
  type: Action.GET_LATEST_COVID_PROVINCE_DATA_REQ,
  payload: { loading: true, data: null, error: null },
});

const _getLatestCovidProvinceSuccess = (res) => ({
  type: Action.GET_LATEST_COVID_PROVINCE_DATA_OK,
  payload: { loading: false, data: res, error: null },
});

const _getLatestCovidProvinceFailure = (err) => ({
  type: Action.GET_LATEST_COVID_PROVINCE_DATA_ERR,
  payload: { loading: false, data: null, error: err },
});

export const getLatestCovidProvinceData = () => {
  return (dispatch) =>{
    return new Promise(async (resolve, _) => {
      dispatch(_getLatestCovidProvinceRequest());
      const axr = await getLatestCovidProvinceData();
      const status = axr?.status ?? 500;

      if (isSuccessStatus(status)) {
        const data = axr?.data;
        dispatch(_getLatestCovidProvinceSuccess(data));
      }

      if (!isSuccessStatus(status)) {
        const error = createErrorFromAxr(axr);
        dispatch(_getLatestCovidProvinceFailure(error));
      }
    });
  }
};

// GET LATEST COVID TIME SERIES DATA
// ====================================

const _getLatestCovidTimeSeriesRequest = () => ({
  type: Action.GET_LATEST_COVID_TIME_SERIES_DATA_REQ,
  payload: { loading: true, data: null, error: null },
});

const _getLatestCovidTimeSeriesSuccess = (res) => ({
  type: Action.GET_LATEST_COVID_TIME_SERIES_DATA_OK,
  payload: { loading: false, data: res, error: null },
});

const _getLatestCovidTimeSeriesFailure = (err) => ({
  type: Action.GET_LATEST_COVID_TIME_SERIES_DATA_ERR,
  payload: { loading: false, data: null, error: err },
});

export const getLatestCovidTimeSeries = () => {
  return (dispatch) =>{
    return new Promise(async (resolve, _) => {
      dispatch(_getLatestCovidTimeSeriesRequest());
      const axr = await getLatestCovidTimeSeriesData();
      const status = axr?.status ?? 500;

      if (isSuccessStatus(status)) {
        const data = axr?.data;
        dispatch(_getLatestCovidTimeSeriesSuccess(data));
      }

      if (!isSuccessStatus(status)) {
        const error = createErrorFromAxr(axr);
        dispatch(_getLatestCovidTimeSeriesFailure(error));
      }
    });
  }
};