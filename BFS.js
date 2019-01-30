const fs=require('fs');

function graph(){
    var input=fs.readFileSync('infile.dat', 'utf8');
    var nodes=input.split("\n")[0].split(" ")[0];
    var edges=input.split("\n")[0].split(" ")[1];
    var matrix = [];
    for(var i=0;i<nodes;i++){
        matrix[i]=[];
        for(var j=0;j<nodes;j++){
            matrix[i][j]=0;
        }
    }
    //console.log(matrix)
    var e1,e2;
    for(var i=0;i < edges; i++){
        e1=input.split("\r\n")[i+1].split(" ")[0];
        e2=input.split("\r\n")[i+1].split(" ")[1];
        matrix[e1][e2]=1;
        matrix[e2][e1]=1;
    }
    console.log(matrix)
    return matrix;
}

function bfs(graph,root){
    var q= [];
    var nodes = graph.length;
    var step = [];
    for(var i=0;i<nodes;i++)
        step.push(0);
    step[root]=1;
    var bfn = 1;
    q.push(root);
    while(q.length!=0){
        var e=q.shift();
        console.log(e+" "+(bfn++));
        for(var i=e;i<nodes;i++){
            if(graph[e][i] == 1 && step[i] == 0){
                //console.log(graph[e][i])
                q.push(i);
                step[i]= 1;
            }
        }
    }

}
var graph=graph();
bfs(graph,0);