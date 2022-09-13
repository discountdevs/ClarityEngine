# Mapvar Properities in the Clarity Engine

### Reminders
Every mapvar starts with textures. If your map does not have textures, you can skip this step. Textures are created by encoding a `png` image to base64, and creating a list like this:
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

### `tile_size`
This defines the tile size, in pixels, of a single tile in game space.

### `keys`
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
 - `colour` - The colour of the tile. Textures take precedence over this, so if your textures fail to load, this is a great backup.
 - `solid` - Defines if the block is solid. `1` is solid, `0` is not.
 - `bounce` - Defines the amount of bounciness the player experiences (on the Y axis only) on the block.
 - `img` - Defines the texture of the tile. Explained in detail at the top of this document.
 - `blockname` - A critical attribute: it defines the block name shown in the EditrV2. If no name is specified, it will not show the block.
 - 

### `JumpHook`
JumpHook hooks a function in the place of the default jump function. For instance, in the `vanilla` example, in order for the walljump block to function (tile ID `18`) a custom function is hooked to handle wall jumping. If you want to add your own custom functionality to the default jump function, you can also base your `JumpHook` function off of the following:
```js
this.player.vel.y -= this.current_map.movement_speed.jump;
this.player.can_jump = false;
```

