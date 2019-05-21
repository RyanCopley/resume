var Game = require('./game');


class NeuralNetworkTrainer{

    constructor ({neat, games, gameSize, gameUnit, frameRate, lowestScoreAllowed, onEndGeneration}) {
        this.neat = neat
        this.games = []
        this.numGames = games;
        this.gamesFinished = 0
        this.onEndGeneration = onEndGeneration;

    }

    startGeneration () {
        this.gamesFinished = 0

        const map = Math.floor(Math.random() * window.maps.length); // select random map

        for (let i = 0; i < this.neat.population.length; i++) {
            var brain = this.neat.population[i];
            this.games[i] = new Game(map, 1600, 900, (score) => {
                this.endGeneration(i, score);
            }, brain, 30, true);
        }
    }

    endGeneration (i, score) {

        // this.neat.population[i].score = score;
        if (this.gamesFinished + 1 < this.games.length) {
            this.gamesFinished++;
            return;
        }


        this.neat.sort();

        this.onEndGeneration({
            generation: this.neat.generation,
            max: this.neat.getFittest().score
        });


        const newGeneration = [];

        for (let i = 0; i < this.neat.elitism; i++) {
            newGeneration.push(this.neat.population[i]);
        }

        for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++) {
            newGeneration.push(this.neat.getOffspring())
        }

        this.neat.population = newGeneration;
        this.neat.mutate();
        this.neat.generation++;
        this.startGeneration();
    }

}
// new Game(1, 1600, 900, (score) => {
//     this.endGeneration(i, score);
// }, null, 30, true)

module.exports = NeuralNetworkTrainer;