import React, { useState } from 'react';
import "./StartPage.css";
import { useNavigate } from 'react-router-dom';

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [hasAccepted, setHasAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!hasAccepted) {
      setErrorMessage('You must accept the terms to continue.');
      return;
    }

    setErrorMessage('');
    onStart();
    navigate("/experiment");
  };

  return (
    <div className="start-page">
      <h1>Welcome to Our Map Experiment</h1>
      <p>
        Thank you for participating in this study. Please note that this is a survey, 
        and we will store your responses for research purposes. By participating, you agree to this.
      </p>
      <p>
        As a thank-you, we will randomly select one participant to win a gift card. Please provide your 
        email below so we can contact you if you win.
      </p>
      
      <div className="form-group">
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
        />
      </div>
      
      <div className="form-group">
        <input
          type="checkbox"
          id="accept"
          checked={hasAccepted}
          onChange={() => setHasAccepted(!hasAccepted)}
        />
        <label htmlFor="accept">I accept that my data will be stored for research purposes.</label>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={handleStart} className="start-button">Start Experiment</button>
    </div>
  );
};

export default StartPage;