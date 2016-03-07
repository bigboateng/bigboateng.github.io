var app = angular.module('suevs_app', ['ngRoute']);


app.controller('homeController', ['$scope', function($scope){
	
}]);

app.config(['$routeProvider',function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'homeController'
		})
		.otherwise({
			redirectTo: 'home.html'
		}); 
}]);