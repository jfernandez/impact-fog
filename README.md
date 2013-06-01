# Fog of War
An [Impact.js](http://impactjs.com) plugin that draws a fog of war on top of your game canvas.

## Quick Setup
1. Copy `fog.js` to `lib/plugins/`
2. Require the plugin in main.js: `'plugins.fog'`
3. Create an instance of the Fog class:`this.fog = new Fog(mapWidth, mapHeight, tileSize)`
4. In your draw function, call:`this.fog.draw(this.viewedTileCallback)`
