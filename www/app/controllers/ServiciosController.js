app.controller('ServiciosController', ['$scope', '$state',  '$rootScope', '$stateParams', '$sessionStorage', function($scope, $state, $rootScope, $stateParams, $sessionStorage){
	var server_uri = $('body').attr('data-server_uri');
	$scope.server_uri = server_uri;

	
	if (!$.sessionStorage.get('user')) {
		$state.go('login');
	}


	



}]) 