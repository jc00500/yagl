function Vertex(vid, data) {
    this.vid = vid;
    this.data = data;
    this.visited = false;
    //vertices can hav ethe same id if in different graphs
    Vertex.prototype.setParent = function (newParent) {
        if (!newParent instanceof Vertex) {
            throw new Error("setParent: attempting to set a vertex parent to a non vertex");
        }
        //console.log("setting parent");
        this.parent = newParent;
    };

    Vertex.prototype.setVisited = function (visit) {
        //console.log("setting visited");
        this.visited = visit;
    };

    Vertex.prototype.getParent = function () {
        return this.parent;
    };

    Vertex.prototype.getVisited = function () {
        return this.visited;
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
