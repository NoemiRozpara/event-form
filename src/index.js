import React from 'react';
import ReactDOM from 'react-dom';
import EventApp from './components/App';
import AppConfig from './appConfig.jsx';

ReactDOM.render(<EventApp loggedInId={AppConfig.loggedInId}/>, 
				document.getElementById('root'));
/* pass urls to sources (categories etc) if from external server */