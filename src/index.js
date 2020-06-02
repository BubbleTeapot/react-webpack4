import React from "react";
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from "./router";
import './styles/common.css';

render(<BrowserRouter>
    <Switch>
        {renderRoutes(routes)}
    </Switch>
</BrowserRouter>, document.getElementById("app"));