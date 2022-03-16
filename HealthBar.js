class HealthBar {
  constructor(scene, x, y, _width, _height) {
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = x;
    this.y = y;
    this.defaultStrokeWidth = 20;
    this.value = 100;
    this.p = 76 / 100;
    this.width = _width;
    this.height = _height;
    this.draw();
    scene.add.existing(this.bar);
  }

  setWidth(_width) {
    this.width = _width;
    return this;
  }

  setHeight(_height) {
    this.height = _height;
    return this;
  }
  decreaseHp(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }
    this.draw();
    return this.value === 0;
  }

  fullHp(){
    this.value = 100;
    this.draw();
  }

  draw() {
    this.bar.clear();

    // // BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y,104,16);
    // Health

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x+2, this.y+2, 100, 12);
    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    } else {
      this.bar.fillStyle(0x00ff00);
    }

    // var d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x + 2, this.y + 2, this.value, 12);
  }
}
