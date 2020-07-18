import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';
import api from '../service/api';

import * as SagaActions from '../sagas/actions';

import '../styles/pages/Login.scss';

export default function Login() {
  const [loguin,setLoguin]=useState('');
  const [senha,setSenha]=useState('');
  const dispatch = useDispatch();
  const [init,setInit]=useState(0);

  if(init===0){
    localStorage.removeItem("iduser");
    setInit(1);
  }
 

async function logar(e){

  
  const logado= await api.get(`/loguin?loguin=${loguin}&senha=${senha}`);

  if(logado.data.nome !=null){

    
   
    localStorage.setItem('iduser',logado.data.id);
    localStorage.setItem('categoria',logado.data.escola);
    dispatch(SagaActions.Success({ message: 'Login realizado com sucesso', path: '/' }));


    }else{
      dispatch(SagaActions.Error({ message: 'E-mail ou senha invalidos', path: '/login' }));

    }
}




  return (
    <Grid container className="login-component">
      <Grid className="empty-container" xs={12} sm={4} item />
      <Grid className="form-container" xs={12} sm={4} item>
        <Typography className="login-font" variant="h2" component="h2">Bem-vindo ao SCIENCE </Typography>
        <Typography className="login-font-secundary" variant="h3" component="h3">Venha conhecer nosso sistema</Typography>
        <Typography className="login-font-secundary" variant="h3" component="h3">Login</Typography>
        <Form  onSubmit={logar}

        >
          <TextField className="textfield" name="login" label="Login" value={loguin}  onChange={(e) => setLoguin(e.target.value)} variant="outlined" />
          <TextField className="textfield" 
          name='password'
          type="password"
           label="Senha" value={senha}  onChange={(e) => setSenha(e.target.value)} variant="outlined" />
          <Button className="submit" variant="contained" color="primary" type="submit">Entrar</Button>
          <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Lembrar a Senha</label>
                    </div>
          </div>

          
         
          <Button className="submit" variant="contained" color="primary"  
                onClick={() =>(dispatch(SagaActions.Success({ message: 'Cadastrar', path: '/cadastro' })))}> Cadastrar - se</Button>
          <br />
      
          <Link className="/newPassword" variant="contained" type="link">Recuperar Senha </Link>
        </Form>
      </Grid>
      <Grid className="empty-container" xs={12} sm={4} item />
    </Grid>
  );
}
