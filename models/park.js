const Dinosaur = require("./dinosaur");

const Park = function(name,ticketPrice) {
    this.name = name;
    this.ticketPrice = ticketPrice;
    this.dinosaurs = [];
}

Park.prototype.add = function(dinosaur){
    this.dinosaurs.push(dinosaur);
}

Park.prototype.remove = function(dinosaur){
    let pos = this.dinosaurs.indexOf(dinosaur);
    this.dinosaurs.splice(pos,1);
}

Park.prototype.findMostAttractiveDinosaur = function(){
    let topDino;
    let highScore = 0;
    for(const dinosaur of this.dinosaurs){
        if (dinosaur.guestsAttractedPerDay > highScore){
            topDino = new Dinosaur(dinosaur.species,dinosaur.diet,dinosaur.guestsAttractedPerDay);
            highScore = dinosaur.guestsAttractedPerDay;
        }
    }
    return topDino;
}

Park.prototype.findBySpecies = function(species){
    let results = [];
    for(const dinosaur of this.dinosaurs){
        if(dinosaur.species === species){
            results.push(dinosaur);
        }
    }
    return results;
}

Park.prototype.calculateTotalVisitorsPerDay = function(){
    let total = 0;
    for(const dinosaur of this.dinosaurs){
        total += dinosaur.guestsAttractedPerDay;
    }
    return total;
}

Park.prototype.calculateAverageVisitorsPerYear = function (){
    return this.calculateTotalVisitorsPerDay() * 365;
}

Park.prototype.calculateAverageYearlyRevenue = function () {
    let revenue = this.ticketPrice * this.calculateAverageVisitorsPerYear();
    return revenue;
}

Park.prototype.removeBySpecies = function(species){
    let toRemove = this.findBySpecies(species);
    for(const dinosaur of toRemove){
        this.remove(dinosaur);
    }
}

Park.prototype.numberOfDinosaursByDiet = function(){
    let result = { carnivore:0, herbivore:0, omnivore:0 };
    for(const dinosaur of this.dinosaurs){
        if(dinosaur.diet === "carnivore"){
            result.carnivore++;
        } else if(dinosaur.diet === "herbivore"){
            result.herbivore++;
        } else if(dinosaur.diet === "omnivore"){
            result.omnivore++;
        };
    }
    return result;
}

module.exports = Park;