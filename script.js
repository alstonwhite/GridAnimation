class TileGraph {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.findNode = this.findNode.bind(this);
    this.cascade = this.cascade.bind(this);
    this.process = this.process.bind(this);

    this.colorStart = '#ab7f56';
    this.colorEnd = '#8eb4c7';
    this.tilesCount = 10000; // get correct # based on screen size
    this.columns = 100;
    this.rows = this.tilesCount / this.columns;
    this.wrapper = document.getElementById("wrapper");
    
    // Populate TileGraph -- move to method
    // Create tiles in arrays of length (# columns)
    // Map tiles by value in hash table for quick lookup?
    for (let i = 0; i < this.tilesCount; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.backgroundColor = this.colorStart;
      wrapper.appendChild(tile);
    }
    this.wrapper.addEventListener('click', this.handleClick)
  }
  handleClick(e) {
    console.log("handle click")
    const targetNode = this.findNode(e.target.value);
    this.cascade(targetNode);
  }
  findNode(value) {
    // Find the node 
  }
  cascade(startNode) {
    console.log('cascade start')
    console.log(startNode)
    // startNode.visited = true;
    // const queue = [startNode];
    // while (queue.length) {
    //   let current = queue.shift();
    //   this.process(current);
    //   setTimeout(() => this.process(current), 100);
    //   current.adjacent.forEach(sibling => {
    //     if (!sibling.visited) queue.push(subling);
    //   })
    // }
  }
  process(node) {
    console.log(node.color);
    tile.style.backgroundColor = this.colorEnd;
  }
}

class TileNode {
  constructor(color, adjacent=[]) {
    this.color = color;
    this.adjacent = adjacent;
  }
}

const tileGraph = new TileGraph();

// class for tile, as a graph
// breadth first search for color changing

// tiles start with random color, then fade into #8eb4c7 for site background?
