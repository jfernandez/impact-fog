# Fog of War
An [Impact.js](http://impactjs.com) plugin that draws a fog of war on top of your game canvas. It uses direct calls to the Canvas 2D API and draws fog in vertical strokes to improve performance.

## Quick Setup
1. Copy `fog.js` to `lib/plugins/`
2. Require the plugin in main.js: `'plugins.fog'`
3. Create an instance of the Fog class:`this.fog = new Fog(mapWidth, mapHeight, tileSize)`
4. In your draw function, call:`this.fog.draw(this.viewedTileCallback)`

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
  mapWidth: 45,
  mapHeight: 30,
  tileSize: 8,

  init: function() {
    this.fog = new Fog(this.mapWidth, this.mapHeight, this.tileSize);
  },

  draw: function() {
    // The draw function takes a callback function
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
