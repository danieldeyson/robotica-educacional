/* eslint-disable react/jsx-one-expression-per-line */
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Form } from '@unform/web';
import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { TextField } from 'unform-material-ui';
import Atividade from '../components/Atividade';
import LeftMenu from '../components/LeftMenu';
import api from '../service/api';
import history from '../routes/history';
import '../styles/pages/Search.scss';




function ResponsiveDrawer() {
  if(localStorage.getItem("iduser")===null){
    history.push("/login");
  }

  const [index, setIndex] = useState(1);
  const [atividades, setAtividades] = useState([]);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusAtv, setStatusAtv] = useState('inicial');
  const categoria= localStorage.getItem('categoria');
 
  
 async function toggleAdvanced() {
 setAtividades([]);
    setIsAdvanced(!isAdvanced);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);


    }, 2000);
  }

  async function buscarDados() {

    await api.get(`/busca?busca=${selectedBusca.replace(/ /g,"")}&index=${index}`).then((response)=>{
    
  
      if(response.data[0]===null){
        response.data.shift()
              alert("Não encontramos atividades nesse conteúdo, mas veja esses?")
  
}
setAtividades(response.data)
    
    });
     
      setStatusAtv('busca');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }



  function separador(texto){

    return texto.replace(/[A-Z]/g, " $&").trim();
}
  
  const [conteudos, setConteudos] = useState([]);
  const [selectedBusca, setSelectedBusca] = useState('');
  const hcbusca = (event) => setSelectedBusca(event.target.value);

  const disciplines = ['Matemática'];
  const [selectedDisciplines, setSelectedDisciplines] = useState('');
  const hcDiscs = (event) => setSelectedDisciplines(event.target.value);

  const series = ['6º ano', '7º ano', '8º ano',"9º ano"];
  const [selectedSeries, setSelectedSeries] = useState();
  const hcSeries = (event) =>{
     setSelectedSeries(event.target.value);
       api.get(`/assuntos?serie=${event.target.value}`)
  .then((response) => {
    setAssuntos(response.data)
  });
}
  
  const [assuntos, setAssuntos] = useState([]);
  const [selectedConteudos, setSelectedConteudos] = useState();
  const hcConts = (event) =>{ setSelectedConteudos(event.target.value);
                     
    api.get(`/buscaAvancada?serie=${selectedSeries}&assunto=${selectedAssuntos}&conteudo=${event.target.value}&index=1`).then((response)=>{
      setAtividades(response.data)});
      setStatusAtv('avancado');
            }
  const [selectedAssuntos, setSelectedAssuntos] = useState();
  const hcAssunts = (event) => {
    setSelectedAssuntos(event.target.value)
    api.get(`/conteudos?serie=${selectedSeries}&assunto=${event.target.value}`).then((response)=>{
      setConteudos(response.data)});
    
      
                };

 useEffect (()=>{
  if (!atividades.length && isAdvanced===false){
    
     api
      .get(`/query?categoria=${categoria}&index=${index}`)
      .then((response) => {
        setAtividades(response.data)
      })
     
  }
 });
    
  function status(){

    if(statusAtv==='busca'){
      buscarDados();
    }
    if(statusAtv==='inicial'){
      setAtividades([]);
    }
    if(statusAtv==='avancado'){
      api.get(`/buscaAvancada?serie=${selectedSeries}&assunto=${selectedAssuntos}&conteudo=${selectedConteudos}&index=${index}`).then((response)=>{
        setAtividades(response.data)});
              }
    }



  



  const MyLoader = () => (
    
    <ContentLoader
      speed={2}
      width={900}
      height={250}
      viewBox="0 0 900 250"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="17" rx="3" ry="3" width="881" height="31" />
      <rect x="199" y="75" rx="3" ry="3" width="92" height="22" />
      <rect x="8" y="76" rx="3" ry="3" width="123" height="21" />
      <rect x="13" y="261" rx="3" ry="3" width="37" height="22" />
      <rect x="13" y="115" rx="3" ry="3" width="140" height="11" />
      <rect x="168" y="115" rx="3" ry="3" width="173" height="11" />
      <rect x="3" y="216" rx="0" ry="0" width="41" height="21" />
      <rect x="59" y="216" rx="0" ry="0" width="43" height="21" />
      <rect x="121" y="217" rx="0" ry="0" width="41" height="22" />
      <rect x="10" y="141" rx="0" ry="0" width="328" height="13" />
      <rect x="380" y="76" rx="0" ry="0" width="144" height="22" />
      <rect x="652" y="76" rx="0" ry="0" width="227" height="23" />
    </ContentLoader>
  );

  return (
    <div className="search-page">
      <CssBaseline />
      <LeftMenu />
      <main className="page-content">
        <Form onSubmit={() => {
          buscarDados();
        }}
        >
          <Grid container className="simple-search">
            <Grid item className="search-field" xs={12} sm={8}>
              <TextField
                size="small"
                className="textfield"
                name="search"
                value= {selectedBusca}
                onChange={hcbusca}
                label="Sua busca"
                variant="outlined"
              />
            </Grid>
            <Grid item className="search-field" xs={12} sm={4}>
              <Grid container style={{ width: '100%' }}>
                <Grid item class="search-search" xs={8} sm={8}>
                  <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onclick={buscarDados}
                  >
                    Buscar
                  </Button>
                </Grid>
                <Grid item class="search-advanced" xs={4} sm={4}>
                  <Button
                    className="submit"
                    variant="contained"
                    color="secundary"
                    onClick={() => toggleAdvanced()}
                  >
                    Avançado
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            { isAdvanced && (
              <div className="advanced-fields">
                <div className="disciplines">
                  <div className="advanced-section-name"> Disciplinas: </div>
                  <Select
                    name="discipline"
                    label="Disciplinas"
                    className="select-chips"
                    value={selectedDisciplines}
                    onChange={hcDiscs}
                    input={<Input  />}
                    renderValue={(value) => (
                      <div>
  
                          <Chip key={value} label={value} />
                        
                      </div>
                    )}
                  >{disciplines.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                  </Select>
                </div>
                <div className="disciplines">
                  <div className="advanced-section-name"> Série: </div>
                  <Select
                   
                    name="discipline"
                    label="Series"
                    className="select-chips"
                    value={selectedSeries}
                   
                    onChange={hcSeries}
                    
                    renderValue={(value) => (
                      <div>
  
                          <Chip key={value} label={value} />
                        
                      </div>
                    )}
                  >{series.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                  </Select>
                </div>
                <div className="disciplines">
                  <div className="advanced-section-name"> Assuntos: </div>
                  <Select
                    
                    name="discipline"
                    label="Assuntos"
                    className="select-chips"
                    value={selectedAssuntos}
                  
                    onChange={hcAssunts}
                  
                    renderValue={(value) => (
                      <div>
  
                          <Chip key={value} label={separador(value)} />
                        
                      </div>
                    )}
                  >{assuntos.map((name) => (
                    <MenuItem key={name} value={name}>
                      {separador(name)}
                    </MenuItem>
                  ))}
                  </Select>
                </div>
                <div className="disciplines">
                  <div className="advanced-section-name"> Conteudos: </div>
                  <Select
                    
                    name="discipline"
                    label="DContuedos"
                    className="select-chips"
                    value={selectedConteudos}
                    onChange={hcConts}
                    input={<Input id="select" />}
                    renderValue={(value) => (
                      <div>
  
                          <Chip key={value} label={separador(value)} />
                        
                      </div>
                    )}
                  >{conteudos.map((name) => (
                    <MenuItem key={name} value={name}>
                      {separador(name)}
                    </MenuItem>
                  ))}
                  </Select>
                </div>
              </div>
            ) }
          </Grid>
        </Form>
        <Divider />
        <Grid className="results" container>
          {!isLoading && (atividades).map((atv)=>(
           
            <Atividade atividade={atv} />
            
          ))}
          <div> <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => {

                    if(index>1){
                      
                      setIndex(index-1)
                      status();
                    };
                     
                    
                    }}
                  >
                    Anterior
                  </Button>
                  <Button
                    className="submit"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() =>{ 
                      if(atividades.length===10){
                       setIndex(index+1);
                    status()
                   }
                  }
                  }
                  >
                    Proximo
                  </Button>
            </div>
          {
              isLoading && (
              <div className="loading-examples">
                <div className="skeleton"><MyLoader /></div>
                <Divider />
                <div className="skeleton"><MyLoader /></div>
                <Divider />
                <div className="skeleton"><MyLoader /></div>
                <Divider />
                <div className="skeleton"><MyLoader /></div>
                <Divider />
                <div className="skeleton"><MyLoader /></div>
                <Divider />
                <div className="skeleton"><MyLoader /></div>
              </div>
              )
          }
        </Grid>
      </main>
    </div>
  );

    }

export default ResponsiveDrawer;
