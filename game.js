var config = {
  width: 512,
  height: 720,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

var gameSettings = {
  playerSpeed: 100,
};

var game = new Phaser.Game(config);
