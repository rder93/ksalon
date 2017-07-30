app.controller('ProfesionalController', ['$scope', '$timeout', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', function($scope, $timeout, $state, $rootScope, $stateParams, $sessionStorage, $http){
	$('.mobile-content').fadeIn(1000);
	$('.search-input').fadeIn(1000);

	$scope.usuario_id = $stateParams.id;

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'profesional_servicios') {

		$http.get(server_uri+'independent/'+$stateParams.id+'/services')
		    .then(function successCallback(response) {
		    	console.log(response.data);
		        $scope.servicios = response.data;
		        $timeout(function(){
		        	$('.modal').modal();
					$('.dropdown-button').dropdown({
					      inDuration: 300,
					      outDuration: 225,
					      constrainWidth: false, // Does not change width of dropdown to that of the activator
					      hover: true, // Activate on hover
					      gutter: 0, // Spacing from edge
					      belowOrigin: true, // Displays dropdown below the button
					      alignment: 'left', // Displays dropdown with edge aligned to the left of button
					      stopPropagation: false // Stops event propagation
					    }
					);
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast("Problemas de conexión...", 4000);
		    });

		$scope.editarItem = function(id, precio) {
	        input_id = $('#servicio_id');
	        input_id.val(id);

	        input_precio = $('#servicio_precio');
	        input_precio.val(precio);

	        $('#modalEdit').modal('open');
	        $('#modalEdit').css({
	            display: 'block',
	            top: '15%'
	        });
	    

	        $scope.cancelEdit = function() {
                ocultarModalEdit();
	            input_id.val('');
	            input_precio.val('');
	        }

	        $scope.editarServicio = function() {
	            $scope.btnDisabled = true;

	            $http({
	                method: 'PUT',
	                url: server_uri+'independent/service/'+input_id.val(),
	                data: {precio: input_precio.val() }
	            }).then(function successCallback(response) {
	                $scope.servicios = response.data.services;
	                // ocultarModalEdit();
	                Materialize.toast(response.data.msj, 4000);
	                $state.reload();
	            }, function errorCallback(error) {
	                $scope.btnDisabled = false;
	                Materialize.toast(error.data.mensaje, 4000);
	            });

	        }

	    }

	    $scope.removeItem = function(id){
	        $('#modal1').modal('open');
	        $('#modal1').css({
	            display: 'block',
	            top: '15%'
	        });


	        $scope.confirmDelete = function(){
	            $scope.btnDisabled = true;

	            $http({
	                method: 'DELETE',
	                url: server_uri+'independent/service/'+id,
	                data:id
	            }).then(function successCallback(response) {
	                $scope.servicios = response.data.services;
	                Materialize.toast(response.data.msj, 4000);
	                $state.reload();
	                $scope.btnDisabled = true;


	            }, function errorCallback(error) {
	                $scope.btnDisabled = true;
	            });

	        }

	        $scope.cancelDelete = function(){
	            $('#modal1').modal('close');
	            $('#modal1').css({
	                display: 'none',
	                top: '0'
	            });
	        }
	    }

	}

	if ($state.current.name == 'add_servicios') {

		$scope.new_service = {
	        	"id_service":""
	    	};

    	$scope.listaServicios = [];

		$http.get(server_uri+'services')
		    .then(function successCallback(response) {
		    	console.log(response.data);
		        $scope.listaServicios = response.data;
		        $timeout(function(){
		        	$('.modal').modal();
		        	$('#modalAdd').modal('open');
			       	$('select').material_select();
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast(error, 4000);
		    });



		$scope.newService = function(){

			$scope.new_service.id_user = $stateParams.id;
			console.log($scope.new_service);
			$http.post(server_uri+'independent/services/', $scope.new_service)
			    .then(function successCallback(response) {
			    	console.log(response.data);
			        Materialize.toast(response.data.msj, 4000);
			        $state.go('profesional_servicios',{id:$stateParams.id});
			    }, function errorCallback(error) {
			    	Materialize.toast(error, 4000);
			    });

		}

	}
	

}])