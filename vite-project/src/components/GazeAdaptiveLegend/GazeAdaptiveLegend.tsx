import React, { useEffect, useRef, useState } from 'react';
import './GazeAdaptiveLegend.css';

interface GazeAdaptiveLegendProps {
  focusedItems: string[]; // Items currently in focus on the map
}

const GazeAdaptiveLegend: React.FC<GazeAdaptiveLegendProps> = ({ focusedItems }) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]); // Items shown in the legend
  const legendRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Update the legend to show only items that are focused on the map
    setVisibleItems(focusedItems);
  }, [focusedItems]);

  return (
    <div className="gaze-legend" ref={legendRef}>
      <h3>Legend</h3>
      {visibleItems.length > 0 ? (
        <ul>
          {visibleItems.map((item, index) => (
            <li key={index} className="legend-item">
              <span className={`legend-color ${item.toLowerCase()}`}></span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in focus</p>
      )}
    </div>
  );
};

export default GazeAdaptiveLegend;