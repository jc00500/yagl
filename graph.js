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

    // TODO:
    //          removeVertex(v)
    //          findEdge(v1, v2)    // return the edge if exists
    //          isConnected()       // return true if graph is connected
    //          findPath(v1, v2)    // return array of vertices that make the path

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

        var set = this.getAllEdges();

        var edge, e;
        for(edge in set) {
            e = set[edge]
            console.log("Inspecting: " + e);
            if(v.equals(e.getFirst()) || v.equals(e.getSecond())) {
                console.log("found a match");
                this.removeEdges(e.eid);
            }
        }
        //TODO: remove all adges attatched to the vertex
        delete this.vertices[vid];
        return v;
    }

    /*
     * Receives an edge id. Returns found edge if found, else returns null.
     */
    Graph.prototype.findEdge = function (eid) {
        if (eid === null) {
			throw new Error("findEdge: Null Element");
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

    Graph.prototype.findVertex = function (vid) {
		if (vid === null) {
			throw new Error("findVertex: Null Element");
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
     * Checks to see if v is in the list of vertices.  If not, it adds it.
     */

	Graph.prototype.addVertex = function (v) {
        if (v instanceof Vertex == false) {
            throw new Error("addVertex: Not a Vertex");
        } else if (v.vid == null) {
            throw new Error("addVertex: Attempting to Add a Vertex Without a Vid");
        }

		var elm = this.findVertex(v.vid);

		if (elm === null) {
			this.vertices[v.vid] = v;
			this.connectedComponents[v.vid] = v.vid;
            console.log("Vertex " + v.vid + " added");
		} else {
            console.log("Given Vid Already Exists. Vertex was not Added to the Graph");
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

		var u = this.findVertex(v1.vid);
		if (u === null) {
			u = this.addVertex(v1);
        }
        else
            console.log("vertex exists: " + v1.vid);

		var v = this.findVertex(v2.vid);
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
            return -1;
        }
        if (this.vertices[u] == undefined || this.vertices[v] == undefined) {
            return -1;
        }
        //console.log("in union with: " + u + ", " + v);
        this.connectedComponents[this.findComponent(u)] = this.findComponent(v);
        return 0;
    };

	/*
     * Takes a starting vid then adds each mapped value to a queue to check.
     * returns the vid of the found element found. else reurns null
     */
	Graph.prototype.BFSearch = function (start, elm) {
		if (elm === null || start === null) {
			throw new Error("BFSearch: Null Elements");
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
		while (queue.length !== 0) {
            //u is the vid, queue contains unvisited vid's
			var u = queue.shift();
            console.log("node: " + u);

			if (u === elm) {
                console.log("found match");
				return u;
			}

			var obj = this.adjacencyList[u];

            var v, i;
			for (i in obj) {
                v = this.vertices[i];
				if (v.getVisited() === false) {
                    v.setVisited(true);
                    v.setParent(u);
                    queue.push(i);
                }
			}
		}
        console.log("BFSearch returns null after search");
		return null;
	};

     Graph.prototype.isConnected = function () {

    }

    Graph.prototype.findPath = function (v1, v2) {

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
