angular.module("isaProject")
.controller("CinemasController", ["EstablishmentService", function(EstablishmentService) {
    
    var self = this;
    (function () {
        EstablishmentService.getAllCinemas()
            .then(function(response) {
                self.cinemas = response.data;
            })
    })();
    
}])

.controller("TheatresController", ["EstablishmentService", function(EstablishmentService) {
    var self = this;
    (function () {
        EstablishmentService.getAllTheatres()
            .then(function(response) {
                self.theatres = response.data;
            })
    })();
}])

.controller("RepertoireController", ["repertoirePromise", "EstablishmentService", "$routeParams", function(repertoirePromise, EstablishmentService, $routeParams) {
    
    var self = this;
    self.projections = repertoirePromise;

    self.newEvent = {};
    self.addEvent = function() {
        EstablishmentService.createEvent($routeParams.id, self.newEvent)
            .then(function(response) {
                self.projections.push(response.data);
                self.newEvent = {};
            });
    }

}]);