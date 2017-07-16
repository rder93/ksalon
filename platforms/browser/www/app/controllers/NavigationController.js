app.controller('NavigationController', ['$scope', '$state', '$rootScope', '$sessionStorage', function($scope, $state, $rootScope, $sessionStorage){
	$('.button-collapse').sideNav({
		  menuWidth: 300,
		  edge: 'left',
		  closeOnClick: true,
		  draggable: true
		}
	);

	
	$scope.user = $.sessionStorage.get('user');
	// $scope.pagename = 'INICIO';
	if (!$.sessionStorage.get('user')) {
		console.log("aqui")
		$state.go('login');
	}

	$('#btn-logout').click(function(event) {
		console.log("o aqui")
        $sessionStorage.user = null;
        $state.go('login');
    });
	
	console.log($scope.user.name);

}])