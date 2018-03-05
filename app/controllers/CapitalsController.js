app.controller('CapitalsCtrl', function ($scope, $http) {
    $scope.countries = [{
        "name": "France",
        "capital": "Paris",
        "visited": "",
        "id": "0",
        "toVisit": ""
}, {
        "name": "Spain",
        "capital": "Madrid",
        "visited": "",
        "id": "1",
        "toVisit": ""
}, {
        "name": "Austria",
        "capital": "Vienna",
        "visited": "",
        "id": "2",
        "toVisit": ""
}];
    /*
    Local Storage
    */
    var localStorageCounter = 2;
    $scope.addText = function (name, capital, visited, toVisit) {
        localStorageCounter++;
        var obj = {
            "name": name,
            "capital": capital,
            "visited": visited,
            "id": localStorageCounter,
            "toVisit": toVisit
        };
        var serialObj = JSON.stringify(obj);
        localStorage.setItem("myKey" + localStorageCounter, serialObj);
        $scope.countries.push(obj);
        $scope.myText = '';
        $scope.myy = '';
        setTimeout(MaxMin, 1000);
    }
    for (var i = 3; i <= localStorage.length + 2; i++) {
        var returnObj = JSON.parse(localStorage.getItem("myKey" + i));
        $scope.addText(returnObj.name, returnObj.capital, returnObj.visited, returnObj.toVisit);
    }
    /*
    get weather api 
    */
    $scope.weather = function (city) {
        var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
        $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json").success(function (data) {
            $('#' + city).text(data.query.results.channel.item.condition.temp);
            $('#' + city + 'condition').text(data.query.results.channel.item.condition.text);
        });
    };
    /*
    Function to get Max and Min number; Color column
    */
    function MaxMin() {
        $('.temp').parent().css("background-color", "rgba(255,255,255, 0.5)");
        $('.temp').parent().css("color", "black");
        var arr = [];
        for (var i = 0; i < $scope.countries.length; i++) {
            for (var key in $scope.countries[i]) {
                var cap = $scope.countries[i].capital;
                var capTxt = $('#' + cap).text();
            };
            arr.push(capTxt);
            var arrLen = $scope.countries.length;
            if (arr.length == arrLen) {
                MaxMinColor()
            };
        };

        function MaxMinColor() {
            Array.prototype.max = function () {
                return Math.max.apply(null, this);
            };
            Array.prototype.min = function () {
                return Math.min.apply(null, this);
            };
            var max = arr.max();
            var min = arr.min();
            for (var i = 0; i < $scope.countries.length; i++) {
                for (var key in $scope.countries[i]) {
                    var cap = $scope.countries[i].capital;
                    var capTxt = $('#' + cap).text();
                    if (capTxt == max) {
                        $('#' + cap).parent().animate({
                            color: "white",
                            backgroundColor: "rgba(255, 0, 0, 0.8)"
                        }, 1000);
                    };
                    if (capTxt == min) {
                        $('#' + cap).parent().animate({
                            color: "white",
                            backgroundColor: "rgba(106,90,205,0.8)"
                        }, 1000);
                    };
                };
            };
        };
        $scope.autoVisit();
    };
    setTimeout(MaxMin, 2000);
    /*
    Order Property
    */
    $scope.setOrderProperty = function (propertyName) {
        if ($scope.orderProperty === propertyName) {
            $scope.orderProperty = '-' + propertyName;
        } else if ($scope.orderProperty === '-' + propertyName) {
            $scope.orderProperty = propertyName;
        } else {
            $scope.orderProperty = propertyName;
        };
    };
    /*
    Popup
    */
    $scope.openPopup = function () {
        $('.popup').show(300);
    };
    $scope.closePopup = function () {
        $('.popup').hide(300);
    };

    $scope.default = function () {
        localStorage.clear();
        location.reload();
    };
    /*
visit country function
*/
    $scope.yes = function (event) {
        var el = event.currentTarget;
        var targetId = el.id;
        $("#" + targetId).parent().animate({
            color: "white",
            backgroundColor: "rgba(128,128,128,0.8)"
        }, 500);
        $scope.countries[el.id].visited = "Visited!";
        $scope.countries[el.id].toVisit = "";
        var par = JSON.parse(localStorage.getItem("myKey" + el.id));
        var obj = {
            "name": par.name,
            "capital": par.capital,
            "visited": "Visited!",
            "id": par.id,
            "toVisit": ""
        };
        var serialObj = JSON.stringify(obj);
        localStorage.setItem("myKey" + el.id, serialObj);
    };
    /**
    want to visit func
    */
    $scope.yesToVisit = function (event) {
        var el = event.currentTarget;
        var targetId = el.id;
        $("#" + targetId).parent().animate({
            color: "white",
            backgroundColor: "rgba(148, 0, 211,0.8)"
        }, 500);
        $scope.countries[el.id].toVisit = "Want to visit!";
        $scope.countries[el.id].visited = "";
        var par = JSON.parse(localStorage.getItem("myKey" + el.id));
        var obj = {
            "name": par.name,
            "capital": par.capital,
            "visited": "",
            "id": par.id,
            "toVisit": "Want to visit!"
        };
        var serialObj = JSON.stringify(obj);
        localStorage.setItem("myKey" + el.id, serialObj);
    };
/*
find at start visited and want to visit places
*/
  $scope.autoVisit = function(){
       for (var i = 3; i<=localStorage.length + 2;i++){
     //console.log($scope.countries[i].name);
     var res = $scope.countries[i].visited;
           var wantRes = $scope.countries[i].toVisit;
     if(res == "Visited!"){
         $("#" + $scope.countries[i].id).parent().animate({
            color: "white",
            backgroundColor: "rgba(128,128,128,0.8)"
        }, 500);
     } else if(wantRes == "Want to visit!"){
         $("#" + $scope.countries[i].id).parent().animate({
            color: "white",
            backgroundColor: "rgba(148, 0, 211,0.8)"
        }, 500);
     }
 }  ;
  }
  setTimeout($scope.autoVisit, 2100);

});
