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

.controller("RepertoireController", ["repertoirePromise", "EstablishmentService", "$route", "$routeParams", function(repertoirePromise, EstablishmentService, $route, $routeParams) {

    var self = this;
    var today = new Date();
    var today_plus1 = new Date(); today_plus1.setDate(today.getDate() + 1);
    var today_plus2 = new Date(); today_plus2.setDate(today.getDate() + 2);
    var today_plus3 = new Date(); today_plus3.setDate(today.getDate() + 3);
    var today_plus4 = new Date(); today_plus4.setDate(today.getDate() + 4);
    
    self.days = [today,
    			today_plus1,
    			today_plus2,
    			today_plus3,
    			today_plus4];
 
    self.cinemaId = $route.current.params.id;
   
    self.projections = repertoirePromise;
    self.establishmentId = $routeParams.id;
    console.log(self.projections);

    self.newEvent = {};
    self.addEvent = function() {
        EstablishmentService.createEvent($routeParams.id, self.newEvent)
            .then(function(response) {
                self.projections.push(response.data);
                self.newEvent = {};
            });
    };
    
    self.deleteEvent = function(eventId) {
        EstablishmentService.deleteEvent($routeParams.id, eventId)
            .then(function(response) {
                $route.reload();
            });
    };

}])

.controller("EditRepertoireController", ["$location", "$routeParams", "EstablishmentService", function($location, $routeParams, EstablishmentService) {
    var self = this;
    self.alertMessage = "";
    self.success = "";
    self.error = "";

    self.flags = {
        "edit": false,
        "preview": false,
        "add": false
    };

    self.toggleEditView = function() {
        self.flags.edit = true;
        self.flags.preview = false;
        self.flags.add = false;
    };

    self.togglePreviewView = function() {
        self.flags.edit = false;
        self.flags.preview = true;
        self.flags.add = false;
    };

    self.toggleAddView = function() {
        self.flags.edit = false;
        self.flags.preview = false;
        self.flags.add = true;
    };

    (function() {
        EstablishmentService.getEvent($routeParams.establishmentId, $routeParams.eventId)
            .then(function(response) {
                self.event = response.data;
            })
    })();
    (function() {
        EstablishmentService.getHalls($routeParams.establishmentId)
            .then(function(response) {
                self.halls = response.data;
                console.log(self.halls);
            });
    })()

    self.updateEvent = function() {
        EstablishmentService.updateEvent($routeParams.establishmentId, $routeParams.eventId, self.event).then(function(response) {
            self.alertMessage = "Ažuriranje uspešno";
        })
    };

    self.projection = {};
    self.addProjection = function() {
        var projectionDTO = {};
        projectionDTO.price = self.projection.price;
        projectionDTO.halls = [parseInt(self.projection.selectedHall)];

        var day = self.projection.date.getDate();
        var month = self.projection.date.getMonth() + 1;
        var year = self.projection.date.getFullYear();
        var date = year + '-' + month + '-' + day;

        var hours = self.projection.time.getHours();
        var minutes = self.projection.time.getMinutes();
        var time = hours + ':' + minutes + ':00';
        
        var dateAndTime = date + 'T' + time;
        projectionDTO.date = dateAndTime;
        
        EstablishmentService.addEventDetails($routeParams.eventId, projectionDTO)
            .then(function(response) {
                self.success = "Uspešno dodata projekcija";
                self.error = "";
            }, 
            function(error) {
                self.success = "";
                self.error = "Sala je zauzeta u traženom terimnu";
            })
    }

    self.cancel = function() {
        $location.path('/repertoar/'+ $routeParams.establishmentId);
    };
}])

.controller('SeatReservationController', ["$scope", "EstablishmentService","$routeParams", "User", function($scope, EstablishmentService, $routeParams, User){
	
	var self = this;
	self.rows = [];
	self.eventDetails = {};
	self.selectedSeats = [];
	self.searchResult = {};
	
	EstablishmentService.getSeatReservations($routeParams.establishmentId, $routeParams.eventId, $routeParams.scheduleId).then(function(response){
		self.eventDetails = response.data;
		var sqrt =  Math.sqrt(self.eventDetails.seats.length);
		for(var i=0; i < sqrt; i++){
			var row = [];
			for(var j=0; j<sqrt; j++){
				row[j] = self.eventDetails.seats[i*5 + j]; 
			}
			self.rows[i] = row;
		}
	});
	
	self.seatClicked = function(row, col){
		var seatCode = row.toString() + col.toString();
		var seatIndex = self.selectedSeats.indexOf(seatCode);
		
		if(seatIndex > -1)
			self.selectedSeats.splice(seatIndex, 1);
		else{
			if(self.selectedSeats.length <= 3)
				self.selectedSeats.push(seatCode);
			else{
				alert("Možete rezervisati najviše četiri(4) sedišta");
			}
		}
	}
	
	self.getSeatStatus = function(row, col){
		var seatCode = row.toString() + col.toString();
		if(!self.rows[row][col].isAvailable)
			return 'reserved';
		else if(self.selectedSeats.indexOf(seatCode) > -1)
			return 'selected';
	}
	
	self.search = function(){
    	if(self.criteria != ""){
    		
    		User.searchForUser(self.criteria).then(function(response){
        		self.searchResult = response.data;
        	});
    		self.criteria= "";
    	}
    	else{
    		self.searchResult = {};
    	}
    }
	
	self.sendInvite = function(){
		
	}
	
	
	console.log(self.rows);
}])

