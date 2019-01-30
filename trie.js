var readline = require("readline-sync");
var fs = require('fs');

class Node {
    constructor(char) {
        this.char = char;
        this.isEnd = false;
        this.count = 0;
        this.prefix = 0;
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node('');
    }

    add(word) {
        if (!this.root) {
            return null;
        }
        this.addTrieNode(this.root, word);
    };
    addTrieNode(node, word) {
        if (!node || !word) {
            return null;
        }
        node.prefix++;
        var char = word.charAt(0);
        var child = node.children[char];
        if (!child) {
            child = new Node(char);
            node.children[char] = child;
        }
        var front = word.substring(1);
        if (!front) {
            child.isEnd = true;
            child.count ++;
        }
        this.addTrieNode(child, front);
    };
    contain(word) {
        if (!this.root) {
            return false;
        }
        return this.search(this.root, word);
    };
    search(node, word) {
        if (!node || !word) {
            return false;
        }
        var char = word.charAt(0);
        var child = node.children[char];
        if (child) {
            var front = word.substring(1);
            if (!front && (child.count != 0)) {
                return true;
            } else {
                return this.search(child, front);
            }
        } else {
            return false;
        }
    };
 
 
}

var input = fs.readFileSync('companies.dat', "utf8");
var line = input.split("\n");
var companies = [];
var company = [];
var namelist = [];
for (var i in line) {
    var trie =new Trie();
    var hash = {};
    var synonym = line[i].split("   ");
    for (var j in synonym) {
        trie.add(synonym[j]);
        hash[synonym[j]]=0;
    }
    namelist[i]=synonym;
    companies[i]=hash;
    company[i]=trie;
}
// console.log("?!?!?!?!?!?!?!?!?!?!")
// console.log(companies)
// console.log(company)
var file = "";
var profile = "";
while (file != '.') {
    file = readline.question('Enter article (Type "." alone to stop): ');
    if (file == "") {
        console.log('Empty input!\n');
        return;
    }
    if (file == ".") {
        console.log('Trie Article closed.');
        break;
    }
    file = file.replace(new RegExp('"', "g"), "");
    file = file.replace(/,/, "");
    file = file.replace(/\./, "");
    profile += file+" ";
}
//console.log(profile);
var checklist = profile.split("");
for(var i=0;i<checklist.length;i++){
    for(var j=i+1;j<=checklist.length;j++){
        for(var n =0;n<line.length;n++)
            if(company[n].contain(profile.substring(i,j))){
                companies[n][profile.substring(i,j)]++;
                profile=profile.substring(0,i)+profile.substring(j,profile.length);
            }
    }
}
console.log("---------------CountHited------------------");
//console.log(profile);
console.log(companies);
console.log("-------------------------------------------")
var wordNum=0;

var restWords = profile.split(" ");
restWords.forEach((i)=>{
    if (i != 'a' && i != 'an' && i != 'the' && i != 'and' && i != 'or' && i != 'but' && i != "") {
        wordNum++;
    }
})
var relevance=0;
console.log("Company	    Hit Count	    Relevance");
var countHit = [];
for (var i in companies) {
    countHit[i] =0;
    for(var j in companies[i]){
       countHit[i]+=companies[i][j];
    }
    wordNum +=countHit[i];
}
//console.log("< countHit >  | ",countHit)
for(var i=0;i<companies.length;i++){
    console.log(namelist[i][0],"     ",countHit[i],"     ",(((countHit[i]*100/wordNum)>=10.0)?(countHit[i]*100/wordNum).toFixed(2):(countHit[i]*100/wordNum).toFixed(3))+"%");
    relevance+=countHit[i];
}

console.log("Total           ", relevance, "        ", ((relevance * 100 / wordNum)>=10.0)?(relevance * 100 / wordNum).toFixed(2):(relevance * 100 / wordNum).toFixed(3), '%')
console.log("Total Words     ", wordNum);