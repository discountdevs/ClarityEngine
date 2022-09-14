
# The Clarity Engine
A stripped-down version of the Clarity engine for usage in your own projects. Currently WIP.

##### WARNING: This project is a *work in progress*. Nothing here is final!

## Getting Started

To get started, create a new HTML file and fill in a basic boilerplate:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta  charset="UTF-8">
		<meta  http-equiv="X-UA-Compatible"  content="IE=edge">
		<meta  name="viewport"  content="width=device-width, initial-scale=1.0">
		<title>ClarityEngine Getting Started Tutorial</title>
	</head>
	<body>
		<!-- We'll put our main content here later. -->
	</body>
</html>
```

Now, we have to include the Clarity Engine:

```html
<body>
	<!-- The engine -->
	<script src="/path/to/Clarity.js"></script>
</body>
```

We need a canvas, so in your body, above the script tag, put the following:

```html
<canvas id="ClarityCanvas"  width="480"  height="480"></canvas>
```
Now for the fun part! Create a script tag below the Clarity script:

```html
<script>
	var  canvas  =  document.querySelector('#ClarityCanvas'); // Get the canvas and the 2d context
		    ctx  =  canvas.getContext('2d');

	window.game = new Clarity(); // Initialize the game
	game.set_viewport(canvas.width, canvas.height); // Ensure that the viewport is properly set

	var  Loop  =  function() {
		// Fill the background (areas not drawn on the map)
		ctx.fillStyle  =  '#111';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		// Draw the game
		game.update();
		game.draw(ctx);
	};

	window.renderInterval  =  setInterval(Loop, 16.7);
</script>
```

From here, we have to create a mapvar. A mapvar is made up of two core parts. The first is just a giant list of base64-encoded textures in PNG format. It looks something like this:

```js
window.wallimg = new Image();
wallimg.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADNJREFUOE9j9PT0/M9AAWAEGcDDw0OWEV++fGEYNWA0DIZLOvD19f3PwcExwHmBLOuhmgCrKEex0FtLIQAAAABJRU5ErkJgggAA";

window.elevatorimg = new Image();
elevatorimg.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAG5JREFUOE9jbPJX/W+jwsdADjhy5xMD4+A2AOREEMDlRbxegGmGhQ02Q3AagK4ZlyFYDYBpfvD6C4OCKA9YLzIb2SVYDVhy/BlYU4ylFANyGCCLw1xEMBopCkSQLcPAAGwBh5xnCAYioQw2OAwAAKSneWF2TERPAAAAAElFTkSuQmCC";

// etc...
```

The second part of the mapvar is the main JSON blob that defines the actual behaviour of the tiles and the game. The game fully functions without textures, and it is generally best to focus on functionality before focusing on textures.

Every mapvar starts with a definition of the tile size.

```js
window.map = {
	tile_size: 16,
};
```

Next, we need to add the tile definitions. So, after the tile size declaration, we add an array to hold them. Inside, we put our tiles. There is a lot of functionality that can be packed into a single tile, so for now we're just making a simple solid block with a plain color.

```js
window.map = {
	...
	keys: [
		{
			id: 0, // Tile ids start at 0, increment by 1
			colour: "#FFF", // Pure white
			solid: 1, // Set it to be solid
			blockname: "Wall" // Give it a name for the Clarity Editr (v2 only)
		},
	],
};
```

Although this works pretty well, it feels more responsive if it has a bit of bounce.

```js
window.map = {
	...
	keys: [
		{
			id: 0,
			...
			bounce: 0.35,
		},
	],
};
```

We also need a block to define an absence of a value:

```js
	keys: [
		...
		{
			id: 1,
			colour: "#333",
			solid: 0,
			blockname: "Void"
		},
	]
```

Nice. Now, in order to use this block, we need a map. Let's define a map:

```js
window.map = {
	...
	data: [[1,1,1,1,1],
		   [1,1,1,1,1],
		   [1,1,1,1,1],
		   [1,1,1,1,1],
		   [0,0,0,0,0]],
}
```

We also need to set some other generic attributes:

```js
window.map = {
	...
	
	/* Default gravity of the map */
	gravity: {
		x: 0.0,
		y: 0.3,
	},

	/* Velocity limits */
	vel_limit: {
		x: 15.8,
		y: 15.8,
	},

	/* Movement speed when the key is pressed */
	movement_speed: {
		jump: 6,
		left: 0.3,
		right: 0.3,
	},

	/* The coordinates at which the player spawns and the colour of the player */
	player: {
		x: 1,
		y: 1,
		colour: "#FF6B00",
	},

	background: "#222",
}
```

Finally, we define the `scripts` portion of the mapvar, which will remain empty for the time being, and the version portion, which tells the engine that we're not running on a template mapvar using legacy engine features.

```js
window.map = {
	...
	scripts: {},
	version: 2,
}
```

All of this goes in a file in the same directory you used earlier, preferably named `map.js`. Now, we include that back in `index.html`, right before your initialization of the engine:

```html
	...
	<script src="map.js"></script>
```

And finally (I know, you're bored by now) we load the map. In your initialization put:

```js
	...
	window.game = new Clarity(); // This should already be there, put the following statement after it:
	game.load_map(window.map);
	...
```

Spin up an HTTP server:

```sh
python3 -m http.server
```

And open up `localhost` in your browser. You're done!

If you want to go further and continue configuring your mapvar, see [here](https://github.com/discountdevs/ClarityEngine/blob/main/docs/mapvar.md).
