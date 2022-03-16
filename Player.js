class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    var x = 256;
    var y = 600;
    super(scene, x, y, "player-ship");
    scene.add.existing(this);
    this.anims.play("player_anim");
    scene.physics.world.enableBody(this);
    this.setCollideWorldBounds(true);

    this.hp = 100;
    this.hpBar = new HealthBar(scene, 10, 680, 8, 8);
  }
  levelUp() {}
  move(scene) {
    if (scene.cursorKeys.left.isDown) {
      scene.player.body.setVelocityX(-gameSettings.playerSpeed);
    } else if (scene.cursorKeys.right.isDown) {
      scene.player.body.setVelocityX(gameSettings.playerSpeed);
    } else {
      scene.player.setVelocityX(0);
    }
    if (scene.cursorKeys.up.isDown) {
      scene.player.body.setVelocityY(-gameSettings.playerSpeed);
    } else if (scene.cursorKeys.down.isDown) {
      scene.player.body.setVelocityY(gameSettings.playerSpeed);
    } else {
      scene.player.setVelocityY(0);
    }
  }

  shoot(scene) {
    var beam = new Beam(scene, false, this.x, this.y);
  }

  decreaseHp(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
    }
    this.hpBar.decreaseHp(amount);
  }

  revive() {
    this.hp = 100;
    this.hpBar.fullHp();
  }
}
