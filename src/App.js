import './App.css';
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import ProtectedRoute from './components/common/protectedRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from './services/authService';
import Appartments from './components/appartments';
import Appartment from './components/appartment';
import Navbar from './components/navbar';
import Home from './components/home';
import NotFound from './components/not-found';
import LoginForm from './components/login';
import BookingForm from './components/bookingForm';
import Confirm from './components/confirm';
import Logout from './components/logout';

class App extends Component {

  state= {}

  componentDidMount() {
    const user = getCurrentUser(); 
    this.setState({user});
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={this.state.user}/>
        <div className="container">
          <ToastContainer/>
          <Switch>
            <Route path="/confirm" component={Confirm}/>
            <Route path="/book" component={BookingForm}/>
            <Route path="/appartments" component={Appartments}/>
            <Route path="/appartment/:id" component={Appartment}/>
            <Route path="/login" component={LoginForm}/>
            <ProtectedRoute path="/logout" component={Logout}/>
            <Route path="/booking/:appartment/:dateFrom/:dateTo" component={BookingForm}/>
            <Route path="/not-found" component={NotFound}/>          
            <Route path="/" exact component={Home}/>
            <Redirect to="not-found"/>
          </Switch>
          </div>
      </React.Fragment>
    );
  }
}

export default App;
