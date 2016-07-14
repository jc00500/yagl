// Get the canvas element from our HTML below
var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);
// -------------------------------------------------------------
// Here begins a function that we will 'call' just after it's built
var createScene = function () {
    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);
    // This creates and positions a free camera
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount
    light.intensity = 0.5;

    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    var g = initializeGraph();
    //size, stiffness, repulsion, damping, minEnergyThreshold
    var Layout = new YAGL.ForceDirected(scene, g, 1, .9, .9, .9, .01);
    Layout.start();
    Layout.placeVertices();
    Layout.placeLines();
    //cheese.removeLines();













    // Leave this function
    return scene;
}; // End of createScene function
// -------------------------------------------------------------
// Now, call the createScene function that you just finished creating
var scene = createScene();
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

