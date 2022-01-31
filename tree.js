class Tree {
    constructor() {
        this.root = new Node(0);
        this.setXY(this.root, width / 2, 50, 1);

        this.eq = null;
    }

    setXY(node, x, y, l) {
        node.x = x;
        node.y = y;
        node.color = color(0, 0, 0);
        let inc = width / (3 * pow(l, 1.5));
        if (x + inc * (node.children.length - 1) >= width) inc = (width - x) / (node.children.length - 1) * 1.5 - 20;
        if (inc < 40) inc = 40;
        let a = x - (node.children.length - 1) * inc / 2;
        if (a <= 0) a = 20;
        if (node.children.length !== 0) node.value = null
        for (let i = 0; i < node.children.length; i++) {
            this.setXY(node.children[i], a, y + 80, l + 1);
            a += inc;
        }
    }

    onClick = (node, x, y) => {
        if (dist(node.x, node.y, x, y) <= node.r) {
            return node;
        }
        for (let i = 0; i < node.children.length; i++) {
            let n = this.onClick(node.children[i], x, y);
            if (n) return n;
        }
    }

    addChild = (parent, value = 0) => {
        parent.children.push(new Node(value, parent));
        this.update();
    }

    removeNode = (node) => {
        node.parent.children.splice(node.parent.children.indexOf(node), 1);
        this.update();
    }

    miniMax = () => {
        let v = this.max(this.root);
        this.eq = v;
        v.color = color(255, 0, 0);
    }

    resetLine = (node) => {
        node.lineColor = color(0, 0, 0);
        for (let i = 0; i < node.children.length; i++) {
            this.resetLine(node.children[i]);
        }
    }

    setLine = (node) => {
        if (node === this.eq) return true;
        for (let i = 0; i < node.children.length; i++) {
            let n = this.setLine(node.children[i]);
            if (n) {
                console.log(n);
                node.children[i].lineColor = color(255, 0, 0);
                return true;
            } else {
                node.children[i].lineColor = color(0, 0, 0);
            }
        }
        return false;
    }

    max = (node) => {
        if (node.children.length === 0) return node;
        let max = node.children[0];
        for (let i = 0; i < node.children.length; i++) {
            let v = this.min(node.children[i]);
            if (v.value >= max.value) {
                max = v;
            }
        }
        node.value = max.value;
        return max;
    }

    min = (node) => {
        if (node.children.length === 0) return node;
        let min = node.children[0];
        for (let i = 0; i < node.children.length; i++) {
            let v = this.max(node.children[i]);
            if (v.value <= min.value) {
                min = v;
            }
        }
        node.value = min.value;
        return min;
    }

    disRecurse = (node) => {
        // if (node === this.eq) node.color = color(255, 0, 0);
        node.display(node.x, node.y);
        for (let i = 0; i < node.children.length; i++) {
            stroke(node.children[i].lineColor);
            line(node.x, node.y, node.children[i].x, node.children[i].y);
            this.disRecurse(node.children[i]);
        }
    }

    update = () => {
        this.setXY(this.root, width / 2, 50, 1);
        this.miniMax();
        this.resetLine(this.root)
        this.setLine(this.root)
    }

    display = () => {
        this.disRecurse(this.root);
    }
}

class Node {
    constructor(value = null, parent = null) {
        this.value = value;
        this.x = 0;
        this.y = 0;
        this.r = 20;
        this.children = [];
        this.parent = parent;
        this.color = color(0, 0, 0);
        this.lineColor = color(0, 0, 0);
    }

    display = (x, y) => {
        fill(255);
        noStroke();
        ellipse(x, y, this.r * 2, this.r * 2);
        // if (this.children.length == 0) {
        if (this.value != null) {
            fill(this.color);
            if (this.children.length !== 0)
                fill(0, 0, 255);
            textAlign(CENTER, CENTER);
            textSize(this.r);
            text(this.value, x, y);
        }
    }
}