import { useState } from 'react';
import MapComponent from '../MapComponent/MapComponent'; // Import the map component
import './ExperimentPage.css'; // Import the styles

const ExperimentPage = () => {
  // State to track the current question index
  const [hasStarted, setHasStarted] = useState(false);

  // Function to start the experiment
  const handleStartExperiment = () => {
    setHasStarted(true);
  };

  return (
    <div className="experiment-page">
      {!hasStarted ? (
        <div className="instructions-container">
          <h1>Welcome to the Map Experiment</h1>
          <p>
            In this experiment, you will answer questions about maps. Some maps will have interactive
            legends, and others will have gaze-adaptive legends.
          </p>
          <p>
            Your responses will be stored anonymously. As a token of appreciation, one participant will
            win a gift card.
          </p>
          <button onClick={handleStartExperiment} className="start-button">
            Start Experiment
          </button>
        </div>
      ) : (
        <div className="experiment-container">
          {/* The map component */}
          <MapComponent />
        </div>
      )}
    </div>
  );
};

export default ExperimentPage;