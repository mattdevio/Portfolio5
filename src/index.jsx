import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import {
  App,
} from './components'
import './index.css'

ReactDOM.render(
  <Router>
    <App name='This Is My Component' />
  </Router>,
  document.getElementById('root'),
)
