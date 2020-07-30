import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import LeftMenu from '../components/LeftMenu';

export default function About() {
  return (
    <div className="about-page page">
      <CssBaseline />
      <LeftMenu />
      <main className="page-content">
        <h2 className="title">Sobre o SCIENCE</h2>
        Essa ferramenta tem como objetivo de aplicar a matemática com a robótica educacional.
        <br />
        <br />
        Todos os conteúdos da ferramenta SCIENCE foram baseado na BNCC.
        <br />
        <br />
        Conteúdos da BNCC - Base Nacional Comum Curricular
        <br />
        <br />
        <a href="https://drive.google.com/file/d/1r_kakZsfvm5WCBBpuiS2PKirBUGJJJDm/view?usp=sharing" target="_blank"> Conteúdo do 6º Ano do Ensino Fundamental</a>
        <br />
        <br />
        <a href="https://drive.google.com/file/d/1CrNqKO_Ae96u6M0ITo5qp8GeFls5078R/view?usp=sharing" target="_blank"> Conteúdo do 7º Ano do Ensino Fundamental</a>
        <br />
        <br />
        <a href="https://drive.google.com/file/d/1V5GRCYyT0BYWmT61ObFxaiTGFOZnxIbg/view?usp=sharing" target="_blank"> Conteúdo do 8º Ano do Ensino Fundamental</a>
        <br />
        <br />
        <a href="https://drive.google.com/file/d/128AJwB23F4tLH5HUNu6Xrw07nfkmYn1O/view?usp=sharing" target="_blank">Conteúdo do 9º Ano do Ensino Fundamental</a>
        <br />
      
        <br />
      </main>

    </div>
  );
}
