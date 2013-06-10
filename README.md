# Fog of War
An [Impact.js](http://impactjs.com) plugin that draws a fog of war on top of your game canvas. It uses direct calls to the Canvas 2D API and draws fog in vertical strokes to improve performance.

## Quick Setup
1. Copy `fog.js` to `lib/plugins/`
2. Require the plugin in main.js: `'plugins.fog'`
3. Create an instance of the Fog class:`this.fog = new ig.Fog(mapWidth, mapHeight, tileSize)`
4. Define a callback that answers if a tile has been viewed or not: `this.viewedTileCallback = function (x, y) { // }`
5. In your draw function, call:`this.fog.draw(this.viewedTileCallback)`

###Demo
http://leftaxe.com/

## Example Code
```
ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'plugins.fog'
)
.defines(function(){

FoggyGame = ig.Game.extend({
  // The height and width <in tiles> of the area to be covered by fog
  // You must also provide the tile size in pixels
  mapWidth: 45,
  mapHeight: 30,
  tileSize: 8,

  init: function() {
    this.fog = new ig.Fog(this.mapWidth, this.mapHeight, this.tileSize);
  },

  draw: function() {
    // To draw fog you must provide a callback function, see below
    this.fog.draw(this.viewedTile.bind(this));
  },

  // Replace with your own logic to determine if a tile at [x,y] has been viewed
  // A viewed tile is no longer covered by fog
  viewedTile: function(x, y) {
    return true;
  }
});

ig.main( '#canvas', FoggyGame);
});

```
