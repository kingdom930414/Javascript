const fs = require('fs');

class hash{
    constructor(list) {
        this.list=list;
    }
    get(key){
        var result;
        this.list.forEach(pairs => {
            if (pairs[0] === key) {
                result = pairs[1]
            }
        })
        return result
    };
    set(key,value){
        this.list.push([x, y])
    }
    has(key){
        var flag=false;
        this.list.forEach(pairs => {
            if (pairs[0] === key) {
                flag=true;
            }
        })
        return flag;
    };
    delete(key){
        var result;
        if(this.has(key)){
            this.list.forEach(pairs => {
                if (pairs[0] === key) {
                    result = pairs[1];
                }
            })
        }else{
            result = undefined;
        }
        return result;
    };
}
var hashtable= new hash();
var l = [7, 22, 29, 18, 44, 43, 33, 42, 27, 89, 30, 95, 64, 85];
var list=new Array(21);
for(var i=0; i<list.length;i++){
    list[i]=new Array();
}

for(var i=0;i<l.length;i++){
    var index=l[i]%21;
    var inserted=0;
    var count=0;
    while(inserted==0){
        if(list[index].length<2){
            list[index].push([l[i],i+1]);
            inserted=1;
        }else{
            index=(l[i]+i+2*i*i)%21;
            count++;
        }
    }
}

hashtable.list=list;

for(var i=0; i<hashtable.list.length; i++){
    if(hashtable.list[i].length == 1){
        console.log("(Bucket) "+ i +" (First Key) "+ hashtable.list[i][0][0] +" (First Value) " + hashtable.list[i][0][1]);
    }else if(hashtable.list[i].length == 2){
        console.log("(Bucket) "+ i +" (First Key) "+ hashtable.list[i][0][0] +" (First Value) " + hashtable.list[i][0][0] + " (Second Key) "+ hashtable.list[i][1][0] +" (Second Value) " + hashtable.list[i][1][1]);
    }else{
        console.log("(Bucket) "+ i + " is empty.")
    }
}
console.log(hashtable.list);