

var buildEdges = [[1,1,2],
                 [2,1,8],
                 [3,27,4],
                 [4,9,13],
                 [5,1,7],
                 [6,6,4],
                 [7,9,7],
                 [8,9,6],
                 [9,72,24],
                 [10,17,7],
                 [11,24,17],
                 [12,72,96],
                 [13,96,69],
                 [14,1,13],
                 [15,2,4],
                 [16,4,9],
                 [17,6,8],
                 [18,8,10],
                 [19,10,12]];

              /*  [[1,1,2],
                [2,2,3],
                [3,3,4]];*/

var buildIndex = 0;

var buildGraph = function (g, prompt) {
    if(prompt == 1) {//predefined
        if (buildIndex < buildEdges.length) {
            var eid = buildEdges[buildIndex][0];
            var vid1 = buildEdges[buildIndex][1];
            var vid2 = buildEdges[buildIndex][2];

            g.addEdge(eid, vid1, vid2);
            buildIndex++;
            setInterval(buildGraph, 1000, g, prompt);
        }
    } else if(prompt == 2) {//random creation
        var size = (Math.random() * 20);
        var verts = []
        for (i = 0; i < size; i++){
            verts.push(new YAGL.Vertex(i));
        }
        var edges = Math.random() * 50;
        for (i = 0; i < edges; i++){
            g.addEdge(new YAGL.Edge(i, size[(size.length-1) * Math.random()], size[Math.random() * (size.length-1)]));
        }
    }
}
