// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built


var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(255, 255, 255);

    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 45, new BABYLON.Vector3(0, 5, 0), scene);
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;

    g = new YAGL.Graph(new YAGL.GraphicsProperties(), scene);

    return scene;
};

function editNotes(html, textColor) {
    console.log("editing notes");
	var notes = document.getElementById("notes");
	if (notes == null) {
		return;
	}
	notes.innerHTML = html;
	notes.style.color = textColor;
}

var path = null;
var pathIndex = 0;

function resetVertexColor() {
    scene.meshes.forEach( function (m) {
        m.material.diffuseColor = new BABYLON.Color3();
    });
}

var animatePath = function() {
    var vid = path[pathIndex++];
    g.vertices[vid].mesh.material.diffuseColor = new BABYLON.Color3(255, 0, 0);
    if (pathIndex >= path.length)
        setInterval(animatePath, 1000);
}

var button = document.getElementById("BFSearch");
button.onclick = function () {
    resetVertexColor();
    path = g.getPath(69, 12);
    setInterval(animatePath, 1000);
};

var html = "YAGL - Yet Another Graph Library";
editNotes(html, "blue");

button = document.getElementById("buildGraph");
button.onclick = function () {
    console.log("building graph");
    buildGraph(g);
}

/*** CREATE SCENE ***/
var scene = createScene();

scene.onPointerDown = function (evt, pickResult) {

        if (pickResult.hit) {
            html = pickResult.pickedMesh.name;
            editNotes(html, "blue");
        }
};

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});



