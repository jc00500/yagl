
var v1 = new YAGL.Vertex(1);
var v2 = new YAGL.Vertex(2);
var e1 = new YAGL.Edge(1, v1, v2);
var g = new YAGL.Graph();

try {
    g.addVertex();
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.addEdge();
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.addEdge(v1);
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.getVertex();
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.getVertex(null);
}
catch (e) {
    console.log("Passed: " + e.toString());
}

assert(g.getVertex(3) == null, "Passed: getVertex()");

g.addVertex(v1);
assert(g.getVertex(1) == v1, "Passed: getVertex()");

var arr = g.getAllVertices();
assert(arr.length == 1, "Passed: getAllVertices()");

assert(arr[0] == v1, "Passed: getAllVertices()");

g.addVertex(v2);
arr = g.getAllVertices();

assert(arr.length == 2, "Passed: getAllVertices()");
assert(arr[1] == v2, "Passed: getAllVertices()");

assert(g.getEdge(1) == null, "Passed: getEdge()");

try {
    g.getEdge(null);
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.getEdge();
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.addEdge();
}
catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    g.addEdge(null);
}
catch (e) {
    console.log("Passed: " + e.toString());
}

g.addEdge(e1);

arr = g.getEdges(v1.vid, v2.vid);
assert(arr.length == 1, "Passed: getEdges()");
assert(arr[0] == e1, "Passed: getEdges()");

g.addEdge(e1);
arr = g.getEdges(v1.vid, v2.vid);
assert(arr.length == 1, "Passed: addEdge()");

var e2 = new YAGL.Edge(2, v1, v2);
g.addEdge(e2);
arr = g.getEdges(v1.vid, v2.vid);
assert(arr.length == 2, "Passed: addEdge()");

arr = g.getAllEdges();
assert(arr.length == 2, "Passed: getAllEdges()");

var v3 = new YAGL.Vertex(3);
var e3 = new YAGL.Edge(3, v1, v3);
g.addEdge(e3);
console.log(g.toString());
arr = g.getAllVertices();
for (x in arr) {
    console.log(arr[x].toString());
}

arr = g.getAllEdges();
assert(arr.length == 3, "Passed: getAllEdges()");

v1.setVisited(true);
v2.setVisited(true);
v3.setVisited(true);

g.setAllVisitedFalse();
assert(v1.getVisited() == false, "Passed: setAllVisited()");
assert(v2.getVisited() == false, "Passed: setAllVisited()");
assert(v3.getVisited() == false, "Passed: setAllVisited()");

assert(g.isConnected() == true, "Passed: isConencted()");

var v4 = new YAGL.Vertex(4);
g.addVertex(v4);

assert(g.isConnected() == false, "Passed: isConencted()");
assert(g.findComponent(1) != g.findComponent(4), "Passed: findComponent()");

var e4 = new YAGL.Edge(4, v4, v4);
g.addEdge(e4);

arr = g.getAllEdges();
assert(arr.length == 4, "Passed: getAllEdges()");

assert(g.BFSearch(1, 4) == null, "Passed: BFSearch()");
assert(g.getPath(1, 4) == null, "Passed:  getPath()");

var e5 = new YAGL.Edge(5, v2, v4);
g.addEdge(e5);
arr = g.getAllVertices();
for (x in arr) {
    console.log(arr[x].toString());
}

arr = g.getAllEdges();
assert(arr.length == 5, "Passed: getAllEdges()");

assert(g.isConnected() == true, "Passed: isConencted()");
assert(g.findComponent(1) == g.findComponent(4), "Passed: findComponent()");

assert(g.BFSearch(4, 4) == 4, "Passed: BFSearch()");
assert(g.getPath(1, 4) != null, "Passed:  getPath()");

assert(g.BFSearch(1, 4) == 4, "Passed: BFSearch()");
console.log("Path: " + g.getPath(1,4));

console.log(g.toString());

assert(g.removeVertex(10) == -1, "Passed: removeVertex()");

console.log(g.vertices);
assert(g.removeVertex(3) == 0, "Passed: removeVertex()");

arr = g.getAllEdges();
assert(arr.length == 4, "Passed: getAllEdges()");
assert(g.isConnected() == true, "Passed: isConencted()");

arr = g.getAllVertices();
for (x in arr) {
    console.log(arr[x].toString());
}

assert(g.removeEdge(3) == -1, "Passed: removeEdge()");

assert(g.removeEdge(5) == 0, "Passed: removeEdge()");
assert(g.isConnected() == false, "Passed: isConnected()");
assert(arr.length == 3, "Passed: getAllEdges()");
arr = g.getAllVertices();
for (x in arr) {
    console.log(arr[x].toString());
}

console.log(g.connectedComponents);

assert(g.removeEdge(4) == 0, "Passed: removeEdge()");
arr = g.getAllEdges();
assert(arr.length == 2, "Passed: getAllEdges()");
assert(g.isConnected() == false, "Passed: isConnected");

console.log(g.toString());

assert(g.removeVertex(4) == 0, "Passed: removeVertex()");
assert(g.isConnected() == true, "Passed: isConnected()");

console.log(g.toString());

assert(g.removeEdge(1) == 0, "Passed: removeEdge()");
console.log(g.toString());
assert(g.isConnected() == true, "Passed: isConnected()");

assert(g.removeEdge(2) == 0, "Passed: removeEdge()");
console.log(g.toString());
assert(g.isConnected() == false, "Passed: isConnected()");









