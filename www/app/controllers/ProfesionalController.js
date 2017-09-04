app.controller('ProfesionalController', ['$scope', '$timeout', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', function($scope, $timeout, $state, $rootScope, $stateParams, $sessionStorage, $http){
	$('.search-input').fadeIn(1000);
	$scope.usuario_id = $stateParams.id;

	var server_uri = $('body').attr('data-server_uri');
	var fotos_uri = $('body').attr('data-fotos_uri');
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;
	$scope.Producto={};
	$scope.carrito=[];
	$scope.factura={};

	function contarFactura(object){
		$scope.factura.total=0;
		$scope.factura.comision=0;
		$scope.factura.valor=0;
		angular.forEach(object, function(value, key){
					// $scope.factura.total+=object.precio;
					$scope.factura.total+=value.precio;
				});
		$scope.factura.comision=$scope.factura.total*0.025;
		$scope.factura.valor=$scope.factura.total-($scope.factura.total*0.025);
		// console.log($scope.factura);
	}

	if ($state.current.name == 'profesional_servicios') {
		$scope.carrito=$.sessionStorage.get('carrito');
		if (!$scope.carrito) {
			$scope.carrito=[];
		}
		$scope.factura.user_to_id=$stateParams.id;
		$scope.factura.user_id=$.sessionStorage.get('user').id;
		$http.get(server_uri+'independent/'+$stateParams.id+'/services')
		    .then(function successCallback(response) {
		    	$scope.cliente_salon= $.sessionStorage.get('cliente_salon');
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
					$('.materialboxed').materialbox();
					$('.tap-target').tapTarget('open');
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast("Problemas de conexión...", 4000);
		    });

		    if(window.localStorage.getItem("loggedIn") != 1) {
			// Running for the first time.
			window.localStorage.setItem("loggedIn", 1);
			console.log("1st time");
			}
			else
			{
			//Already run this app before.
			console.log("running this for more than one time");
			}

			// console.log('coñooooo');
			$scope.agregarCarrito=function(object){
				object.tipo='servicio';
				console.log(object);
				ob={'id':object.id, 'descripcion': object.service_id, 'precio':object.precio, 'tipo': 'servicio'};
				// console.log(ob);
				$scope.carrito.push(ob);
				$('#carrito'+object.id).addClass('disabled');
				// console.log($scope.carrito);
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
			};
			
			$scope.modalCarrito=function(object){
				$('#modalCarrito').modal('open');
			};

			$scope.modalPagar=function(){
				$('#modalPagar').modal('open');	
			};

			$scope.eliminarServicioCarrito=function(id){
				// console.log(id);
				var indice=0;
				for (var i = $scope.carrito.length - 1; i >= 0; i--) {
					if ($scope.carrito[i].id==id) {
						indice=i;
					}
				}
				// console.log(indice);
				$scope.carrito.splice(indice,1);
				console.log(id);
				$('#carrito'+id).removeClass('disabled');
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
			};

			$scope.pagoEfectivo=function(){
				var o=[];
				o.push($scope.factura);
				o.push($scope.carrito);
				$http({
					method: 'POST',
					url: server_uri+'/transactions',
					data:o
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.go('perfil');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			};

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
			       	$('.materialboxed').materialbox();
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
		}, function errorCallback(response) {
			Materialize.toast("Probemas de conexión...", 4000);
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
			$scope.new_service.service_id = $scope.new_service.id_service.id

			var fd = new FormData();
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
			  	$state.go('profesional_servicios',{id:$stateParams.id});
			}, function errorCallback(response) {
			  	Materialize.toast(error, 4000);
			  	$state.reload();
			});

		}

	}


	if ($state.current.name == 'profesional_servicios_editar') {

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
			       	$('.materialboxed').materialbox();
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast(error, 4000);
		    });

		$http.get(server_uri+'verServicioIndependiente/'+$stateParams.id_service)
		    .then(function successCallback(response) {
		    	console.log(response.data);
		        $scope.new_service = response.data;
		        $scope.thumbnail = {
					dataUrl: fotos_uri+response.data.foto
				};
		        $timeout(function(){
			       $('#selectServicio').val($scope.new_service.service.id);
			       $('#selectServicio').attr('disabled', true);
			       $('select').material_select();
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast(error, 4000);
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

		$scope.editService = function(){

			$scope.new_service.id_user = $stateParams.id;
			console.log($scope.new_service);

			var fd = new FormData();
			var servicio = [];
			servicio = $scope.new_service;
			for ( var key in servicio ) {
			 	fd.append(key, servicio[key]);
			}
			

			$http.post(server_uri+'independent/service/'+$stateParams.id_service, fd, {
			  	withCredentials: true,
			  	headers: {'Content-Type': undefined },
			  	transformRequest: angular.identity
			}).then(function successCallback(response) {
			  	Materialize.toast(response.data.msj, 4000);
			  	// $state.go('profesional_servicios',{id:$stateParams.id});
			}, function errorCallback(response) {
			  	Materialize.toast(error, 4000);
			  	// $state.reload();
			});

		}

	}



	if ($state.current.name == 'profesional_combos') {

		$scope.independent_id = $stateParams.id;
		$scope.carrito=$.sessionStorage.get('carrito');
		if (!$scope.carrito) {
			$scope.carrito=[];
		}
		$scope.factura.user_to_id=$stateParams.id;
		$scope.factura.user_id=$.sessionStorage.get('user').id;

		$http.get(server_uri+'professionalCombos/'+$stateParams.id)
		    .then(function successCallback(response) {
		    	console.log(response.data);
		    	$scope.combos = response.data;
		    	$scope.thumbnail = fotos_uri;
		    	$scope.cliente_salon= $.sessionStorage.get('cliente_salon');

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
					$('.materialboxed').materialbox();
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
				$scope.thumbnail = fotos_uri;
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

		$scope.agregarCarrito=function(object){
				object.tipo='servicio';
				// console.log(object);
				ob={'id':object.id, 'descripcion': object.descripcion, 'precio':object.precio, 'tipo': 'combo'};
				console.log(ob);
				$scope.carrito.push(ob);
				$('#carrito'+object.id).addClass('disabled');
				// console.log($scope.carrito);
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
			};
			
			$scope.modalCarrito=function(object){
				$('#modalCarrito').modal('open');
			};

			$scope.modalPagar=function(){
				$('#modalPagar').modal('open');	
			};

			$scope.eliminarServicioCarrito=function(id){
				// console.log(id);
				var indice=0;
				for (var i = $scope.carrito.length - 1; i >= 0; i--) {
					if ($scope.carrito[i].id==id) {
						indice=i;
					}
				}
				// console.log(indice);
				$scope.carrito.splice(indice,1);
				// console.log(id);
				$('#carrito'+id).removeClass('disabled');
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
			};

			$scope.pagoEfectivo=function(){
				var o=[];
				o.push($scope.factura);
				o.push($scope.carrito);
				$http({
					method: 'POST',
					url: server_uri+'/transactions',
					data:o
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.go('perfil');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			};



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
			       	$('.materialboxed').materialbox();
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast("Problemas de conexión...", 4000);
		    });

		$http({
			method: 'GET',
			url: server_uri+'/imagen_defecto2',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.thumbnail = {
				dataUrl: fotos_uri+response.data.path
			};
		}, function errorCallback(response) {
			Materialize.toast("Probemas de conexión...", 4000);
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
			
			// miCombo.push($scope.combo);
			// miCombo.push($scope.listaServicios);

			var fd = new FormData();
			var fd2 = new FormData();
			var combo = [];
			var misServicios = [];
			combo = $scope.combo;
			misServicios = $scope.listaServicios;
			
			for (var key in misServicios) {
				fd.append(key, misServicios[key].id);
			}
			for ( var key in combo ) {
			 	fd.append(key, combo[key]);
			}			

			$http.post(server_uri+'professionalCombos', fd,{
			  	withCredentials: true,
			  	headers: {'Content-Type': undefined },
			  	transformRequest: angular.identity
			}).then(function successCallback(response) {
			  	Materialize.toast(response.data.msj, 4000);
			  	$state.go('profesional_combos',{id:$stateParams.id});
			}, function errorCallback(response) {
			  	Materialize.toast(response.error, 4000);
			  	$state.reload();
			});

		};
	}

	if($state.current.name == 'profesional_combos_editar'){

		console.log('hola desde el formulario de editar');
		$scope.combo={};
		$scope.serv={};
		$scope.listaServicios=[];
		console.log($stateParams.id_combo)
		$http({
			method: 'GET',
			url: server_uri+'/professionalCombos/'+$stateParams.id_combo+'/edit',
			}).then(function successCallback(response) {
				$scope.combo=response.data;
				$scope.thumbnail = {
					dataUrl: fotos_uri+response.data.foto
				};
				$timeout(function(){
			       	$('.materialboxed').materialbox();
			    });
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

		$scope.modalServ=function(){
			$scope.serv={}
			$('#modalServ').modal('open');
		}

		$scope.agregarServicio=function() {
			console.log($scope.serv);
			detalleCombo={
				'combo_professional_id' : $stateParams.id_combo,
				'professional_service_id' : $scope.serv.independent_service.id
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
				url: server_uri+'detailProfessionalCombo/'+id,
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
				$state.reload();
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				// $state.go('lounges_productos_crear');
			});
		};

		$scope.actualizarCombo=function(id){

			console.log($scope.combo);
			console.log($scope.listaServicios);

			var fd = new FormData();
			var combo = [];
			var misServicios = [];
			combo = $scope.combo;
			misServicios = $scope.listaServicios;
			
			for (var key in misServicios) {
				fd.append(key, misServicios[key].id);
			}
			for ( var key in combo ) {
			 	fd.append(key, combo[key]);
			}			

			$http.post(server_uri+'professionalCombos/'+id, fd,{
			  	withCredentials: true,
			  	headers: {'Content-Type': undefined },
			  	transformRequest: angular.identity
			}).then(function successCallback(response) {
			  	Materialize.toast(response.data.msj, 4000);
			  	$state.go('profesional_combos',{id:$stateParams.id});
			}, function errorCallback(response) {
			  	Materialize.toast(response.error, 4000);
			  	$state.reload();
			});

		}
	}

	if ($state.current.name == 'profesional_transactions') {

		$scope.transactions = [];

		$scope.user = $.sessionStorage.get('user');

		$http({
            method: 'GET',
            url: server_uri+'transactions',
            params: {
                id: $scope.user.id
            }
        }).then(function successCallback(response) {

        	console.log(response.data.transactions);
    
        	$scope.transactions = response.data.transactions;

        	$timeout(function(){
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

        }, function errorCallback(response) {
                console.log('dio error');
        });

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