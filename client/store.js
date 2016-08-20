import rootReducer from './reducers';
import { persistState } from 'redux-devtools';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './devtools';
import {checkSessionStatus} from "./actions/AuthActions";
import {showModal} from "./actions/index";

const configureStore = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
)(createStore);

const store = configureStore(rootReducer);
store.dispatch(showModal());
store.dispatch(checkSessionStatus());

export default store;
