class TileNode {
  constructor(position, adjacent=[]) {
    this.position = position;
    this.adjacent = adjacent;
    this.visited = false;
    this.htmlNode = null;
  }
}

class TileGraph {
  constructor() {
    this.tileArray = [];
    this.colorStart = 'rgb(171, 127, 86)' // Hex: #ab7f56
    this.colorEnd = 'rgb(142, 180, 199)' // Hex: #8eb4c7
    this.tilesCount = 10000; // get correct # based on screen size
    this.columns = 100;
    this.rows = this.tilesCount / this.columns;
    this.wrapper = document.getElementById("wrapper");

    this.populateTiles()
    this.wrapper.addEventListener('click', this.handleClick.bind(this))
  }
  
  populateTiles() {
    for (let i = 0; i < this.rows; i++) {
      const tileRow = []
      for (let j = 0; j < this.columns; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.style.backgroundColor = this.colorStart;
        tile.setAttribute('data-key', `${i},${j}`);
        wrapper.appendChild(tile);
        tileRow.push(tile); 
      }
      this.tileArray.push(tileRow)
    }
  }
  
  handleClick(e) {
    const targetNodePosition = this.getPositionFromNode(e.target);
    console.log("targetNodePosition", targetNodePosition)
    this.cascade(targetNodePosition);
  }
  
  cascade(startNodePosition) {
    console.log('cascade start');
    console.log('startNodePosition', startNodePosition)
    const startNode = this.tileArray[startNodePosition[0]][startNodePosition[1]]
    console.log('startNode', startNodePosition)
    const queue = [startNode];
    while (queue.length) {
      let current = queue.shift();
      console.log('next node', current)
      setTimeout(() => {
        console.log("timer done")
        this.process(current);
        // Find neigbors and add to queue
        let neighbors = this.findNeighbors(current)
        console.log('neighbors found', neighbors)
        // queue.push(...neighbors)
        console.log(queue.length)
      }, 100);

    }
    console.log("all done")
  }
  
  process(node) {
    console.log("processing", node);
    console.log("background", node.style.backgroundColor);
    console.log("unvisited", this.isUnvisited(node));
    node.style.backgroundColor = this.colorEnd;
  }

  getPositionFromNode(node) {
    return node.dataset.key.split(",").map(key => Number(key))
  }

  findNeighbors(node) {
    const [row, col] = this.getPositionFromNode(node)
    const neighbors = []
    if (row > 0 && this.isUnvisited(this.tileArray[row-1][col])) {
      neighbors.push(this.tileArray[row-1][col])
    }
    if (col > 0 && this.isUnvisited(this.tileArray[row][col-1])) {
      neighbors.push(this.tileArray[row][col-1])
    }
    if (row < this.rows - 1 && this.isUnvisited(this.tileArray[row+1][col])) {
      neighbors.push(this.tileArray[row+1][col])
    }
    if (col < this.columns - 1 && this.isUnvisited(this.tileArray[row][col+1])) {
      neighbors.push(this.tileArray[row][col+1])
    }
    return neighbors;
  }

  isUnvisited(node) {
    return node.style.backgroundColor === this.colorStart;
  }
}

const tileGraph = new TileGraph();