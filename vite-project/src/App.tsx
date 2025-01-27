import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import ExperimentPage from './components/ExperimentPage/ExperimentPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage onStart={() => {}} />} />
        <Route path="/experiment" element={<ExperimentPage />} />
      </Routes>
    </Router>
  );
};

export default App;