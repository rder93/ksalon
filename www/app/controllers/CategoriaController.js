app.controller('CategoriaController', ['$scope', '$state', '$http', '$stateParams', '$sessionStorage', function($scope, $state, $http, $stateParams, $sessionStorage){
	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'panel_servicios_categorias') {
		
        $scope.accion = function() {
            alert('activo');
        }

        $http.get(server_uri+'/categories')
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.categorias = response.data;
            }, function errorCallback(error) {
                console.log(error);
            });

        $http.get(server_uri+'/services')
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.servicios = response.data;
            }, function errorCallback(error) {
                console.log(error);
            });

	}
}])