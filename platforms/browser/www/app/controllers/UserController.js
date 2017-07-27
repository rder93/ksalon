app.controller('UserController', ['$scope', '$state', '$http', function($scope, $state, $http){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;
	var fotos_uri = $('body').attr('data-fotos_uri');

	if($state.current.name == 'perfil'){
		if(debug == 'true'){
			if (!$.sessionStorage.get('user')) {
				console.log("no ha iniciado sesion");
    	 		$state.go('login');
    	 		return false;
    		}

			$scope.Usuario=$.sessionStorage.get('user');
			$scope.thumbnail = {
				dataUrl: fotos_uri+$scope.Usuario.avatar
			};
			if ($scope.Usuario.rol_id==2) {
				$scope.btnSalones=true;
			}else if ($scope.Usuario.rol_id==4) {
				$scope.btnClientes=true;
			}else if ($scope.Usuario.rol_id == 3){
				$scope.btnProfesional = true;
			}

		}

	}

	if($state.current.name == 'perfil_config'){
		if(debug == 'true')
		$scope.Usuario={};	
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

		function successPhoto(url){
			$("#contenedorFoto").attr("src",url);
    		$("#contenedorFoto").show();
    		$scope.Usuario.foto=url;
    		alert($scope.Usuario);
		}
		function errorPhoto(){
			alert("error");
		}

	}

}]);


