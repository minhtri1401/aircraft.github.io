class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, idx) {
    var xPos = 80 + idx * 100;
    var yPos = 16;
    super(scene, xPos, yPos, "ship2");
    scene.add.existing(this);
    scene.enemies.add(this);
    this.x = xPos; //offset + (idx * spacing)
    this.y = yPos;
    // this.depth = 0;
    this.setScale(1.2);
    this.flipY = true;
    this.startX = this.x;
    this.speedY = Math.random() * 2 + 0.5;

    // setup fireInterval
    scene.physics.world.enableBody(this);
    this.anims.play("ship2_anim");
    this.timeEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(1000, 3000),
      args: [this, scene],
      callback: this.enemyFire,
      callbackScope: scene,
      repeat: -1,
    });
  }

  enemyFire(enemy, scene) {
    if (enemy.active) {
      let bulletLeft = new Beam(scene, true, enemy.x - 8, enemy.y);
      let bulletRight = new Beam(scene, true, enemy.x + 8, enemy.y);
    }
  }

  move(scene) {
    // updateEnemies
      this.x = this.startX + Math.sin(elapseTime) * 32;
      this.y += this.speedY;

      if (this.y > config.height) {
        this.speedY = Math.random() * 2 + 0.5;
        this.y = 0;
    }
  }
}
