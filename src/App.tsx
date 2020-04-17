import React from 'react';

import { Button } from 'antd';
import logo from './logo.svg';

import './App.css';
import Feedback from './components/Feedback';
import FeedbackList from './components/FeedbackList';

function App() {
  return (
    <div className="App">
      <FeedbackList />
      <Feedback />
    </div>
  );
}

export default App;
