var fs = require("fs");
var array=[];
for(var i=0;i<50;i++){
    array[i]=i+1;
}

console.log(array.filter(x=>x%2!=0));

// var num = fs.readSync("plz input a number for your array:","");
// var arr = [];
// for(var j=0;j<num;j++){
//     console.log("This is the"+(j+1)+" number");
//     arr[j]=  fs.readSync("input your number:","");
// }
 var compare=fs.readSync(1,"plz input a number to compare:","",,0);
// console.log(arr.filter(x=>x>compare));

// console.log(arr.filter(x=>x<compare));
