import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Container as CerebralController } from 'cerebral/react'
import { injectGlobal } from 'styled-components'

import controller from './controller'
import App from './components/App'

// Using styled-components to inject global styles
injectGlobal`
  html {
    background-color: #2B2C28;
    font-family: industry, sans-serif;
    font-style: normal;
    font-weight: 200;
  }
  * {
    box-sizing: border-box;
    &:focus { outline: none; }
    &:before, &:after { box-sizing: inherit; }
  }
  ::-ms-clear { display: none; }
  ::-ms-reveal { display: none; }

  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
`

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <CerebralController controller={controller}>
        <Component />
      </CerebralController>
    </AppContainer>,
    document.getElementsByTagName('main')[0]
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const App = require('./components/App').default // required to force the module to re-render properly
    render(App)
  })
}
