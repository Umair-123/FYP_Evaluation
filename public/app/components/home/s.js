app.factory('home', ['$http', '$q', function($http, $q){
	var o={};

	o.getCities = function(){
		var d = $q.defer();
		$http.get('data/cities.json').then(function(data){
			d.resolve(angular.fromJson(data.data));
		});
		return d.promise;
	};

	return o;
}]);