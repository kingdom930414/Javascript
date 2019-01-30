class Vector {

    constructor(list) {
       this.list=list;
    }
     get(num) {
       return this.list[num];
    };
     set(num, x){
         this.list[num]=x;
    };
     push(x){
        this.list.push(x);
    };
     pop(){
        this.list.pop();
    };
     insert(num, x){
        this.list.splice(num,0,x);
    };
    length(){
        return this.list.length;
    };
   
   * [Symbol.iterator]() {
       for (let x of this.list){
           yield x;
       }
    }
   * generate() {
       for (let x of this.list){
           yield x;
       }
    }
   }
   
   const imp = new Vector([1,2,3,4,5,6,7,8,9,0]);
   console.log(imp.list.length);
   console.log(imp.length());
   
   console.log('get(1): '+imp.get(1));
   
   imp.set(1,'Z');
   console.log('set(1,Z): '+imp.get(1));
   

   console.log('Length: '+ imp.list.length);
   
   imp.push();
   console.log('push(): ');
   for (let x of imp) { 
        console.log(x); 
   };
   imp.pop();
   console.log('pop: ');
   for (let x of imp) { 
      console.log(x); 
   };
   imp.insert(1,'A');
   console.log('insert(1,A): ');
   
   function print(Letter){
     console.log(Letter+imp.list);
   }
   
   var generate = imp.generate();
   
   for (let x of imp) { 
       console.log(generate.next());
   };
   
   for (let x of imp) { 
       console.log(x); 
   };