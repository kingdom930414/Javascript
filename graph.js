var fs = require('fs');

function createGraph() {
    var input = fs.readFileSync('infile.dat', 'utf8').split(/\s*/).map(Number);
    var input2 = input.reverse();
    var nodes = input2.pop();
    var edges = input2.pop();
    var graph = [];
    for (var i = 0; i < nodes; i++) {
        graph.push([i]);
    }
    while (input.length > 0) {
        var edge_end_node_1 = input2.pop();
        var edge_end_node_2 = input2.pop();
        graph[edge_end_node_1].push(edge_end_node_2);
    }
    return graph;
}


function countIndegree(graph) {
    var indegree = [];
    for (var i = 0; i < graph.length; i++) {
        indegree.push([graph[i][0], 0]);
    }
    for (var i = 0; i < graph.length; i++) {
        for (var j = 1; j < graph[i].length; j++) {

            for (var k = 0; k < indegree.length; k++) {
                if (indegree[k][0] === graph[i][j]) {
                    index = k;
                    break;
                }
            }
            indegree[index][1]++;
        }
    }
    return indegree;
}


function topologicalSort_1(graph) {
    var indegree_0 = [];
    while (graph.length > 0) {
        var indegree = countIndegree(graph);
        for (var j = 0; j < indegree.length; j++) {
            if (indegree[j][1] === 0) {
                index =j;
                break;
            }
        }
        indegree_0.push(graph[index][0]);
        graph.splice(index, 1);
    }
    return indegree_0;
}


function topologicalSort_2(graph) {
    var indegree_0 = [];
    while (graph.length > 0) {
        var indegree = countIndegree(graph);
        var index;
        for (var j = indegree.length-1; j >= 0; j--) {
            if (indegree[j][1] === 0) {
                index = j;
                break;
            }
        }
        indegree_0.push(graph[index][0]);
        graph.splice(index, 1);
    }
    return indegree_0;
}


var graph_1 = createGraph();
var graph_2 = graph_1.slice();
var output_1 = topologicalSort_1(graph_1);
var output_2 = topologicalSort_2(graph_2);
console.log(output_1);
console.log(output_2);