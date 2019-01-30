function pad(str,char,len){
    if(len>str.length){
        str=char.repeat(len-str.length)+str;
    }
    return str;
}

var addBinary = function(a, b) {
    const maxlen=Math.max(a.length,b.length);
    a=pad(a,'0',maxlen);
    b=pad(b,'0',maxlen);
    let carry=0;
    let zeroCode='0'.charCodeAt(0);
    let sum='';
    for(let i=maxlen-1;i>-1;i--){
        const ca=a.charCodeAt(i)-zeroCode;
        const cb=b.charCodeAt(i)-zeroCode;
        // console.log(ca,cb);
        const sum1=(carry+ca+cb);
        const add=sum1%2;
        carry=Math.floor(sum1/2);
        sum+=add.toString();
        // console.log(a,b,sum);
    }
    if(carry!=0) sum+=carry.toString();
    return sum.split('').reverse().join('');
};

    var a="1101";
    var b="1100";
    console.log(addBinary(a,b));
