var e1;

try {
    e1 = new YAGL.Edge(null, null, null);
} catch (e) {
    console.log("Passed - " + e.toString());
}

try {
    e1 = new YAGL.Edge(1, null, null);
} catch (e) {
    console.log("Passed - " + e.toString());
}

var v1 = new YAGL.Vertex(1);
var v2 = new YAGL.Vertex(2);

try {
    e1 = new YAGL.Edge("e1", v1, v2);
} catch (e) {
    console.log("Passed - " + e.toString());
}

e1 = new YAGL.Edge(1, v1, v1);

assert(e1.getEid() == 1, "Passed - getEID() returns the correct value");
assert(e1.getFirst().getVid() == 1, "Passed - getFirst() returns first vertex");
assert(e1.getSecond().getVid() == 1, "Passed - getSecond() returns same vertex");

e1 = new YAGL.Edge(1, v1, v2);

assert(e1.getEid() == 1, "Passed - getEID() returns the correct value");
assert(e1.getFirst().getVid() == 1, "Passed - getFirst() returns first vertex");
assert(e1.getSecond().getVid() == 2, "Passed - getSecond() returns second vertex");

