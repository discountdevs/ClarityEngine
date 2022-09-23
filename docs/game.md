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

## Functions
 - `Clarity()` - Constructs a new instance of the Clarity Engine.
 - `handle_lobby()` - A legacy function that handles setting the lobby after recieving it from the socket.io server.
 - `error(str message)` - Throws an error.
 - `log(str message)` - Logs a message.
 - `set_viewport(float x, float y)` - Sets the rendered canvas viewport.
 - `keydown(KeyboardEvent e)` - A function bound to the window onkeydown event.
