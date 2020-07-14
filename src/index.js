import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store';

//var express = require('express')
//var path = require('path')
//var serveStatic = require('serve-static')

//var app = express()
//app.use(serveStatic(path.join(__dirname, 'dist')))

//var port = process.env.PORT || 3000
//app.listen(port)
//console.log('server started ' + port)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
