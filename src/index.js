import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import i18n from "i18next";
import { initReactI18next , I18nextProvider } from "react-i18next";

import translationEN from './translations/translationEN.json';
import translationUA from './translations/translationUA.json';

const resources = {
    en: {
        translation: translationEN
    },  ua: {
        translation: translationUA
    },};

i18n
    // .use(detector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "ua",
        fallbackLng: "ua",
        keySeparator: ".", // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
         <App />
      </I18nextProvider>
  </React.StrictMode>
);
