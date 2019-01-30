// This is Lu's heaps used for sorting lab.
const readline = require('readline');

// Max-heap class.
class MaxHeap {

    constructor() {
        this.arr = [0];
        this.lastNodeSpace = 0;
    }

    isEmpty() {
        if(this.arr.length > 1) {
            return false;
        }
        else {
            return true;
        }
    }

    add(value) {
        this.lastNodeSpace++;
        this.arr[this.lastNodeSpace] = value;
        this.addFix(this.lastNodeSpace);
    }

    // Pop the tree root.
    popMax() {
        var maxNode = this.arr[1];
        this.arr[1] = this.arr[this.lastNodeSpace];
        this.arr.splice(this.lastNodeSpace, 1);
        this.lastNodeSpace--;
        if(!this.isEmpty()) {
            this.popFix(1);
        }
        return maxNode;
    }

    // To make the arr[nodeNum] in a right place after add action.
    addFix(nodeNum) {
        var num = nodeNum;
        for(; this.arr[num] > this.arr[parseInt(num/2)];) {
            if(num == 1) {
                break;
            }
            let reverse = this.arr[parseInt(num/2)];
            this.arr[parseInt(num/2)] = this.arr[num];
            this.arr[num] = reverse;
            num = parseInt(num/2);
        }
    }

    // To make the arr[nodeNum] in a right place after pop action.
    popFix(nodeNum) {
        var num = nodeNum;
        if(this.arr[num*2] == undefined && this.arr[num*2+1] == undefined) {}
        else if(this.arr[num*2] != undefined && this.arr[num*2+1] == undefined) {
            if(this.arr[num*2] > this.arr[num]) {
                let reverse = this.arr[num*2];
                this.arr[num*2] = this.arr[num];
                this.arr[num] = reverse;
                this.popFix(num*2);
            }
        }
        else if(this.arr[num*2] == undefined && this.arr[num*2+1] != undefined) {
            if(this.arr[num*2+1] > this.arr[num]) {
                let reverse = this.arr[num*2+1];
                this.arr[num*2+1] = this.arr[num];
                this.arr[num] = reverse;
                this.popFix(num*2+1);
            }
        }
        else {
            if(this.arr[num*2] > this.arr[num]) {
                if(this.arr[num*2] > this.arr[num*2+1]) {
                    let reverse = this.arr[num*2];
                    this.arr[num*2] = this.arr[num];
                    this.arr[num] = reverse;
                    this.popFix(num*2);
                }
                else {
                    let reverse = this.arr[num*2+1];
                    this.arr[num*2+1] = this.arr[num];
                    this.arr[num] = reverse;
                    this.popFix(num*2+1);
                }
            }
            else if(this.arr[num*2+1] > this.arr[num]) {
                let reverse = this.arr[num*2+1];
                this.arr[num*2+1] = this.arr[num];
                this.arr[num] = reverse;
                this.popFix(num*2+1);
            }
        }
    }

}



// Start here.
var maxheap = new MaxHeap();
// Input numbers.
console.log('\n Please input 10 numbers, one line at a time.');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var turn = 0;
rl.setPrompt(' Input: ');
rl.prompt();
rl.on('line', function(input) {
    // Store in the max-heap, one at a time.
    maxheap.add(+input);
    turn++;
    if(turn >= 10) {
        rl.close();
    }
    else {
        rl.prompt();
    }
});
// Output the numbers in descending order.
rl.on('close', function() {
    console.log('\n Output the numbers in descending order, one line at a time.');
    for(; !maxheap.isEmpty();) {
        console.log(' '+maxheap.popMax());
        console.log(maxheap.arr);
    }
});