import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import ExperimentPage from './pages/ExperimentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/experiment" element={<ExperimentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
