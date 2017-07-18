app.controller('AdminController', ['$scope', '$state','$stateParams', '$sessionStorage', function($scope, $state, $stateParams, $sessionStorage){
	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'panel_usuarios') {
		var data = [{
            id: 1,
            name: 'Ricardo Etcheverry',
            role: 1
        },{
            id: 2,
            name: 'Jesus Torres',
            role: 5
        },{
            id: 3,
            name: 'Roiner Hernandez',
            role: 5
        }];

        $scope.usuarios = data;
	}
}])