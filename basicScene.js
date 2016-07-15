// Get the canvas element from our HTML below
console.log("hello");
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built


var pathAnimation = function() {
    var vid = path[curIndex++];
    g.vertices[vid].mesh.material.diffuseColor = new BABYLON.Color3(255, 0, 0);
    if (curIndex >= path.length)
        setInterval(pathAnimation, 1000);
}


var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(255, 255, 255);

    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 30, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.5;

    g = new YAGL.Graph();
    initializeGraph(g);
    var Layout = new YAGL.ForceDirected(scene, g, 1, .9, .9, .9, .01);

    Layout.start();
    Layout.placeVertices();
    Layout.placeLines();
    //cheese.removeLines();

    var but = document.getElementById("BFSearch");
    but.onclick = function () {
        reset();
        path = g.getPath(69, 12);
        startPathAnimation = true;
        setInterval(pathAnimation, 1000);
    };

    return scene;
};

function reset() {
    //alert("Transition");
    scene.meshes.forEach( function (m) {
        m.material.diffuseColor = new BABYLON.Color3();
    });
}

function editNotes(html, textColor) {
	var notes = document.getElementById("notes");
	if (notes == null) {
		return;
	}
	notes.innerHTML = html;
	notes.style.color = textColor;
}

var html = "";


//editNotes(html, "blue");

var startPathAnimation = false;
var path = null;
var curIndex = 0;

// -------------------------------------------------------------
// Now, call the createScene function that you just finished creating
var scene = createScene();

scene.onPointerDown = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position


        if (pickResult.hit) {
            html = pickResult.pickedMesh.name;
            editNotes(html, "blue");
        }
};

console.log("after createScene");
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});



