var fs = require("fs");
var prompt = require("prompt-sync")();

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class SortedSet {
    constructor() {
        this.root = null;
    }

    isEmpty() {
        return this.root === null;
    }

    add(value, node = this.root) {
        if (node === this.root && this.isEmpty()) {
            this.root = new Node(value);
            return;
        }

        if (!node)
            return new Node(value);

        if (value < node.data) {
            var leftChild = this.add(value, node.left);
            node.left = leftChild;
        }
        else if (value > node.data) {
            var rightChild = this.add(value, node.right);
            node.right = rightChild;
        }
        return node;
    }

    remove(value, node = this.root) {
        if (!node) {
            return;
        }
        if (value < node.data) {
            node.left = this.remove(value, node.left);
        }
        else if (value > node.data) {
            node.right = this.remove(value, node.right);
        }
        else {
            if (!node.left)
                return node.right;
            if (!node.right)
                return node.left;

            node.data = this.maxVal(node.left);
            node.left = this.remove(node.data, node.left);
        }
        return node;
    }

    maxVal(node = this.root) {
        var maxV = node.data;
        while (node.right) {
            node = node.right;
            maxV = node.data;
        }
        return maxV;
    }

    contains(value, node = this.root) {
        // console.log(node);
        if (node === this.root && this.isEmpty()) {
            console.log("The sorted set contains nothing");
        }
        if (!node)
            return false;

        if (node.data === value)
            return true;
        else if (value < node.data)
            return this.contains(value, node.left);
        else
            return this.contains(value, node.right);
    }
}


var numbers;
try {
    numbers=fs.readFileSync('./infile.dat', 'utf8');
    console.log(numbers);
}catch (error) {
    console.log("infile.dat doesn't exist");
}
var sorted_set = new SortedSet();
numbers=numbers.split(',');
for(var i=0;i<numbers.length;i++){
    // console.log("number "+i+" is "+numbers[i]);
    sorted_set.add(parseFloat(numbers[i]));
}
    


while(true) {
    var input = prompt("Enter a value to see if the file contains it (input anything that not a number to quit): ");
    input = parseFloat(input);
    if (isNaN(input)) {
        console.log("This is not a number.");
        return;
    }

    if (sorted_set.contains(input))
        console.log("Yes");
    else
        console.log("No");
} 


    


