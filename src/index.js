import React from 'react';
import ReactDOM from 'react-dom';

import DangerText from './DangerText';
import App from './app';

const title = 'React with Webpack and Babel';

ReactDOM.render(
  <>
    <App title={title} /> <DangerText text={'277jjhdfjjue'}></DangerText>
  </>,
  document.getElementById('app')
);

module.hot.accept();
