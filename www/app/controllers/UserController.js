app.controller('UserController', ['$scope', '$state', '$http', function($scope, $state, $http){
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
			    // this callback will be called asynchronously
			    // when the response is available
			}, function errorCallback(response) {
				console.log('dio error');
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
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


