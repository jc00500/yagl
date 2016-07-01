function Vertex(vid, data) {

    if (vid == null) {
        throw new Error("Vertex: vid is null or undefined");
    }

    //this.vid = vid;
    Object.defineProperty(this, "vid", {
        writable:  false, value:  vid
    });
    this.data = data;
    this.visited = false;

    //TODO: make vid immutable

    //vertices can hav ethe same id if in different graphs
    Vertex.prototype.setParent = function (newParent) {
        if (newParent === null) {
            delete this.parent;
            return;
        }

        if (!(newParent instanceof Vertex)) {
            throw new Error("setParent: attempting to set a vertex parent to a non vertex");
        }

        //console.log("setting parent");
        this.parent = newParent;
    };

    Vertex.prototype.setVisited = function (visit) {
        //console.log(visit);
        //console.log(typeof visit);
        if (!(typeof visit == "boolean")) {
            throw new Error("setVisited: attempting to set visited to a non-Boolean");
        }
        //console.log("setting visited");
        this.visited = visit;
    };

    Vertex.prototype.getParent = function () {
        return this.parent;
    };

    Vertex.prototype.getVisited = function () {
        return this.visited;
    };

    //TODO: Add setter and getter for data field
    Vertex.prototype.setData = function (data) {
        this.data = data;
    };

    Vertex.prototype.getData = function () {
        return this.data;
    };

    Vertex.prototype.getVid = function () {
        return this.vid;
    };

    Vertex.prototype.equals = function (v) {
        //console.log("in equals");
        if (!(v instanceof Vertex))
            return false;

        if (this.vid === v.vid) {
            return true;
        } else {
            return false;
        }
    };

    Vertex.prototype.toString = function () {
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
