var fs = require("fs");

// fs.readFile("input.txt", "utf8", function(error, text) {
//   if (error)
//     throw error;
//   console.log("The file contained:", text);
// });
var file=fs.readFileSync("input.txt","utf-8");
console.log(file)
var key=5;
var words=  file.split(" ");
for(var i=0;i<words.length;i++){
    //file information
    console.log(words[i]);
}
var counter = 0;
var result = "";
for(var i=0;i<words.length;i++){
    var letters = words[i].split(""); 
    for(var j=0;j<letters.length;j++){
        var ascCode = letters[j].charCodeAt(0);
        //console.log("  ",letters[j])
        //console.log("asccode::",ascCode);
        if(counter%3==0&&counter>0)
        {
            //console.log(key);
            key+=2;  
        }
            if(ascCode>64&&ascCode<91){
                //console.log("Uppercase");
                ascCode-=key;
                if(ascCode<65){
                    for(;ascCode<65;){
                        ascCode=ascCode+26;
                    }
                }else if(ascCode>90){
                    for(;ascCode>90;){
                        ascCode=ascCode-26;
                    }
                }
                letters[j]=String.fromCharCode(ascCode);
                //console.log("cipher is ",letters[j]);
                result+=letters[j];
            }else if(ascCode>96&&ascCode<123){
                //console.log("lowercase");
                ascCode-=key;
                if(ascCode<97){
                    for(;ascCode<97;){
                        ascCode=ascCode+26;
                    }
                }else if(ascCode>122){
                    for(;ascCode>122;){
                        ascCode=ascCode-26;
                    }
                }
               
                letters[j]=String.fromCharCode(ascCode);
                //console.log("cipher is ",letters[j]);
                result+=letters[j];
            }else{
                letters[j]=String.fromCharCode(ascCode);
                //console.log("cipher is ",letters[j]);
                result+=letters[j];
            }
       
        //console.log("counter",counter)
        //console.log("key",key );
        counter+=1;  
    }
    counter+=1;
    result+=" ";
}
console.log("the result is ",result);
fs.writeFileSync('solution.txt',result,{enoding:'utf8'});
