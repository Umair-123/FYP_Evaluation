app.factory('bznsDispPanelSrvc', ['$cookies', '$http', '$q', function($cookies, $http, $q){

	var o={};
	var cookies={
		category: 'ctg'
	};

	var setCookie = function(k,v){
		var now = new Date();
		var exp = new Date(now.getFullYear()+1, now.getMonth());
		$cookies.put(k, v, {expires:exp});
	};

	var getDataFileName = function(id){

		var n="";
		switch(id.toString()){
			case '2': n="data/food-biz.json"; break;
			case '1': n="data/furniture-biz.json"; break;
			case '3': n="data/cloth-biz.json"; break;
			case '4': n="data/real-estate-biz.json"; break;
			case '5': n="data/medical-biz.json"; break;
			case '6': n="data/education-biz.json"; break;
			case '7': n="data/sports-biz.json"; break;
			case '8': n="data/travel-biz.json"; break;
			case '9': n="data/courier-biz.json"; break;
			default: n="data/food-biz.json"; break;
		}
		return n;
	};

	o.currentCtg = $cookies.get(cookies.category) || 2;

	o.changeCategory = function(id){
		o.currentCtg = id;
		setCookie(cookies.category, id);
		var d = $q.defer();

		$http.get(getDataFileName(id)).then(function(data){
			d.resolve(angular.fromJson(data.data));
		},function(reason){
			console.log(reason);
			d.reject(reason);
		});

		return d.promise;
	};

	o.getCategories = function(){
		var d = $q.defer();
		$http.get('data/categories.json').then(function(data){
			d.resolve(angular.fromJson(data.data));
		});
		return d.promise;
	};

	return o;
}]);