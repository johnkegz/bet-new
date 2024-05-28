import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { I18nextProvider } from "react-i18next";
import './i18n';
import i18n from './i18n';

import {IntlProvider} from 'react-intl';
// import 'react-datetime-picker/dist/DateTimePicker.css';
// import 'react-calendar/dist/Calendar.css';
// import 'react-clock/dist/Clock.css';

// Get the locale from i18next
const locale = i18n.language;


ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <IntlProvider locale={locale}>
        <App />
      </IntlProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
