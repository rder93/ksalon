app.controller('AdminController', ['$scope', '$timeout', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', function($scope, $timeout, $state, $rootScope, $stateParams, $sessionStorage, $http){
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

	if ($state.current.name == 'add_usuarios') {

		$scope.new_user = {
	        "rol_id":""
	    };

	    $scope.roles = [];

		$http.get(server_uri+"rols/")
			.then(function(response){
				console.log(response.data);
				$scope.roles = response.data;
				$timeout(function(){
			       $('select').material_select();
			    });
			})
			.catch(function(error){
				console.log(error);
			});


		$scope.newUser = function () {
			$scope.new_user.password = "12345";
			$scope.new_user.rol_id = $scope.new_user.rol_id.nivel;
			console.log($scope.new_user.rol_id);
			$http({
		        url: server_uri+"users/",
		        method: "POST",
		        data: $scope.new_user
	    	}).then(function(response){
					console.log(response.data);
					Materialize.toast(response.data.msj, 4000);
					$state.go('panel_usuarios');
				})
				.catch(function(error){
					Materialize.toast(error, 4000);
				});
		}
		

	}

}])