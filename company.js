var RLS = require("readline-sync");
var fs = require("graceful-fs");
var rds = require('fs');
var path = require('path');
var cbdata = {};
var totalword = 0;
var totalfile = 0;
var totalcomp = 0;
var regp = new RegExp('"',"g");  

function TrieNode(key) {
    this.key = key;
    this.hit = 0;
    this.son = [];
}

function companyNode(data, number) {
    this.name = data;
    this.hit = number;
}

function companytree() {
    this.company = {};
}
companytree.prototype = {
    addcompany: function (key, number) {
        if (this.getcompany(key)) {
            this.getcompanynum(key, number);
        } else {
            this.company[key] = new companyNode(key, number)
        }
    },
    getcompany: function (key) {
        if (this.company[key]) {
            return this.company[key];
        } else {
            return false;
        }
    },
    getcompanynum: function (key, number) {
        if (this.company[key]) {
            this.company[key]['hit'] = number;
        } else {
            return false;
        }
    }
}

function Trie() {
    this.root = new TrieNode(null);
}
Trie.prototype = {
    insertData: function (stringData) {
        this.insert(stringData, this.root);
    },
    insert: function (stringData, node) {
        if (stringData == '') {
            node.hit += 1;
            //this.getNum(node) += 1;
            return;
        }
        var son = this.getSon(node);
        var haveData = null;
        for (var i in son) {
            if (son[i].key == stringData[0]) {
                haveData = son[i];
            }
        }
        if (haveData) {
            this.insert(stringData.substring(1), haveData);//说明找到了对应的元素，那如果没有找到了？
        } else {
            if (son.length == 0) {
                //当前没有子元素，所以应该判断一下
                var node = new TrieNode(stringData[0]);
                son.push(node);
                this.insert(stringData.substring(1), node);//对吧，此时应该将该元素插入子元素中
            } else {//当前子元素的长度不为零，需要查找一个合适的位置去插入元素
                var validPosition = 0;
                for (var j in son) {
                    if (son[j].key < stringData[0]) {
                        validPosition++;
                    }
                }
                var node = new TrieNode(stringData[0]);
                son.splice(validPosition, 0, node);
                this.insert(stringData.substring(1), node);//对吧，此时应该将该元素插入子元素中
            }
        }

    },
    delete: function (stringData) {

    },
    query: function (stringData) {

    },
    getSon: function (node) {
        return node.son;
    },
    getNum: function (node) {
        return node.hit;
    },
    printdata1: function (node, data) {

        if (node.son.length == 0 || node.hit > 0) {
            //console.log('ddddd', data.join(''), node.hit);
            if (!cbdata[data.join('')]) {
                //console.log(cbdata);
                cbdata[data.join('')] = node.hit;
            } else {
                cbdata[data.join('')] = node.hit;
            }

            //continue;
        }
        for (var i in node.son) {
            data.push(node.son[i].key);
            this.printdata1(node.son[i], data);
            data.pop();
        }
    },
    printData: function () {
        for (var i in this.root.son) {
            this.printdata1(this.root.son[i], [this.root.son[i].key]);
        }

    },
    isExit: function (node, queryData) {
        if (node.key == queryData[0]) {

        }
    }

};

var trie = new Trie();
var companyoutput = new companytree();
//trie.printData();

var input = rds.readFileSync(path.join(__dirname, 'companies.dat'), "utf8");

var readdata = input.split("\n");
var companies = {};
var totalarr = [];
for (let i = 0; i < readdata.length; i++) {
    let alias = readdata[i].split("\t");
    if (alias[0].indexOf(" ") > 0) {
        alias[0] = alias[0].slice(0, alias[0].indexOf(" "));
    }
    //companies[alias[0]] = alias;
    for (let j = 0; j < alias.length; j++) {
        companies[alias[j]] = alias[0];
    }
}

//var file = rds.readFileSync(path.join(__dirname, 'infile.dat'), "utf8");

//var file = RLS.question('Enter article (Type "." alone to stop): ');
//var file = 'MacOSS';
//output(file);

function output(file) {

    totalfile = file;
    
    if (file == "") {
        console.log('input can not be empty!\n');
        return;
    }
    if (file == ".") {
        console.log('program close!');
        return;
    }

    for (let i in companies) {
        //file = file.replace(i,companies[i]);
        //b.replace(/ XBox /g,' Microsoft ');
        file = file.replace(new RegExp(i, 'g'), `${companies[i]}`);    
        file = file.replace(regp, ""); 
        file = file.replace(/,/, "");
        file = file.replace(/\./, "");    
    }
    file = file.replace(/\r\n/g, ' ').split(" ");
    totalfile = totalfile.replace(/\r\n/g, ' ').split(" ");

    // for (let num in file) {
    //     if (file[num] === 'a' || file[num] === 'an' || file[num] === 'the' || file[num] === 'and' || file[num] === 'or' || file[num] === 'but') {
    //         //file.splice(num, 1);
    //         file[num].replace(file[num],"");
    //         //totalfile.splice(num, 1);
    //     }
    // }
    file.filter((i) => {
        if (i != 'a' && i != 'an' && i != 'the' && i != 'and' && i != 'or' && i != 'but' && i != "") {
            return i;
        }
    });

    // for (let num in totalfile) {
    //     if (totalfile[num] === 'a' || totalfile[num] === 'an' || totalfile[num] === 'the' || totalfile[num] === 'and' || totalfile[num] === 'or' || totalfile[num] === 'but') {
    //         //totalfile.splice(num, 1);
    //         totalfile[num].replace(totalfile[num],"");
    //         //totalfile.splice(num, 1);
    //     }
    // }

    totalfile = totalfile.filter((i) => {
        if (i != 'a' && i != 'an' && i != 'the' && i != 'and' && i != 'or' && i != 'but' && i != "") {
            return i;
        }

    });

    totalword += totalfile.length;

    //console.log(file);
    //console.log(totalword);
    // for(let i in file){
    //     trie.insertData(i);
    // }

    file.forEach((i) => {
        trie.insertData(i);
    })

    trie.printData();
    //console.log(cbdata);
    //console.log(trie);

    Object.keys(cbdata).forEach((indata) => {
        for (j in companies) {
            if (indata == j) {
                //continue;
                companyoutput.addcompany(companies[j], cbdata[indata]);
                //companies[j][hit] = cbdata[indata];
                //let company = new companytree(j);
            }
        }
    })

    //console.log(companies);

    //company.addcompany('apple');
    //console.log(companyoutput);
    totalcomp = 0;
    console.log("Company	    Hit Count	    Relevance");
    for (data in companyoutput.company) {
        totalcomp += companyoutput.company[data]['hit'];
        if (companyoutput.company[data]['name'] == "Apple") {
            companyoutput.company[data]['name'] += " Inc.";
        }
        if (companyoutput.company[data]['name'] == "Verizon") {
            companyoutput.company[data]['name'] += " Wireless";
        }
        console.log(companyoutput.company[data]['name'], "    ", companyoutput.company[data]['hit'], "    ", (companyoutput.company[data]['hit'] * 100 / totalword).toFixed(3), '%');
    }

    console.log("Total           ", totalcomp, "        ", (totalcomp * 100 / totalword).toFixed(3), '%')
    console.log("Total Words     ", totalword);

}

function startquestion() {
    return RLS.question('Enter article (Type "." alone to stop): ');
}

var file = "";

//var data = RLS.question('Enter article (Type "." alone to stop): ');

while (file != '.') {
    file = startquestion();
    output(file);
}