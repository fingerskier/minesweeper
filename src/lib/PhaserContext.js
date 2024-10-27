import React, { createContext, useContext, useState, useEffect } from 'react'
import EventEmitter from 'events'


const PhaserContext = createContext()


export const usePhaser = () => useContext(PhaserContext)


export function PhaserProvider({ children }) {
  const [gameState, setGameState] = useState({
    minesRemaining: 15,
    gameOver: false,
  })
  
  const events = new EventEmitter()
  
  useEffect(() => {
    // Event listeners for Phaser events
    events.on('game-over', (data) => {
      console.log(data.message)
      setGameState((prev) => ({ ...prev, gameOver: true }))
    })
    
    events.on('safe-click', ({ x, y }) => {
      console.log(`Safe click at (${x}, ${y})`)
      setGameState((prev) => ({
        ...prev,
        minesRemaining: prev.minesRemaining - 1,
      }))
    })
    
    // Clean up on component unmount
    return () => {
      events.removeAllListeners()
    }
  }, [])
  
  
  return (
    <PhaserContext.Provider value={{ gameState, setGameState, events }}>
      {children}
    </PhaserContext.Provider>
  )
}