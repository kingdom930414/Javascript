var head = "   ";
var tail = "   ";
var barrier = "   ";
var name=prompt("Please enter your ","")
for(var i=0;i<20;i++){
    tail += "|   "; 
    barrier += "---+";
}
for(var i=1;i<120;i++){
    if(i<10)
    {
        head += " "+i+"  ";
    }else if(i>9&&i<100){
        head += " "+i+" ";
    }else if(i>99&&i<1000){      
        head += ""+i+" ";
    }
}
console.log(head);
for(var i=1;i<20;i++){
    if(i<10)
    {
        console.log(" "+i+" "+tail);
    }else if(i>9&&i<100){
        console.log(""+i+" "+tail);
    }else if(i>99&&i<1000){
        console.log(i+tail);
    }
    console.log(barrier);
}
console.log(" Finish!!");