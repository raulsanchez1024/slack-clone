import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import firebase from "./firebase";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user) {
                    this.props.setUser(user);
                    this.props.history.push("/");
                } else {
                    this.props.history.push("/login");
                    this.props.clearUser();
                }
            });
    }

    render() {
        return this.props.isLoading ? <Spinner /> : (
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        );
    }
}

const mapStateFromProps = state => ({
   isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
