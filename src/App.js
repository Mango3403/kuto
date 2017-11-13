import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import Custom from './components/Custom';
import CustomForm from './components/CustomForm';
import CustomHelp from './components/CustomHelp';
import CustomQRCode from './components/CustomQRCode';

const App = () => (
    <Router basename="/custom">
        <div>
            <Route exact path="/main" component={Custom} />
            <Route exact path="/form" component={CustomForm} />
            <Route exact path="/help" component={CustomHelp} />
            <Route exact path="/" component={CustomQRCode} />
        </div>
    </Router>
);

export default App;
