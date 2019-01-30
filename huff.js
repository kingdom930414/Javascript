const fs = require('fs');
const path = require('path');
const readline = require('readline');
const filedata = readline.createInterface(process.stdin, process.stdout);

function huffmanCode(root, path) {
    if (root.leftchild == null && root.rightchild == null) {
        huff_code_table[root.symbol_info.symbol] = path;
        return;
    }
    else if (root.leftchild != null && root.rightchild == null) {
        huffmanCode(root.leftchild, path + "0");
    }
    else if (root.leftchild == null && root.rightchild != null) {
        huffmanCode(root.rightchild, path + "1");
    }
    else {
        huffmanCode(root.leftchild, path + "0");
        huffmanCode(root.rightchild, path + "1");
    }
};

var symbol_info = (function () {
    function symbol_info(s, f) {
        this.symbol = s;
        this.frequency = f;
    }
    return symbol_info;
}());

var attribute_node = (function () {
    function attribute_node(l, r, p, s) {
        this.leftchild = l;
        this.rightchild = r;
        this.parent = p;
        this.symbol_info = s;
    }
    return attribute_node;
}());



const compare = function (a, b, data) {
    return data[a] > data[b];
}

const askFilePath = function (outputpath,filecontent) {
    fs.writeFile(path.join(outputpath, 'outfile.dat'), filecontent, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('-------success-------');
        }
    })
}

var HuffQuene = (function () {
    function HuffQuene(arr, compare) {
        if (compare === void 0) { compare = HuffQuene.compareFunction; }
        this.arr = arr || [];
        this.arr.push(null);
        this.compare = compare;
    }
    HuffQuene.compareFunction = function (e1, e2) {
        return e1.weight > e2.weight;
    };

    HuffQuene.prototype.isEmpty = function () {
        return this.arr.length == 1;
    };

    HuffQuene.prototype.GetSize = function () {
        return this.arr.length - 1;
    };

    HuffQuene.prototype.Insert = function (value) {
        this.arr[this.arr.length] = value;
        var pos = this.arr.length - 1;
        while (this.findParentNode(pos) >= 1) {
            if (!this.compare(this.arr[pos], this.arr[this.findParentNode(pos)])) {
                this.swap(pos, this.findParentNode(pos));
                pos = this.findParentNode(pos);
            }
            else {
                break;
            }
        }
    };

    HuffQuene.prototype.DeleteMin = function () {
        var rtn = this.arr[1];
        this.arr[1] = this.arr[this.arr.length - 1];
        this.arr.splice(this.arr.length - 1, 1);
        var pos = 1;
        while (pos * 2 <= this.arr.length - 1) {
            if (this.arr.length === 3) {
                if (this.compare(this.arr[pos], this.arr[this.findLeftChildNode(pos)])) {
                    this.swap(pos, this.findLeftChildNode(pos));
                    pos = this.findLeftChildNode(pos);
                }
                break;
            }
            if (this.findRightChildNode(pos) > this.arr.length - 1) {
                if (this.compare(this.arr[pos], this.arr[this.findLeftChildNode(pos)])) {
                    this.swap(pos, this.findLeftChildNode(pos));
                    pos = this.findLeftChildNode(pos);
                }
                else {
                    break;
                }
            }
            else {
                if (this.compare(this.arr[this.findLeftChildNode(pos)], this.arr[this.findRightChildNode(pos)])) {
                    if (this.compare(this.arr[pos], this.arr[this.findRightChildNode(pos)])) {
                        this.swap(pos, this.findRightChildNode(pos));
                        pos = this.findRightChildNode(pos);
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.compare(this.arr[pos], this.arr[this.findLeftChildNode(pos)])) {
                        this.swap(pos, this.findLeftChildNode(pos));
                        pos = this.findLeftChildNode(pos);
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return rtn;
    };
    HuffQuene.prototype.swap = function (i, j) {
        var temp = this.arr[i];
        this.arr[i] = this.arr[j];
        this.arr[j] = temp;
    };
    HuffQuene.prototype.findParentNode = function (i) {
        return Math.floor(i / 2);
    };
    HuffQuene.prototype.findLeftChildNode = function (i) {
        return 2 * i;
    };
    HuffQuene.prototype.findRightChildNode = function (i) {
        return 2 * i + 1;
    };
    HuffQuene.prototype.getArr = function () {
        return this.arr;
    };
    HuffQuene.prototype.output = function () {
        console.log(this.arr);
    };
    return HuffQuene;
}());

var data =fs.readFileSync("infile.dat");

console.log('--------huffman code run---------');
var arrlow = [], arrup = [], result = [], arrresult = [], haff = []; huff_code_table = {}; total = 0; totalBits = 0; total_string = 0;
var objlow = {}, objup = {}, obj = {}, objhuff = {};
var arr = data.toString().split('');
console.log(arr);
var pq = new HuffQuene([], function (e1, e2) { return e1.symbol_info.frequency > e2.symbol_info.frequency; });

var j=0;
var usefulArr = [];
for(var i=0;i<arr.length;i++){
    if(arr[i].charCodeAt() >= 65 && arr[i].charCodeAt() <= 90){
        usefulArr[j]=arr[i];
    }else if(arr[i].charCodeAt() >= 97 && arr[i].charCodeAt() <= 122){
        usefulArr[j]=arr[i];
    }else if(arr[i].charCodeAt() >= 48 && arr[i].charCodeAt() <= 57){
        usefulArr[j]=arr[i];
    }
    j++;
}


for (var i=0;i<usefulArr.length;i++) {
    var sym = new symbol_info(i, objhuff[i]);
    var treeNode = new attribute_node(null, null, null, sym);
    total_string += objhuff[i];
    pq.Insert(treeNode);
    haff.push(sym);
}
result.sort((a, b) => { return b - a });
haff.sort((a, b) => { return b.frequency - a.frequency });
for (let j = 0; j < result.length; j++) {
    for (let i = 0; i < Object.keys(objlow).length; i++) {
        if (objlow[Object.keys(objlow)[i]] == result[j]) {
            obj[Object.keys(objlow)[i]] = result[j];
        }
    }
}

while (pq.GetSize() > 1) {
    var least = pq.DeleteMin();
    var second = pq.DeleteMin();
    var sym = new symbol_info(null, least.symbol_info.frequency + second.symbol_info.frequency);
    var new_attribute_node = new attribute_node(least, second, null, sym);
    least.parent = new_attribute_node;
    second.parent = new_attribute_node;
    pq.Insert(new_attribute_node);
}
var root = pq.getArr()[1];
huffmanCode(root, "");
console.log(total_string);
var frequency_string = "Symbol|Frequency\n";
var huffman_string = "Symbol|Huffman Codes\n";
for (var i = 0; i < haff.length; i++) {
    totalBits = totalBits + (haff[i].frequency * huff_code_table[haff[i].symbol].split("").length);
    frequency_string += haff[i].symbol + '     |   ' + parseFloat(((haff[i].frequency / total_string) * 100)) + '%\n';
    huffman_string += haff[i].symbol + '     |    ' + huff_code_table[haff[i].symbol] + '\n';
}

var output = frequency_string + "\n" + huffman_string + "\n";
output += "Total Bits:" + totalBits;
fs.writeFile('outfile.dat', output, (err) => {
    if (err) throw err;
    console.log('--------Success---------');
});



