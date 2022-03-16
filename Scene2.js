let elapseTime = 0;
let popupContainer;
let popupWnd;
let btnRetry;
let scoreTxt;
let score = 0;
let HUDtext;
let missionFailedTitle;
let gameOver = false;
let gameRestart = false;
class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 800, 600, "bg");
    this.background.setScale(2);
    this.background.setOrigin(0, 0);

    //Create a player
    this.player = new Player(this);

    //Set keyboard events
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    // popup window

    // Group objects
    this.playerProjectiles = this.add.group();
    this.powerUps = this.physics.add.group();
    this.enemyProjectiles = this.physics.add.group();
    this.enemies = this.physics.add.group();
    // this.physics.add.collider(this.projectiles, this.powerUps, this.shootBoom);
    // Add collision
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.hitBoom,
      null,
      this
    );
    this.physics.add.overlap(
      this.playerProjectiles,
      this.powerUps,
      this.shootBoom,
      null,
      this
    );
    this.physics.add.overlap(
      this.playerProjectiles,
      this.enemies,
      this.shootEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemyProjectiles,
      this.shootPlayer,
      null,
      this
    );
    //Create bom and enemies
    this.bomObject();
    this.createEnemies();
    this.createPopupWindow();
    HUDtext = this.add.text(10, 10, "Score: " + score);
  }

  update() {
    this.background.tilePositionY -= 0.5;
    if (!gameOver) {
      this.player.move(this);
      for (const enemy of this.enemies.getChildren()) {
        enemy.move(this);
      }
      if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
        this.player.shoot(this);
      }

      for (const bullet of this.playerProjectiles.getChildren()) {
        bullet.update();
      }
      for (const bullet of this.enemyProjectiles.getChildren()) {
        bullet.update();
      }

      elapseTime += 0.02;
    }
    if (gameRestart) {
      gameRestart = false;
      this.retryGame();
    }
  }

  //Create enemies
  createEnemies() {
    let maxEnemies = 4;
    for (const idx of Array(maxEnemies).keys()) {
      let enemy = new Enemy(this, idx);
    }
  }

  hitEnemy(player, enemy) {
    let player_explosion = this.add.sprite(player.x, player.y, "explosion");
    let enemy_explosion = this.add.sprite(enemy.x, enemy.y, "explosion");
    player_explosion.setScale(2);
    enemy_explosion.setScale(2);
    player_explosion.anims.play("explode");
    enemy_explosion.anims.play("explode");

    player.decreaseHp(50);
    this.resetShipPos(enemy);
    this.checkSurvive();
  }
  hitBoom(player, boom) {
    let player_explosion = this.add.sprite(player.x, player.y, "explosion");
    let boom_explosion = this.add.sprite(boom.x, boom.y, "explosion");
    player.decreaseHp(40);
    player_explosion.setScale(2);
    boom_explosion.setScale(2);
    player_explosion.anims.play("explode");
    boom_explosion.anims.play("explode");
    boom.destroy();
    this.checkSurvive();
  }
  shootEnemy(player_bullet, enemy) {
    score++;
    HUDtext.text = "Score: " + score;
    scoreTxt.text = score;

    player_bullet.destroy();
    let explosion = this.add.sprite(enemy.x, enemy.y, "explosion");
    explosion.anims.play("explode");

    this.resetShipPos(enemy);
  }
  shootBoom(bullet, boom) {
    score += 10;
    HUDtext.text = "Score: " + score;
    scoreTxt.text = score;
    bullet.destroy();
    boom.pong -= 1;
    if (boom.pong == 0) boom.destroy();
  }
  shootPlayer(player, enemyBullet) {
    enemyBullet.destroy();
    let explosion = this.add.sprite(player.x, player.y, "explosion");
    explosion.anims.play("explode");

    player.decreaseHp(10);
    this.checkSurvive();

  }

  bomObject() {
    let maxObjects = 4;
    for (let idx = 0; idx < maxObjects; idx++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (0.5 - Math.random()) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);

      powerUp.pong = 3;
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    var radomXpos = Phaser.Math.Between(0, config.width);
    ship.x = radomXpos;
  }

  pauseGame() {
    popupContainer.visible = true;

    scoreTxt.text = score;

    // stop player
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    // stop enemies fire
    // for (const enemy of enemies.getChildren()) {

    // }
  }

  createPopupWindow() {
    popupContainer = this.add.container();
    popupContainer.x = 256;
    popupContainer.y = 350;
    popupWnd = this.add.sprite(0, 0, "popupWnd");
    popupContainer.add(popupWnd);
    btnRetry = this.add.sprite(0, 30, "btnRetry");
    btnRetry.setInteractive({ useHandCursor: true });
    popupContainer.add(btnRetry);
    this.input.on("gameobjectdown", this.handleClick);

    let textConfig = {
      fontSize: "18px",
      color: "#d2d2d2",
      fontFamily: "Arial",
    };
    missionFailedTitle = this.add.text(-57, -51, "Mission Failed", textConfig);
    popupContainer.add(missionFailedTitle);

    textConfig = { fontSize: "14px", color: "#d2d2d2", fontFamily: "Arial" };
    scoreTxt = this.add.text(-22, -19, "0", textConfig);
    popupContainer.add(scoreTxt);

    popupContainer.visible = false;
    popupContainer.depth = 100;
  }

  handleClick(pointer, gameObject) {
    if (gameObject == btnRetry) {
      score = 0;

      gameRestart = true;
      popupContainer.visible = false;
      // destroy enemies
    }
  }

  retryGame() {
    // reset player
    this.player.x = 256;
    this.player.y = 600;
    this.player.revive();
    // reset enemies
    for (let i = this.enemies.getChildren().length - 1; i >= 0; i--) {
      let enemy =  this.enemies.getChildren()[i];
      enemy.destroy();
    }

    for (let i = this.powerUps.getChildren().length - 1; i >= 0; i--) {
      let bom =  this.powerUps.getChildren()[i];
      bom.destroy();
    }
    this.createEnemies();
    this.bomObject();
    gameOver = false;
  }

  checkSurvive() {
    if (this.player.hp === 0) {
      gameOver = true;
      this.pauseGame();
    }
    console.log("check");
    console.log(gameOver);
    console.log(gameRestart);

  }
}
