ig.module(
  'plugins.fog'
)
.requires(
  'impact.impact'
)
.defines(function() {
  Fog = ig.Class.extend({

    // The fog color, defaults to black
    fillStyle: 'rgba(0, 0, 0, 1)',

    init: function(mapWidth, mapHeight, tileSize) {
      this.mapWidth = mapWidth;
      this.mapHeight = mapHeight;
      this.tileSize = tileSize;
    },

    draw: function(viewedTileCallback) {
      var fogColumns = [];
      var column = null;

      for (var x = 0; x < this.mapWidth; x++) {
        for (var y = 0; y < this.mapHeight; y++) {
          if(column === null) {
            column = { x: x, y: y, tiles: 0 };
          }

          if (viewedTileCallback(x, y)) {
            if(column.tiles > 0) {
              fogColumns.push(column);
            }
            column = null;
          } else if ((y + 1) === this.mapHeight) {
            column.tiles++;
            fogColumns.push(column);
            column = null;
          } else {
            column.tiles++;
          }
        }
      }

      for (var i = 0; i < fogColumns.length; i++) {
        var col = fogColumns[i];
        this._drawColumn(col.x, col.y, col.tiles);
      }
    },

    _drawColumn: function(x, y, tiles) {
      ig.system.context.fillStyle = this.fillStyle;
      ig.system.context.fillRect(this._realSize(x), this._realSize(y), this._realSize(1), this._realSize(tiles));
    },

    _realSize: function(number) {
      return number * this.tileSize * ig.system.scale;
    }

  });
});