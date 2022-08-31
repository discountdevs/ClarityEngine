
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
