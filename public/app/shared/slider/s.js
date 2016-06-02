app.factory('bznsSliderSrvc', ['$q', '$http', function($q, $http){
	var o={};

	o.getSlides = function(){
		var d = $q.defer();
		$http.get('data/top-biz.json').then(function(data){
			d.resolve(angular.fromJson(data.data));
		});
		return d.promise;
	};

	return o;
}]);