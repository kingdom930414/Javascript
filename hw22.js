var prompt = require("prompt");
var readline = require("readline");
var Queue = (function () {
    function Queue() {
        this.arr = [];
    }
    Queue.prototype.enqueue = function (value) {
        this.arr.push(value);
    };
    Queue.prototype.dequeue = function () {
        this.arr.shift();
    };
    Queue.prototype.front = function () {
        return this.arr[0];
    };
    Queue.prototype.isEmpty = function () {
        if (this.arr.length === 0)
            return true;
        else
            return false;
    };
    Queue.prototype.print = function () {
        console.log(this.arr.join(""));
    };
    Queue.prototype.output = function () {
        for (var i = 0; i < this.arr.length; i++) {
            console.log(this.arr[i]);
        }
    };
    return Queue;
}());

var Stack = (function () {
    function Stack() {
        this.arr = [];
    }
    Stack.prototype.push = function (value) {
        this.arr.push(value);
    };
    Stack.prototype.pop = function () {
        return this.arr.pop();
    };
    Stack.prototype.top = function () {
        return this.arr[this.arr.length - 1];
    };
    Stack.prototype.isEmpty = function () {
        if (this.arr.length == 0)
            return true;
        else
            return false;
    };
    Stack.prototype.print = function () {
        for (var i = this.arr.length - 1; i >= 0; i--) {
            console.log(this.arr[i]);
        }
    };
    return Stack;
}());

function transfer(input) {
    let opstack = new Stack();
    let postQ = new Queue();
    let temp;
    while (!input.isEmpty()) {
        temp = input.front();
        input.dequeue();
        if (temp.charCodeAt(0) >= 48 && temp.charCodeAt(0) <= 57 || temp == ".")
            postQ.enqueue(temp);
        else {
            postQ.enqueue(" ");
            if (temp == " ")
                continue; 
            else if (temp == "(")
                opstack.push(temp);
            else if (opstack.isEmpty())
                opstack.push(temp);
            else if (temp == ")") {
                while (opstack.top() != "(") {
                    postQ.enqueue(opstack.top());
                    opstack.pop();
                }
                opstack.pop();
            }
            else {
                while (!opstack.isEmpty() && opstack.top() != "(" && !checkPriority(temp, opstack.top())) {
                    postQ.enqueue(opstack.top());
                    opstack.pop();
                }
                opstack.push(temp);
            }
        }
    }
    while (!opstack.isEmpty()) {
        postQ.enqueue(opstack.top());
        opstack.pop();
    }
    return postQ;
}

function priority(input) {
    switch (input) {
        case "P": return 3;
        case "*": return 2;
        case "%": return 2;
        case "/": return 2;
        case "+": return 1;
        case "-": return 1;
        default: throw Error("input must be +, -, *, /, % , P(mean ^) and number");
    }
}

function checkPriority(a, b) {
    if (priority(a) > priority(b))
        return true;
    else
        return false;
}

function calculate(input) {
    let calstack = new Stack();
    debugger;
    let temp, topNum, nextNum, answer;
    while (!input.isEmpty()) {
        temp = input.front();
        input.dequeue();
        if (temp == " " && input.front() == " ")
            continue;
        else if (temp == " ")
            calstack.push(temp);
        else if (temp.charCodeAt(0) >= 48 && temp.charCodeAt(0) <= 57 || temp == ".") {
            var template = new Stack();
            while (!calstack.isEmpty() && calstack.top().charCodeAt(0) >= 48
                && calstack.top().charCodeAt(0) <= 57 || calstack.top() == ".") {
                template.push(calstack.pop());
            }
            calstack.push(temp);
            while (!template.isEmpty()) {
                calstack.push(template.pop());
            }
        }
        else {
            while (calstack.top() == " ") {
                calstack.pop();
            }
            var change = "";
            while (calstack.top() != " " && calstack.top() != undefined) {
                var x = calstack.top();
                calstack.pop();
                change += x;
            }
            topNum = parseFloat(change);
            while (calstack.top() == " ")
                calstack.pop(); 
            change = "";
            while (!calstack.isEmpty() && calstack.top() != " ") {
                var x = calstack.top();
                calstack.pop();
                change += x;
            }
            nextNum = parseFloat(change);
            switch (temp) {
                case "P": if (nextNum == 0 && topNum == 0) {
                    answer = 0;
                    break;
                }
                else {
                    answer = Math.pow(nextNum, topNum);
                    break;
                }
                case "*":
                    answer = nextNum * topNum;
                    break;
                case "%":
                    if (topNum == 0)
                        throw Error("expression is wrong!");
                    else if (nextNum > topNum)
                        answer = nextNum % topNum;
                    else
                        answer = nextNum % topNum;
                    break;
                case "/":
                    if (topNum == 0)
                        throw Error("expression is wrong!");
                    else
                        answer = nextNum / topNum;
                    break;
                case "+":
                    answer = nextNum + topNum;
                    break;
                case "-":
                    answer = nextNum - topNum;
                    break;
                default: throw Error("this postfix expression is not valid!");
            }
            var arr = answer.toString().split("");
            for (var i = arr.length - 1; i >= 0; i--) {
                calstack.push(arr[i]);
            }
            calstack.push(" ");
        }
    }
    var str = "";
    while (!calstack.isEmpty()) {
        var x = calstack.top();
        calstack.pop();
        str += x;
    }
    return parseFloat(str);
}

