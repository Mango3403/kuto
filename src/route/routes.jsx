import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Kuto from '../pages/Kuto';
import KutoForm from '../pages/KutoForm';
import KutoHelp from '../pages/KutoHelp';

const KutoRouter = () => (
    <Router basename="/kuto">
        <div>
            <Route path="/" exact component={Kuto} />
            <Route path="/form" component={KutoForm} />
            <Route path="/help" component={KutoHelp} />
        </div>
    </Router>
);

export default KutoRouter;
