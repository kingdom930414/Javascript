
const fs = require('fs');
const readline = require('readline');
const test = readline.createInterface(process.stdin, process.stdout);

function Queue(size) {
    var list = [];

    this.enqueue = function (data) {
        if (data == null) {
            return false;
        }
        if (size != null && !isNaN(size)) {
            if (list.length == size) {
                this.dequeue();
            }
        }
        list.unshift(data);
        return true;
    }

    this.dequeue = function () {
        return list.pop();
    }

    this.size = function () {
        return list.length;
    }

    this.quere = function () {
        return list;
    }
}

var test1 = new Queue(12);
console.log(test1.size());
for (let i = 0; i < 5; i++) {
    test1.enqueue(i);
}
console.log(test1.quere());
let que = new Queue(12);

function start() {
    test.question('please input ', (data) => {
        if (data.toLocaleLowerCase() == "quit" || data.toLocaleLowerCase() == "q") {
            //console.log(que.quere());
            output(que.quere());
            test.close();
        } else {
            que.enqueue(data);
            start();
        }
    })
}

function output(data) {
    //console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log(`${data[i]}\n`);
    }
}

start();
