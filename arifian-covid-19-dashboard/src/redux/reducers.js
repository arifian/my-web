import { Action } from "./type";

const _DEFAULT_STATE_ = {
  latestCovid: {},
  province: {},
  timeSeries: {},
};

export const reducers = (state = _DEFAULT_STATE_, action) => {
  switch (action.type) {
    case Action.GET_LATEST_COVID_DATA_REQ:
    case Action.GET_LATEST_COVID_DATA_OK:
    case Action.GET_LATEST_COVID_DATA_ERR:
      return {
        ...state,
        latestCovid: action.payload,
      };
    case Action.GET_LATEST_COVID_PROVINCE_DATA_REQ:
    case Action.GET_LATEST_COVID_PROVINCE_DATA_OK:
    case Action.GET_LATEST_COVID_PROVINCE_DATA_ERR:
      return {
        ...state,
        province: action.payload,
      };
    case Action.GET_LATEST_COVID_TIME_SERIES_DATA_REQ:
    case Action.GET_LATEST_COVID_TIME_SERIES_DATA_OK:
    case Action.GET_LATEST_COVID_TIME_SERIES_DATA_ERR:
      return {
        ...state,
        timeSeries: action.payload,
      };
    default:
      return state;
  }
};