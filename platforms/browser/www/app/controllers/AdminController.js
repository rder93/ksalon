app.controller('AdminController', ['$scope', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', function($scope, $state, $rootScope, $stateParams, $sessionStorage, $http){
	$('.mobile-content').fadeIn(1000);

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'panel_usuarios') {
		$http.get(server_uri+"users/")
			.then(function(response){
				console.log(response.data);
				$scope.usuarios = response.data;
			})
			.catch(function(error){
				console.log(error);
			});
	}

}])