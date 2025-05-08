const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#1a1a1a',
  parent: 'body',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player, visitor;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('floor', 'assets/floor.png');
  this.load.image('book', 'assets/book.png');
  this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
  this.load.spritesheet('visitor', 'assets/visitor.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
  this.add.tileSprite(0, 0, config.width, config.height, 'floor').setOrigin(0, 0);

  player = this.physics.add.sprite(100, 100, 'player');
  visitor = this.physics.add.sprite(300, 100, 'visitor');

  this.input.on('pointerdown', (pointer) => {
    const destination = pointer;
    this.physics.moveTo(visitor, destination.x, destination.y, 200);
    this.physics.moveToObject(player, visitor, 100);
  });

  const book = this.add.sprite(200, 200, 'book').setInteractive();
  book.on('pointerdown', () => {
    showDialog("This book represents my love for storytelling and design.");
  });
}

function update() {
  if (Phaser.Math.Distance.Between(visitor.x, visitor.y, this.input.activePointer.x, this.input.activePointer.y) < 5) {
    visitor.body.setVelocity(0);
  }
}

function showDialog(text) {
  const dialog = document.createElement("div");
  dialog.textContent = text;
  dialog.style.position = "absolute";
  dialog.style.bottom = "20px";
  dialog.style.left = "50%";
  dialog.style.transform = "translateX(-50%)";
  dialog.style.padding = "10px";
  dialog.style.background = "#333";
  dialog.style.color = "#fff";
  dialog.style.borderRadius = "8px";
  document.body.appendChild(dialog);
  setTimeout(() => dialog.remove(), 3000);
}
