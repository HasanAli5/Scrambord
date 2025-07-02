class Tile {
  constructor(xcoord, ycoord, DateRandom) {
    this.x = xcoord;
    this.y = ycoord;
    this.type = DateRandom.GetTileType(xcoord, ycoord);
  }
}

export default Tile;