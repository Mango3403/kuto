import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './style.css';
import Custom from './components/Custom';
import CustomForm from './components/CustomForm';
import CustomHelp from "./components/CustomHelp";

const App = () => (
    <Router>
        <div>
            <Route exact path='/custom' component={Custom}></Route>
            <Route path='/form' component={CustomForm} />
            <Route path='/help' component={CustomHelp} />
        </div>
    </Router>
);

export default App;
