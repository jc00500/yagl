var YAGL;
(function (YAGL) {

    var GraphicsProperties = (function () {

        function GraphicsProperties() {
            this.framework = "Babylon";
            this.layout = "forceDirected";

        }

        GraphicsProperties.prototype.initialize = function(graph) {
            if (this.layout == "forceDirected") {
                //ForceDirectedLayout(graph, size, stiffness, repulsion, damping, minEnergyThreshold)
                graph.layoutEngine = new YAGL.ForceDirectedLayout(graph, 1, .9, 10, .9, .01);
            }

        };

        /*******************************************************************************
         *                          GETTER METHODS
         *******************************************************************************/

        GraphicsProperties.prototype.framework = function() {
            return this.framework;
        };

        GraphicsProperties.prototype.getLayout = function() {
            return this.layout;
        };

        /*******************************************************************************
         *                          SETTER METHODS
         *******************************************************************************/

        GraphicsProperties.prototype.setFramework = function(framework) {
            this.framework = framework;
        };

        GraphicsProperties.prototype.setLayout = function(layout) {
            this.layout = layout;
        };

        return GraphicsProperties;
    }());

    YAGL.GraphicsProperties = GraphicsProperties;
})(YAGL || (YAGL = {}));
