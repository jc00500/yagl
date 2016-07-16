/**
 * Springy v2.7.1
 *
 * Copyright (c) 2010-2013 Dennis Hotson
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */



var YAGL;
(function (YAGL) {

    var ForceDirected = (function () {

	function ForceDirected(scene, graph, size, stiffness, repulsion, damping, minEnergyThreshold) {
        this.scene = scene;
		this.graph = graph;
        this.size = (size == undefined) ? 1: size;
		this.stiffness = stiffness; // spring stiffness constant
		this.repulsion = repulsion; // repulsion constant
		this.damping = damping; // velocity damping factor
		this.minEnergyThreshold = minEnergyThreshold || 0.01; //threshold used to determine render stop

		this.nodePoints = {}; // keep track of points associated with nodes
		this.edgeSprings = {}; // keep track of springs associated with edges
	}



	//any data value is shape properties
    ForceDirected.prototype.point = function(node) {
        vid = node.getVid();
		if (!(vid in this.nodePoints)) {
			var mass = 1.0;
			this.nodePoints[vid] = new ForceDirected.Point(Vector.random(), mass);
		}
		return this.nodePoints[vid];
	};

    //create a line along an edge
	ForceDirected.prototype.spring = function(e) {
		if (!(e.getEid() in this.edgeSprings)) {
			var length = 1.0;

			var existingSpring = false;
            //change this stuff
            var edges = this.graph.getEdges(e.v1, e.v2);
			//var pos1 = this.graph.getEdges(edge.source, edge.target);
			for(e in edges) {
                if (existingSpring === false && e.getEid() in this.edgeSprings) {
                    existingSpring = this.edgeSprings[e.getEid()];
			    }
            }

            if (existingSpring !== false) {

                 return new ForceDirected.Spring(existingSpring.point1, existingSpring.point2, 0.0, 0.0, 0.0);
            }

			this.edgeSprings[e.eid] = new ForceDirected.Spring(
				this.point(e.getFirst()), this.point(e.getSecond()), length, this.stiffness
			);
		}

		return this.edgeSprings[e.eid];
	};

	// callback should accept two arguments: Node, Point
	ForceDirected.prototype.eachNode = function(callback) {
		var t = this;
        nodes = this.graph.vertices;

		for(vid in nodes) {
            callback.call(t, nodes[vid], t.point(nodes[vid]));

        }
	};

	// callback should accept two arguments: Edge, Spring
	ForceDirected.prototype.eachEdge = function(callback) {
		var t = this;
        edges = this.graph.edges;
		for(eid in edges) {
             callback.call(t, edges[eid], t.spring(edges[eid]));
        }
	};

	// callback should accept one argument: Spring
	ForceDirected.prototype.eachSpring = function(callback) {
		var t = this;
        edges = this.graph.edges;
		for(eid in edges) {
             callback.call(t, t.spring(edges[eid]));
        }
	};


	// Physics stuff
	ForceDirected.prototype.applyCoulombsLaw = function() {
		this.eachNode(function(n1, point1) {
			this.eachNode(function(n2, point2) {
				if (point1 !== point2)
				{
					var d = point1.p.subtract(point2.p);
					var distance = d.magnitude() + 0.1; // avoid massive forces at small distances (and divide by zero)
					var direction = d.normalise();
/**********************************************************************************************/
					// apply force to each end point
					point1.applyForce(direction.multiply(this.repulsion).divide(distance * distance * 0.5));
					point2.applyForce(direction.multiply(this.repulsion).divide(distance * distance * -0.5));
				}
			});
		});
	};

	ForceDirected.prototype.applyHookesLaw = function() {
		this.eachSpring(function(spring){
			var d = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
			var displacement = spring.length - d.magnitude();
			var direction = d.normalise();

			// apply force to each end point
			spring.point1.applyForce(direction.multiply(spring.k * displacement * -0.5));
			spring.point2.applyForce(direction.multiply(spring.k * displacement * 0.5));
		});
	};

	ForceDirected.prototype.attractToCentre = function() {
		this.eachNode(function(node, point) {
			var direction = point.p.multiply(-1.0);
			point.applyForce(direction.multiply(this.repulsion / 50.0));
		});
	};


	ForceDirected.prototype.updateVelocity = function(timestep) {
		this.eachNode(function(node, point) {
			// Is this, along with updatePosition below, the only places that your
			// integration code exist?
			point.v = point.v.add(point.a.multiply(timestep)).multiply(this.damping);
			point.a = new Vector(0, 0);
		});
	};

	ForceDirected.prototype.updatePosition = function(timestep) {
		this.eachNode(function(node, point) {
			// Same question as above; along with updateVelocity, is this all of
			// your integration code?
			point.p = point.p.add(point.v.multiply(timestep));
		});
	};

	// Calculate the total kinetic energy of the system
	ForceDirected.prototype.totalEnergy = function(timestep) {
		var energy = 0.0;
		this.eachNode(function(node, point) {
			var speed = point.v.magnitude();
			energy += 0.5 * point.m * speed * speed;
		});

		return energy;
	};

	var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }; // stolen from coffeescript, thanks jashkenas! ;-)

	YAGL.requestAnimationFrame = __bind(/*this.requestAnimationFrame ||
		this.webkitRequestAnimationFrame ||
		this.mozRequestAnimationFrame ||
		this.oRequestAnimationFrame ||
		this.msRequestAnimationFrame ||*/
		(function(callback, element) {
			this.setTimeout(callback, 10);
		}), this);


	/*
	 * Start simulation if it's not running already.
	 * In case it's running then the call is ignored, and none of the callbacks passed is ever
     * executed.
	 */
	ForceDirected.prototype.start = function(render, onRenderStop, onRenderStart) {
		var t = this;

		if (this._started) return;
		this._started = true;
		this._stop = false;
        var run = true;
        var counter = 0;
        while(run) {
            t.tick(.03);
            if(t.totalEnergy() < t.minEnergyThreshold){
                run = false;
            }
            counter++;
        }
        console.log(counter);
        t.stop();
	};

	ForceDirected.prototype.stop = function() {
        console.log("stopped");
		this._stop = true;
        this._started = false;
	}

	ForceDirected.prototype.tick = function(timestep) {
		this.applyCoulombsLaw();
		this.applyHookesLaw();
		this.attractToCentre();
		this.updateVelocity(timestep);
		this.updatePosition(timestep);
	};

	// Find the nearest point to a particular position
	ForceDirected.prototype.nearest = function(pos) {
		var min = {node: null, point: null, distance: null};
		var t = this;

		this.graph.nodes.forEach(function(n){
			var point = t.point(n);
            //changing magnitude
			var distance = point.p.subtract(pos).magnitude();

			if (min.distance === null || distance < min.distance) {
				min = {node: n, point: point, distance: distance};
			}
		});

		return min;
	};

	// returns [bottomleft, topright]
	ForceDirected.prototype.getBoundingBox = function() {
        //get shape size
		var bottomleft = new Vector(-2,-2);
		var topright = new Vector(2,2);

		this.eachNode(function(n, point) {
			if (point.p.x < bottomleft.x) {
				bottomleft.x = point.p.x;
			}
			if (point.p.y < bottomleft.y) {
				bottomleft.y = point.p.y;
			}
            if (point.p.z < bottomleft.z) {
				bottomleft.z = point.p.z;
			}
			if (point.p.z > topright.z) {
				topright.z = point.p.z;
			}
			if (point.p.x > topright.x) {
				topright.x = point.p.x;
			}
			if (point.p.y > topright.y) {
				topright.y = point.p.y;
			}
		});

		var padding = topright.subtract(bottomleft).multiply(0.07); // ~5% padding

		return {bottomleft: bottomleft.subtract(padding), topright: topright.add(padding)};
	};


	// Vector
	var Vector = YAGL.Vector = function(x, y) {
        this.x = x;
        this.y = y;
	};

	Vector.random = function() {
		return new Vector(10.0 * (Math.random() - 0.5), 10.0 * (Math.random() - 0.5));
	};

	Vector.prototype.add = function(v2) {
		return new Vector(this.x + v2.x, this.y + v2.y);
	};

	Vector.prototype.subtract = function(v2) {
		return new Vector(this.x - v2.x, this.y - v2.y);
	};

	Vector.prototype.multiply = function(n) {
		return new Vector(this.x * n, this.y * n);
	};

	Vector.prototype.divide = function(n) {
		return new Vector((this.x / n) || 0, (this.y / n) || 0); // Avoid divide by zero errors..
	};

	Vector.prototype.magnitude = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y );
	};

	Vector.prototype.normal = function() {
		return new Vector(-this.y, this.x);
	};

	Vector.prototype.normalise = function() {
		return this.divide(this.magnitude());
	};

	// Point
	ForceDirected.Point = function(position, mass) {
		this.p = position; // position
		this.m = mass; // mass
		this.v = new Vector(0, 0); // velocity
		this.a = new Vector(0, 0); // acceleration
	};

	ForceDirected.Point.prototype.applyForce = function(force) {
		this.a = this.a.add(force.divide(this.m));
	};

	// Spring
	ForceDirected.Spring = function(point1, point2, length, k) {
		this.point1 = point1;
		this.point2 = point2;
		this.length = length; // spring length at rest
		this.k = k; // spring constant (See Hooke's law) .. how stiff the spring is
	};

    ForceDirected.prototype.placeVertices = function() {
            var x = this.x;
            var y = this.y;
            var z = this.z;

            for(vid in this.graph.vertices) {
                node = this.graph.vertices[vid];
                if(node.mesh == undefined) {
                    var size = this.size;
                    node.mesh = new BABYLON.Mesh.CreateSphere(vid, 10, size, this.scene, true);
                    node.mesh.material = new BABYLON.StandardMaterial("MATERIAL", this.scene);
                    node.mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);

                    var vector = new BABYLON.Vector3(0, 0, 0)
                    vector.x = this.nodePoints[vid].p.x;
                    vector.y = this.nodePoints[vid].p.y;
                    node.mesh.position = vector;


                }

            }
        };

        ForceDirected.prototype.placeLines = function() {
            var edges = this.graph.edges;
            //this.removeLines();
            var lines;
            for(eid in edges) {
                lines = [];
                var vid = edges[eid].getFirst().getVid();

                lines.push(this.graph.vertices[vid].mesh.position);
                vid = edges[eid].getSecond().getVid();
                lines.push(this.graph.vertices[vid].mesh.position);

                edges[eid].mesh = new BABYLON.Mesh.CreateTube(eid, lines, .1, 10, null, false, this.scene);
                edges[eid].mesh.material = new BABYLON.StandardMaterial("MATERIAL", this.scene);
                edges[eid].mesh.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            }
            //new BABYLON.Mesh.CreateLines("lines", lines, this.scene);
        };

    return ForceDirected;
    }());
    YAGL.ForceDirected = ForceDirected;
})(YAGL || (YAGL = {}));
