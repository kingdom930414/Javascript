const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

class CircularQueue {
    constructor(size) {
        this.ll = new LinkedList(size);
    }
    enQueue(e) {
        this.ll.add(e);
    }
    deQueue() {
        return this.ll.remove();
    }
    
    isEmpty() {
        return this.ll.length == 0;
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null
    }
}

class LinkedList {
    constructor(size) {
        this.tail = null;
        this.length = 0;
        this.size = size;
    }
    add(data) {
        var node = new Node(data);
        if (!this.tail) {
            this.tail = node;
            this.tail.next = this.tail;
            this.length++;
            return;
        }
        var head = this.tail.next;
        if (this.length == this.size) {
            this.tail = head;
            this.tail.data = data;
        } else {
            this.tail.next = node;
            this.tail = node;
            this.tail.next = head;
            this.length++;
        }
    }
    remove() {
        if (this.tail.next) {
            var head = this.tail.next;
            this.tail.next = head.next;
            this.length--;
            return head.data;
        }
    }
}

function askForInput(cq) {
    rl.question('Please enter a data to put into the queue: ', input => {
        if (input == 'quit') {
            while (!cq.isEmpty()) {
                var e = cq.deQueue();
                console.log(e);
            }
            rl.close();
            return;
        }
        cq.enQueue(input);
        askForInput(cq);
    });
}

function main() {
    var cq = new CircularQueue(12);
    askForInput(cq);
}
main();