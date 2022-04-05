class TileGraph {
  constructor() {
    this.tileArray = [];
    this.colorStart = "rgb(171, 127, 86)"; // hex: #ab7f56
    this.colorEnd = "rgb(142, 180, 199)"; // hex: #8eb4c7
    this.tilesCount = 10000; // get correct # based on screen size
    this.columns = 100;
    this.rows = this.tilesCount / this.columns;
    this.wrapper = document.getElementById("wrapper");

    this.populateTiles();
    this.clickListner = this.wrapper.addEventListener("click", this.handleClick.bind(this));
  }

  populateTiles() {
    for (let i = 0; i < this.rows; i++) {
      const tileRow = [];
      for (let j = 0; j < this.columns; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.style.backgroundColor = this.colorStart;
        tile.setAttribute("data-key", `${i},${j}`);
        this.wrapper.appendChild(tile);
        tileRow.push(tile);
      }
      this.tileArray.push(tileRow);
    }
  }

  handleClick(e) {
    this.cascade(e.target);
    // Remove click listener
  }

  async cascade(startNode) {
    console.log("cascade start");
    console.log("startNode", startNode);
    const queue = [startNode];
    let depthNodes = 1
    while (queue.length) {
      depthNodes--;
      let current = queue.shift();
      console.log("next node", current);
      let neighbors = this.findNeighbors(current);
      console.log("neighbors found", neighbors);
      neighbors.forEach(node => queue.push(node))
      console.log('queue length', queue.length);
      this.process(current);
      if (depthNodes === 0) {
        depthNodes = queue.length;
        await this.timeout(10)
      }
    }
    console.log("all done");
    this.wrapper.classList.add('wrapper-background')
  }

  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  process(node) {
    console.log("processing", node);
    console.log("unvisited", this.isUnvisited(node));
    node.style.backgroundColor = this.colorEnd;
  }

  getPositionFromNode(node) {
    return node.dataset.key.split(",").map((key) => Number(key));
  }

  findNeighbors(node) {
    const [row, col] = this.getPositionFromNode(node);
    const neighbors = [];
    if (row > 0 && this.isUnvisited(this.tileArray[row - 1][col])) {
      this.tileArray[row - 1][col].setAttribute("data-queue", `true`);
      neighbors.push(this.tileArray[row - 1][col]);
    }
    if (col > 0 && this.isUnvisited(this.tileArray[row][col - 1])) {
      this.tileArray[row][col - 1].setAttribute("data-queue", `true`);
      neighbors.push(this.tileArray[row][col - 1]);
    }
    if (row < this.rows - 1 && this.isUnvisited(this.tileArray[row + 1][col])) {
      this.tileArray[row + 1][col].setAttribute("data-queue", `true`);
      neighbors.push(this.tileArray[row + 1][col]);
    }
    if (
      col < this.columns - 1 &&
      this.isUnvisited(this.tileArray[row][col + 1])
    ) {
      this.tileArray[row][col + 1].setAttribute("data-queue", `true`);
      neighbors.push(this.tileArray[row][col + 1]);
    }
    // Randomize order of neighbors to vary shape of expansion
    return neighbors;
  }

  isUnvisited(node) {
    return node.style.backgroundColor === this.colorStart && !node.dataset.queue;
  }
}

new TileGraph();
