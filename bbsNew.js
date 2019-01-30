var array = [], arr = [],arr2 = [];

for (var i = 0; i < 20; i++) {
    array[i] = Math.floor((Math.random() * 10) + 1);
    arr[i] = Math.floor((Math.random() * 10) + 1);
    arr2[i] = Math.floor((Math.random() * 10) + 1)
}

console.log('origin array', arr);
console.log('BouncyBubbleNewSort', BouncyBubbleNewSort(arr));

console.log('BouncyBubbleSort   ', BouncyBubbleSort(arr));

console.log('BouncyBubbleOldSort', BouncyBubbleOldSort(arr));


//different number reverse
function BouncyBubbleNewSort(input) {
    let temp;
    let check = 0;
    let len = input.length - 1;
    let left = 0;
    let right = 0;

    for (var i = 0; i < len; i++) {
        if (i%2 ==0) {
            for (let j = 0; j < len; j++) {
                if (input[j] > input[j + 1]) {
                    temp = input[j];
                    input[j] = input[j + 1];
                    input[j + 1] = temp;
                    check++;
                    //console.log(j);
                }
            }
            right++;
        } else {
            //reverse
            for (let j = len; j > 0; j--) {
                if (input[j] < input[j - 1]) {
                    temp = input[j];
                    input[j] = input[j - 1];
                    input[j - 1] = temp;
                    check++;
                    //console.log(j);
                }
            }
            left++;
        }
        //console.log(check)
        if (check == 0) {
            break;
        } else {
            // reloop
            check = 0;
        }
    }

    return input;
}

//total number reverse
function BouncyBubbleOldSort(input) {
    let temp;
    let check = 0;
    let len = input.length - 1;
    let left = 0;
    let right = 0;

    for (var i = 0; i < len; i++) {
        //odd loop
        if (i == len) {
            for (let j = left; j < len - right; j++) {
                if (input[j] > input[j + 1]) {
                    temp = input[j];
                    input[j] = input[j + 1];
                    input[j + 1] = temp;
                    check++;
                    //console.log(j);
                }
            }
            right++;
        } else {
            //reverse
            for (let j = len - right; j > left; j--) {
                if (input[j] < input[j - 1]) {
                    temp = input[j];
                    input[j] = input[j - 1];
                    input[j - 1] = temp;
                    //console.log(j);
                    check++;
                }
            }
            left++;
        }
        //console.log(check)
        if (check == 0) {
            break;
        } else {
            // reloop
            check = 0;
        }
    }

    return input;
}

function BouncyBubbleSort(input) {
    let temp;
    let check = 0;
    let len = input.length - 1;
    let left = 0;
    let right = 0;

    for (var i = 0; i < len; i++) {
        if (i == len) {
            for (let j = 0; j < len; j++) {
                if (input[j] > input[j + 1]) {
                    temp = input[j];
                    input[j] = input[j + 1];
                    input[j + 1] = temp;
                    check++;
                    //console.log(j);
                }
            }
            right++;
        } else {
            //reverse
            for (let j = len; j > 0; j--) {
                if (input[j] < input[j - 1]) {
                    temp = input[j];
                    input[j] = input[j - 1];
                    input[j - 1] = temp;
                    check++;
                    //console.log(j);
                }
            }
            left++;
        }
        //console.log(check)
        if (check == 0) {
            break;
        } else {
            // reloop
            check = 0;
        }
    }

    return input;
}

