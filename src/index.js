import React from 'react';
import ReactDOM from 'react-dom';
import EventApp from './components/App';
import AppConfig from './appConfig.jsx';

ReactDOM.render(<EventApp apiUrl={AppConfig.apiUrl} 
						  translationFile={AppConfig.translationFile} 
						  loggedInId={AppConfig.loggedInId}/>, 
				document.getElementById('root'));