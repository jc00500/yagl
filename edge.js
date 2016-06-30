function Edge(eid, v1, v2) {
    if (v1 === null || v2 === null || eid === null) {
        // TODO: fix error message.  why?
        throw new Error("Invalid Construction of Edge");
    }
    //TODO ADD EID
    this.v1 = v1;
    this.v2 = v2;
    this.eid = eid;

    Edge.prototype.getAdjacentVertex = function (v) {
        // TODO: Check that v is a vertex
        if (v === this.v1) {
            return v2;
        } else if (v === this.v2) {
            return v1;
        } else {
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
        }
        return str;
    };
}
