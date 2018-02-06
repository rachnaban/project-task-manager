import React from 'react';
import { firebase,googleAuthProvider } from "../base";
import {withRouter} from 'react-router-dom';

class Authentication extends React.Component {
  state = {user: null, error: null,redirectToReferrer:false}
  auth = firebase.auth()
  login = () => {
    this.auth.signInWithPopup(googleAuthProvider).catch(error => {
      this.setState({error: error.message})
    })
  }  
  logout = () => {
   this.auth.signOut();
   this.props.history.push('/');
  }
  
  shouldComponentUpdate(nextProps, nextState){
    if(nextState.user!== this.state.user)
    {
      return true
    }
    else
    {
      return false
    }
  }
  componentDidMount() {
    this.unsubscribe = this.auth.onAuthStateChanged(user => {
      this.setState({user, error: null,redirectToReferrer:true})
    })
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }
  render() {
   
    return this.props.render({
      ...this.state,
      login: this.login,     
      logout: this.logout      
    })
  }
};

export default withRouter(Authentication);
