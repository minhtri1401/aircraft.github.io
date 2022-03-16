class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("bg", "resources/background.png");
    this.load.image("popupWnd", "/resources/popupWnd.png");
    this.load.image("btnRetry", "/resources/btnRetry.png");

    this.load.spritesheet("ship1", "resources/ship.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("ship2", "resources/ship2.png", {
      frameWidth: 32,
      frameHeight: 16,
    });
    this.load.spritesheet("ship3", "resources/ship3.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("player-ship", "resources/player-ship.png", {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet("explosion", "resources/explosion.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("power-up", "resources/power-up.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("player-bullet", "resources/player-bullet.png", {
      frameWidth: 5,
      frameHeight: 13,
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
    this.createAnimations();
  }

  createAnimations() {
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship1"),
      frameRate: 20,
      repeate: -1,
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player-ship"),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "bullet_anim",
      frames: this.anims.generateFrameNumbers("player-bullet"),
      frameRate: 20,
      repeat: -1,
    });
  }
}
