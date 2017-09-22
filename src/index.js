import React from 'react';
import { render } from 'react-dom';
import './style.css';
import Custom from './components/Custom';
// import Ruler from './components/Ruler';

const MOUNT_NODE = document.getElementById('root');

render(<Custom />, MOUNT_NODE);
