# The Game Object

The game object is the object that holds the engine, the current mapvar, and much more. The game can be manipulated from external scripts, and is also accessible through the `scripts` in a mapvar.

## Attributes
Your `game` object contains several attributes that can be modified. The following is a list of these attributes.

 - `start_time` - The timestamp that the map was loaded at. Commonly used to measure the time it took for a player to complete a map.
 - `alert_errors` - Somewhat self-explanatory. If the engine encounters an error, a browser `alert()` will be shown with the error message.
 - `log_info` - Wether or not to log into to the console.
 - `tile_size` - A dynamically manipulatable version of the same attribute in a mapvar.
 - `limit_viewport` - Confines the viewport to the bounds of the map.
 - `jump_switch` - An internal variable in the default jump (and jumphook) function to define when and how to jump.
 - `allow_special_jump` - Defines if you can use your special jump ability. Usually assigned to things like jumping in water to ensure that you can't jump at an insane speed.
 - `deathmsgs` - A legacy variable that was manipulated by settings and read by a `script`, it enabled or disabled death messages.
 - `checkpoint` - A legacy variable that marks if you have passed a checkpoint. You can see this used in a modern example in the `vanilla` example.
 - `legacy_map` - Defines if the map is a legacy map or not.
 - `viewport` - Defines the canvas viewport that the engine is rendering to.
 - `camera` - Defines the position of the camera.
 - `key` - Defines keypresses.
 - `current_lobby` - Defines the current multiplayer lobby. (Legacy)
 - `player` - Defines the player's location, velocity, jump state, grounded state, and colour.
 - `current_map` - Holds the current mapvar.
 - `last_tile` - An internal variable used to map the last rendered tile.
 - `fps` - The current FPS of the game
 - `delta_time` - The current delta time of the game (time in seconds between frames). You can use this in some interesting ways. For instance, if you want to animate an object moving at 100 pixels per second, you can use this formula to calculate the amount of movement required on a given frame: `game.delta_time * 100`.

## Functions
 - `Clarity()` - Constructs a new instance of the Clarity Engine.
 - `handle_lobby()` - A legacy function that handles setting the lobby after recieving it from the socket.io server.
 - `error(message)` - Throws an error.
 - `log(message)` - Logs a message.
 - `set_viewport(x, y)` - Sets the rendered canvas viewport.
 - `keydown(e)` - A function bound to the window onkeydown event.
 - `keyup(e)` - A function bound to the window onkeyup event.
 - `load_map(map)` - Loads a given map object - if using v2 maps, should be an instanciated `Mapvar()`.
 - `get_tile(x, y)` - Returns the tile at the specified location in the currently loaded map. Contains a full copy of the tile's data (texture, stats, etc.)
 - `draw_tile(x, y, tile, context)` - Internally used in the `draw()` function. Draws a given tile at the given location on the given canvas context.
 - `draw_map(context, fore)` - Draws the map on the given context, calls `draw_tile` repeatedly. `fore` is used as a recursive flag for whether or not this pass is drawing on the foreground - tiles with the `fore` attribute.
 - `move_player()` - Handles the physics of default player movement - gravity, friction, player input, delta_time adjustments, etc. Also handles embedded tile scripts.
 - `update_player()` - Sets velocity based on input, then calls `move_player`.
 - `draw_player(context)` - Draws the player on the given context, either with a typical cirle or with the player image.
 - `draw_other_player(context, x, y, username)` - Leftover from legacy multiplayer, draws another player with text above it specifying username.
 - `update()` - Literally just calculates deltatime, fps, and calls `update_player()`. If you need to hook some function into this, use the mapvar attribute `update_hook()`.
 - `draw(context)` - Calls `draw_map`, `draw_player`, `draw_other_player`, the current mapvar's `draw_hook`, and displays the current FPS in the top left corner of the screen.
 - `detectBelow(id)` - Returns `true` if the player is standing on the passed id, `false` otherwise. Assumes normal gravity - non-standard gravity could cause glitches.
 - `detectSides(id)` - returns an object like: `{result: true, side: "right"}` - `side` can be `right` or `left`, result is a boolean. Checks for the given id on the sides of the player's position, mostly used for the walljump block.
 - `isInside(id)` - Returns `true` if the player is currently inside the given id, `false` otherwise.
 - `getBelow()` - Returns the current tile object the player is standing on.
 - `isGroundSolid()` - Returns true if the ground is solid, false otherwise.
 
 ## Non-Game Functions
 General utility functions that you can call in your mapvar
 - `clamp(num, min, max)` - Clamps a value between the specified minimum and maximum.
 
