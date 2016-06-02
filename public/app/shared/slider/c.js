app.controller('BznsSliderCtrl', ['$scope', 'bznsSliderSrvc', function(scope, srvc){
	
	scope.interval = 3000;
	scope.slides=[];
	srvc.getSlides().then(function(slides){
		slides[0].active=true;
		scope.slides = slides;
	});
}]);