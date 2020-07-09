import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Form } from '@unform/web';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { TextField } from 'unform-material-ui';
import * as SagaActions from '../sagas/actions';
import api from '../service/api';
import '../styles/pages/Login.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/pages/NewPlan.scss';
import { makeStyles } from '@material-ui/core/styles';
import ibge from '../service/ibgeApi';
import LeftMenu1 from '../components/LeftMenu1';


export default function Cadastro() {

  const [nome,setNome]=useState('');
  const [senha,setSenha]=useState('');
  const [loguin,setLoguin]=useState('');
  const [categoria,setCategoria]=useState('');
  const [sexo,setSexo]=useState('');
  const [cidade,setCidade]=useState([]);
  const [estados,setEstados]=useState([]);
  const [selectedCidade,setSelectedCidade]=useState('');
  const [selectedEstado,setSelectedEstado]=useState('');
  const [idade,setIdade]=useState('');
  const [init,setInit]=useState(0);
  const dispatch = useDispatch();

if(init===0){
  ibge.get('/estados').then((response)=>{
    setEstados(response.data);
  })
  setInit(1);
}

  function integridadeDados(){
    var retorno =false;

    if(loguin.length<10|| (loguin.indexOf('@')===-1)){
      dispatch(SagaActions.Error({message:'Formato de Email incorreto, tente novamente.',path:'/cadastro'}))
    }else  if(senha.length<6){
      dispatch(SagaActions.Error({message:'Senha muito curta, minimo 6 caracteres, tente novamente.',path:'/cadastro'}))
    }else if(idade<15 ||idade>120){
      dispatch(SagaActions.Error({message:'Idade incorreta, fora de padrões, tente novamente.',path:'/cadastro'}))
    }else{
      retorno =true;
    }
    return retorno;
  }


    async function handleRegister(e) {


      if(integridadeDados()){




       // e.preventDefault()
       const data={
        nome: nome,
        usuario: loguin,
        idade: idade,
        cidade: selectedCidade.concat("/".concat(selectedEstado)),
        escola: categoria,
        sexo: sexo,
        senha: senha
    }
    
        try {
          const response = await (await api.post('/cadastro', data))
    
          dispatch(SagaActions.Success({ message: 'Cadastrado com sucesso', path: '/login' }));
    
          
        } catch (err) {
          dispatch(SagaActions.Error({message:'Erro no cadastro, tente novamente.',path:'/cadastro'}))
        }

      }
      }
    
    



  return (
    <div className="new-plan-page page">
    <LeftMenu1 />
    <CssBaseline />

    <main className="page-content">
        <h2 className="title">Cadastro do Professor no SCIENCE</h2>


    <Grid container className="login-component">
      <Grid className="empty-container" xs={12} sm={14} item />
      <Grid className="form-container" xs={12} sm={14} item >
        <Form onSubmit={handleRegister} >
       
          <TextField className="textfield" required name="nome" label="Nome" value={nome}  onChange={(e) => setNome(e.target.value)} variant="outlined" />
          <TextField className="textfield" required  name="email" label="Email" value={loguin}  onChange={(e) => setLoguin(e.target.value)} variant="outlined" />
        <div className="Estados">
       
        <InputLabel id="demo-simple-select-label">Estado</InputLabel>

          <Select required
         
                      width="200%"
                           variant="outlined"
                         
                         value={selectedEstado}  
                        label="Estado"
                        onChange={(e) =>{
                          setSelectedEstado(e.target.value);
                          ibge.get(`estados/${e.target.value}/municipios`).then((response)=>{
                            setCidade(response.data)
                          }) }} 
                      
         > {estados.map((name) => (
            <MenuItem key={name.id} value={name.sigla}>
              {name.nome}
            </MenuItem>
          ))}

                </Select> 
           
                </div>
                <InputLabel >Cidade</InputLabel>
          <Select required
           variant="outlined"
                         
                         value={selectedCidade}  
                       
                        onChange={(e) =>{
                          setSelectedCidade(e.target.value);
                         }} 
                      
         > {cidade.map((name) => (
            <MenuItem key={name.id} value={name.nome}>
              {name.nome}
            </MenuItem>
          ))}

                </Select> 
        
        
          <InputLabel id="demo-simple-select-label">Sexo</InputLabel>
          <Select required
           variant="outlined"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sexo}
                        label="Sexo"
                        onChange={(e) =>setSexo(e.target.value)}
            >
                        <MenuItem value={'Masculino'}>Masculino</MenuItem>
                     <MenuItem value={'Feminino'}>Feminino</MenuItem>
                     <MenuItem value={'Indeterminado'}>Indefinida</MenuItem>
                </Select> 
		  <InputLabel id="demo-simple-select-label">Categoria Escolar</InputLabel>
          <Select required
           variant="outlined"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoria}
                        label="Categoria"
                        onChange={(e) => setCategoria(e.target.value)}
            >
                        <MenuItem value={'Municipal'}>Municipal</MenuItem>
                        <MenuItem value={'Estadual'}>Estadual</MenuItem>
                        <MenuItem value={'Particular'}>Particular</MenuItem>
                </Select> 
              
          <TextField className="textfield" required name="idade" label="Idade" value={idade}  onChange={(e) => setIdade(e.target.value)} variant="outlined" />
          <TextField className="textfield" required name="senha" label="Senha" type='password' value={senha}  onChange={(e) => setSenha(e.target.value)} variant="outlined" />
          
          <Button className="submit" variant="contained" color="primary"  type="submit">Enviar</Button>

        </Form>
      </Grid>
      <Grid className="empty-container" xs={12} sm={1} item />
    </Grid>
    </main>
    </div>
  );
}