function rpn(input) {
    var result = "";
    if (input.indexOf(' ') == -1) {
        for (let i = 0; i < input.length; i++) {
            if (!parseInt(input[i])) {
                result += " " + input[i] + " ";
            } else {
                result += input[i];
            }
        }
    }
    var ar = result.split(/\s+/), st = [], token;
    while (token = ar.shift()) {
        if (token == +token) {
            st.push(token);
        } else {
            var n2 = st.pop(), n1 = st.pop();
            var re = /^[\+\-\/\*]$/;
            if (n1 != +n1 || n2 != +n2 || !re.test(token)) {
                console.log('Invalid expression: ' + result);
            }
            st.push(eval(n1 + token + ' ' + n2));
        }
    }
    if (st.length !== 1) {
        console.log('Invalid expression: ' + result);
    }
    return st.pop();
}

function solvePostfix(postfix) {
    var result = "";
    if (postfix.indexOf(' ') == -1) {
        for (let i = 0; i < postfix.length; i++) {
            if (!parseInt(postfix[i])) {
                result += " " + postfix[i] + " ";
            } else {
                result += postfix[i];
            }
        }
    }
    var resultStack = [];
    result = result.split(" ");
    for (var i = 0; i < result.length; i++) {
        if (result[i].isNumeric()) {
            resultStack.push(result[i]);
        } else {
            var a = resultStack.pop();
            var b = resultStack.pop();
            if (result[i] === "+") {

                resultStack.push(parseInt(a) + parseInt(b));
            } else if (result[i] === "-") {

                resultStack.push(parseInt(b) - parseInt(a));
            } else if (result[i] === "*") {

                resultStack.push(parseInt(a) * parseInt(b));
            } else if (result[i] === "/") {

                resultStack.push(parseInt(b) / parseInt(a));
            } else if (result[i] === "/") {

                resultStack.push(parseInt(b) % parseInt(a));
            } else if (result[i] === "^") {

                resultStack.push(Math.pow(parseInt(b), parseInt(a)));
            }
        }
    }
    if (resultStack.length > 1) {
        return "error";
    } else {
        return resultStack.pop();
    }
}

prompt.start();
prompt.get(["Enter infix expression"], function (err, res) {
    const str = res["Enter infix expression"];
    let infixinput = new Queue();
    let postQ = new Queue();

    for (var i = 0, a = str.trim().split(""); i < a.length; i++) {
        var x = a[i];
        if (parseInt(x) < 0)
            throw Error("Should not input negative number!");
        if (x == "O" || x == "W")
            continue;
            // console.log("----"+x);
        infixinput.enqueue(x);
    }
    console.log("The input infix expression 'POW' is replaced by 'P'>: ", infixinput.arr.join(""));
    postQ = transfer(infixinput);
    console.log("The postfix expression is: ", postQ.arr.join(""));
    let answer = calculate(postQ);
    console.log(answer);
    !(answer==null) ? console.log("Your expression answer is: " + answer) : console.log("Your expression have some problem");


    if (calculate(postQ) == null) {
        conosole.log("may be there is some mistake in your input argumentss")
    }
    var result = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const prefix1 = "Enter Q for quit or N for next step or continue input expression: ";
    const prefix2 = "Enter another infix math problem: ";
    result.setPrompt(prefix1);
    result.prompt();

    result.on("line", function (input) {
        if (input == "quit" || input == "Quit" || input == "Q" || input == "q")
            result.close();
        else if (input == "next" || input == "Next" || input == "N" || input == "n") {
            result.setPrompt(prefix2);
            result.prompt();
        }
        else {
            let change = new Queue(), after = new Queue();
            for (let i = 0, a = input.trim().split(""); i < a.length; i++) {
                var x = a[i];
                if (parseInt(x) < 0)
                    throw Error("Should not input negative number!");
                if (x == "O" || x == "W")
                    continue;
                change.enqueue(x);
            }
            console.log("The input infix expression 'POW' is replaced by 'P'>: ", change.arr.join(""));
            after = transfer(change);
            console.log("The postfix expression is: ", after.arr.join(""));
            let answer = calculate(after);
            !(answer==null) ? console.log("Your expression answer is: " + answer) : console.log("Your expression have some problem");
            result.setPrompt(prefix1);
            result.prompt();
        }
        result.on("close", function () {
            console.log("programme will close !");
        });
        if (err)
            console.error(err);
    });
})