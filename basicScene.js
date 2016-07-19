// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built


var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(255, 255, 255);

    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 35, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;

    g = new YAGL.Graph(new YAGL.GraphicsProperties(), scene);

    return scene;
};

var currentAction = "none";
var selectedMeshes = [];

/*** EDIT NOTES ***/
function editNotes(html, textColor) {
	var notes = document.getElementById("notes");
	if (notes == null) {
		return;
	}
	notes.innerHTML = html;
	notes.style.color = textColor;
}

var html = "YAGL - Yet Another Graph Library";
editNotes(html, "blue");

/*** RESET COLOR FOR ALL MESHES ***/
function resetVertexColor() {
    scene.meshes.forEach( function (m) {
        m.material.diffuseColor = new BABYLON.Color3();
    });
}

/*** BUILD GRAPH ***/
var button = document.getElementById("buildGraph");
button.onclick = function () {
    console.log("building graph");
    buildGraph(g, prompt("Please enter build type: \n\t1: Predefined\n\t2: Randomly created\n\t3: Start from Scratch"));
};

/*** FIND PATH ***/

var pathIndex = 0;
var path = null;

function animatePath() {
    if (path == null) {
        return;
    }

    var vid = path[pathIndex];
    g.vertices[vid].mesh.material.diffuseColor = new BABYLON.Color3(255, 0, 0);

    if(g.vertices[vid].data != undefined){
        html += g.vertices[vid].data + "<br>";
    } else {
        html += "Vertex " + vid + ": no data" + "<br>";
        editNotes(html);
    }

    pathIndex++;

    if (pathIndex == path.length) {
        var audio = new Audio('ding.mp3');
        audio.play();
        return;
    }

    setTimeout(animatePath, 1000);
}

button = document.getElementById("findPath");
button.onclick = function () {
    currentAction = "findPath";
    editNotes("Pick source vertex", "blue");
    selectedMeshes = [];
    resetVertexColor();
};

/*** CREATE SCENE ***/
var scene = createScene();

var pick = function (evt, pickResult) {

        /* Check currentAction and react accordingly */

        if (currentAction == "none" && pickResult.hit) {
            editNotes("<h3>" + pickResult.pickedMesh.name + "</h3>", "blue");
        }

        if (currentAction == "findPath" && pickResult.hit && pickResult.pickedMesh.name.startsWith("v")) {
            if (selectedMeshes.length == 0) {
                selectedMeshes.push(pickResult.pickedMesh.name.substr(1));
                pickResult.pickedMesh.material.diffuseColor = new BABYLON.Color3(0, 255, 0);
                editNotes("Pick target vertex", "blue");
            }
            else if (selectedMeshes.length == 1 && pickResult.hit && pickResult.pickedMesh.name.startsWith("v")) {
                selectedMeshes.push(pickResult.pickedMesh.name.substr(1));
                pickResult.pickedMesh.material.diffuseColor = new BABYLON.Color3(0, 0, 255);
                path = g.getPath(Number(selectedMeshes[1]), Number(selectedMeshes[0]));

                if (path == null ) {
                    var audio = new Audio('buzzer.mp3');
                    audio.play();
                    html = "No path exists" + "<br>";
                } else {
                    html = "Path:  " + path + "<br>";
                }
                editNotes(html, "blue");

                pathIndex = 0;
                animatePath();
                currentAction = "none";
            }
        }
};

scene.onPointerDown = pick;

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});


var buildEdges = null;
var buildEdgesIndex = 0;
var buildVertices = null;
var buildVerticesIndex = 0;

var buildGraph = function (g, prompt) {
    /* TODO: Fix so that meshes are garbage collected */
    g.scene.meshes = [];
    g.clear();

    buildVertices = []
    buildEdges = [];
    buildEdgesIndex = 0;
    buildVerticesIndex = 0;

    if(prompt == 1) {

        buildVertices = [1,2,3,4,5,6,7];
        /*buildEdges = [
                [1,1,2],
                [2,1,3],
                [3,1,4],
                [4,1,5],
                [5,1,6],
                [6,1,7],
                [7,2,3],
                [8,2,4],
                [9,2,5],
                [10,2,6],
                [11,2,7],
                [12,3,4],
                [13,3,5],
                [14,3,6],
                [15,3,7],
                [16,4,5],
                [17,4,6],
                [18,4,7],
                [19,5,6],
                [20,5,7],
                [21,6,7]];*/

        buildEdges = [
                [1,1,2],
                [2,1,2]];

    } else if(prompt == 2) {  //random creation
        var numVertices = Math.ceil(Math.random() * 20);

        for (var i = 0; i < numVertices; i++) {
            buildVertices.push(i);
        }

        var numEdges = Math.ceil(Math.random() * 3 * numVertices);
        var arr;
        var vid1;
        var vid2;
        var createNewEdge;

        for (var i = 0; i < numEdges; i++){
            vid1 = Math.round(Math.random() * (numVertices-1));
            vid2 = Math.round(Math.random() * (numVertices-1));
            createNewEdge = true
            var curVid1;
            var curVid2;
            for (j in buildEdges) {
                curVid1 = buildEdges[j][1];
                curVid2 = buildEdges[j][2];
                if ((vid1 === curVid1 && vid2 === curVid2) ||
                    (vid1 === curVid2 && vid2 === curVid1)) {
                    createNewEdge = false;
                }
            }

            if (vid1 != vid2 && createNewEdge) {
                buildEdges.push([i, vid1, vid2]);
            }
        }
    }



    animateVertices();
}

var animateVertices = function () {
    if (buildVerticesIndex >= buildVertices.length) {
        animateEdges();
        return;
    }

    g.addVertex(new YAGL.Vertex(buildVertices[buildVerticesIndex]));
    html = "Number of Vertices: " + g.getAllVertices().length + "<br>";
    editNotes(html, "green");
    buildVerticesIndex++;
    setTimeout(animateVertices, 400);
}

var animateEdges = function () {
    if (buildEdgesIndex >= buildEdges.length) {
        html = html.substring(0,html.indexOf(">")+1);
        html += "Number of Edges: " + buildEdges.length + "<br>";
        editNotes(html, "green");
        return;
    }

    var eid = buildEdges[buildEdgesIndex][0];
    var vid1 = buildEdges[buildEdgesIndex][1];
    var vid2 = buildEdges[buildEdgesIndex][2];

    g.addEdge(eid, vid1, vid2);

    html = html.substring(0,html.indexOf(">")+1);
    html += "Number of Edges: " + g.getAllEdges().length + "<br>";
    editNotes(html, "green");

    buildEdgesIndex++;
    setTimeout(animateEdges, 600);
};





