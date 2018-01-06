import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import '../static/css/App.css';
import Custom from '../containers/Custom';
import CustomForm from '../containers/CustomForm';
import CustomHelp from '../containers/CustomHelp';

const CustomRouter = () => (
  <Router basename="/custom">
    <div>
      <Route path="/" exact component={Custom} />
      <Route path="/form" component={CustomForm} />
      <Route path="/help" component={CustomHelp} />
      {/* <Redirect to="/" /> */}
    </div>
  </Router>
);

export default CustomRouter;
