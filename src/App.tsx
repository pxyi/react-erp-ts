import React from 'react';

import { HashRouter, Route, Redirect } from 'react-router-dom';
import Login from './pages/login/Login';
import Base from './base/Base';
import { connect } from 'react-redux';
import { setUserAction } from './store/user/action';

interface Props {
  user: any;
  setUser: (user: object) => void
}
class App extends React.Component<Props> {
  user = window.localStorage.getItem('user');
  componentDidMount() {
    try {
      this.user && this.props.setUser(JSON.parse(this.user));
    } catch (error) {
      window.localStorage.removeItem('user');
    }
  }
  render () {
    return (
      <HashRouter>
        { this.user || this.props.user ? <Route path="/home" component={Base} /> : <Redirect to="/login" /> }
        <Route path="/login" exact component={Login} />
      </HashRouter>
    );
  }
}

const mapState = (state: any) => ({
  user: state.get('user')
})

//@ts-ignore
const mapDispatch = (dispatch): Props => ({
  setUser(user) {
    dispatch(setUserAction(user));
  }
});
export default connect(mapState, mapDispatch)(App);
