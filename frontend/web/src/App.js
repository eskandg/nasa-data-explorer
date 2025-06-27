/**
 * @file Main application component for the NASA Data Explorer.
 * This component manages the overall layout and state for selecting and displaying
 * different NASA exploration options (e.g., APOD, Mars Rover).
 */

import './App.css';
import NasaExplorationOptions from './components/NasaExplorationOptions';
import { useState } from 'react';
import Explorer from './components/Explorer';

/**
 * The main App component.
 * Manages the state for which NASA exploration option is selected and whether the explorer is open.
 * @returns {JSX.Element} The main application UI.
 */
function App() {
  /**
   * State to hold the currently selected explorer option.
   * @type {[string|undefined, Function]}
   */
  const [explorerOptionSelected, setExplorerOptionSelected] = useState(undefined);
  
  /**
   * State to control the visibility of the Explorer component.
   * @type {[boolean, Function]}
   */
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  /**
   * Handles the opening of an explorer option.
   * Sets the selected option and opens the explorer.
   * @param {string} optionSelected - The name of the selected exploration option.
   */
  const handleExplorerOpen = (optionSelected) => {
    setExplorerOptionSelected(optionSelected);
    setIsExplorerOpen(true);
  };

  /**
   * Handles the closing of the Explorer component.
   * Resets the selected option and closes the explorer.
   */
  const handleExplorerClose = () => {
    setExplorerOptionSelected(undefined);
    setIsExplorerOpen(!isExplorerOpen);
  };

  return (
    <div className="App">
      <NasaExplorationOptions onClick={handleExplorerOpen} />
      <Explorer
        explorer={explorerOptionSelected}
        open={isExplorerOpen}
        onClose={handleExplorerClose}
      />
    </div>
  );
}

export default App;
