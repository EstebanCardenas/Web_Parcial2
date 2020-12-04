import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Frame from './components/Frame'
import {IntlProvider} from 'react-intl'
import esMessages from './locales/es.json'
import enMessages from './locales/en.json'

const lang = navigator.language
const langs = {
  "en": enMessages,
  "es": esMessages,
  "es-ES": esMessages
}
ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={lang} messages={langs[lang]}>
      <Frame />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
