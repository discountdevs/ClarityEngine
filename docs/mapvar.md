# Mapvar Properities

### Reminders
Every mapvar starts with textures. If your map does not have textures, you can skip this step. Textures are not limited in resolution, but must be square. Textures are created by encoding a `png` image to base64, and creating a list like this:
```js
window.wallimg = new Image();
wallimg.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9j9PT0/M9AAWAEGcDDw0OWEV++fGEYNWA0DIZLOvD19f3PwcExwHmBLOuhmgCrKEex0FtLIQAAAABJRU5ErkJgggAA";

window.elevatorimg = new Image();
elevatorimg.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAG5JREFUOE9jbPJX/W+jwsdADjhy5xMD4+A2AOREEMDlRbxegGmGhQ02Q3AagK4ZlyFYDYBpfvD6C4OCKA9YLzIb2SVYDVhy/BlYU4ylFANyGCCLw1xEMBopCkSQLcPAAGwBh5xnCAYioQw2OAwAAKSneWF2TERPAAAAAElFTkSuQmCC";

// etc...
```
Then, you refrence those textures in your `keys` (tiles) section in your mapvar by adding the `img` attribute to each tile, refrencing as follows:
```js
img: wallimg
```

# Properities

 - ### `tile_size`

This defines the tile size, in pixels, of a single tile in game space.

 - ### `keys`

This defines the tiles in the game, in an `array` of `objects`. A tile is defined as follows:
```js
keys: [
    {
      id: 0,
      colour: "#555",
      solid: 1,
      bounce: 0.35,
      img: wallimg,
      blockname: "Wall"
    }
]
```
There are many sub-attributes that can be added to tiles. They are covered below.

#### Sub-Attributes in `keys`
  - `id` - The ID of the block. Starts at 0, increments by 1 at a time.
  - `colour` - The colour of the tile. Textures take precedence over this, so if your textures fail  to load, this is a great backup.
  - `solid` - Defines if the block is solid. `1` is solid, `0` is not.
  - `bounce` - Defines the amount of bounciness the player experiences (on the Y axis only) on the block.
  - `img` - Defines the texture of the tile. Explained in detail at the top of this document.
  - `blockname` - A critical attribute: it defines the block name shown in the EditrV2. If no name is specified, it will not show the block.
  - `fore` - A (broken) attribute that renders this tile in front of the player. Generally reccomended for transparent blocks that are non-solid.
  - `jump` - Defines if the player can infinitely jump inside the tile. Only works if `solid: 0`. Possible values: `0`, `1`.
  - `gravity` - Defines the gravity the player experiences inside the tile. This overrides the default gravity of the map. Once the player exits the tile, the map gravity is set back to the normal value. The gravity variable is structured in the exact same manner as the mapvar `gravity` property.
  - `friction` - Defines the friction of the player on top of tile. `0` is infinite friction (no movement) and anything above `3` is insane speed. The reccomended value for a slippery tile is `1.10`.
  - `interior_friction` - Defines the friction of the player while passing through the tile.
  - `script` - Defines the script in the `scripts` section of your mapvar to run when the player walks into this tile. Formatted as a string. Looks for a script of the same name in the `scripts` section and executes it.

 - ### `data`
This defines your map's data. It is an array of arrays, formatted like this:
```js
data:[[1,1,1,1,1],
		  [1,1,1,1,1],
		  [1,1,1,1,1],
		  [1,1,1,1,1],
		  [0,0,0,0,0]],
```

 - ### `gravity`
This defines your map's gravity. It is a formatted object like this:
```js
gravity: {
	x: 0.0,
	y: 0.3,
},
```
Keep in mind that in game space, the Y axis starts at `0` at the top of the screen, so 0.3 gravity on the Y axis would move the player down 0.3 blocks per gametick.

 - ### `vel_limit`
Defines the velocity limit in your map. Formatted similarly to `gravity`. It is reccomended that this is silightly under your tile size, as this avoids a glitch that allows the player to clip through tiles with enough speed.
```js
vel_limit: {
	x: 15.8,
	y: 15.8,
},
```

 - ### `movement_speed`
Defines the movement speed for the default movement system in the engine.
```js
movement_speed: {
	jump: 6,
	left: 0.3,
	right: 0.3,
},
```

 - ### `player`
Defines the player's spawn point and colour.
```js
player: {
		x: 1,
		y: 1,
		colour: "#FF6B00",
},
```

 - ### `scripts`
An object that defines the various scripts used in the `tiles` section. Formatted as follows:
```js
  scripts: {
    change_colour: function(){
		  game.player.colour = "#"+(Math.random()*0xFFFFFF<<0).toString(16);
	  },
  },
```

 - ### `jump_hook`
JumpHook hooks a function in the place of the default jump function. For instance, in the `vanilla` example, in order for the walljump block to function (tile ID `18`) a custom function is hooked to handle wall jumping. If you want to add your own custom functionality to the default jump function, you can also base your `jump_hook` function off of the following:
```js
this.player.vel.y -= this.current_map.movement_speed.jump;
this.player.can_jump = false;
```

 - ### `leftkey_hook`
`Leftkey_hook` hooks a function in place of the default left movement function. If this function is defined, then the default movement system's left movement will instead be replaced with your custom function. If you want to add custom functionality based on the pre-existing movement functions, the default script is below.
```js
if (this.player.vel.x > -this.current_map.vel_limit.x)
  this.player.vel.x -= this.current_map.movement_speed.left;
```

 - ### `rightkey_hook`
The same thing as `leftkey_hook`, except with the left key instead of the right key. As well as this, there is also a change in default movement script:
```js
if (this.player.vel.x < this.current_map.vel_limit.x)
  this.player.vel.x += this.current_map.movement_speed.right;
```

 - ### `draw_hook`
A hook that runs after the default `game.draw` function. It is passed the canvas `context`. Feel free to use this to draw on any additional features you need in the game.