function Vertex(vid, data) {
    this.vid = vid;
    this.data = data;
    this.visited = false;
    //vertices can hav ethe same id if in different graphs
    Vertex.prototype.setParent = function (newParent) {
        if (!(newParent instanceof Vertex)) {
            throw new Error("setParent: attempting to set a vertex parent to a non vertex");
        }
        //console.log("setting parent");
        this.parent = newParent;
    };

    Vertex.prototype.setVisited = function (visit) {
        if (!(visit instanceof Boolean)) {
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
