const readline = require ('readline-sync');

const cq = {head:null,tail:null,length:0};
const size = 12;
function Node(value,next){
    this.value = value;
    this.next = next;
}
function add(value){
    let new_node = new Node(value,null);
    if(cq.length<size){
        if(cq.head == null){
            cq.head = new_node;
        }else{
            cq.tail.next = new_node;
        }
        cq.tail = new_node;
        cq.tail.next = cq.head;
        cq.length++;
    }else if(cq.length ==size){
        cq.head.value = value;
        cq.length++;
    }else{
        let temp = cq.head;
        for(let i=1;i<=cq.length-size;i++){
            temp = temp.next;
        }
        temp.value = value;
        cq.length++;
    }
}
function output(cq){
    let n = cq.head;
    while(n.next != cq.head){
        console.log(n.value);
        n = n.next;
    }
    console.log(n.value);
}
function main(){
    while(true){
        const input = readline.question('Please enter a string or quit  ');
        if(input ==='quit'){
        output(cq);
        break;
        }else{
            add(input);
        }
    }
}
main();