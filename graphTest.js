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
g.addEdge(new Vertex("3"), new Vertex("4"));
console.log(g.print());

assert(g.BFSearch("1","2") === "2", "Prog was unableto gind existing vertex");
assert(g.BFSearch("1", "3") === null, "found un-adjacent vertex");
assert(g.BFSearch("7", "2") === null, "searched using unreal vid");
assert(g.BFSearch("3", "3") === "3", "cannot find itself");
assert(g.BFSearch("3", "1") === null, "found non connected vid");

console.log(g.connectedComponents);
console.log("testing findComponent");
assert(g.findComponent(null) === null, "null is not null");
assert(g.findComponent("7") === null, "found a component that is not connected");
assert(g.findComponent("1") === "2", "1 did not return 2");
assert(g.findComponent("2") === "2", "2 did not return 2");
assert(g.findComponent("3") === "4", "3 did not return 4");

console.log("testing unionComponents");
assert(g.unionComponents("7", "11") === -1, "unioned bad vid's");
assert(g.unionComponents("7") === -1, "unioned bad vid's");
assert(g.unionComponents("1", "11") === -1, "unioned bad vid's");
assert(g.unionComponents("1") === -1, "unioned bad vid's");
assert(g.unionComponents() === -1, "unioned bad vid's");
assert(g.unionComponents("4", "4") === 0, "unable to union existing components");

console.log("testing getAllComponents");
console.log(g.getAllComponents());
