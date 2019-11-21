import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import {Switch, Route, Redirect } from 'react-router';
import {routes} from 'router';

/**
 * 配合this.props.children使用,避免每次都引入同一组件
 * @param {*} routes 
 */
function getRouterByRoutes(routes){
  const renderedRoutesList = [];
  const renderRoutes = (routes)=>{
    Array.isArray(routes) && routes.forEach((route)=>{
      const {path, redirect, layout, component} = route;
      if(redirect){
        renderedRoutesList.push(<Redirect key={`${path}`} exact from={path} to={`${redirect}`}/>)
      }
      if(component){
        renderedRoutesList.push(
          layout ? <Route
            key={`${path}`}
            exact path={`${path}`}
            render={(props)=>React.createElement(layout,props,React.createElement(component,props))} />:
          <Route 
              key={`${path}`}
              exact
              path={`${path}`}
              component={component} />)
      }
    });
  }
  renderRoutes(routes);
  return renderedRoutesList;
 
}
class App extends React.PureComponent{
  render(){
    return (
      <HashRouter>
        <Switch>
          {getRouterByRoutes(routes)}
        </Switch>
      </HashRouter>
    )
  }
}
export default App;