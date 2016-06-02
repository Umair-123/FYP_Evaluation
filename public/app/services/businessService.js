angular.module('businessService', [])


.factory('Business', function($http) {


	var businessFactory = {};

	businessFactory.allBusinesses = function() {
		return $http.get('/api/all_businesses');
	}

	businessFactory.searchBusinesses = function(businessData) {
		return $http.get('/api/search_business',businessData);
	}

	businessFactory.all = function() {
		return $http.get('/api/');
	}

	businessFactory.create = function(businessData) {
		return $http.post('/api/', businessData);
	}


	

	return businessFactory;


})

.factory('socketio', function($rootScope) {

	var socket = io.connect();
	return {

		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}

	};

});