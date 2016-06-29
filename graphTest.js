function assert(expr, mssg) {
    if (!expr)
        console.log(mssg);
    else
        console.log("test passed");
}

var v1 = new Vertex("1");
v1.setVisited(true);
console.log(v1.toString());

var v2 = new Vertex("2",  null);
console.log(v2);
v2.setVisited(true);

var g = new Graph();
assert(g.addVertex(v1) === v1);
assert(g.addVertex(v2) === v2);

console.log(g.vertices.length)

g.setAllVisitedFalse();
console.log(v1.toString());
console.log(v2.toString());

assert(g.findVertex(new Vertex("dope")) == null);
assert(g.findVertex(v1.vid) === v1);

var e = new Edge(v1, v2);
assert(g.addEdge(v1, v2).equals(e), "failed to add edge");
 g.addVertex(new Vertex("3"));
console.log(g.print());

