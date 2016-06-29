function Edge(v1, v2) {
    if (v1 === null || v2 === null) {
        // TODO: fix error message.  why?
        throw new Error("Invalid Construction of Edge");
    }

    this.v1 = v1;
    this.v2 = v2;

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
        if(e == null) {
            return false;
        }

        if(!(e instanceof Edge)) {
            return false;
        }
        console.log("hello?");
        console.log(e.getFirst());
        console.log(e.getSecond());
        console.log(this.v1);
        console.log(this.v2);

        if (!(e instanceof Edge)) {
            console.log("not an edge");
            return false;
        } else if (e.getFirst() === this.v1 && e.getSecond() === this.v2) {
                return true;
        } else if (e.getSecond() === this.v1 && e.getFirst() === this.v2) {
            console.log("second equals 1st");
            return true;
        } else {
            console.log("escape clause");
            return false;
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
