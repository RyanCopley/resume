// Modules
var gameLoop = require('./core/game.loop.js'),
    gameUpdate = require('./core/game.update.js'),
    gameRender = require('./core/game.render.js'),
    // Entities
    playerEnt = require('./entities/player.js'),
    boundaryEnt = require('./entities/boundary.js'),
    buoyEnt = require('./entities/buoy.js'),
    // Utilities
    cUtils = require('./utils/utils.canvas.js');

var   $container = document.getElementById('container'); // require our canvas utils


// https://github.com/zonetti/snake-neural-network/blob/49be7c056c871d0c8ab06329fc189255d137db26/src/runner.js
// https://wagenaartje.github.io/neataptic/docs/neat/
function Game(mapId, w, h, gameOver, brain, targetFps, showFps) {

    var map = window.maps[mapId];
    const placeMode = "buoy";

    // Setup some constants
    this.constants = {
        width: w,
        height: h,
        targetFps: targetFps,
        showFps: showFps
    };
    this.brain = brain;
    this.alive = true;

    this.gameName = 'GAME'+Math.random();

    // Instantiate an empty state object
    this.state = {};

  // Generate a canvas and store it as our viewport
    this.viewport = cUtils.generateCanvas(w, h);
    this.viewport.id='viewport'+Math.random();

    // Get and store the canvas context as a global
    this.context = this.viewport.getContext('2d');

    // Append viewport into our container within the dom
    $container.insertBefore(this.viewport, $container.firstChild);

    // Instantiate core modules with the current scope
    this.update = gameUpdate( this );
    this.render = gameRender( this );
    this.loop = new gameLoop( this );

    this.state.entities = this.state.entities || {};

    this.activeBoundary = 0;
    this.boundaries = [ ];
    this.buoys = [ ];

    // load game map
    if (map) {
        map.boundaries.forEach((boundary) => {
            let b = new boundaryEnt(this, 'white');
            this.boundaries.push(b);
            this.state.entities['boundary'+Math.random()] = (b);
            boundary.forEach((point) => {
                b.addPoint({x: point[0], y: point[1] });
            })
        });
        map.buoys.forEach((buoy) => {
            let b = new buoyEnt(this, 'white');
            b.setMarkPoint(buoy[0], buoy[1]);
            b.setMarkRadius(buoy[2]);
            b.setMarkScore(buoy[3]);
            this.buoys.push(b);
            this.state.entities['buoy'+Math.random()] = (b);
        });
    }


    require('./utils/utils.keysDown')((e) => {
        //
        if (map){
            return;
        }

        if (e.KeyT) {

            const output = {
                boundaries: [],
                buoys: []
            };
            this.boundaries.forEach((boundary) => {
                output.boundaries.push(boundary.state.points)
            });
            this.buoys.forEach((buoy) => {
                output.buoys.push([buoy.state.geometry.x, buoy.state.geometry.y, buoy.state.geometry.r, buoy.state.score]);
            });
            console.log(JSON.stringify(output));
        }



        if (placeMode === 'boundary') {

            if (e.KeyS) {
                this.activeBoundary += 1;
                if (this.activeBoundary > this.boundaries.length - 1) {
                    this.activeBoundary = this.boundaries.length - 1;
                }
            }
            if (e.KeyA) {
                this.activeBoundary -= 1;
                if (this.activeBoundary < 0) {
                    this.activeBoundary = 0;
                }
            }

            if (e.KeyN) {
                console.log('ayy');
                let b = new boundaryEnt(this, 'white');
                this.boundaries.push(b);
                this.state.entities['boundary' + Math.random()] = (b);
            }
            if (e.KeyZ) {
                this.boundaries[this.activeBoundary].removeNewest();
            }
        }

        if (placeMode === 'buoy') {

            if (e.KeyZ) {
                this.bouys.pop();
                currentBuoyScore--;

            }
        }

    });

    let currentBuoyScore = map.buoys.length+1;
    this.viewport.addEventListener("mousedown", (evt) => {
        // console.log('evt', evt);
        if (map){
            return;
        }
        if (placeMode === 'boundary') {
            console.log('ayy');

            if (this.boundaries[this.activeBoundary]) {
                console.log('meh');
                this.boundaries[this.activeBoundary].addPoint({x: evt.layerX, y: evt.layerY});
            }
        }
        if (placeMode === 'buoy') {
            let b = new buoyEnt(this, 'red');
            b.setMarkPoint(evt.layerX, evt.layerY);
            // b.setMarkRadius(120);
            b.setMarkScore(currentBuoyScore);
            b.setMarkRadius(parseInt(prompt('Radius?', 90)));
            // b.setMarkScore(parseInt(prompt('Score Value', currentBuoyScore)));
            currentBuoyScore++;
            this.buoys.push(b);
            this.state.entities['buoy' + Math.random()] = (b);
        }
    }, false);

    //
    this.state.entities.player = new playerEnt(this, 100, 100, () => {
        return {
            boundaries: this.boundaries,
            buoys: this.buoys,
            brain: this.brain
        }
    }, () => {
        console.log('GAME OVER');
        gameOver(this.brain.score);
        this.destruct();
    });


    this.destruct = () => {
        this.alive = false;
        this.viewport.parentNode.removeChild(this.viewport);
    };


    return this;
}

// Instantiate a new game in the global scope at 800px by 600px
// new Game(1600, 900, 60, true);

module.exports = Game;