function Graph() {

    /*
     * vertices holds a set of Vertex objects.  Each property of vertices is a unique
     * vertex id of some Vertex object. That property is then mapped to that Vertex
     * object.
     *
     * adjacencyList maps vids to Objects that hold one or more (vid:edge) properties.
     */

	this.vertices = {};
    this.adjacencyList = {};
    this.connectedComponents = {};

    /*
     * Sets all vertices' visited field to false.
     */
	Graph.prototype.setAllVisitedFalse = function () {
		var i;

        for (i in this.vertices) {
            this.vertices[i].visited = false;
        }
	};

    /*
     * Checks to see if v is in the list of vertices.  If not, it adds it.
     */

	Graph.prototype.addVertex = function (v) {
        if (v instanceof Vertex == false) {
            throw new Error("not a Vertex");
        } else if (v == null) {
            throw new Error("attempting to add Null Vertex");
        }

		var elm = this.findVertex(v.vid);

		if (elm === null) {
			this.vertices[v.vid] = v;
			this.connectedComponents[v.vid] = v.vid;
            console.log("Vertex " + v.vid + " added");
		}

		return v;
	};

    /*
     * Returns a vertex if vid is a property of the vertices object. Otherwise
     * it returns null.
     */

    Graph.prototype.findVertex = function (vid) {
		if (vid === null) {
			throw new Error("null element");
        }

		if (this.vertices[vid] === undefined) {
            return null;
		} else {
            return this.vertices[vid];
        }
	};

    /*
     * Receives two vertices, checks if they are already in the vertices list and adds
     * them if they are not found, then places adds the edge to the adjacency list at the VID's of the vertices. returns the created edge
     */
	Graph.prototype.addEdge = function (v1, v2) {
		if (v1 === null || v2 === null) {
			throw new Error("Null VID");
        }

		var u = this.findVertex(v1.vid);
		if (u === null) {
			u = this.addVertex(v1);
        }

		var v = this.findVertex(v2.vid);
		if (v === null) {
			v = Graph.addVertex(v2);
        }

		var edge = new Edge(u, v);
        if (this.adjacencyList[u.vid] === undefined) {
            var obj = new Object();
            obj[v.vid] = edge;
            this.adjacencyList[u.vid] = obj;
        } else {
		    var obj = this.adjacencyList[u.vid];
		    obj[v] = edge;
            // TODO: check if reassigning u.vid to obj is necessary
		    this.adjacencyList[u.vid] = obj;
        }

        if (this.adjacencyList[v.vid] === undefined) {
            obj = new Object();
            obj[u] = edge;
            this.adjacencyList[v.vid] = obj;
        } else {
		    obj = this.adjacencyList[v.vid];
		    obj[u] = edge;
            // TODO: check if reassigning u.vid to obj is necessary
		    this.adjacencyList[v.vid] = obj;
        }
		/*if (!v.equals(u)) {
			Graph.unionComponents(u, v);
        }*/
        console.log("");
		console.log("Added: (" + v1.vid + "," + v2.vid + ")");

		return edge;
	};

    /*
     *receives a vid and returns the vid or the component connected to iteslf
     */
    Graph.prototype.findComponent = function (vid) {
        if (this.connectedComponents[vid] == null) {
            console.log("returning null in findComponent");
            return null;
        }

        var curVid = vid
		while (!curVid.equals(this.connectedComponents[curVid])) {
            //console.log("not equal");
			curVid = this.connectedComponents[curVid];
        }
		return curVid;
	};

    /*
     *returns an array containing all the connected vid's
     */
    Graph.prototype.getAllComponents = function () {
		var set, v;

		for (v in this.connectedComponents.keys()) {
            if (set == null) {
                set = [];
            }
			    set.push(this.findComponent(v));

        }
		return set;
	};

    /*
     *receives two Vid's and pairs them in the connectedComponents set
     */
    Graph.prototype.unionComponents = function (u, v) {
		this.connectedComponents[this.findComponent(u)] = this.findComponent(v);
	};

	/*
     * Takes a starting vid then adds each mapped value to a queue to check.
     * returns the vid of the found element found. else reurns null
     */
	Graph.prototype.BFSearch = function (start, elm) {
		if (elm === null || start === null) {
			throw new Error("Null Elements");
        }

		if (!this.adjacencyList.hasOwnProperty(start)) {
			console.log("Search failed: invalid start vertex");
			return null;
		}

		this.setAllVisitedFalse();

		var queue = [];//need array object
		queue.push(start);
		vertices[start].setParent(null);
		vertices[start].setVisited(true);

		console.log("Search: ");
		while (queue.length !== 0) {
			var u = queue.shift();
            console.log("node: " + vertices[u]);

			if (u === elm) {
                console.log("found match");
				return u;
			}

			var list = this.adjacencyList[u];
            //console.log(list.valueOf());
			//if (list == null) {
			//	continue;
            //} why is this here?
            var v, i;
			for (i in list) {
                v = list[i];
                //console.log("adding more vertexes to " + list);
                //console.log(v.data);
                /*if (e instanceof Edge) {
				    v = e.getAdjacentVertex(u);
                } else {
                    console.log("list does not contain edges");
                }*/
                //console.log(typeof v);
                if(v instanceof Vertex) {
                    console.log("v is a vertex");
				    if (v.getVisited() === false) {
                        v.setVisited(true);
                        v.setParent(u);
                        queue.push(v);
                    }
				}
			}
		}
        console.log("BFSearch returns null after search");
		return null;
	};

    /*
     * prints out a row for each vertex in the vertices list for each vertex adjacent
     * to it
     */
	Graph.prototype.print = function () {
		var str = "";
        for(vid in this.vertices) {
            //console.log(vid);
            str += vid + ":  ";
            for(u in this.adjacencyList[vid]) {
                console.log(u);
                if (u instanceof Edge) {
                str += u.getAdjacentEdge(vid) + " ";
                }
            }
            str += "\n";
        }
        return str;
	}

}


