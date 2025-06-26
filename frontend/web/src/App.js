import './App.css';
import NasaExplorationOptions from './components/NasaExplorationOptions';
import { useState } from 'react';
import Explorer from './components/Explorer';

function App() {
  const [explorerOptionSelected, setExplorerOptionSelected] = useState(undefined)
  const [isExplorerOpen, setIsExplorerOpen] = useState(false)

  const handleExplorerOpen = (optionSelected) => {
    setExplorerOptionSelected(optionSelected)
    setIsExplorerOpen(true)
  }

  const handleExplorerClose = () => {
    setExplorerOptionSelected(undefined)
    setIsExplorerOpen(!isExplorerOpen)
  }

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
