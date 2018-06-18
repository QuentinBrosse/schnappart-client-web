import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import makeRootReducer from '../reducers';
import makeRootEpic from '../epics';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import once from 'lodash/once';

export default once(initialState => {

  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    makeRootReducer(),
    initialState,
    composeWithDevTools(
      applyMiddleware(epicMiddleware)
    )
  );

  epicMiddleware.run(makeRootEpic());

  return store;
});
