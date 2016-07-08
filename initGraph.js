var initializeGraph = function () {
    var g = new YAGL.Graph();

    var v1 = new YAGL.Vertex(1);
    var v2 = new YAGL.Vertex(2);

    var e1 = new YAGL.Edge(1, v1, v2);

    g.addEdge(e1);

    return g;
}
