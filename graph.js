function Graph() {

    /*
     * Vertices holds a set of Vertex objects.  Each property of vertices is a unique
     * vertex id of some Vertex object. That property is then mapped to that Vertex
     * object.
     *
     * adjacencyList maps vids to Objects that hold one or more (vid:edge) properties.
     */

	this.vertices = {};
    this.adjacencyList = {};
    this.connectedComponents = {};

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
		}

		return v;
	};

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
     * Receives two vertices, checks if they are already in the vertices list and
     * adds them if they are not found, then adds the edge to the adjacency list at
     * the VID's of the vertices. returns the created edge
     */
	Graph.prototype.addEdge = function (v1, v2) {
		if (v1 === null || v2 === null) {
			throw new Error("addEdge:  Null VID");
        }

		var u = this.findVertex(v1.vid);
		if (u === null) {
			u = this.addVertex(v1);
        }

		var v = this.findVertex(v2.vid);
		if (v === null) {
			v = this.addVertex(v2);
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
            obj[u.vid] = edge;
            this.adjacencyList[v.vid] = obj;
        } else {
		    obj = this.adjacencyList[v.vid];
		    obj[u.vid] = edge;
            // TODO: check if reassigning u.vid to obj is necessary
		    this.adjacencyList[v.vid] = obj;
        }
		if (!v.equals(u)) {
			this.unionComponents(u.vid, v.vid);
        }
        console.log("");
		console.log("Added: (" + v1.vid + "," + v2.vid + ")");

		return edge;
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

    /*
     * Prints out a row for each vertex in the vertices list for each vertex adjacent
     * to it
     */
	Graph.prototype.print = function () {
		var str = "";
        for(vid in this.vertices) {
            //console.log(vid);
            str += vid + ":  ";
            for(u in this.adjacencyList[vid]) {
                console.log(typeof u);
                str += u + " ";
            }
            str += "\n";
        }
        return str;
	}

}


