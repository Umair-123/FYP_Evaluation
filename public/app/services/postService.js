angular.module('postService', [])


.factory('Post', function($http) {


	var postFactory = {};

	postFactory.allPosts = function() {
		return $http.get('/api/all_posts');
	}

	postFactory.all = function() {
		return $http.get('/api/postbyuser');
	}


	postFactory.create = function(postData) {
		return $http.post('/api/postbyuser', postData);
	}
	

	

	return postFactory;


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