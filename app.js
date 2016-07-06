angular.module('yourApp', ['ngResource', 'ngMap', 'pickadate', 'ui.bootstrap']);

var app = angular.module('yourApp', []);

app.directive('currentWeather', function() {
  return {
    restrict: 'E',
    scope: {
      city: '@'
    },
    template: '<div class="current-weather"><h4>Weather for {{city}}</h4>{{weather.main.temp}}</div>',
    // templateUrl: 'templates/currentWeatherTemplate.html',
    // transclude: true,
    controller: ['$scope', '$http', function($scope, $http){
                var url="http://api.openweathermap.org/data/2.5/weather?mode=json&cnt=7&units=imperial&callback=JSON_CALLBACK&q=";
                var apikey = "&appid="; // go generate an API key and plug it in here.
                $scope.getWeather = function(city){
                    $http({method: 'JSONP', url: url + city + apikey})
                        .success(function(data){
                            $scope.weather = data;
                        });
                };
            }],
    link: function (scope, element, attrs) {
      scope.weather = scope.getWeather(attrs.city);
    }
  };
});
