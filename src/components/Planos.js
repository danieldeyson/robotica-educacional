/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import { useParams } from 'react-router-dom'

import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import ThumbDown from '@material-ui/icons/ThumbDown';
// import ThumbUp from '@material-ui/icons/ThumbUp';
// import { TextField } from 'unform-material-ui';

import LeftMenu from '../components/LeftMenu';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/pages/Search.scss';
import api from '../service/api';



export default function Planos() {
    let { id } = useParams();
    const aulaNome=localStorage.getItem("aula")
    const aula={nome:aulaNome};
    const [atividade,setAtividade]=useState({}); 
    const [programacao, setProgramacao]=useState([]);
    const [pecas, setPecas]=useState([]);
    const [init,setInit]=useState(0);


    function imagem(texto){
        var tam=texto.length-7;
        return texto.substring(tam);

    }

    function separador(texto){

        return String(texto).replace(/[A-Z]/g, " $&").trim();
    }

    inicializer();
async function inicializer(){


    if(init===0){

   await api.post("/aula",aula).then((response)=>{

        setAtividade(response.data);
   
        api.get(`/programacao?atividade=${atividade.atividade}`)
            .then((response) => {
              setProgramacao(response.data)
            })
        
       if(atividade.robo){
        api
        .get(`/robos`)
        .then((response) => {
          setPecas(Array.from(new Set(response.data)))
        })

       } 
       
         })
         setInit(1);     
        }
    }
    
    return (

        <div className="about-page page">
        <CssBaseline />
        <LeftMenu />
        <main className="page-content">
        <div>
        <Grid className="search-result" item>
                <div className="primary-info">
                <h2 className="title">{separador(atividade.nome)}</h2>
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
           
                    <ExpansionPanelDetails>
                        <div className="details-content">
                            <Typography>
                                <strong>Atividade:</strong>{' '}
                                {separador(atividade.atividade)}
                                <br />
                                <strong>Descrição:</strong>{' '}
                                {atividade.descricao}
                                <br />
                            </Typography>

                            <div className="robos">
                                <strong>Robôs:</strong>
                                    <div className="robot-details">
                                        {separador(atividade.robo)}
                                        <br />
                                        <strong>Manual de Montagem:</strong>
                                     <h4> <a href={String(atividade.descricaoRobo).substring(68)} target="_blank" >{String(atividade.descricaoRobo).substring(68)} </a></h4>
                                        <br/>
                                        <strong>Peças</strong>
                                        <ul className="robot-pieces">
                                            {pecas.map((piece) => (
                                                <li className="piece">
                                                    <img
                                                        alt={`${piece.name} imagem`}
                                                        className="piece-image"
                                                        src={`https://imgur.com/${imagem(piece.descricao)}.jpg`}
                                                    />
                                                    <div className="piece-description">
                                                        {`${piece.quantidade}x`}{' '}
                                                        {`${piece.pecas} `}
                                                        <br />
                                                        {piece.descricao}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                             
                            </div>

                            <div className="steps">
                                <strong>Programação:</strong>
                                {programacao.map((step) => (
                                    <div className="step-details">
                                        <img
                                            alt={`${step.bloco} imagem`}
                                            className="piece-image"
                                            src={`https://imgur.com/${imagem(step.descript)}.jpg`}
                                        />
                                        <div className="step-name">
                                           
                                            <strong>Tarefa: </strong>
                                            {separador(step.tarefa)}
                                            <br />
                                            <strong>Quantidade: </strong>
                                            {step.quantidadePecas}
                                            <br />
                                            <strong>Descrição Tarefa: </strong>
                                            {step.descTarefa}
                                            <br/>
                                            <strong>Nome do Bloco: </strong>
                                            {separador(step.bloco)}
                                            <br />
                                            <strong>Descrição do Bloco: </strong>
                                            {step.descript}
                                            <br/>
                                           
                                            
                                        
                                        </div>
                                       
                                    </div>
                                ))}
                            </div>

                            <Typography>
                                <strong>Referência:</strong>{' '}
                                {atividade.referencia}
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
            </Grid>
            <Grid>
            
            <div className="steps">


           
            
            
            </div>
            
            </Grid>
        </div>
        
            <Divider />


        </main>
         </div>

        
    );
}
