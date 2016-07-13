var YAGL;
(function (YAGL) {

    var Layout = (function () {

        //function Layout.Simple (scene, graph, size) {
        function Layout(scene, graph, size) {
            this.scene = scene;
            this.graph = graph;
            this.usedVectors = {};
            this.lineList = {};
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.size = (size == undefined) ? 1: size;
        }

        //Layout.Simple.prototype.placeVertices = function() {
        Layout.prototype.placeVertices = function() {
            var x = this.x;
            var y = this.y;
            var z = this.z;

            for(vid in this.graph.vertices) {
                node = this.graph.vertices[vid];
                if(node.shape == undefined) {
                    var size = this.size;
                    console.log("x:  " + x + ", y:  " + y + ", z:  " + z);
                    //var obj = new BABYLON.Mesh.CreateSphere(vid, 10, size, scene);
                    var obj = new BABYLON.Mesh.CreateSphere("test", 10, size, this.scene, true, BABYLON.Mesh.FRONTSIDE);
                    //console.log("created sphere");
                    obj.position = new BABYLON.Vector3(x, y, z);
                    this.usedVectors[vid] = [x, y, z]
                    if ((x <= y) && (x <= z)){
                        x += (2 * size);
                    } else if (y <= z) {
                        y += (2 * size);
                    } else {
                        z += (2 * size);
                    }

                }

            }
        };

        Layout.prototype.placeLines = function() {
            var edges = this.graph.edges;
            this.removeLines();
            var lines= [];
            for(eid in edges) {
                var v = this.usedVectors[edges[eid].getFirst().getVid()];
                console.log("v:  " + v);
                lines.push(new BABYLON.Vector3(v[0], v[1], v[2]));
                v = this.usedVectors[edges[eid].getSecond().getVid()];
                console.log("v2:  " + v);
                lines.push(new BABYLON.Vector3(v[0], v[1], v[2]));
                //scene.mesh[eid] = edges[eid];
            }
            new BABYLON.Mesh.CreateLines("lines", lines, this.scene);
        };

        /*
         * Removes all lines from the graph.
         */
        Layout.prototype.removeLines = function() {
            for(i = 0; i < this.scene.meshes.length; i++) {
                if(this.scene.meshes[i].name == "lines") {
                    this.scene.meshes[i].dispose();
                }
            }
        };

    return Layout;
    }());
    YAGL.Layout = Layout;
})(YAGL || (YAGL = {}));
