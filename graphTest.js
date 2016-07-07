function assert(expr, mssg) {
    if (!expr)
        console.log(mssg);
    else
        console.log("test passed");
}



var v1 = new Vertex(1);
var v2 = new Vertex(2);
var v3 = new Vertex(3);
var v4 = new Vertex(4);
var v5 = new Vertex(5);
var v6 = new Vertex(6);
var v7 = new Vertex(7);
var v8 = new Vertex(8);
var v9 = new Vertex(9);

var e1 = new Edge(1, v1, v5);
var e2 = new Edge(2, v2, v5);
var e3 = new Edge(3, v3, v5);
var e4 = new Edge(4, v4, v5);
var e5 = new Edge(5, v5, v5);
var e6 = new Edge(6, v5, v5);
var e7 = new Edge(7, v6, v5);
var e8 = new Edge(8, v7, v5);
var e9 = new Edge(9, v8, v5);
var e0 = new Edge(0, v9, v5);

var g = new Graph();



g.addEdge(e1);
g.addEdge(e2);
g.addEdge(e3);
g.addEdge(e4);
g.addEdge(e5);
g.addEdge(e6);
g.addEdge(e7);
g.addEdge(e8);
g.addEdge(e9);
g.addEdge(e0);

g.removeVertex(v5);



console.log("Number of Components:  " + g.numComponents);
console.log("components: ");
for (comp in g.connectedComponents) {
    console.log(comp + ":  " + g.connectedComponents[comp]);
}

console.log(g.print());
//g.addEdge(e5);
//g.addEdge(e6);

/*assert(g.BFSearch(1, 7) === null, "doesn't find random vertex");
assert(g.BFSearch(1, 4) == 4, "cannot find existing path");*/

//console.log("path: " + g.findPath(1,9));

console.log("Number of Components:  " + g.numComponents);
