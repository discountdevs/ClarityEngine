

# The Clarity Engine

A stripped-down version of the Clarity engine for usage in your own projects. Currently WIP.

##### WARNING: This project is a *work in progress*. Nothing here is final!

## Getting Started

To begin, let's create a new HTML file with a basic boilerplate:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible"  content="IE=edge">
		<meta name="viewport"  content="width=device-width, initial-scale=1.0">
		<title>Clarity Engine Example</title>
	</head>
	<body>
		<!-- We'll put our main content here later. -->
	</body>
</html>
```

We need to include the engine, so in the body, add:

```html
<body>
	<script src="/path/to/Clarity.js"></script>
</body>
```

We also need a canvas to render to:

```html
<body>
	<canvas id="ClarityCanvas" width="480" height="480"></canvas>
	<script src="/path/to/Clarity.js"></script>
</body>
```

Now for the fun part! Create a script tag below where you included the script:

```html
<script>
	var canvas = document.getElementById("ClarityCanvas");
	var ctx = canvas.getContext('2d');

	window.map = new MyMap();
	window.game = new Clarity();
	game.set_viewport(canvas.width, canvas.height);
	game.load_map(window.map);

	// This can be changed based on your choice. If it's set to true, the user's viewport will be limited to the boundaries of the level. Otherwise, the camera moves with the player.
	game.limit_viewport = false;

	window.addEventListener('resize', function () {
		readjustCanvas(canvas);
	}, false);

	var Loop = function () {
		ctx.fillStyle = '#111'; // Background colour
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		game.update();
		game.draw(ctx);
	};

	window.renderInterval = setInterval(Loop, 16.7); // 16.7 milliseconds between frames, which equals about 60 FPS.
</script>
```

You'll notice we reference a variable called `MyMap`. This hasn't been defined yet, so your IDE might be complaining about it. This is referencing your `mapvar`, a self-contained Clarity Engine-based game. Create a new file and call it `MyMap.js`. All `mapvar`s start with a basic structure, so let's add that:

```js
var MyMap = function () {
	// Map stuff goes here
};
```

Usually, `mapvar`s start with the textures used by tiles. In this example, we'll skip over it by doing the following:

```js
var MyMap = function () {
	this.textures = {};
};
```

We also need to define the tile size, another required field in a basic `mapvar`.

```js
this.tile_size  =  16;
```

Next up, we need to set up the tiles that we'll use. We define those in an object named `keys`.

```js
this.keys = [
	{
		id: 0,
		colour: "#333",
		solid: 0,
		blockname: "Void",
	},
	{
		id: 1,
		colour: "#555",
		solid: 1,
		blockname: "Platform",
		bounce: 0.35, // A bit of bounce on a platform feels good to play with
	},
];
```

We also need to decide on a layout for the tiles, which is an array of arrays:

```js
this.data = [[0,0,0,0,0,0,0,0,0,0],
             [0,0,0,1,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,1,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0,0],
             [1,1,1,1,1,1,1,1,1,1]];
```

We also need to specify some other attributes about the world:

```js
  this.gravity = {
    x: 0.0,
    y: 0.3,
  };

  /* Velocity limits */
  this.vel_limit = {
    x: 15.8, // Your velocity limits should be just below the tile size, otherwise high speeds could cause clipping through blocks.
    y: 15.8,
  };

  /* Movement speed when the key is pressed */
  this.movement_speed = {
    jump: 6,
    left: 0.3,
    right: 0.3,
  };

  /* The coordinates at which the player spawns and the colour of the player */
  this.player  =  {
    x: 1,
    y: 1,
    colour: "#FF5B00",
  };

  this.background = "#222"; // The background colour for the level where nothing is being drawn

  this.scripts = {}; // This is where you can specify scripts for your level. However, we don't need scripts for such a bare-bones example and thus it is left blank.

  this.version  =  2; // Most importantly: this tells the engine that you're not using legacy features (hardcoded functions built into the engine that didn't have good interoperability)
```

We need to include this `mapvar` in the body of the HTML document, right underneath where we include the engine:

```html
<canvas id="ClarityCanvas" width="480" height="480"></canvas>
<script src="/path/to/Clarity.js"></script>
<script src="./MyMap.js"></script>
```

If you have Python 3 installed on your system, you can easily spin up an HTTP server for testing using the following command:

```sh
python3 -m http.server --bind 127.0.0.1
```

If you don't have Python installed, you can just open up the HTML file in the browser of your choice by double-clicking it in a file explorer.

Congratulations! You've made your own standalone game using the Clarity Engine! If you want to expand on this demo, it is recommended that you check out the [`mapvar` documentation](https://github.com/discountdevs/ClarityEngine/blob/main/docs/mapvar.md) for more things that you can do with your map. Go wild! The sky's the limit!
