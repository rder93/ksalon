app.controller('ProfesionalController', ['$scope', '$timeout', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', function($scope, $timeout, $state, $rootScope, $stateParams, $sessionStorage, $http){
	$('.search-input').fadeIn(1000);

	$scope.usuario_id = $stateParams.id;

	var server_uri = $('body').attr('data-server_uri');
	var fotos_uri = $('body').attr('data-fotos_uri');
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'profesional_servicios') {

		$http.get(server_uri+'independent/'+$stateParams.id+'/services')
		    .then(function successCallback(response) {
		    	console.log(response.data);
		        $scope.servicios = response.data;
		        $scope.thumbnail = fotos_uri;
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

	if ($state.current.name == 'profesional_servicios_crear') {

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

		$http({
			method: 'GET',
			url: server_uri+'/imagen_defecto2',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.thumbnail = {
				dataUrl: fotos_uri+response.data.path
			};
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

		$scope.fileReaderSupported = window.FileReader != null;
		$scope.photoChanged = function(files){
			if (files != null) {
				var file = files[0];
				if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
					$timeout(function() {
						var fileReader = new FileReader();
						fileReader.readAsDataURL(file);
						fileReader.onload = function(e) {
							$timeout(function(){
								$scope.thumbnail.dataUrl = e.target.result;
							});
						}
					});
				}
			}
		};

		$scope.newService = function(){



			


			$scope.new_service.id_user = $stateParams.id;
			console.log($scope.new_service.foto.name);

			var fd = new FormData();
			  //Take the first selected file
			  // fd.append("file", $scope.Usuario.foto);
			  // fd.append("name", $scope.Usuario.name);
			  // fd.append('email')
			  var servicio = [];
			  servicio = $scope.new_service;
			  for ( var key in servicio ) {
			  	fd.append(key, servicio[key]);
			  }
			  console.log(fd);


			  $http.post(server_uri+'independent/services/', fd, {
			  	withCredentials: true,
			  	headers: {'Content-Type': undefined },
			  	transformRequest: angular.identity
			  }).then(function successCallback(response) {
			  	Materialize.toast(response.data.msj, 4000);
			  	// $state.go('login');
			  }, function errorCallback(response) {
			  	Materialize.toast(error, 4000);
			  	// $state.reload();
			  });

			// $http.post(server_uri+'independent/services/', $scope.new_service)
			//     .then(function successCallback(response) {
			//     	console.log(response.data);
			//         // Materialize.toast(response.data.msj, 4000);
			//         // $state.go('profesional_servicios',{id:$stateParams.id});
			//     }, function errorCallback(error) {
			//     	Materialize.toast(error, 4000);
			//     });

		}



	}

	if ($state.current.name == 'profesional_combos') {

		$scope.independent_id = $stateParams.id;

		$http.get(server_uri+'professionalCombos/'+$stateParams.id)
		    .then(function successCallback(response) {
		    	console.log(response.data);
		    	$scope.combos = response.data;
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
		    	Materialize.toast(error, 4000);
		    });

		$scope.modalEliminarCombo=function(id){
				$scope.combo_id= id;
				$('#modalEliminarCombo').modal('open');
			};
			$scope.eliminarCombo=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/professionalCombos/'+id,
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			}

		$scope.modalVerCombo=function(id){
			$scope.combo={};
			$scope.listaServicios=[];
			$http({
				method: 'GET',
				url: server_uri+'/professionalCombos/'+id+'/edit',
			}).then(function successCallback(response) {
				$scope.combo=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});

			$http({
				method: 'GET',
				url: server_uri+'/detailProfessionalCombo/'+id,
			}).then(function successCallback(response) {
				$scope.listaServicios=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});
			$('#modalVerCombo').modal('open');
		}

	}

	if($state.current.name == 'profesional_combos_crear'){

		$scope.crearCombo=true;
		console.log('hola desde el form');
		$scope.combo={};
		$scope.listaServicios=[];
		var arreglo=[];
		$scope.combo.user_id=$stateParams.id;
		$scope.serv={};

		$http.get(server_uri+'independent/'+$stateParams.id+'/services')
		    .then(function successCallback(response) {
		    	console.log(response.data);
		        $scope.servicios = response.data;
		        $timeout(function(){
		        	$('.modal').modal();
			       	$('select').material_select();
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast("Problemas de conexión...", 4000);
		    });

		$scope.modalServ=function(){
			$scope.serv={}
			console.log('hola')
			$scope.crearServicio=true;
			$('#modalServ').modal('open');
		}

		$scope.agregarServicio=function() {
			console.log($scope.serv.independent_service.id);
			$http({
				method: 'GET',
				url: server_uri+'/verServicioIndependiente/'+$scope.serv.independent_service.id,
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.listaServicios.push(response.data);
			}, function errorCallback(response) {
				console.log('dio error');
			});
			
			console.log($scope.listaServicios);
		};

		$scope.eliminarServicioCombo=function(id){
			// console.log(id);
			var indice=0;
			for (var i = $scope.listaServicios.length - 1; i >= 0; i--) {
				if ($scope.listaServicios[i].id==id) {
					indice=i;
				}
			}
			// console.log(indice);
			$scope.listaServicios.splice(indice,1);

		}

		$scope.registrarCombo = function(){
			var miCombo=[];
			miCombo.push($scope.combo);
			miCombo.push($scope.listaServicios);
			$http({
				method: 'POST',
				url: server_uri+'/professionalCombos',
				data:miCombo
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
				$state.go('profesional_combos',{id:$stateParams.id});
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				// $state.go('lounges_productos_crear');
			});
		};
	}

	if($state.current.name == 'profesional_combos_editar'){
		console.log('hola desde el formulario de editar');
		$scope.combo={};
		$scope.listaServicios=[];
		console.log($stateParams.id_combo)
		$http({
			method: 'GET',
			url: server_uri+'/professionalCombos/'+$stateParams.id_combo+'/edit',
			}).then(function successCallback(response) {
				$scope.combo=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});

		$http({
			method: 'GET',
			url: server_uri+'/detailProfessionalCombo/'+$stateParams.id_combo,
		}).then(function successCallback(response) {
			$scope.listaServicios=response.data;
		}, function errorCallback(response) {
			console.log('dio error');
		});


		$http.get(server_uri+'independent/'+$stateParams.id+'/services')
		    .then(function successCallback(response) {
		    	console.log(response.data);
		        $scope.servicios = response.data;
		        $timeout(function(){
		        	$('.modal').modal();
			       	$('select').material_select();
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast("Problemas de conexión...", 4000);
		    });

		$scope.modalServ=function(){
			$scope.serv={}
			$('#modalServ').modal('open');
		}

		$scope.agregarServicio=function() {
			console.log($scope.serv);
			detalleCombo={
				'combo_professional_id' : $stateParams.id_combo,
				'professional_service_id' : scope.serv.independent_service.id
			}
			$http({
				method: 'POST',
				url: server_uri+'/detailProfessionalCombo',
				data:detalleCombo
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
			  	$state.reload();
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
		};

		$scope.modalEliminarServ=function(id){
			$scope.detail_id=id;
			$('#modalEliminarServ').modal('open');
		};

		$scope.eliminarDetailCombo=function(id){
			$http({
				method: 'DELETE',
				url: server_uri+'/detailProfessionalCombo/'+id,
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
				$state.reload();
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				// $state.go('lounges_productos_crear');
			});
		};

		$scope.actualizarCombo=function(id){
			$http({
				method: 'PUT',
				url: server_uri+'/professionalCombos/'+id,
				data:$scope.combo
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
			  	$state.go('profesional_combos');
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
		}
	}

}])
.directive('uploaderModel', ["$parse", function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) 
		{
			iElement.on("change", function(e)
			{
				$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
			});
		}
	};
}])