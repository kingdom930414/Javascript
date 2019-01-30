var readlineSync = require('readline-sync');
const readline = require('readline');

let MaxHeap = function() {
	
	let heap = [null];
	
	this.print = () => heap;

	this.insert = function(num) {
		heap.push(num);
		if (heap.length > 2) {
			let idx = heap.length - 1;
			while (heap[idx] < heap[Math.floor(idx/2)]) {
				if (idx >= 1) {
					[heap[Math.floor(idx/2)], heap[idx]] = [heap[idx], heap[Math.floor(idx/2)]];
					if (Math.floor(idx/2) > 1) {
						idx = Math.floor(idx/2);
					} else {
						break;
					}
				}
			}
		}
	};
	



     this.isEmpty = function()  {
        if(heap.length > 1) {
            return false;
        }
        else {
            return true;
        }
    };


	this.remove = function() {
		let smallest = heap[1];
		if (heap.length > 2) {
			heap[1] = heap[heap.length - 1];
			heap.splice(heap.length - 1);
			if (heap.length == 3) {
				if (heap[1] > heap[2]) {
					[heap[1], heap[2]] = [heap[2], heap[1]];
				};
				return smallest;
			}
			let i = 1;
			let left = 2 * i;
			let right = 2 * i + 1;
			while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
				if (heap[left] > heap[right]) {
					[heap[i], heap[right]] = [heap[right], heap[i]];
					i = 2 * i + 1;
				} else {
					[heap[i], heap[left]] = [heap[left], heap[i]];
					i = 2 * i;
				};
				left = 2 * i;
				right = 2 * i + 1;
				if (heap[left] == undefined || heap[right] == undefined) {
					break;
				}
			};
		} else if (heap.length == 2) {
			heap.splice(1, 1);
		} else {
			return null;
		};
		return smallest;
	};

};


var maxheap = new MaxHeap();
console.log('\n Please input 10 numbers, one line at a time.');
var num = [11,22,33,44,50,60,70,80,90,0];
for (var i=0;i<10;i++){
	    maxheap.insert(parseFloat(num[i]));
}
console.log('\n Output the numbers in descending order, one line at a time.');
for (i=0; i<10;i++){
    console.log(maxheap.remove());
}
