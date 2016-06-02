app.factory('userSrvc', ['$cookies', function($cookies){

	var u={};
	var cookies={
		city:'city'
	};

	var setCookie = function(k,v){
		var now = new Date();
		var exp = new Date(now.getFullYear()+1, now.getMonth());
		$cookies.put(k, v, {expires:exp});
	};

	u.city = {id:$cookies.get(cookies.city)||1};

	u.setCity = function(){
		u.city = this.city;
		setCookie(cookies.city, u.city.id);
	};

	return u;
}]);