import React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from "./App.js";

render( <Provider store={store}><App /></Provider>, document.getElementById("app"));