import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './style.css';
import Custom from './components/Custom';

const Form = () => (
    <div>
        <h1>填写信息</h1>
        <a href="/">返回</a>        
    </div>
);

const App = () => (
    <Router>
        <div>
            <Route exact path='/' component={Custom}></Route>
            <Route path='/form' component={Form} />
        </div>
    </Router>
);

export default App;
