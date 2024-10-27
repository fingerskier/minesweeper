import React, { useState, useRef, useEffect } from 'react'
import { usePhaser } from '../lib/PhaserContext'

export default function Footer() {
  const fileInputRef = useRef()
  const { events } = usePhaser()
  const [isCollapsed, setIsCollapsed] = useState(true)
  
  
  const handleLoadGame = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const gameState = JSON.parse(await file.text());
      events.emit('load-game-state', gameState); // Emit loaded game state to Phaser
    }
  }
  
  
  const handleResetGame = () => {
    events.emit('reset-game')
  }
  
  
  const handleSaveGame = () => {
    console.log('saving game...')
    events.emit('get-game-state') // Trigger Phaser to get game state
  }
  
  
  useEffect(() => {
    const handleGameStateSave = (gameState) => {
      console.log('save game event')
      const gameStateJSON = JSON.stringify(gameState, null, 2)
      
      const blob = new Blob([gameStateJSON], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'minesweeper-game-state.json'
      link.click()
      
      URL.revokeObjectURL(url)
    }
    
    events.once('save-game-state', handleGameStateSave)
    
    
    return () => {
      events.off('save-game-state', handleGameStateSave)
    }
  }, [events]) // Only runs once on mount
  
  
  const triggerFileInput = () => {
    fileInputRef.current.click()
  }
  
  
  return (
    <footer className={isCollapsed ? 'collapsed' : 'expanded'}>
      <button className='toggle-button'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h1>
          Game
          {isCollapsed ? '▲' : '▼'}
          Info
        </h1>
      </button>
      
      {isCollapsed ? <>
        <div className="blurb left">short left status</div>
        <div className="blurb right">short right status</div>
      </> : (
        <div className="content">
          <div className="status">
            <p>Mines Remaining: 10</p>
            <p>Game Status: In Progress</p>
          </div>
          
          <div className="button-bar">
            <button onClick={handleResetGame}>Reset Game</button>
            <button onClick={handleSaveGame}>Save Game</button>
            
            <label>
              <input type="file"
                onChange={handleLoadGame}
                ref={fileInputRef}
                style={{ display: 'none' }} 
              />
              
              <button onClick={triggerFileInput}>Load Game</button>
            </label>
          </div>
        </div>
      )}
    </footer>
  )
}