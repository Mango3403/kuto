import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './style.css';
import Custom from './components/Custom';
import CustomForm from './components/CustomForm';
import CustomHelp from './components/CustomHelp';

const Start = () => (
    <div>
        <Link to='/Kuto'>
            <h1>进入酷图</h1>
        </Link>
    </div>
);

const Main = () => (
    <div>
        <Link to='/Kuto/Index/custom'>
            <h1>开始定制</h1>
        </Link>
    </div>
);

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Start} />
            <Route exact path="/Kuto" component={Main} />
            <Route exact path="/Kuto/Index" component={Main} />
            <Route exact path="/Kuto/Index/custom" component={Custom} />
            <Route exact path="/Kuto/Index/form" component={CustomForm} />
            <Route exact path="/Kuto/Index/help" component={CustomHelp} />
        </div>
    </Router>
);

export default App;
