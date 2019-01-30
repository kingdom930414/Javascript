const fs = require('fs');
const path = require('path');

function huffman() {
    var list = [];
    list.push(new symbol_info(null, null, null, null));
    this.isEmpty = function () {
        var tof = (list.length == 0) ? true : false;
        return tof;
    }
    this.output = function () {
        for (var i = 0; i < list.length; i++) {
            console.log(list[i]);
        }
    }
    this.getSize = function () {
        return list.length - 1;
    }
    this.Insert = function (value) {
        list.push(value);
        if (list.length > 2) {
            var idx = list.length - 1;
            while (list[idx].frequency < list[Math.floor(idx / 2)].frequency) {
                if (idx >= 1) {
                    [list[Math.floor(idx / 2)], list[idx]] = [list[idx], list[Math.floor(idx / 2)]];
                    if (Math.floor(idx / 2) > 1) {
                        idx = Math.floor(idx / 2);
                    } else {
                        break;
                    }
                }
            }
        }
    }
    this.DeleteMin = function () {
        var smallest = list[1];
        // console.log("------DELETE-------");
        // console.log(smallest);
        if (list.length >= 3) {
            list[1] = list[list.length - 1];
            list.splice(list.length - 1);
            if (list.length == 3) {
                if (list[1].frequency > list[2].frequency) {
                    [list[1], list[2]] = [list[2], list[1]];
                }
                return smallest;
            }

            var i = 1;
            var left = 2 * i;
            var right = 2 * i + 1;
            if (list[left] == undefined || list[right] == undefined) {
                return smallest;
            }
            while (list[i].frequency >= list[left].frequency || list[i].frequency >= list[right].frequency) {
                if (list[left].frequency > list[right].frequency) {
                    [list[i], list[right]] = [list[right], list[i]];
                    i = 2 * i + 1;
                } else {
                    [list[i], list[left]] = [list[left], list[i]];
                    i = 2 * i;
                }
                left = 2 * i;
                right = 2 * i + 1;
                // console.log("------left--------")
                // console.log(list[left])
                // console.log("------right-------")
                // console.log(list[right])
                // console.log("------listlength-------")
                // console.log(list.length)
                if (list[left] == undefined || list[right] == undefined) {
                    break;
                }
            }
        } else if (list.length == 2) {
            list.splice(1, 1);
        } else {
            return null;
        }
        // console.log("this is the smallest:");
        // console.log(smallest);
        return smallest;
    }
    this.swap = function (i, j) {
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    this.findParentNode = function (i) {
        return Math.floor(i / 2);
    }
    this.findLeftChildNode = function (i) {
        return 2 * i;
    }
    this.findRightChildNode = function (i) {
        return 2 * i + 1;
    }
    this.list = function () {
        return list;
    }
}

var symbol_info = (function () {
    function symbolInfo(s, f, left, right) {
        this.symbol = s;
        this.frequency = f;
        this.leftchild = left;
        this.rightchild = right;
    }
    return symbolInfo;
}());

function huffmanCode(root, path) {
    if (root.leftchild == null && root.rightchild == null) {
        huff_code_table[root.symbol] = path;
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

var data = fs.readFileSync("infile.dat");
console.log('--------huffman code run---------');
var arr = data.toString().replace(/\W/g, "").split('');
// console.log(arr);
var huffmanArr = new huffman();
var j = 0;
var usefulArr = [], objhuff = {}, total_string = 0, haff = [], result = [];
var huff_code_table = {}; total = 0; totalBits = 0;
for (var i = 0; i < arr.length; i++) {
    if (arr[i].charCodeAt() >= 65 && arr[i].charCodeAt() <= 90) {
        usefulArr[j] = arr[i];
    } else if (arr[i].charCodeAt() >= 97 && arr[i].charCodeAt() <= 122) {
        usefulArr[j] = arr[i];
    } else if (arr[i].charCodeAt() >= 48 && arr[i].charCodeAt() <= 57) {
        usefulArr[j] = arr[i];
    }
    j++;
}
var huffman = [...new Set(usefulArr)];
console.log(huffman);
for (var i = 0; i < huffman.length; i++) {
    var sym = new symbol_info(huffman[i], null, null, null);
    var freq = 0;
    for (var j = 0; j < usefulArr.length; j++) {
        if (usefulArr[j] == sym.symbol) {
            freq++;
        }
    }
    // console.log(freq);
    sym.frequency = parseFloat(((freq / usefulArr.length) * 100));
    // console.log(sym.frequency);
    huffmanArr.Insert(sym);
    haff.push(sym);
}
haff.sort((a, b) => { return b.frequency - a.frequency });
console.log(huffmanArr.list());

while (huffmanArr.getSize() > 1) {
    var least = huffmanArr.DeleteMin();
    // console.log("---------------1");
    // console.log(least);
    var second = huffmanArr.DeleteMin();
    // console.log("---------------2");
    // console.log(second);
    var sym = new symbol_info(null, least.frequency + second.frequency, least, second);
    huffmanArr.Insert(sym);
    // console.log("---------------");
    // console.log(sym);
    // console.log(huffmanArr.list());
}
var root = huffmanArr.list()[1];
huffmanCode(root, "");
console.log(huff_code_table);
var frequency_string = "Symbol|Frequency\n";
var huffman_string = "Symbol|Huffman Codes\n";
for (var i = 0; i < haff.length; i++) {
    totalBits = totalBits + (haff[i].frequency * usefulArr.length/100 * huff_code_table[haff[i].symbol].split("").length);
    // totalBits += 1;
    frequency_string += haff[i].symbol + '     |   ' + haff[i].frequency + '%\n';
    huffman_string += haff[i].symbol + '     |    ' + huff_code_table[haff[i].symbol] + '\n';
}

var output = frequency_string + "\n" + huffman_string + "\n";
output += "Total Bits:" + totalBits;
fs.writeFile('outfile.dat', output, (err) => {
    if (err) throw err;
    console.log('--------Success---------');
});



