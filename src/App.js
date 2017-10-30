import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    HashRouter
} from 'react-router-dom';
import './style.css';
import Custom from './components/Custom';
import CustomForm from './components/CustomForm';
import CustomHelp from './components/CustomHelp';

const App = () => (
    <Router>
        <div>
            <Route path='/Kuto/Index/custom' component={Custom} />
            <Route path='/Kuto/Index/form' component={CustomForm} />
            <Route path='/Kuto/Index/help' component={CustomHelp} />
        </div>
    </Router>
);

export default App;
