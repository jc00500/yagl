var initializeGraph = function () {
    var g = new Graph();

    var v1 = new Vertex(1);
    var v2 = new Vertex(2);

    var e1 = new Edge(1, v1, v2);

    g.addEdge(e1);

    return g;
}
