app.controller('UserController', ['$scope', '$state', function($scope, $state){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;

	if($state.current.name == 'perfil'){
		if(debug == 'true'){
			$scope.Usuario=$.sessionStorage.get('user');
		}

	}

	if($state.current.name == 'perfil_config'){
		if(debug == 'true')
			console.log('en configuracion del perfsil');


	}

}])