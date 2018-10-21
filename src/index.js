import React from 'react';
import ReactDOM from 'react-dom';
import EventApp from './components/App';
import AppState from './appState.jsx';

ReactDOM.render(<EventApp apiUrl={AppState.state.apiUrl}/>, document.getElementById('root'));