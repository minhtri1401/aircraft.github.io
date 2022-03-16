class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene, isEnemy, x , y) {
   

    super(scene, x, y, "player-bullet");
    if (isEnemy) scene.enemyProjectiles.add(this);
    else scene.playerProjectiles.add(this);

    scene.add.existing(this);

    this.play("bullet_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.y = !isEnemy ? -250 : 250;
  }

  update() {
    if (this.y < 0) {
      this.destroy();
    }
    if (this.y > 720) {
      this.destroy();
    }
  }
}
