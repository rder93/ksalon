app.controller('RegistroController', ['$scope', '$state', '$http', function($scope, $state, $http){
	
	if ($.sessionStorage.get('user')) {
		$scope.logueo=true;
	}else{
		$scope.logueo=false;
	}


	$http({
		method: 'GET',
		url: server_uri+'/roles',
	}).then(function successCallback(response) {
		$scope.Roles= response.data.roles;
	}, function errorCallback() {
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
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			console.log('dio error');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	};

}])