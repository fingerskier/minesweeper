import {useEffect} from 'react'
import Game from '../game/Main'
import Phaser from 'phaser'


export default function Main() {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800, // Width based on 10 cells * 32 pixels
      height: 600, // Height based on 10 cells * 32 pixels
      scene: [Game],
      parent: 'phaser-container', // Specify where to mount Phaser
    }
    
    const game = new Phaser.Game(config)
    
    
    return () => {
      game.destroy(true)
    }
  }, [])
  
  
  return <main>
    <div id="phaser-container">
      {/* Phaser game will mount here */}
    </div>
  </main>
}
