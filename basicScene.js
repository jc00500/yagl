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
    console.log("editing notes");
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
    buildGraph(g);
};

/*** FIND PATH ***/

function animatePath(path, pathIndex) {
    var vid = path[pathIndex++];
    g.vertices[vid].mesh.material.diffuseColor = new BABYLON.Color3(255, 0, 0);

    if (pathIndex < path.length) {
        setInterval(animatePath, 1000, path, pathIndex);
    }
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

        if (currentAction == "none") {
            editNotes("<H4>" + pickResult.pickedMesh.name + "</H1>", "blue");
        }

        if (currentAction == "findPath" && pickResult.hit && pickResult.pickedMesh.name.startsWith("v")) {
            if (selectedMeshes.length == 0) {
                selectedMeshes.push(pickResult.pickedMesh.name.substr(1));
                pickResult.pickedMesh.material.diffuseColor = new BABYLON.Color3(255, 0, 0);
                editNotes("Pick target vertex", "blue");
            }
            else if (selectedMeshes.length == 1 && pickResult.hit && pickResult.pickedMesh.name.startsWith("v")) {
                selectedMeshes.push(pickResult.pickedMesh.name.substr(1));
                pickResult.pickedMesh.material.diffuseColor = new BABYLON.Color3(0, 0, 255);
                var path = g.getPath(Number(selectedMeshes[1]), Number(selectedMeshes[0]));
                animatePath(path, 0);
                console.log(path);
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



