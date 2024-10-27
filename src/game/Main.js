import Phaser from 'phaser'


class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MinesweeperScene' })
  }
  
  preload() {
    // Load any assets here if needed, e.g., tile images
  }
  
  create() {
    const gridSize = 10; // Size of grid (10x10)
    const cellSize = 32; // Size of each cell in pixels
    this.mines = this.generateMines(gridSize, 15); // 15 mines randomly placed
    
    // Draw grid
    this.grid = [];
    for (let y = 0; y < gridSize; y++) {
      this.grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        const cell = this.add.rectangle(
          x * cellSize,
          y * cellSize,
          cellSize - 2,
          cellSize - 2,
          0xdddddd
        ).setOrigin(0);
        cell.setInteractive();
        cell.on('pointerdown', () => this.handleCellClick(x, y));
        this.grid[y][x] = cell;
      }
    }
  }

  handleCellClick(x, y) {
    if (this.mines[y][x] === 1) {
      this.grid[y][x].setFillStyle(0xff0000); // Red color for a mine
      console.log('Boom! You hit a mine!');
      // Optionally: handle game over logic here
    } else {
      this.grid[y][x].setFillStyle(0xaaaaaa); // Gray color for a safe cell
      console.log('Safe cell');
      // Optionally: calculate adjacent mines and reveal more cells
    }
  }

  generateMines(gridSize, mineCount) {
    const mines = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    let placedMines = 0;

    while (placedMines < mineCount) {
      const x = Phaser.Math.Between(0, gridSize - 1);
      const y = Phaser.Math.Between(0, gridSize - 1);

      if (mines[y][x] === 0) {
        mines[y][x] = 1;
        placedMines++;
      }
    }
    
    return mines
  }
}


export default MainScene