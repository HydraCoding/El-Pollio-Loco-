class World {
  character = new Character();
  level = level1;
  camera_x = 0;
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.checkCollisions();
    /*     this.generateBackground();
     */
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          console.log("COllision with Character", enemy);
        }
      });
    }, 1000);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.background);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.cloud, 50);
    this.ctx.translate(-this.camera_x, 0);

    /*     this.addObjectToMap(this.clouds2); */

    // Draw wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }

    obj.draw(this.ctx);
    if (this.figure(obj)) {
      obj.drawFrame(this.ctx);
    }

    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }
  addObjectToMap(objs) {
    objs.forEach((element) => {
      this.addToMap(element);
    });
  }

  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  figure(obj) {
    return (
      obj == this.character ||
      obj.constructor.name == this.level.enemies[0].constructor.name ||
      obj.constructor.name == this.level.enemies[4].constructor.name
    );
  }
}
