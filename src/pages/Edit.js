import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form } from '@unform/web';
import React, {useState} from 'react';
import Chip from '@material-ui/core/Chip';
import { useDispatch } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { TextField } from 'unform-material-ui';
import * as SagaActions from '../sagas/actions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import '../styles/pages/Login.scss';
import api from '../service/api';
import ibge from '../service/ibgeApi';
import LeftMenu1 from '../components/LeftMenu1';
import CssBaseline from '@material-ui/core/CssBaseline';

import '../styles/pages/NewPlan.scss';

export default function Edit() {


  const iduser= localStorage.getItem("iduser");
  const [usuario,setUsuario]=useState({});
  const [init, setInit]=useState(1);
  const [nome,setNome]=useState(usuario.nome);
  const [senha,setSenha]=useState(usuario.senha);
  const [loguin,setLoguin]=useState(usuario.usuario);
  const [categoria,setCategoria]=useState(usuario.escola);
  const [sexo,setSexo]=useState(usuario.sexo);

  const [idade,setIdade]=useState(usuario.idade);
  const [cidade,setCidade]=useState([]);
  const [estados,setEstados]=useState([]);
  const [selectedCidade,setSelectedCidade]=useState('');
  const [selectedEstado,setSelectedEstado]=useState('');
  const dispatch = useDispatch();
  
if(init===1){
  api.get(`/usuario/id?iduser=${Number(iduser)}`)
      .then((response) => {
        setUsuario(response.data)
      })
      ibge.get('/estados').then((response)=>{
        setEstados(response.data);
      })
      setInit(0);
    }

    async function handleEdit(e) {
       // e.preventDefault()





       const data={
         id:localStorage.getItem('iduser'),
        nome: nome,
        usuario: loguin,
        idade: idade,
        cidade: selectedCidade.concat("/".concat(selectedEstado)),
        escola: categoria,
        sexo: sexo,
        senha: senha
    }
    
        try {
          const response = await api.post('/editar', data)
    
          setInit(1);

          dispatch(SagaActions.Success({ message: 'editado com sucesso', path: '/' }));

    
          
        } catch (err) {
          alert('Erro, tente novamente.')
        }
      }
    
    



  return (
    <div className="new-plan-page page">
    <LeftMenu1 />
    <CssBaseline />
    <main className="page-content">
        <h2 className="title">Editar Perfil do Professor no SCIENCE</h2>

    <Grid container className="login-component">
      <Grid className="empty-container" xs={12} sm={14} item />
      <Grid className="form-container" xs={12} sm={14} item>
        
        <Form onSubmit={handleEdit} >
       
       <TextField className="textfield" required name="nome"  placeholder= {usuario.nome} value={nome}  onChange={(e) => setNome(e.target.value)} variant="outlined" />
       <TextField className="textfield" required  name="email"  placeholder= {usuario.usuario} value={loguin}  onChange={(e) => setLoguin(e.target.value)} variant="outlined" />
     
       <div className="advanced-section-name"> Estado: </div>
       <Select required
                        variant="outlined"
                      className="select-chips"
                      value={selectedEstado}  
                      input={<Input  />}
                     label="Estado"
                     onChange={(e) =>{
                       setSelectedEstado(e.target.value);
                       ibge.get(`estados/${e.target.value}/municipios`).then((response)=>{
                         setCidade(response.data)
                       }) }} 
                     renderValue={(value) => (
                       <div>
                      <Chip key={value} label={value} />
             
                       </div>
                          )}
      > {estados.map((name) => (
         <MenuItem key={name.id} value={name.sigla}>
           {name.nome}
         </MenuItem>
       ))}

             </Select> 
             <div className="advanced-section-name"> Cidade: </div>
       <Select required
        variant="outlined"
        input={<Input  />}
                      className="select-chips"
                      value={selectedCidade}  
                  
                     onChange={(e) =>{
                       setSelectedCidade(e.target.value);
                      }} 
                     renderValue={(value) => (
                       <div>
                      <Chip key={value} label={value} />
             
                       </div>
                          )}
      > {cidade.map((name) => (
         <MenuItem key={name.id} value={name.nome}>
           {name.nome}
         </MenuItem>
       ))}

             </Select> 
     
     
             <div className="advanced-section-name"> Sexo: </div>
       <Select required
            placeholder= {usuario.sexo}
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
             <div className="advanced-section-name"> Categoria Escolar: </div>
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
           
       <TextField className="textfield" required placeholder= {usuario.idade} name="idade"  value={idade}  onChange={(e) => setIdade(e.target.value)} variant="outlined" />
       <TextField className="textfield" required name="senha" placeholder= {usuario.senha} type='password' value={senha}  onChange={(e) => setSenha(e.target.value)} variant="outlined" />
       
       <Button className="submit" variant="contained" color="primary"  type="submit">Enviar</Button>

     </Form>
      </Grid>
      <Grid className="empty-container" xs={12} sm={4} item />
    </Grid>
    </main>
    </div>
  );
}


