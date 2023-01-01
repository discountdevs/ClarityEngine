var MyMap = function () {
  this.textures = {};
  this.tile_size = 16;
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
  this.data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
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
  this.player = {
    x: 1,
    y: 1,
    colour: "#FF5B00",
  };

  this.background = "#222"; // The background colour for the level where nothing is being drawn

  this.scripts = {}; // This is where you can specify scripts for your level. However, we don't need scripts for such a bare-bones example and thus it is left blank.

  this.version = 2; // Most importantly: this tells the engine that you're not using legacy features (hardcoded functions built into the engine that didn't have good interoperability)
};
