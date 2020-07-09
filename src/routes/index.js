import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { ConnectedRouter } from 'connected-react-router';
import { QueryParamProvider } from 'use-query-params';

import Footer from '../components/Footer';
import Header from '../components/Header';

import About from '../pages/About';
import Login from '../pages/Login';
import NewPassword from '../pages/NewPassword';
import Edit from '../pages/Edit';
import NewPlan from '../pages/NewPlan';
import Search from '../pages/Search';
import history from './history';
import Register from '../pages/Register';
import Planos from '../components/Planos'

// Pages
// Components

const Routes = () => {
  const path = useSelector((state) => state.router.location.pathname);

  return (
    <ConnectedRouter history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Container
          className={`${path.replace('/', '').concat('-path')} routes-wrapper `}
          maxWidth="lg"
        >
          <Header />
          <Grid item xs={12} className="content">
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
          </Grid>
          <Footer />

        </Container>
      </QueryParamProvider>
    </ConnectedRouter>
  );
};

export default Routes;
