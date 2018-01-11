import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Custom from '../containers/Custom';
import CustomForm from '../containers/CustomForm';
import CustomHelp from '../containers/CustomHelp';
import Test from '../containers/Test';

const CustomRouter = () => (
  <Router basename="/custom">
    <div style={{ height: '100%' }}>
      <Route path="/" exact component={Custom} />
      <Route path="/form" component={CustomForm} />
      <Route path="/help" component={CustomHelp} />
      <Route path="/test" component={Test} />
      {/* <Redirect to="/" /> */}
    </div>
  </Router>
);

export default CustomRouter;
