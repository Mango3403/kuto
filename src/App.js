import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import './App.css';
import Custom from './components/Custom';
import CustomForm from './components/CustomForm';
import CustomHelp from './components/CustomHelp';

const App = () => (
    <Router basename="/custom">
        <div>
            <Route path="/" exact component={Custom} />
            <Route path="/form" component={CustomForm} />
            <Route path="/help" component={CustomHelp} />
            {/* <Redirect to="/" /> */}
        </div>
    </Router>
);

export default App;
