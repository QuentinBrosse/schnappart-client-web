import { createStore } from 'redux'; // import { createStore, applyMiddleware } from 'redux';
// import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { uncombinedRootReducer } from '../reducers';
// import makeRootEpic from '../epics';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import once from 'lodash/once';
import config from '../config';

export default once(initialState => {

  const persistRootReducer = persistCombineReducers(config.reduxPersist, uncombinedRootReducer);

  // const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    persistRootReducer,
    initialState,
    composeWithDevTools(
      // applyMiddleware(epicMiddleware)
    )
  );

  // epicMiddleware.run(makeRootEpic());
  const persistor = persistStore(store);

  return { store, persistor };
});
