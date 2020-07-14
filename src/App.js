import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import Footer from './components/Footer';
import Header from './components/Header';

import About from './pages/About';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Edit from './pages/Edit';
import NewPlan from './pages/NewPlan';
import Search from './pages/Search';
import history from './routes/history';
import Register from './pages/Register';
import Planos from './components/Planos'


// Pages
// Components

export default class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
		<Route exact path="/" component={Search} />
		<Route exact path="/login" component={Login} />
		<Route exact path="/new" component={NewPlan} />
		<Route exact path="/about" component={About} />
		<Route exact path="/password" component={NewPassword} />
		<Route exact path="/cadastro" component={Register}/>
		<Route exact path="/perfil" component={Edit}/>
		<Route exact path="/plano/:id"  component={Planos}/>
          </Switch>
        </Router>
	<Footer />
      </div>
    );
  }
}

