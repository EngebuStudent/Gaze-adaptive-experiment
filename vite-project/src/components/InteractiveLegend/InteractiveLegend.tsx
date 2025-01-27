import React from 'react';
import './InteractiveLegend.css'; // Assuming shared styles for legends

const InteractiveLegend = () => {
  const legendItems = [
    { color: '#FF0000', label: 'Roads' },
    { color: '#00FF00', label: 'Forests' },
    { color: '#0000FF', label: 'Water Bodies' },
    { color: '#FFFF00', label: 'Buildings' },
  ];

  return (
    <div className="legend">
      <h3>Legend</h3>
      <ul>
        {legendItems.map((item, index) => (
          <li key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InteractiveLegend;