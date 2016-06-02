app.controller('BznsDispPanelCtrl', ['$scope', 'bznsDispPanelSrvc', '$location',function(scope, srvc, loc){
	
	scope.panelData = [];
	scope.categories = [];
	scope.currentCtg = srvc.currentCtg;

	srvc.getCategories().then(function(ctgs){
		scope.categories = ctgs;
	});

	scope.changeCategory = function(id){
		scope.currentCtg = id;
		srvc.changeCategory(id).then(function(data){
			scope.panelData = data;
		},function(reason){scope.panelData=[];});
	};

	scope.changeCategory(scope.currentCtg);

}]);