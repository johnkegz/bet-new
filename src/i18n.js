import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-http-backend'

import commonEn from './assets/locales/en.json';
import commonId from './assets/locales/id.json';
import commonPt from './assets/locales/pt.json';
import commonFr from './assets/locales/fr.json';
import commonDe from './assets/locales/de.json';
import commonSw from './assets/locales/sw.json';
import commonHr from './assets/locales/hr.json';
import commonEs from './assets/locales/es.json';

const resources = {
    en: { translations: commonEn },
    id: { translations: commonId },
    pt: { translations: commonPt },
    fr: { translations: commonFr },
    de: { translations: commonDe },
    sw: { translations: commonSw },
    hr: { translations: commonHr },
    es: { translations: commonEs }
};

const options = {
    order: ['querystring', 'navigator'],
    lookupQuerystring: 'lng',
}

i18n.use(XHR)
    .use(LanguageDetector)
    .init({
        detection: options,
        resources,
        ns: ['translations'],
        defaultNS: 'translations',
        fallbackLng: 'en',
        supportedLngs: ['en', 'id', 'pt', 'fr', 'de', 'sw', 'hr', 'es'],
        interpolation: {
            escapeValue: false,
        },
        debug: false,
    })

export default i18n