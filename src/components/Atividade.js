/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
import Visibility from '@material-ui/icons/Visibility';

// import { TextField } from 'unform-material-ui';
import api from '../service/api';
import history from '../routes/history';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
import Planos from '../components/Planos'

import { Form } from '@unform/web';
// import { TextField } from 'unform-material-ui';

import * as SagaActions from '../sagas/actions';
import { TextareaAutosize } from '@material-ui/core';

export default function Atividade({ atividade }) {


    const dispatch = useDispatch();
 
    const [comentarios, setComentarios]=useState([]);
    const [con, setCon]=useState('');
    const [views, setViews]=useState('');
    const [init, setInit]=useState(1);
    const iduser= localStorage.getItem('iduser');
    const comentando = (event) => {
        setCon(event.target.value);
    }
    const aula={nome:atividade.nome}
   
   inicializer();
   
   function separador(texto){

    return texto.replace(/[A-Z]/g, " $&").trim();
}
   
   async function inicializer(){
    if (init===1){
         api
              .post(`/comentarios`,aula)
              .then((response) => {
                setComentarios(response.data)
              })
      
         api
               .post('/visualizacoes',aula)
               .then((response) => {
                 setViews(response.data)
               })  
      
               
               
       
           
     setInit(0);
            }
    }      
          

    
    function dataAtualFormatada() {
        var data = new Date(),
            dia = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length === 1) ? '0' + mes : mes,
            anoF = data.getFullYear();
        return   diaF + "-" + mesF+ "-"+ anoF;
    }
async function visualizar(){
    localStorage.removeItem("aula");
    localStorage.setItem("aula",aula.nome)
    console.log(aula.nome);
    await api
    .post(`/visualizacao?iduser=${iduser}`,aula)
    .then((response) => {
      setViews(response.data)
    })



}
    
    async function handleSubmit(e) {
        // e.preventDefault()
        const comentario={
         conteudo: con,
         idUser: Number(iduser),
        planoAula:atividade.nome,
         data:dataAtualFormatada()
        }
     
         try {
           await api.post('/comentario', comentario)
        
          
            
           dispatch(SagaActions.Success({ message: 'Comentario enviado', path: '/' }));
           setInit(1);
            
           
         } catch (err) {
           alert('Erro,, tente novamente.')
         }
       }

    return (
        <div>
            <Grid className="search-result" item>
                <div className="primary-info">
                    <h2> <Link to={`/plano/${views}`} onClick={visualizar} >{separador(atividade.nome)} </Link></h2>
                    <Grid container>
                        <Grid sm={6} md={3} item>
                            <Typography paragraph>
                                <strong>Componentes curriculares:</strong>
                                <br /> {atividade.disciplina}
                            </Typography>
                        </Grid>
                        <Grid sm={6} md={3} item>
                            <Typography paragraph>
                                <strong>Série:</strong>
                                <br /> {atividade.serie}
                            </Typography>
                        </Grid>
                        <Grid sm={6} md={3} item>
                            <Typography paragraph>
                                <strong>Duração:</strong>
                                <br /> {atividade.duracao}
                            </Typography>
                        </Grid>
                        <Grid sm={6} md={3} item>
                            <Typography paragraph>
                                <strong>Conteúdo:</strong>
                                <br /> {separador(atividade.conteudo)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography style={{ marginBottom: 0 }} paragraph>
                        <strong>Assunto:</strong> {separador(atividade.assunto)}
                        .
                        <br />
                        <strong>Recursos didáticos:</strong>{' '}
                        {atividade.recursoDidatico}
                        .
                        <br />
                        <strong>Objetivos: </strong>
                        {' '}
                        {atividade.objetivo}


                        <br />
                        </Typography>
                  </div>
                <ExpansionPanel className="details">
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    />
                    <ExpansionPanelDetails>
                      
                            <div className="primary-info">
                                <strong>Comentários:</strong>
                                            {comentarios.map((coment) =>(
                                                
                                               Number(coment.idUser)===Number(iduser)?<div>
                                                   <br/>
                                                    <button  onClick={() => {
                                                        api.post(`/comentarios/delete?ID=${coment.id}`)
                                                        setInit(1);
                                                        dispatch(SagaActions.Success({ message: 'Comentario apagado', path: '/' }));
                                                         }
                                                         }  >  
                                                     excluir</button> <h5>{coment.usuario}  {coment.data} </h5><h4> {coment.conteudo}</h4> <Divider /></div>:(
                                            
                                            
                                            <div className="step-details">
                                      
                                        <div >
                                            <h5>{coment.usuario}  {coment.data} </h5><h4> {coment.conteudo}</h4>
                                            
                                           
                                            <br />
                                            <Divider />
                                        </div>
                                    </div>



                                            )))}
                            </div>

                           
                        
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div className="result-footer">
                    <div className="result-footer-item views">
                        <Visibility className="icon" />
                        <div style={{ fontWeight: 500 }} className="quantity">
                            {views}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid>
            
            <div className="steps">
           
            <Form
                
                onSubmit={handleSubmit}
            >
                <TextareaAutosize
                    rowsMin="10"
                    cols="135"
                    name="senha"
                    label="Senha"
                    variant="outlined"
                    onChange={comentando}
                />
                <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Comentar
                </Button>
            </Form>
            
            </div>
            
            </Grid>
            <Divider />
        </div>
    );
}