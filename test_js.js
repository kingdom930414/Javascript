const fs = require('fs');
const readline = require('readline-sync');

const filename = readline.question('what file should I read from?');

let file = fs.readFileSync('input.txt',{encoding:'utf8'});
console.log(file);
console.log(countLetters(file));
file = file.toUpperCase();
fs.writeFileSync('output.txt',file,{enoding:'utf8'});


function countLetters(haystack,needle){
    let count = 0;

    for(let i = 0; i< haystack;i++){
        if(haystack[i]===needle){
            count++;
        }
    }
}