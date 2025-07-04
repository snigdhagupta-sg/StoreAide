import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { loadMap } from "../../services/mapLoader";
import "./OfflineStore.css";

const START = { x: 0, y: 0 };
const CELL_SIZE = 60;

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function aStar(start, goal, layoutGrid) {
  const queue = [{ node: start, cost: 0, path: [start] }];
  const visited = new Set();

  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift();

    if (current.node.x === goal.x && current.node.y === goal.y) {
      return current.path;
    }

    if (!visited.has(`${current.node.x}_${current.node.y}`)) {
      visited.add(`${current.node.x}_${current.node.y}`);
      const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
      ];
      for (const dir of directions) {
        const next = {
          x: current.node.x + dir.x,
          y: current.node.y + dir.y
        };
        if (
          next.x >= 0 && next.y >= 0 && next.y < layoutGrid.length && next.x < layoutGrid[0].length &&
          layoutGrid[next.y][next.x] === 0
        ) {
          queue.push({
            node: next,
            cost: current.cost + heuristic(current.node, next),
            path: [...current.path, next]
          });
        }
      }
    }
  }
  return [];
}

export default function OfflineStore() {
  const [selectedCity, setSelectedCity] = useState("mumbai");
  const [mapData, setMapData] = useState(null);
  const [target, setTarget] = useState(null);
  const [searchParams] = useSearchParams();
  const availableCities = ["mumbai", "delhi"];

  const searchQuery = searchParams.get('search') || "";

  useEffect(() => {
    async function fetchMap() {
      console.log("Loading map for city:", selectedCity);
      const data = await loadMap(selectedCity);
      console.log("Map data loaded:", data);
      setMapData(data);
      setTarget(null);
    }
    fetchMap();
  }, [selectedCity]);

  useEffect(() => {
    if (mapData && searchQuery) {
      handleSearch();
    }
  }, [mapData, searchQuery]);

  const path = useMemo(() => {
    if (!mapData || !target) return [];
    return aStar(START, target, mapData.layoutGrid);
  }, [mapData, target]);

  const handleSearch = () => {
    if (!mapData || !searchQuery) return;
    const item = mapData.items.find((i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (item) {
      setTarget(item.position);
    } else {
      const otherCity = availableCities.find(city => city !== selectedCity);
      if (otherCity) {
        setSelectedCity(otherCity);
      }
    }
  };
  
  if (!mapData) return <div className="loading">Loading store map...</div>;

  const layoutGrid = mapData.layoutGrid;
  
  if (!layoutGrid || layoutGrid.length === 0) {
    return <div className="loading">Map data is invalid...</div>;
  }

  return (
    <div className="offline-store-page">
      <div className="page-header">
        <h1>Offline Store Map</h1>
        <p>Find items in different stores</p>
      </div>

      <div className="store-map-container">
        <div className="content-layout">
          <div className="left-panel">
            <div className="store-map-controls">
              <div className="control-group">
                <label>Select Store Location:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setTarget(null);
                  }}
                  className="city-select"
                >
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city.charAt(0).toUpperCase() + city.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="instructions">
              <h3>How to use:</h3>
              <ul>
                <li>Use the main search bar at the top to search for items</li>
                <li>Select your store location from the dropdown if needed</li>
                <li>Click directly on the map to set a target location</li>
                <li>The blue path shows the route from entrance to your target</li>
                <li>Red dot indicates your target destination</li>
              </ul>
            </div>
          </div>

          <div className="right-panel">
            <h2 className="store-map-header">{selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} Store</h2>
            <div className="map-legend">
              <h3>Map Legend:</h3>
              <div className="legend-items-container">
                <div className="legend-item">
                  <div className="legend-color start-point"></div>
                  <span>Entrance</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color path-point"></div>
                  <span>Path to Item</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color target-point"></div>
                  <span>Target Item</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color shelf"></div>
                  <span>Shelves/Aisles</span>
                </div>
              </div>
            </div>
            <div className="map-container">
              <svg
                className="store-map-svg"
                viewBox={`0 0 ${layoutGrid[0].length * CELL_SIZE} ${layoutGrid.length * CELL_SIZE}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const clickY = e.clientY - rect.top;

                  const gridX = Math.floor((clickX / rect.width) * layoutGrid[0].length);
                  const gridY = Math.floor((clickY / rect.height) * layoutGrid.length);

                  if (layoutGrid[gridY] && layoutGrid[gridY][gridX] === 0) {
                    setTarget({ x: gridX, y: gridY });
                  }
                }}
              >
                {/* ...existing code... */}
                {layoutGrid.map((row, y) =>
                  row.map((cell, x) => (
                    <rect
                      key={`${x}_${y}`}
                      x={x * CELL_SIZE}
                      y={y * CELL_SIZE}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      fill={cell === 1 ? "#6c757d" : "#ffffff"}
                      stroke="#ccc"
                      strokeWidth="1"
                    />
                  ))
                )}

                {mapData.items.map((item) => (
                  <g key={item.name}>
                    <text
                      x={item.position.x * CELL_SIZE + CELL_SIZE / 2}
                      y={item.position.y * CELL_SIZE + CELL_SIZE / 2}
                      fontSize="8"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#333"
                      className="item-label"
                      style={{
                        wordSpacing: "-2px",
                        letterSpacing: "-0.5px"
                      }}
                    >
                      {item.name.length > 12 ? item.name.substring(0, 10) + "..." : item.name}
                    </text>
                  </g>
                ))}

                {path.map((pos, i) => (
                  <circle
                    key={i}
                    cx={pos.x * CELL_SIZE + CELL_SIZE / 2}
                    cy={pos.y * CELL_SIZE + CELL_SIZE / 2}
                    r={8}
                    fill={i === path.length - 1 ? "#dc3545" : "#0071ce"}
                    stroke="#fff"
                    strokeWidth={2}
                    className="path-point"
                  />
                ))}

                {/* START point highlight */}
                <rect
                  x={START.x * CELL_SIZE}
                  y={START.y * CELL_SIZE}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  fill="#17a2b8"
                  stroke="#138496"
                  strokeWidth={3}
                />
                <text
                  x={START.x * CELL_SIZE + CELL_SIZE / 2}
                  y={START.y * CELL_SIZE + CELL_SIZE / 2 + 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#fff"
                >
                  START
                </text>

                {target && (
                  <text
                    x={target.x * CELL_SIZE + CELL_SIZE / 2}
                    y={target.y * CELL_SIZE + CELL_SIZE / 2 + 5}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#fff"
                  >
                    TARGET
                  </text>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
