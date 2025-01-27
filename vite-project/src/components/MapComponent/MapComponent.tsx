import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import InteractiveLegend from '../InteractiveLegend/InteractiveLegend'; // Import Interactive Legend
import GazeAdaptiveLegend from '../GazeAdaptiveLegend/GazeAdaptiveLegend'; // Import Gaze Adaptive Legend
import geojsonData1 from '../../geojsonData1.json';
import geojsonData2 from '../../geojsonData2.json';
import './MapComponent.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZW5nZWJ1IiwiYSI6ImNtNjdxMXAzNDA2Y2cybHFyNGhrMTF2YnkifQ.DcwWQUsgvhamt4joNWKfyQ'; // Replace with your Mapbox token

type LegendType = 'interactive' | 'gaze-adaptive';

interface Question {
  id: number;
  geojson: any;
  legendType: LegendType;
  questionText: string;
}

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Initialize the questions
    const questions: Question[] = [
      { id: 1, geojson: geojsonData1, legendType: 'interactive', questionText: 'What is the closest lake?' },
      { id: 2, geojson: geojsonData2, legendType: 'gaze-adaptive', questionText: 'What is the largest mountain?' },
    ];

    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setRemainingQuestions(shuffledQuestions);
    setCurrentQuestion(shuffledQuestions[0]);
  }, []);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [8.005, 58.146], // Center on Kristiansand
        zoom: 12,
      });

      map.current.on('load', () => {
        if (currentQuestion) {
          loadGeoJSON(currentQuestion.geojson);
        }
      });
    } else if (currentQuestion && map.current) {
      // Update the GeoJSON layer when the question changes
      loadGeoJSON(currentQuestion.geojson);
    }
  }, [currentQuestion]);

  const loadGeoJSON = (geojson: any) => {
    if (map.current?.getSource('question-data')) {
      (map.current.getSource('question-data') as mapboxgl.GeoJSONSource).setData(geojson);
    } else {
      map.current?.addSource('question-data', {
        type: 'geojson',
        data: geojson,
      });

      map.current?.addLayer({
        id: 'question-layer',
        type: 'fill',
        source: 'question-data',
        paint: {
          'fill-color': '#888',
          'fill-opacity': 0.5,
        },
      });
    }
  };

  const handleNextQuestion = () => {
    if (remainingQuestions.length > 1) {
      const nextQuestions = remainingQuestions.slice(1);
      setRemainingQuestions(nextQuestions);
      setCurrentQuestion(nextQuestions[0]);
    } else {
      alert('Thank you for completing the experiment!');
    }
  };

  return (
    <div className="experiment-container">
      <div className="map-wrapper">
        <div ref={mapContainer} className="map-container" />
        {/* Render the appropriate legend */}
        {currentQuestion?.legendType === 'interactive' && <InteractiveLegend />}
        {currentQuestion?.legendType === 'gaze-adaptive' && <GazeAdaptiveLegend />}
      </div>
      <div className="answer-section">
        <h3>{currentQuestion?.questionText}</h3>
        <button onClick={handleNextQuestion}>Submit Answer</button>
      </div>
    </div>
  );
};

export default MapComponent;