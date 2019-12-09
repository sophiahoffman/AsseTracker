import React from 'react';
import ReactDOM from 'react-dom';
import AsseTracker from './AsseTracker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AsseTracker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
