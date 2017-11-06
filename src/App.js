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
    <Router basename="/KutoAdmin/Custom">
        <div>
            <Route path="/custom" component={Custom} />
            <Route exact path="/form" component={CustomForm} />
            <Route exact path="/help" component={CustomHelp} />
            <Route exact path="/qrcode" component={CustomQRCode} />
        </div>
    </Router>
);

export default App;
