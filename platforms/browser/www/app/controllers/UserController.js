app.controller('UserController', ['$scope', '$state', '$http', function($scope, $state, $http){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;

	if($state.current.name == 'perfil'){
		if(debug == 'true'){
			if (!$.sessionStorage.get('user')) {
    	 		$state.go('login');
    		}
			$scope.Usuario=$.sessionStorage.get('user');
			if ($scope.Usuario.rol_id==2 || $scope.Usuario.rol_id==3) {
				$scope.btnSalones=true;
			}else if ($scope.Usuario.rol_id==4) {
				$scope.btnClientes=true;
			}

		}

	}

	if($state.current.name == 'perfil_config'){
		if(debug == 'true')
			console.log('en configuracion del perfil');

		$scope.cargarImagen = function(id) {
			navigator.camera.getPicture(successPhoto,errorPhoto,{quality:50});
		};
		
		$scope.Usuario=$.sessionStorage.get('user');

		$scope.actualizarUsuario = function() {
			$http({
				method: 'PUT',
				url: server_uri+'/users/'+$scope.Usuario.id,
				data:$scope.Usuario
			}).then(function successCallback(response) {
				console.log(response);
			    console.log('se obtienen los datos del usuario')
			}, function errorCallback(response) {
				console.log('dio error');
			});
		};

		function successPhoto(){
			alert('funciono')
		}
		function errorPhoto(){
			alert("error");
		}

	}

}]);


