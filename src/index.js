import React from 'react';
import ReactDOM from 'react-dom';
import 'material-components-web/dist/material-components-web.min.css';
import './index.css';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
