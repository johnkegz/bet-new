import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { I18nextProvider } from 'react-i18next'
//import './i18n'
//import i18n from './i18n'

test('renders learn react link', () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    document.getElementsByTagName('head')[0].appendChild(script)
    // render(
    //     <I18nextProvider i18n={i18n}>
    //         <App />
    //     </I18nextProvider>
    // )
})
