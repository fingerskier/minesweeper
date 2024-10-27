import {useEffect, useRef} from 'react'
import Game from '../game'
import Phaser from 'phaser'
import { usePhaser } from '../lib/PhaserContext'


export default function Main() {
  const { events } = usePhaser()
  const container = useRef()
  
  
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800, // Width based on 10 cells * 32 pixels
      height: 600, // Height based on 10 cells * 32 pixels
      scene: [Game],
      parent: container.current, // Specify where to mount Phaser
    }
    
    const game = new Phaser.Game(config)
    game.scene.start('MainScene', { events })
    
    
    return () => {
      game.destroy(true)
    }
  }, [events])
  
  
  return <main>
    <div id="phaser-container" ref={container}>
      {/* Phaser game will mount here */}
    </div>
  </main>
}
