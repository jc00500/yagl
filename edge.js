var YAGL;
(function (YAGL) {

    var Edge = (function (eid, v1, v2) {
        if (v1 === null || v2 === null || eid === null) {
            // TODO: fix error message.  why?
            throw new Error("Invalid Construction of Edge");
        }
        //TODO ADD EID immutable
        function Edge(eid, v1, v2) {
            this.v1 = v1;
            this.v2 = v2;
            this.eid = eid;
        }

        Edge.prototype.getAdjacentVertex = function (vid) {
            // TODO: Check that v is a vertex
            //console.log("checking for (" + vid + " in " + this.toString());
            if (vid == this.v1.vid) {
                //console.log(this.v2.vid);
                return this.v2.vid;
            } else if (vid == this.v2.vid) {
                //console.log(this.v2.vid);
                return this.v1.vid;
            } else {
                //console.log("returning null");
                return null;
            }
        };

        Edge.prototype.getFirst = function () {
            return this.v1;
        };

        Edge.prototype.getSecond = function () {
            return this.v2;
        };

        Edge.prototype.equals = function (e) {
            if(!(e instanceof Edge)) {
                return false;
            }

            if(e.eid == null) {
                return false;
            }

            if(this.eid = e.eid) {
               return true
            }
        };

        Edge.prototype.toString = function () {
            var str = "";
            for (prop in this) {
                if (this.hasOwnProperty(prop)) {
                    prop_str = prop + ": " + this[prop] + ", ";
                    str += prop_str;
                }
                str += "\t";
            }
            return str;
        };

    /*function weightedEdge(eid, v1, v2, weight) {
        this.prototype = new Edge(eid, v1, v2);
        if(typeof weight == "number") {
            this.weight = weight;
        } else {
            throw new Error("weightedEdge:  weight is not a number");
        }

        Edge.prototype.getWeight = function () {
            return this.weight;
        };

        Edge.prototype.setWeight = function (weight) {
            if (!(typeof weight == "number")) {
                throw new Error("setWeight: not setting weight to a number");
            }
            this.weight = weight;
        };
    }*/
        return Edge;
    }());
    YAGL.Edge = Edge;
})(YAGL || (YAGL = {}));
