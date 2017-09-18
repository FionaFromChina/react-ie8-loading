

/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

const React = require('react');
const ReactDOM = require('react-dom');

import Sample from './pages/sample';
import './scss/loading.scss';

ReactDOM.render(
    <Sample/>,
    document.getElementById('root')
);