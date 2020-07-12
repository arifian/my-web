import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { config } from "./config";
import { reducers } from "./redux/reducers";

const DEV_MID = [logger, thunk];

const PROD_MID = [thunk];

const MIDDLEWARE = config.dev ? DEV_MID : PROD_MID;

export const store = createStore(reducers, compose(applyMiddleware(...MIDDLEWARE)));