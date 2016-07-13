var initializeGraph = function () {
    var g = new YAGL.Graph();

    var v1 = new YAGL.Vertex(1);
    var v2 = new YAGL.Vertex(2);
    var v3 = new YAGL.Vertex(3);
    var v4 = new YAGL.Vertex(4);
    var v5 = new YAGL.Vertex(5);
    var v6 = new YAGL.Vertex(6);
    var v7 = new YAGL.Vertex(7);
    var v8 = new YAGL.Vertex(8);

    var e1 = new YAGL.Edge(1, v1, v2);
    var e2 = new YAGL.Edge(2, v2, v3);
    var e3 = new YAGL.Edge(3, v3, v7);
    var e4 = new YAGL.Edge(4, v6, v8);


    g.addEdge(e1);
    g.addEdge(e2);
    g.addEdge(e3);
    g.addEdge(e4);
    g.addVertex(v3);
    g.addVertex(v4);
    g.addVertex(v5);
    g.addVertex(v6);
    g.addVertex(v7);
    g.addVertex(v8);
    //g.addVertex(v3);

    return g;
}
