var GeneticAlgorithm = function() {
    this.max_units = 10
    this.top_units = 4
    this.Population = []
    this.SCALE_FACTOR = 200
}

GeneticAlgorithm.prototype = {
    reset: function() {
        this.iteration = 1
        this.mutateRate = 1
        this.best_population = 0
        this.best_fitness = 0
        this.best_score = 0
    },
    createPopulation: function() {
        this.Population.splice(0, this.Population.length)
        for (var i = 0; i < this.max_units; i++) {
            var newUnit = new synaptic.Architect.Perceptron(2, 6, 1)
            newUnit.index = i
            newUnit.fitness = 0
            newUnit.score = 0
            newUnit.isWinner = false
            this.Population.push(newUnit)
        }
    },
    activateBrain: function(paddle, ball) {
        var paddleX = this.normalize(paddle.x, 400 - paddle.imageDrawWidth) * this.SCALE_FACTOR
        var ballX = this.normalize(ball.x, 400 - ball.imageDrawWidth) * this.SCALE_FACTOR
        var ballY = this.normalize(ball.y, 300 - ball.imageDrawHeight) * this.SCALE_FACTOR
        var inputs = [paddleX, ballX, ballY]
        var outputs = this.Population[paddle.index].activate(inputs)
        if (outputs[0] > 0.5) {
            paddle.moveLeft()
        } else {
            paddle.moveRight()
        }
    },

    // evolves the population by performing selection, crossover and mutations on the units
    evolvePopulation : function(){
        log('debug', this.Population)
        // select the top units of the current population to get an array of winners
        // (they will be copied to the next population)
        var Winners = this.selection();

        if (this.mutateRate == 1 && Winners[0].fitness < 0){ 
            // If the best unit from the initial population has a negative fitness 
            // then it means there is no any bird which reached the first barrier!
            // Playing as the God, we can destroy this bad population and try with another one.
            this.createPopulation();
        } else {
            this.mutateRate = 0.2; // else set the mutatation rate to the real value
        }
            
        // fill the rest of the next population with new units using crossover and mutation
        for (var i=this.top_units; i<this.max_units; i++){
            var parentA, parentB, offspring;
                
            if (i == this.top_units){
                // offspring is made by a crossover of two best winners
                parentA = Winners[0].toJSON();
                parentB = Winners[1].toJSON();

                offspring = this.crossOver(parentA, parentB);

            } else if (i < this.max_units-2){
                // offspring is made by a crossover of two random winners
                parentA = this.getRandomUnit(Winners).toJSON();
                parentB = this.getRandomUnit(Winners).toJSON();
                offspring = this.crossOver(parentA, parentB);
                
            } else {
                // offspring is a random winner
                offspring = this.getRandomUnit(Winners).toJSON();
            }

            // mutate the offspring
            offspring = this.mutation(offspring);
            
            // create a new unit using the neural network from the offspring
            var newUnit = synaptic.Network.fromJSON(offspring);
            newUnit.index = this.Population[i].index;
            newUnit.fitness = 0;
            newUnit.score = 0;
            newUnit.isWinner = false;
            
            // update population by changing the old unit with the new one
            this.Population[i] = newUnit;
        }
        
        // if the top winner has the best fitness in the history, store its achievement!
        if (Winners[0].fitness > this.best_fitness){
            this.best_population = this.iteration;
            this.best_fitness = Winners[0].fitness;
            this.best_score = Winners[0].score;
        }
        
        // sort the units of the new population in ascending order by their index
        this.Population.sort(function(unitA, unitB){
            return unitA.index - unitB.index;
        });
    },

    selection: function() {
        var sortedPopulation = this.Population.sort(function(unitA, unitB) {
            return unitB.fitness - unitA.fitness
        })
        for (var i = 0; i < this.top_units; i++) {
            this.Population[i].isWinner = true
        }
        return sortedPopulation.slice(0, this.top_units)
    },

    // performs a single point crossover between two parents
    crossOver : function(parentA, parentB) {
        // get a cross over cutting point
        var cutPoint = this.random(0, parentA.neurons.length-1);
        
        // swap 'bias' information between both parents:
        // 1. left side to the crossover point is copied from one parent
        // 2. right side after the crossover point is copied from the second parent
        for (var i = cutPoint; i < parentA.neurons.length; i++){
            var biasFromParentA = parentA.neurons[i]['bias'];
            parentA.neurons[i]['bias'] = parentB.neurons[i]['bias'];
            parentB.neurons[i]['bias'] = biasFromParentA;
        }

        return this.random(0, 1) == 1 ? parentA : parentB;
    },
    
    // performs random mutations on the offspring
    mutation : function (offspring){
        // mutate some 'bias' information of the offspring neurons
        for (var i = 0; i < offspring.neurons.length; i++){
            offspring.neurons[i]['bias'] = this.mutate(offspring.neurons[i]['bias']);
        }
        
        // mutate some 'weights' information of the offspring connections
        for (var i = 0; i < offspring.connections.length; i++){
            offspring.connections[i]['weight'] = this.mutate(offspring.connections[i]['weight']);
        }
        
        return offspring;
    },
    
    // mutates a gene
    mutate : function (gene){
        if (Math.random() < this.mutateRate) {
            var mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5));
            gene *= mutateFactor;
        }
        
        return gene;
    },
    
    random : function(min, max){
        return Math.floor(Math.random()*(max-min+1) + min);
    },
    
    getRandomUnit : function(array){
        return array[this.random(0, array.length-1)];
    },

    normalize: function(value, max) {
        if (value < -max) {
            value = -max
        } else if (value > max) {
            value = max
        }
        return (value / max)
    },
}
