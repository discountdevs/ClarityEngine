window.map = {
    tile_size: 16,

    keys: [
        {
            id: 0, // Tile ids start at 0, increment by 1
            colour: "#FFF", // Pure white
            solid: 1, // Set it to be solid
            blockname: "Wall", // Give it a name for the Clarity Editr (v2 only)
            bounce: 0.35, // A bit 'o bounce
        },
        {
			id: 1,
			colour: "#333",
			solid: 0,
			blockname: "Void"
		},
    ],

	data: [[1,1,1,1,1],
		   [1,1,1,1,1],
		   [1,1,1,1,1],
		   [1,1,1,1,1],
		   [0,0,0,0,0]],
    
    
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

    scripts: {},

	version: 2,
}