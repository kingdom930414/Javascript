function twosum(list,result){
    var output = [];
    for(var i=0;i<list.length;i++){
        for(var j=i+1;j<list.length;j++){
            if(list[i]+list[j]==result){
                output[0]=i;
                output[1]=j;
                return output;
            }
        }
    }
}

var list = [1,2,3,4,5,6];
result = 12;
var output=twosum(list,result);
console.log(output);