var inputArr = [910,34,1122,78,12,56];
console.log("Input array",inputArr);
var outputArr = bouncyBubbleSort(inputArr);
console.log("Output array",outputArr);

function bouncyBubbleSort(arr){
    var start = 0;
    var end = arr.length-1;
    var temp;
    var done;

    for(var i=0;i<arr.length-1;i++){
        done = true;                            //assume the sort is done
        if(i%2===0){
            for(var j=start;j<end;j++){         //from beginning to end 
                if(arr[j]>arr[j+1]){
                    temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                    done=false;                 //if swapped, means the loop should continue 
                }
            } 
            end--;                              //pass the number that already sorted
        }else{
            for(var j=end;j>start;j--){         //from end to beginning
                if(arr[j]<arr[j-1]){
                    temp=arr[j];
                    arr[j]=arr[j-1];
                    arr[j-1]=temp;
                    done=false;
                }
            }
            start++;
        }

        if(done)
            break;
    }

    return arr;
}

