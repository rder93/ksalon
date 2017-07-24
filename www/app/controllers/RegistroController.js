app.controller('RegistroController', ['$scope', '$state', '$http', function($scope, $state, $http){
	
	// $('.categoria').material_select();
	$('body').removeClass('fondoBody');
	$http({
			method: 'GET',
			url: server_uri+'/categories',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.categories=response.data;
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			console.log('dio error');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	$scope.registrarUsuario = function() {
		$http({
			method: 'POST',
			url: server_uri+'/users',
			data:$scope.Usuario
		}).then(function successCallback(response) {
			console.log(response);
		    Materialize.toast(response.data.msj, 4000);
			$state.go('login');
		}, function errorCallback(response) {
			Materialize.toast(error, 4000);
			$state.go('registro');
		});
	};

}])