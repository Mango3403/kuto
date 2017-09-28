import React from 'react';
import { render } from 'react-dom';
import './style.css';
import Custom from './components/Custom';

const MOUNT_NODE = document.getElementById('root');

render(<Custom />, MOUNT_NODE);
