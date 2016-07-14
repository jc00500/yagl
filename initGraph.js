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
    var e3 = new YAGL.Edge(3, v3, v1);
    var e4 = new YAGL.Edge(4, v4, v1);
    var e5 = new YAGL.Edge(5, v1, v5);
    var e6 = new YAGL.Edge(6, v2, v3);
    var e7 = new YAGL.Edge(7, v2, v4);
    var e8 = new YAGL.Edge(8, v2, v5);
    var e9 = new YAGL.Edge(9, v3, v4);
    var e10 = new YAGL.Edge(10, v3, v5);
    var e11 = new YAGL.Edge(11, v4, v5);



    g.addEdge(e1);
    g.addEdge(e8);
    g.addEdge(e3);
    g.addEdge(e4);
    g.addEdge(e5);
    g.addEdge(e6);
    g.addEdge(e7);
    g.addEdge(e9);
    g.addEdge(e10);
    g.addEdge(e11);
    /*g.addVertex(v5);
    g.addVertex(v6);
    g.addVertex(v7);
    g.addVertex(v8);
    g.addVertex(v3);
*/
    return g;
}
