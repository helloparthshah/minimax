// For it to run you need a local server (check: https://github.com/processing/p5.js/wiki/Local-server)
var tree;
var controls;
var selectedNode;

function setup() {
  // put setup code here
  // pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  controls = document.getElementById("controls");
  tree = new Tree();

  document.getElementById("add").addEventListener("click", () => {
    if (selectedNode)
      tree.addChild(selectedNode, 0);
  });

  document.getElementById("delete").addEventListener("click", () => {
    if (selectedNode)
      tree.removeNode(selectedNode);
  });

  document.getElementById("value").addEventListener("input", () => {
    if (selectedNode) {
      selectedNode.value = parseInt(document.getElementById("value").value);
      tree.update();
    }
  });
}

document.oncontextmenu = function () {
  return false;
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
  tree.update();
}

function mouseClicked() {
  let node = tree.onClick(tree.root, mouseX, mouseY);
  if (mouseButton === LEFT) {
    if (node) {
      selectedNode = node;
      controls.style.left = (node.x + 40) + 'px';
      controls.style.top = (node.y - 20) + 'px';
      controls.style.display = "block";
      document.getElementById("value").value = node.value;
      if (node.children.length !== 0)
        document.getElementById("value").style.display = "none";
      else
        document.getElementById("value").style.display = "block";
      // tree.addChild(node, Math.floor(Math.random() * 10));
    } else if (document.activeElement !== document.getElementById("value")) {
      controls.style.display = "none";
    }
  }
}

function draw() {
  // put drawing code here
  background("#292929");
  tree.display();
}