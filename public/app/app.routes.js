angular.module('appRoutes', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
		.when('/BizFeed', {
			templateUrl: 'app/views/pages/BizFeed.html'
		})
		.when('/profile', {
			templateUrl: 'app/views/pages/profile.html'
		})
		.when('/posts', {
			templateUrl: 'app/views/pages/profileposts.html'
		})
		.when('/logout', {
			templateUrl: 'app/views/pages/loggedout.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
		

		.when('/allStories', {
			templateUrl: 'app/views/pages/allStories.html',
			controller: 'AllBusinessesController',
			controllerAs: 'business',
			/*resolve: {
				businesses: function(Business) {
					return Business.allBusinesses();
				}
			}*/

		})

	$locationProvider.html5Mode(true);

})