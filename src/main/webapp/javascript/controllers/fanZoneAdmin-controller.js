angular.module("isaProject")

.controller("FanZoneAdminController", [function(){
    
    self = this;

}])

.controller("FanZoneAdminNewPropController", ["ImageUpload", "FanZoneAdmin", function(ImageUpload, FanZoneAdmin){

    self = this;

    self.establishments = {};
    FanZoneAdmin.getEstablishments().then(function(data){
        self.establishments = data.data;
    })

    self.createNewProp = function(newProp){
        var prop = newProp;
        prop.available = true;
        FanZoneAdmin.newProp(prop).then(function(){});
    }
}])

.controller("FanZoneAdminOfficialPropsController", ["$location", "FanZoneAdmin", function($location, FanZoneAdmin){

    self = this;

    self.officialProps = {};
    FanZoneAdmin.getOfficialProps().then(function(data){
        self.officialProps = data.data;
    })

    self.deleteProp = function(prop){
        console.log(prop);
        FanZoneAdmin.deleteOfficialProp(prop.id).then(function(){
            FanZoneAdmin.getOfficialProps().then(function(data){
                self.officialProps = data.data;
            })
        })
    }

    self.updateProp = function(prop){
        FanZoneAdmin.setPropForUpdate(prop);
        $location.path("/izmenaTematskogRekvizita");
    }
}])

.controller("FanZoneAdminUpdatePropController", ["FanZoneAdmin", function(FanZoneAdmin){

    self = this;

    self.prop = FanZoneAdmin.getPropForUpdate();
    console.log(self.prop);   
    
    self.updateProp = function(prop){
        FanZoneAdmin.updateOfficialProp(prop).then(function(){

        })
    }
}])

.controller("FanZoneAdminUsedPropsController", ["FanZoneAdmin", function(FanZoneAdmin){

    self = this;

    self.pendingUserAds = {};
    FanZoneAdmin.getPendingUserAds().then(function(data){
        self.pendingUserAds = data.data;
        console.log(self.pendingUserAds);
    })

    self.updateUserAdStatus = function(userAd, status){
        var updatedUserAd = userAd;
        updatedUserAd.adStatus = status;
        FanZoneAdmin.updateUserAdStatus(updatedUserAd).then(function(){
            FanZoneAdmin.getPendingUserAds().then(function(data){
                self.pendingUserAds = data.data;
            })
        })
    }


}])

.controller("FanZoneAdminUpdateDataController", ["FanZoneAdmin", function(FanZoneAdmin){

    self = this;

    self.update = function(admin){
        FanZoneAdmin.update(admin).then(function(){});
    }
}]);