import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

/**
 * 
 * @param {*} routes 路由数组
 * @param {*} authed 
 * @param {*} authPath 无权限默认页面
 * @param {*} extraProps 
 * @param {*} switchProps 
 */
const renderRoutes = (
  routes,
  authed,
  authPath = '/login',
  extraProps = {},
  switchProps = {}
) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            if (!route.requiresAuth || authed || route.path === authPath) {
              return (
                <route.component {...props} {...extraProps} route={route} />
              );
            }
            return (
              <Redirect
                to={{ pathname: authPath, state: { from: props.location } }}
              />
            );
          }}
        />
      ))}
    </Switch>
  ) : null;

export default renderRoutes;