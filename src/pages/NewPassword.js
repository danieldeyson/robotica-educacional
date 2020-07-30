import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';

import * as SagaActions from '../sagas/actions';

import '../styles/pages/Login.scss';

export default function Login() {
  const dispatch = useDispatch();
  return (
    <Grid container className="login-component">
      <Grid className="empty-container" xs={12} sm={4} item />
      <Grid className="form-container" xs={12} sm={4} item>
        <Typography className="login-font" variant="h2" component="h2">Bem-vindo ao ROBOMATE</Typography>
        <Typography className="login-font-secundary" variant="h3" component="h3">Digite seu login para receber sua nova senha</Typography>
        <Form onSubmit={() => {
          dispatch(SagaActions.Success({ message: 'Senha recuperada com sucesso', path: '/' }));
        }}
        >
          <TextField className="textfield" name="login" label="Login" variant="outlined" />
          <Button className="submit" variant="contained" color="primary" type="submit">Recuperar</Button>

        </Form>
      </Grid>
      <Grid className="empty-container" xs={12} sm={4} item />
    </Grid>
  );
}
