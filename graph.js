function Graph() {

    /*
     * Vertices holds a set of Vertex objects.  Each property of vertices is a unique
     * vertex id of some Vertex object. That property is then mapped to that Vertex
     * object.
     *
     * adjacencyList maps vids to Objects that hold one or more (vid:edge) properties.
     */

	this.vertices = {};
    this.edges = {};
    this.adjacencyList = {};
    this.connectedComponents = {};
    this.numComponents = 0;

    /*
     * Returns an array containing all the vertices contained in the graph.
     */
    Graph.prototype.getAllVertices = function () {
        var v, set = [];
        for (v in this.vertices) {
            set.push(this.vertices[v]);
        }
        return set;
    }

    /*
     * Retrns an array of all the edges in the edges
     */
    Graph.prototype.getAllEdges = function () {
        var set = [], eid;

        for(eid in this.edges) {
            set.push(this.edges[eid]);
        }
        return set;
    }

    /*
     * Receives an edge id then removes the edge from the graph's adjacencyList and
     * edges
     */
    Graph.prototype.removeEdges = function (id1, id2) {
        if(id1 == null) {
            throw new Error("removeEdges:  Passed null arguments");
        }

        if(id2 == null) {
            var edge =  this.edges[id1];
            if(edge == null) {
                console.log("removeEdges:  eid doesn't exist");
                return null;
            }
            console.log("in remove edge, vid1 is: " + edge.getFirst().getVid());
            console.log("in remove edge, vid2 is: " + edge.getSecond().getVid());
            console.log("eid of edge: " + edge.eid);

            delete this.adjacencyList[edge.getFirst().getVid()][edge.eid];
            delete this.adjacencyList[edge.getSecond().getVid()][edge.eid];
            delete this.edges[id1];
        } else {
            var list = this.getEdges(id1, id2);
            for (eid in list) {
                this.removeEdges(list[eid]);
            }
        }

        return edge;
    }


    /*
     * Receives a vid then removes all edges containing it then removes the
     * vertex. Returns the vertex.
     */
    Graph.prototype.removeVertex = function (vid) {
        var v =  this.vertices[vid];

        if (v === undefined) {
            console.log("removeVertex: can not find vertex");
            return null;
        }

        var set = this.getAllEdges();

        var eid, e;
        for(eid in set) {
            e = set[eid];
            console.log("Inspecting: " + e);
            if(v.equals(e.getFirst()) || v.equals(e.getSecond())) {
                console.log("found a match");
                this.removeEdges(e.eid);
            }
        }

        delete this.vertices[vid];
        return v;
    }

    /*
     * Receives an edge id. Returns found edge if found, else returns null.
     */
    Graph.prototype.getEdge = function (eid) {
        if (eid === null) {
			throw new Error("getEdge: Null Element");
        }

		if (this.edges[eid] === undefined) {
            return null;
		} else {
            return this.edges[eid];
        }
    }

    /*
     * Receives two vids and returns an array containing the eid's of all adges
     * containing the given vid's
     */
    Graph.prototype.getEdges = function (vid1, vid2) {
        if(vid1 == null || vid2 == null) {
            console.log("getEdges:  searching for an edge with a null vertex");
            return null;
        }

        var set = [], edge;

        for (eid in this.edges) {
            edge = this.edges[eid];
            if ((vid1 === edge.v1.vid && vid2 === edge.v2.vid) ||
                (vid1 === edge.v2.vid && vid2 === edge.v1.vid)) {
                set.push(edge.eid);
            }
        }

        return set;
    }

    /*
     * Returns a vertex if vid is a property of the vertices object. Otherwise
     * it returns null.
     */

    Graph.prototype.getVertex = function (vid) {
		if (vid === null) {
			throw new Error("getVertex: Null Element");
        }

		if (this.vertices[vid] === undefined) {
            return null;
		} else {
            return this.vertices[vid];
        }
	};

    /*
     * Sets all vertices' visited fields to false.
     */
    Graph.prototype.setAllVisitedFalse = function () {
		var i;

        for (i in this.vertices) {
            this.vertices[i].visited = false;
        }
	};

    /*
     * Sets all vertices' parent fields to null.
     */
    Graph.prototype.removeParents = function () {
		var i;

        for (i in this.vertices) {
            this.vertices[i].setParent(null);
        }
	};

    /*
     * Checks to see if v is in the list of vertices.  If not, it adds it.
     */

	Graph.prototype.addVertex = function (v) {
        if (v instanceof Vertex == false) {
            throw new Error("addVertex: Not a Vertex");
        }

		var elm = this.getVertex(v.vid);

		if (elm === null) {
			this.vertices[v.vid] = v;
			this.connectedComponents[v.vid] = v.vid;
            this.numComponents++;
            console.log("Vertex " + v.vid + " added");
		}
        else {
            console.log("addVertex: Given Vid Already Exists. Vertex was not Added to the Graph");
        }

		return v;
	};

    /*
     * Receives an edge, checks if they are already in the vertices list and
     * adds them if they are not found, then adds the edge to the adjacency list at
     * the VID's of the vertices. Returns edge ID. Returns null if edge is
     * invalid.
     */
	Graph.prototype.addEdge = function (edge) {
        if(!(edge instanceof Edge)) {
            throw new Error("addEdge:  Did not reciece an edge");
        }
        if (edge.eid == null) {
            throw new Error("addEdge:  Edge receiced does not contain an id");
        }

        var v1 = edge.getFirst();
        var v2 = edge.getSecond();

        if (v1 === null || v2 === null) {
			throw new Error("addEdge:  Null Vertices");
        }

        //var edge = new Edge(eid, u, v);
        var set = this.getAllEdges(), e;

/*        for (e in set) {
            //console.log(set[e]);
            if (set[e].equals(edge)) {
                console.log("Attempting to add an existing edge.");
                return null;
            }
        }*/

		var u = this.getVertex(v1.vid);
		if (u === null) {
			u = this.addVertex(v1);
        }
        else
            console.log("vertex exists: " + v1.vid);

		var v = this.getVertex(v2.vid);
		if (v === null) {
			v = this.addVertex(v2);
        }
        else
            console.log("vertex exists: " + v2.vid);

        console.log("(vid1)" + u.vid + " (vid2)" + v.vid + " (eid)" + edge.eid);

        if (this.adjacencyList[u.vid] === undefined) {
            var obj = new Object();
            obj[edge.eid] = v.vid;
            this.adjacencyList[u.vid] = obj;
        } else {
		    var obj = this.adjacencyList[u.vid];
		    obj[edge.eid] = v.vid;
            // TODO: check if reassigning u.vid to obj is necessary
		    this.adjacencyList[u.vid] = obj;
        }

        if (this.adjacencyList[v.vid] === undefined) {
            obj = new Object();
            obj[edge.eid] = u.vid;
            this.adjacencyList[v.vid] = obj;
        } else {
		    obj = this.adjacencyList[v.vid];
		    obj[edge.eid] = u.vid;
            // TODO: check if reassigning u.vid to obj is necessary
		    this.adjacencyList[v.vid] = obj;
        }

		if (!v.equals(u)) {
			this.unionComponents(u.vid, v.vid);
        }

        console.log("");
		console.log("Added: (" + v1.vid + "," + v2.vid + ")");
        this.edges[edge.eid] = edge;

		return edge.eid;
	};

    /*
     * Receives a vid and returns the vid of the initial component connected to
     * iteslf.
     */
    Graph.prototype.findComponent = function (vid) {
        if (this.connectedComponents[vid] == null) {
            //console.log("returning null in findComponent");
            return null;
        }

        var curVid = vid
        //console.log("curVid: " + curVid + ", component: " + this.connectedComponents[curVid]);
		while (curVid !== (this.connectedComponents[curVid])) {
            //console.log("not equal");
			curVid = this.connectedComponents[curVid];
        }
		return curVid;
	};

    /*
     * Returns an array containing all the connected vid's.
     */
    Graph.prototype.getAllComponents = function () {
		var set = [], v;

		for (v in this.connectedComponents) {
            if(set.indexOf(this.findComponent(v)) == -1) {
                set.push(this.findComponent(v));
            }
        }
		return set;
	};

    /*
     * Receives two Vid's and pairs them in the connectedComponents set.
     */
    Graph.prototype.unionComponents = function (u, v) {
        if (u == null || v == null) {
            return;
        }
        if (this.vertices[u] == undefined || this.vertices[v] == undefined) {
            return;
        }
        //console.log("in union with: " + u + ", " + v);
        comp1 = this.findComponent(u);
        comp2 = this.findComponent(v);

        if ((this.connectedComponents[comp1] == comp1) && (comp1 !== comp2)) {
            this.numComponents--;
        }

        this.connectedComponents[comp1] = comp2;

        return;
    };

	/*
     * Takes a starting vid then adds each mapped value to a queue to check.
     * returns the vid of the found element found. else reurns null
     */
	Graph.prototype.BFSearch = function (start, elm) {
		if (elm === null || start === null) {
			throw new Error("BFSearch: Null Elements Vid");
        }

		if (!this.adjacencyList.hasOwnProperty(start)) {
			console.log("Search Failed: Invalid Start Vertex");
			return null;
		}

		this.setAllVisitedFalse();

		var queue = [];//need array object
		queue.push(start);
		this.vertices[start].setParent(null);
		this.vertices[start].setVisited(true);

		console.log("Searching for: " + elm);
        var u;
		while (queue.length !== 0) {
            //u is the vid, queue contains unvisited vid's
			u = queue.shift();
            console.log("node: " + u);

			if (u === elm) {
                console.log("found match");
				return u;
			}

			var obj = this.adjacencyList[u];

            var e, i, v;
			for (eid in obj) {
                e = this.edges[eid];
                v = e.getAdjacentVertex(u);
                v = this.vertices[v];
				if (v.getVisited() === false) {
                    v.setVisited(true);
                    v.setParent(this.vertices[u]);
                    queue.push(v.vid);
                }
			}
		}
        console.log("BFSearch returns null after search");
		return null;
	};

    Graph.prototype.isConnected = function () {
        if (this.numComponents > 1) {
            return false;
        } else {
            return true;
        }
    }

    Graph.prototype.findPath = function (v1, v2) {
        if (this.BFSearch(v1, v2) == null) {
            return null;
        }

        v1 = this.vertices[v1];
        v2 = this.vertices[v2];

        var path = [v2.vid];

        var p = v2.getParent();
        while (p != null) {
            path.push(p.vid);
            p = p.getParent();
        }

        return path;
    }

    /*
     * Prints out a row for each vertex in the vertices list for each
     * vertex adjacent to it
     */
	Graph.prototype.print = function () {
		var str = "";

        for(vid1 in this.vertices) {
            console.log("vid1:  " + vid1);
            str += vid1 + ":  ";
            for(eid in this.adjacencyList[vid1]) {
                //for (eid in obj) {
                    console.log("eid " + eid);
                    edge = this.edges[eid];
                    vid2 = edge.getAdjacentVertex(vid1);
                    str += vid2 + " ";
                //}
            }
            str += "\n";
        }
        return str;
	}
}
