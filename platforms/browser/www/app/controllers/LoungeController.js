app.controller('LoungeController', ['$scope', '$state', '$http','$stateParams', function($scope, $state, $http,$stateParams){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;
	$('.modal').modal();
	$('.dropdown-button').dropdown();

	$scope.Producto={};
	// $http({
	// 	method: 'GET',
	// 	url: server_uri+'/lounges/'+$.sessionStorage.get('user').id,

	// }).then(function successCallback(response) {
	// 	$.sessionStorage.set('longe_id', response.data.id);
	// }, function errorCallback(response) {
	// 	console.log('dio error');
	// });

	// $scope.Producto=$.sessionStorage.get('user');
	

	if($state.current.name == 'lounges_servicios'){
		if(debug == 'true'){
			console.log('hola desde los servicios'+$stateParams.id)
			$.sessionStorage.set('longe_id', $stateParams.id);

		}
	}

	if($state.current.name == 'lounges_profesional_index'){
		if(debug == 'true'){
			console.log('hola desde la vista de ');
		}

	}

	if($state.current.name == 'lounges_crear'){
		if(debug == 'true'){
			$scope.crearLounge=true;
			$scope.Lounge={};

			$scope.registrarLounge=function(){
				$scope.Lounge.user_id=$.sessionStorage.get('user').id;
				$scope.Lounge.category_id=$.sessionStorage.get('user').id-1;
				console.log($scope.Lounge);
				$http({
					method: 'POST',
					url: server_uri+'/lounges',
					data:$scope.Lounge
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.go('lounges_index');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			};
		}

	}

	if($state.current.name == 'lounges_index'){
		if(debug == 'true'){
			$http({
				method: 'GET',
				url: server_uri+'/lounges',
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.Lounges=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});

			$scope.modalLounge=function(id){
				$scope.id_lounge= id;
				$('#modalLounge').modal('open');
			};
			$scope.eliminarLounge=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/lounges/'+id,
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			}
		}

	}

	if($state.current.name == 'lounges_editar'){
		$scope.Lounge={};
		$scope.editarLounge=true;
		$scope.crearLounge=false;
		$http({
			method: 'GET',
			url: server_uri+'/lounges/'+$stateParams.id+'/edit',
		}).then(function successCallback(response) {
			console.log(response.data.lounge);
			$scope.Lounge=response.data.lounge;
		}, function errorCallback(response) {
			console.log('dio error');
		});

		$scope.actualizarLounge=function () {
			console.log($scope.Lounge);
			$http({
				method: 'PUT',
				url: server_uri+'/lounges/'+$stateParams.id,
				data:$scope.Lounge
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
			  	$state.go('lounges_index');
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
		};

	}

	if($state.current.name == 'lounges_productos_index'){
		if(debug == 'true'){
			console.log($.sessionStorage.get('longe_id'));
			$http({
				method: 'GET',
				url: server_uri+'/products/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.Productos=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});

			$scope.modalProducto=function(id){
				$scope.id_producto= id;
				$('#modalproducto').modal('open');
			};
			$scope.eliminarProducto=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/products/'+id,
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			}
		}

	}

	if($state.current.name == 'lounges_productos_crear'){
		if(debug == 'true'){
			$scope.crearProducto=true;
			$scope.Producto={};
			$scope.Producto.lounge_id=$.sessionStorage.get('longe_id');

			$scope.registrarProducto=function(){
				console.log($scope.Producto);
				$http({
					method: 'POST',
					url: server_uri+'/products',
					data:$scope.Producto
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.go('lounges_productos_index');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.go('lounges_productos_crear');
				});
			};
		}

	}

	if($state.current.name == 'lounges_productos_editar'){
		$scope.Producto={};
		$scope.editarProducto=true;
		$scope.crearProducto=false;
		$http({
			method: 'GET',
			url: server_uri+'/products/'+$stateParams.id+'/edit',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.Producto=response.data;
		}, function errorCallback(response) {
			console.log('dio error');
		});

		$scope.actualizarProducto=function () {
			console.log($scope.Producto);
			$http({
				method: 'PUT',
				url: server_uri+'/products/'+$stateParams.id,
				data:$scope.Producto
			}).then(function successCallback(response) {
				console.log(response.data);
				Materialize.toast(response.data.msj, 4000);
			  	$state.go('lounges_productos_index');
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
		};

	}

	if($state.current.name == 'lounges_servicios_index'){
		if(debug == 'true'){
			$http({
				method: 'GET',
				url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.Servicios=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});

			$scope.modalServicio=function(id){
				$scope.id_servicio= id;
				$('#modalservicio').modal('open');
			};
			$scope.eliminarServicio=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/loungeServices/'+id,
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			}
		}
	}

	if($state.current.name == 'lounges_servicios_crear'){
		console.log('estoy aqui');
		console.log($.sessionStorage.get('longe_id'));
		if(debug == 'true'){
			$scope.crearServicio=true;
			$scope.Servicio={};
			$scope.Servicio.lounge_id=$.sessionStorage.get('longe_id');

			$http({
				method: 'GET',
				url: server_uri+'/services',
			}).then(function successCallback(response) {
				$scope.servs=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});

			$scope.registrarServicio=function(){
				$http({
					method: 'POST',
					url: server_uri+'/loungeServices',
					data:$scope.Servicio
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.go('lounges_servicios_index');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			};
		}

	}
	if($state.current.name == 'lounges_servicios_editar'){
		$scope.Servicio={};
		$scope.editarServicio=true;
		

		$http({
			method: 'GET',
			url: server_uri+'/loungeServices/'+$stateParams.id+'/edit',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.Servicio=response.data;
			$scope.Servicio.service_id = {id: $scope.Servicio.service_id};
		}, function errorCallback(response) {
			console.log('dio error');
		});

		$http({
				method: 'GET',
				url: server_uri+'/services',
		}).then(function successCallback(response) {
				$scope.servs=response.data;
		}, function errorCallback(response) {
				console.log('dio error');
		});

		

		$scope.actualizarServicio=function () {
			$scope.Servicio.service_id=$scope.Servicio.service_id.id;
			$http({
				method: 'PUT',
				url: server_uri+'/loungeServices/'+$stateParams.id,
				data:$scope.Servicio
			}).then(function successCallback(response) {
				console.log(response.data);
				Materialize.toast(response.data.msj, 4000);
			  	$state.go('lounges_servicios_index');
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
		};

	}

	if($state.current.name == 'lounges_profesionales_crear'){
		if(debug == 'true'){
			$scope.crearProfesional=true;
			$scope.Servicios={};
			$scope.Profesional={};
			$scope.Profesional.servicios=[];
			
			$http({
				method: 'GET',
				url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.servs=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});


			$scope.agregarServicio=function(){
				$('#modalAgregarServicio').modal('open');
			};

			$scope.agregarServicioSinUsuario=function(){
				$http({
					method: 'GET',
					url: server_uri+'/verServicioProfesional/'+$scope.Servicio.service_id,
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.Profesional.servicios.push(response.data);
				}, function errorCallback(response) {
					console.log('dio error');
				});
			};
			

			$scope.modalEliminarServicioSinUsuario= function (id) {
				$scope.Profesional.servicios.splice(id,1);
			}

			$scope.registrarProfesional= function(){
				console.log($scope.Profesional);
			}


		}

	}



}]);

// cliente_servicio_categorias({id:1})
















