
var v1;

try {
    v1 = new YAGL.Vertex();
} catch (e) {
    console.log("Passed - " + e.toString());
}

try {
    v1 = new YAGL.Vertex("v1");
} catch (e) {
    console.log("Passed - " + e.toString());
}

v1 = new YAGL.Vertex(-1);
assert(v1.getVid() == -1, "Passed - negative integer passed to Vertex constructor");

var v2 = new YAGL.Vertex(1);
assert(v1.getVid() == 1, "Passed - int passed to Vertex constructor");

v1.vid = 1;
assert(v1.getVid() == -1, "Passed - vid is immutable");

v1.setParent(null);
assert(v1.getParent() == undefined, "Passed - parent can be set to null");

try {
    v2.setParent("v1");
} catch (e) {
    console.log("Passed: " + e.toString());
}

v1.setParent(v2.getVid());
assert(v1.getParent() == v2.getVid(), "Passed - parent can be set to int");

try {
    v1.setVisited();
} catch (e) {
    console.log("Passed: " + e.toString());
}

try {
    v1.setVisited(1);
} catch (e) {
    console.log("Passed: " + e.toString());
}

v1.setVisited(false);
v1.setVisited(true);
assert(v1.getVisited() == true, "Passed: setVisited(true)");

var v3 = new YAGL.Vertex(1);

assert(!v1.equals(v3), "Passed - equals returns false when vids are different");
assert(v2.equals(v3), "Passed - equals returns true when vids are the same");

console.log("ToString(): " + v2.toString());




