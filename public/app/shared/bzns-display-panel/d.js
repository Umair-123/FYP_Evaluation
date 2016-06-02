app.directive('bznsDisplayPanel', function(){

	return {
		templateUrl: 'app/shared/bzns-display-panel/v.html',
		replace: true,
		controller: 'BznsDispPanelCtrl',
		controllerAs: 'bdpc',
	};
});