import Phaser from 'phaser'


class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }
  
  init(data) {
    this.events = data.events
  }
  
  create() {
    this.createGameBoard()
    
    this.events.on('reset-game', this.resetGame, this)
    this.events.on('get-game-state', this.getGameState, this)
    this.events.on('load-game-state', this.loadGameState, this)
  }
  
  createGameBoard() {
    const gridSize = 10
    const cellSize = 32
    
    this.mines = this.generateMines(gridSize, 15)
    
    this.grid = []
    
    for (let y = 0; y < gridSize; y++) {
      this.grid[y] = []
      
      for (let x = 0; x < gridSize; x++) {
        const cell = this.add.rectangle(
          x * cellSize,
          y * cellSize,
          cellSize - 2,
          cellSize - 2,
          0xdddddd
        ).setOrigin(0)
        
        cell.setInteractive()
        cell.on('pointerdown', () => this.handleCellClick(x, y))
        
        this.grid[y][x] = cell
      }
    }
  }
  
  handleCellClick(x, y) {
    if (this.mines[y][x] === 1) {
      this.grid[y][x].setFillStyle(0xff0000) // Red color for a mine
      this.events.emit('game-over', { message: 'Boom! You hit a mine!' })
    } else {
      this.grid[y][x].setFillStyle(0xaaaaaa) // Gray color for a safe cell
      this.events.emit('safe-click', { x, y })
    }
  }
  
  
  loadGameState = (gameState) => {
    this.mines = gameState.mines
    
    gameState.gridState.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.grid[y][x].setFillStyle(cell.fillColor)
      })
    })
  }
  
  
  resetGame = () => {
    this.createGameBoard()
  }
  
  
  getGameState = () => {
    const gameState = {
      mines: this.mines,
      gridState: this.grid.map(row => row.map(cell => ({
        x: cell.x,
        y: cell.y,
        fillColor: cell.fillColor
      })))
    }
    
    this.events.emit('save-game-state', gameState)
  }
  
  generateMines(gridSize, mineCount) {
    const mines = Array.from({ length: gridSize }, () => Array(gridSize).fill(0))
    
    let placedMines = 0
    
    while (placedMines < mineCount) {
      const x = Phaser.Math.Between(0, gridSize - 1)
      const y = Phaser.Math.Between(0, gridSize - 1)
      
      if (mines[y][x] === 0) {
        mines[y][x] = 1
        placedMines++
      }
    }
    
    return mines
  }
}


export default MainScene;