const path = require ("path");
const fs = require ('fs');
const readline = require ('readline-sync');

const filename = readline.question('what file should I read from?');
var key = 5;
let file = fs.readFileSync('input.txt',{encoding:'utf8'});
var words=  file.split(" ");
var counter = 1;
for(var i=0;i<words.length;i++){
    var letters = words[i].split(""); 
    for(var i=0;i<letters.length;i++){
        for(var j=0;j<3;j++){

            var ascCode = letters[i].charCodeAt(0);
            if(ascCode>64&&ascCode<91){
                ascCode-=key;
                do{
                    ascCode=ascCode+26;
                }while(ascCode>90)
                letters[i]=String.fromCharCode(ascCode);
            }else if(ascCode>96&&ascCode<123){
                ascCode-=key;
                do{
                    ascCode=ascCode+26;
                }while(ascCode+key>122)
                letters[i]=String.fromCharCode(ascCode);
            }else{
                letters[i]=String.fromCharCode(ascCode);
            }
        }
        if(counter%3)
        {
            key+=2;
        }
        counter+=1;
    }
}

fs.writeFileSync('solution.txt',file,{enoding:'utf8'});