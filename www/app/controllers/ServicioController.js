app.controller('ServicioController', ['$scope', '$timeout', '$state', '$http', '$stateParams', '$sessionStorage', function($scope, $timeout, $state, $http, $stateParams, $sessionStorage){
	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug'); 

	$scope.server_uri = server_uri;

	if ($state.current.name == 'panel_servicios') {

		$http.get(server_uri+'services/')
		    .then(function successCallback(response) {
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
		    });

	    $scope.removeItem = function(id,tipo){
	        $('#modal1').modal('open');
	        $('#modal1').css({
	            display: 'block',
	            top: '15%'
	        });


	        $scope.confirmDelete = function(){
	            $scope.btnDisabled = true;

	            $http({
	                method: 'DELETE',
	                url: server_uri+'services/'+id,
	                data:id
	            }).then(function successCallback(response) {
	                $scope.servicios = response.data.services;
	                $('#modal1').modal('close');
	                $('#modal1').css({
	                    display: 'none',
	                    top: '0'
	                });
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

	    $scope.editarItem = function(id, nombre) {
	        input_id = $('#servicio_id');
	        input_id.val(id);

	        input_nombre = $('#servicio_nombre');
	        input_nombre.val(nombre);

	        $('#modalEdit').modal('open');
	        $('#modalEdit').css({
	            display: 'block',
	            top: '15%'
	        });
	    

	        $scope.cancelEdit = function() {
                ocultarModalEdit();
	            input_id.val('');
	            input_nombre.val('');
	        }

	        $scope.editarServicio = function() {
	            $scope.btnDisabled = true;

	            $http({
	                method: 'PATCH',
	                url: server_uri+'services/'+input_id.val(),
	                data: {nombre: input_nombre.val() }
	            }).then(function successCallback(response) {
	                $scope.servicios = response.data.services;
	                ocultarModalEdit();
	                Materialize.toast(response.data.mensaje, 4000);
	            }, function errorCallback(error) {
	                $scope.btnDisabled = false;
	                Materialize.toast(error.data.mensaje, 4000);
	            });

	        }

	    }

	    $scope.modalServicio = function() {
	    	$('#modalAdd').modal('open');
	    	$('#modalAdd').css({
	    	    display: 'block',
	    	    top: '15%'
	    	});
	    }

	    $scope.addServicio = function() {

	    	input = $('#add_servicio_nombre');

	    	$http({
	    	    method: 'POST',
	    	    url: server_uri+'services/',
	    	    data: {nombre: input.val() }
	    	}).then(function successCallback(response) {
	    		$scope.btnDisabled = true;
	    	    $scope.servicios = response.data.services;
	    	    ocultarModalAdd();
	    	    Materialize.toast(response.data.mensaje, 4000);
	    	    $state.reload();
	    	}, function errorCallback(error) {
	    	    $scope.btnDisabled = false;
	    	    Materialize.toast(error.data.mensaje, 4000);
	    	});

	    	$scope.cancelAdd = function() {
	    		ocultarModalAdd();
	    		input_nombre.val('');
	    	}

	    }

	    function ocultarModalEdit() {
	        $('#modalEdit').modal('close');
	        $('#modalEdit').css({
	            display: 'none',
	            top: '0'
	        });
	    }

	    function ocultarModalAdd() {
	        $('#modalAdd').modal('close');
	        $('#modalAdd').css({
	            display: 'none',
	            top: '0'
	        });
	    }
		
	}


	



}]) 