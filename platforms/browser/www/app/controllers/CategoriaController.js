app.controller('CategoriaController', ['$scope', '$state', '$http', '$stateParams', '$sessionStorage', function($scope, $state, $http, $stateParams, $sessionStorage){
	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'panel_servicios_categorias') {
		
        $scope.accion = function() {
            alert('activo');
        }

        $http.get(server_uri+'categories/')
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.categorias = response.data;
            }, function errorCallback(error) {
                console.log(error);
            });

        $http.get(server_uri+'services/')
            .then(function successCallback(response) {
                console.log(response.data);
                $scope.servicios = response.data;
            }, function errorCallback(error) {
                console.log(error);
            });


        $scope.removeItem = function(id,tipo){

            console.log("id: "+id);
            console.log("tipo: "+tipo);

            $('#modal1').modal('open');
            $('#modal1').css({
                display: 'block',
                top: '15%'
            });


            $scope.confirmDelete = function(){
                $scope.btnDisabled = true;
                console.log("borrando al:"+ id);

                $http({
                    method: 'DELETE',
                    url: server_uri+'/services/'+id,
                    data:id
                }).then(function successCallback(response) {
                    console.log(response);
                    $scope.servicios = response.data.services;
                    $('#modal1').modal('close');
                    $('#modal1').css({
                        display: 'none',
                        top: '0'
                    });
                    $scope.btnDisabled = true;


                }, function errorCallback(error) {
                    console.log(error);
                    $scope.btnDisabled = true;
                });

            }

            $scope.cancelDelete = function(){
                console.log("No quiero borrarlo");
                $('#modal1').modal('close');
                $('#modal1').css({
                    display: 'none',
                    top: '0'
                });
            }
        }
	}
}])