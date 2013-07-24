ig.module(
  'plugins.fog'
)
.requires(
  'impact.impact'
)
.defines(function() {

ig.Fog = ig.Class.extend({

  // The fog color, defaults to black
  fillStyle: 'rgba(0, 0, 0, 1)',

  init: function (mapWidth, mapHeight, tileSize) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.tileSize = tileSize;
  },

  draw: function (viewedTileCallback) {
    var fogColumns = [];
    var column = null;

    // Iterate through each tile in our grid
    // One column at a time, from left to right
    for (var x = 0; x < this.mapWidth; x++) {
      for (var y = 0; y < this.mapHeight; y++) {
        if (!column) {
          column = { x: x, y: y, tiles: 0 };
        }

        if (viewedTileCallback(x, y)) {
          // We've run into a viewed tile
          // Snip this fog column and store it in our buffer
          if (column.tiles > 0) {
            fogColumns.push(column);
          }
          column = null;
        } else if ((y + 1) === this.mapHeight) {
          // We've reached the end of the column
          // Store it and start a new one
          column.tiles++;
          fogColumns.push(column);
          column = null;
        } else {
          // The fog column grows
          column.tiles++;
        }
      }
    }

    for (var i = 0; i < fogColumns.length; i++) {
      var col = fogColumns[i];
      this._drawColumn(col.x, col.y, col.tiles);
    }
  },

  // Draws a vertical strip of fog using the 2D Canvas API
  _drawColumn: function (x, y, tiles) {
    ig.system.context.fillStyle = this.fillStyle;
    ig.system.context.fillRect(this._realSize(x), this._realSize(y), this._realSize(1), this._realSize(tiles));
    ig.Image.drawCount++;
  },

  // Converts a location in our tile grid to the actual location in the game canvas
  _realSize: function (number) {
    return number * this.tileSize * ig.system.scale;
  }

});

});