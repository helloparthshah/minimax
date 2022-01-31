// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
var tree;

function setup() {
  // put setup code here
  // pixelDensity(1);
  createCanvas(windowWidth, windowHeight);

  tree = new Tree();
}

document.oncontextmenu = function () {
  return false;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
  tree.setXY(tree.root, width / 2, 50, 1);
}

function mouseClicked() {
  node = tree.onClick(tree.root, mouseX, mouseY);
  if (mouseButton === LEFT) {
    if (node) {
      tree.addChild(node, Math.floor(Math.random() * 10));
    }
  }
}

let right = false

function draw() {
  // put drawing code here
  if (mouseIsPressed) {
    if (!right && mouseButton === RIGHT) {
      node = tree.onClick(tree.root, mouseX, mouseY);
      if (node != null) {
        tree.removeNode(node);
      }
      right = true
    }
  } else
    right = false
  background(220);
  tree.display();
}