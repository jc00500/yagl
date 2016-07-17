

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

var buildIndex = 0;

var buildGraph = function (g) {
    if (buildIndex < buildEdges.length) {
        var eid = buildEdges[buildIndex][0];
        var vid1 = buildEdges[buildIndex][1];
        var vid2 = buildEdges[buildIndex][2];

        g.addEdge(eid, vid1, vid2);
        buildIndex++;
        setInterval(buildGraph, 1000, g);
    }
}
