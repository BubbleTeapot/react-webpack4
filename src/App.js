import React from 'react';
import renderRoutes from './utils/renderRouter';
import { Provider } from 'react-redux';
import store from './redux';

function App({route}) {
  return (
    <Provider store={store}>
      {renderRoutes(route.routes)}
    </Provider>
  );
}
export default App;