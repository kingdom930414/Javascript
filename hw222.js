var prompt = require("prompt");
var rl = require("readline");
	//infix: ( 3.2 + 3.1 + 4.2 * 4.2 / 2.3 ) * ( 5.4 * 3.5 - 6.6 ) - 8.7 POW 9.8
    //postfix: 3.1 4.2 2.3 / + 5.4 3.5 * 6.6 - * 8.7 9.8 POW -
function queue(){
    var list = [];
    this.enqueue = function (value){
        list.push(value);
    }
    this.dequeue = function(){
        list.shift();
    }
    this.front = function(){
        return list[0];
    }
    this.isEmpty = function(){
        var tof = (list.length == 0)?true:false;
        return tof;
    }
    this.printf = function (){
        console.log(list.join(""));
    }
    this.output = function (){
        for(var i = 0; i < list.length ; i++ ) {
            console.log(list[i]);
        } 
    }
    this.list = function () {
        return list;
    }
}

function stack(){
    var list = [];
    this.push = function (value) {
        list.push(value);
    }
    this.pop = function (){
        return list.pop();
    }
    this.top = function (){
        return list[list.length-1];
    }
    this.isEmpty = function(){
        var tof = (list.length == 0)?true:false;
        return tof;
    }
    this.printf = function (){
        for(var i = list.length - 1; i >=0;i--){
            console.log(list[i]);
        }
    }
    this.output = function (){
        for(var i = 0; i < list.length ; i++ ) {
            console.log(list[i]);
        } 
    }
    this.list = function () {
        return list;
    }
}


var postfix = (function(entry){

    var s = new stack();
    var q = new queue();
    var cur;
    while(!entry.isEmpty()){
        cur = entry.front();
        // console.log("----curEntry--: "+cur)
        entry.dequeue();
        if(cur.charCodeAt(0) >= 48 && cur.charCodeAt(0) <= 57 || cur == ".")
            q.enqueue(cur);
        else {
            q.enqueue(" ");
            if (cur == " ")
                continue;
            else if(cur == "(")
                s.push(cur);
            else if(s.isEmpty())
                s.push(cur);
            else if(cur == ")"){
                while(s.top()!="("){
                    q.enqueue(s.top());
                    s.pop();
                }
                s.pop();
            }
            else{
                //console.log("----curEntry--: "+cur)
                while(!s.isEmpty() && s.top() != "(" && prior(cur) <= prior(s.top())){
                    q.enqueue(s.top());
                    s.pop();
                }
                s.push(cur);
                // console.log("stack????");
                // s.output();
            }
        }
    }
    // console.log("--queue---");
    // q.output();
    while(!s.isEmpty()){
        q.enqueue(s.top());
        s.pop();
    }
    return q;
});

function prior(entry){
    switch (entry){
        case "P": 
            return 3;
        case "*": 
        case "/": 
        case "%": 
            return 2;
        case "+": 
        case "-": 
            return 1;
        default: throw Error("Input must be +, -, *, /, % , POW or number");

    }
}

function eval(input) {
    let s = new stack();
    let curEntry, top, next, result;
    while (!input.isEmpty()) {
        curEntry = input.front();
        input.dequeue();
        if (curEntry == " " && input.front() == " ")
            continue;
        else if (curEntry == " ")
            s.push(curEntry);
        else if (curEntry.charCodeAt(0) >= 48 && curEntry.charCodeAt(0) <= 57 || curEntry == ".") {
            var t = new stack();
            while (!s.isEmpty() && s.top().charCodeAt(0) >= 48
                && s.top().charCodeAt(0) <= 57 || s.top() == ".") {
                t.push(s.pop());
            }
            s.push(curEntry);
            while (!t.isEmpty()) {
                s.push(t.pop());
            }
        }
        else {
            while (s.top() == " ") {
                s.pop();
            }
            var digit = "";
            while (s.top() != " " && s.top() != undefined) {
                var x = s.top();
                s.pop();
                digit += x;
            }
            top = parseFloat(digit);
            while (s.top() == " ")
                s.pop(); 
            digit = "";
            while (!s.isEmpty() && s.top() != " ") {
                var x = s.top();
                s.pop();
                digit += x;
            }
            next = parseFloat(digit);
            switch (curEntry) {
                case "P": if (next == 0 && top == 0) {
                    result = 0;
                    break;
                }
                else {
                    result = Math.pow(next, top);
                    break;
                }
                case "*":
                    result = next * top;
                    break;
                case "%":
                    if (top == 0)
                        throw Error("expression is wrong!");
                    else if (next > top)
                        result = next % top;
                    else
                        result = next % top;
                    break;
                case "/":
                    if (top == 0)
                        throw Error("expression is wrong!");
                    else
                        result = next / top;
                    break;
                case "+":
                    result = next + top;
                    break;
                case "-":
                    result = next - top;
                    break;
                default: throw Error("this postfix expression is not valid!");
            }
            var arr = result.toString().split("");
            for (var i = arr.length - 1; i >= 0; i--) {
                s.push(arr[i]);
            }
            s.push(" ");
        }
    }
    var str = "";
    while (!s.isEmpty()) {
        str += s.top();
        s.pop();
    }
    return parseFloat(str);
}
prompt.start();

prompt.get(["Enter infix expression"], function (err, res) {
    const str = res["Enter infix expression"];
    var infix = new queue();
    var q = new queue();
    var a = str.trim().split("");
    for (var i = 0; i < a.length; i++) {
        var x = a[i];
        if (parseInt(x) < 0)
            throw Error("Should not input negative number!");
        if (x == "O" || x == "W")
            continue;
        infix.enqueue(x);
    }
    //infix.output();
    console.log("The input infix expression 'POW' is replaced by 'P': ", infix.list().join(""));
    q = postfix(infix);
    console.log("The postfix expression is: ", q.list().join(""));
    var answer = eval(q);
    // console.log(answer);
    !(answer==null) ? console.log("Your expression answer is: " + answer) : console.log("Your expression have some problem");

    if (eval(q) == null) {
        conosole.log("may be there is some mistake in your input argumentss")
    }
    var output = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var info1 = "Enter Q for quit or N for next step or continue input expression: ";
    var info2 = "Enter another infix math problem: ";
    output.setPrompt(info1);
    output.prompt();

    output.on("line", function (input) {
        if (input == "quit"  || input == "q")
            output.close();
        else if (input == "next"  || input == "n") {
            output.setPrompt(info2);
            output.prompt();
        }
        else {
            var prev = new queue();
            var afterward = new queue();
            var a = input.trim().split("");
            for (var i = 0; i < a.length; i++) {
                var x = a[i];
                if (parseInt(x) < 0)
                    throw Error("Should not input negative number!");
                if (x == "O" || x == "W")
                    continue;
                prev.enqueue(x);
            }
            console.log("The input infix expression 'POW' is replaced by 'P'>: ", prev.list().join(""));
            afterward = postfix(prev);
            console.log("The postfix expression is: ", afterward.list().join(""));
            var result = eval(afterward);
            if(result!=null) {
                console.log("Your expression result is: " + result);
            }else{
                console.log("Your expression have some problem");
            }
            output.setPrompt(info1);
            output.prompt();
        }
        output.on("close", function () {
        });
        if (err)
            console.error(err);
    });
})
