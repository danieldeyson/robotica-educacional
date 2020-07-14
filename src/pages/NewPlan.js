import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';

import LeftMenu from '../components/LeftMenu';
import * as SagaActions from '../sagas/actions';

import '../styles/pages/NewPlan.scss';

export default function NewPlan() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    dispatch(SagaActions.Success('Criado com sucesso, veja o log com os dados'));
    console.log(e);
  }


  return (
    <div className="new-plan-page page">
      <CssBaseline />
      <LeftMenu />
      <main className="page-content">
        <Form onSubmit={handleSubmit}>
          <h2>Criação de plano de aula</h2>
          <TextField size="small" className="textfield" name="componentes" label="Componentes curriculares" variant="outlined" />
          <TextField size="small" className="textfield" name="objetivos" label="Objetivos" variant="outlined" />
          <TextField size="small" className="textfield" name="serie" label="Série" variant="outlined" />
          <TextField size="small" className="textfield" name="duracao" label="Duração" variant="outlined" />
          <TextField size="small" className="textfield" name="assunto" label="Assunto" variant="outlined" />
          <TextField size="small" className="textfield" name="conteudo" label="Conteúdo" variant="outlined" />
          <TextField size="small" className="textfield" name="atividade" label="Atividade" variant="outlined" />
          <TextField size="small" className="textfield" name="robos" label="Robos" variant="outlined" />
          <TextField size="small" className="textfield" name="programacao" label="Programação" variant="outlined" />
          <TextField size="small" className="textfield" name="recursos" label="Recursos didáticos" variant="outlined" />
          <TextField size="small" className="textfield" name="referencias" label="Referências" variant="outlined" />

          <Button
            className="submit"
            variant="contained"
            color="primary"
            type="submit"
          >
        Cadastrar o Plano
          </Button>
        </Form>
      </main>
    </div>
  );
}
