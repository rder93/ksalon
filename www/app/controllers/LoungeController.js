app.controller('LoungeController', ['$scope', '$state', '$http','$stateParams','$timeout', function($scope, $state, $http,$stateParams,$timeout){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;
	var fotos_uri = $('body').attr('data-fotos_uri');
	$('.mobile-content').fadeIn(1000);
	$('.search-input').fadeIn(1000);
	$('.modal').modal();
	$scope.Producto={};
	$scope.carrito=[];
	$scope.factura={}
	// $http({
	// 	method: 'GET',
	// 	url: server_uri+'/lounges/'+$.sessionStorage.get('user').id,

	// }).then(function successCallback(response) {
	// 	$.sessionStorage.set('longe_id', response.data.id);
	// }, function errorCallback(response) {
	// 	console.log('Problemas de conexión...');
	// });

	// $scope.Producto=$.sessionStorage.get('user');
	
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

	function filter(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }

	function ownPagination(data){
        $scope.currentPage = 0;
        $scope.pageSize = 3;
        $scope.q = '';
        $scope.data = data;
		$scope.mostrar=false;
		if ($scope.data.length>0) {
			$scope.mostrar=true;
		}

        $scope.getData = function () {
            if ($scope.data.length > 0) {
               	return filter($scope.data, $scope.q);
            }
        }
                    
        $scope.numberOfPages=function(){
            return Math.ceil(($scope.getData().length/$scope.pageSize));                
        }
    }


	if($state.current.name == 'lounges_servicios'){
		if(debug == 'true'){
			$.sessionStorage.set('longe_id', $stateParams.id);

		}
	}

	if($state.current.name == 'lounges_crear'){
		if(debug == 'true'){
			$scope.crearLounge=true;
			$scope.Lounge={};

			$scope.registrarLounge=function(){
				$scope.Lounge.user_id=$.sessionStorage.get('user').id;
				$scope.Lounge.category_id=$.sessionStorage.get('user').rol_id;
				console.log($scope.Lounge);
				$http({
					method: 'POST',
					url: server_uri+'/lounges',
					data:$scope.Lounge
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$scope.id_lounge = response.data.lounge.id;
					$state.go('lounges_photos_index',{id_lounge:$scope.id_lounge});
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			};



						//Markers, es el array donde estaran guardados los marcadores.
				var markers = [];
			  //Aqui pones/creas el mapa en el div con id map
			  map = new google.maps.Map(document.getElementById('map'), {
			  	center: {lat: -34.397, lng: 150.644},
			  	zoom: 8
			  })

			    google.maps.event.addListener(map, "click", function (e, a) {

			    	var latLng = e.latLng;

			    	for (var i = 0; i < markers.length; i++) {
			          markers[i].setMap(null); //Remove the marker from the map
			      }

			      placeMarker(latLng);

			      address = {
			      	lat : latLng.lat(),
			      	lng : latLng.lng()
			      };
			      $scope.Lounge.latitud=latLng.lat();
			      $scope.Lounge.longitud=latLng.lng();
			      console.log($scope.Lounge);

			  });


			    //eesta es la funcion que pone el marcador en el mapa
			    function placeMarker(location) {
			    	var marker = new google.maps.Marker({
			    		position: location, 
			    		map: map
			    	});
			    	markers.push(marker);
			    }
		}

	}

	if($state.current.name == 'lounges_index'){
		if(debug == 'true'){
			$http({
				method: 'GET',
				url: server_uri+'/lounges/'+$.sessionStorage.get('user').id,
			}).then(function successCallback(response) {
				$scope.Lounges=response.data;
				ownPagination(response.data);
				$.sessionStorage.set('cliente_salon', false);
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
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
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
			};
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
			$scope.Lounge=response.data.lounge;

			var markers = [];

			  var myLatLng = {lat: parseInt($scope.Lounge.latitud), lng: parseInt($scope.Lounge.longitud)};

			  var map = new google.maps.Map(document.getElementById('map'), {
			  	zoom: 8,
			  	center: myLatLng
			  });

			  var marker = new google.maps.Marker({
			  	position: myLatLng,
			  	map: map,
			  	title: 'Hello World!'
			  });

			  google.maps.event.addListener(map, "click", function (e, a) {
				marker.setMap(null);
			  	var latLng = e.latLng;

			  	for (var i = 0; i < markers.length; i++) {
			          markers[i].setMap(null); //Remove the marker from the map
			      }

			      placeMarker(latLng);

			      address = {
			      	lat : latLng.lat(),
			      	lng : latLng.lng()
			      };
			      $scope.Lounge.latitud=latLng.lat();
			      $scope.Lounge.altitud=latLng.lng();
				console.log($scope.Lounge);
			  });


			    //eesta es la funcion que pone el marcador en el mapa
			    function placeMarker(location) {
			    	var marker = new google.maps.Marker({
			    		position: location, 
			    		map: map
			    	});
			    	markers.push(marker);
			    }

		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
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
			$http({
				method: 'GET',
				url: server_uri+'/products/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.Productos=response.data;
				$scope.cliente_salon= $.sessionStorage.get('cliente_salon');
				$scope.urlFoto = $('body').attr('data-fotos_uri');
				ownPagination(response.data);
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
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.modalProducto=function(id){
				$scope.id_producto= id;
				$('#modalproducto').modal('open');
			};


			$scope.modalVerProducto=function(id){
				$scope.id_producto= id;
				$('#modalVerProducto').modal('open');
				$http({
					method: 'GET',
					url: server_uri+'/products/'+id+'/edit',
				}).then(function successCallback(response) {
					$scope.prod=response.data;
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.foto
					};
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});
			};

			$scope.eliminarProducto=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/products/'+id,
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

	if($state.current.name == 'lounges_productos_crear'){
		if(debug == 'true'){
			$scope.crearProducto=true;
			$scope.Producto={};
			$scope.Producto.lounge_id=$.sessionStorage.get('longe_id');
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

			$scope.registrarProducto=function(){
				var fd = new FormData();
				var producto=$scope.Producto;
				for ( var key in producto ) {
					fd.append(key, producto[key]);
				}

				$http.post(server_uri+'/products', fd, {
					withCredentials: true,
					headers: {'Content-Type': undefined },
					transformRequest: angular.identity
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.go('lounges_productos_index');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
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
			$scope.Producto=response.data;
			$scope.thumbnail = {
				dataUrl: fotos_uri+response.data.foto
			};
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
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

		$scope.actualizarProducto=function () {
			// $http({
			// 	method: 'PUT',
			// 	url: server_uri+'/products/'+$stateParams.id,
			// 	data:$scope.Producto
			// }).then(function successCallback(response) {
			// 	Materialize.toast(response.data.msj, 4000);
			//   	$state.go('lounges_productos_index');
			// }, function errorCallback(response) {
			// 	Materialize.toast(error, 4000);
			// 	$state.reload();
			// });
			var fd = new FormData();
			var producto=$scope.Producto;
			for ( var key in producto ) {
				fd.append(key, producto[key]);
			}

			$http.post(server_uri+'/updateProduct', fd, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			}).then(function successCallback(response) {
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
			$scope.carrito=$.sessionStorage.get('carrito');
			$scope.urlFoto = $('body').attr('data-fotos_uri');
			$http({
				method: 'GET',
				url: server_uri+'/lounges/'+$.sessionStorage.get('longe_id')+'/edit',
			}).then(function successCallback(response) {
				$scope.factura.user_to_id=response.data.lounge.user_id;
				$scope.factura.user_id=$.sessionStorage.get('user').id;
				// console.log($scope.factura);
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$http({
				method: 'GET',
				url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.Servicios=response.data;
				$scope.cliente_salon= $.sessionStorage.get('cliente_salon');
				ownPagination(response.data);
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
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
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
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			}

			$scope.agregarCarrito=function(object){
				object.tipo='servicio';
				// console.log(object);
				ob={'id':object.id, 'descripcion': object.nombre, 'precio':object.precio, 'tipo': 'servicio'};
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
	}

	if($state.current.name == 'lounges_servicios_crear'){
		if(debug == 'true'){
			$scope.crearServicio=true;
			$scope.Servicio={};
			$scope.Servicio.lounge_id=$.sessionStorage.get('longe_id');
			var fotos_uri = $('body').attr('data-fotos_uri');
			$http({
				method: 'GET',
				url: server_uri+'/services',
			}).then(function successCallback(response) {
				$scope.servs=response.data;
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
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

			$scope.registrarServicio=function(){
				console.log($scope.Servicio);
				var fd = new FormData();
				var servicio=$scope.Servicio;
				for ( var key in servicio ) {
					fd.append(key, servicio[key]);
				}

				$http.post(server_uri+'/loungeServices', fd, {
					withCredentials: true,
					headers: {'Content-Type': undefined },
					transformRequest: angular.identity
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.go('lounges_servicios_index');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
				// $http({
				// 	method: 'POST',
				// 	url: server_uri+'/loungeServices',
				// 	data:$scope.Servicio
				// }).then(function successCallback(response) {

				// 	Materialize.toast(response.data.msj, 4000);
				// 	$state.go('lounges_servicios_index');
				// }, function errorCallback(response) {
				// 	Materialize.toast(error, 4000);
				// 	$state.reload();
				// });
			};
		}

	}


	if($state.current.name == 'lounges_servicios_editar'){
		$scope.Servicio={};
		$scope.editarServicio=true;
		var fotos_uri = $('body').attr('data-fotos_uri');

		$http({
			method: 'GET',
			url: server_uri+'/loungeServices/'+$stateParams.id+'/edit',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.thumbnail = {
				dataUrl: fotos_uri+response.data.foto
			};
			$scope.Servicio=response.data;
			$scope.Servicio.service_id = {id: $scope.Servicio.service_id};
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
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


		$http({
				method: 'GET',
				url: server_uri+'/services',
		}).then(function successCallback(response) {
				$scope.servs=response.data;
		}, function errorCallback(response) {
				console.log('Problemas de conexión...');
		});

		

		$scope.actualizarServicio=function () {
			$scope.Servicio.service_id=$scope.Servicio.service_id.id;
			console.log($scope.Servicio);
			var fd = new FormData();
			var servicio=$scope.Servicio;
			for ( var key in servicio ) {
				fd.append(key, servicio[key]);
			}

			$http.post(server_uri+'/updateService', fd, {
				withCredentials: true,
				headers: {'Content-Type': undefined },
				transformRequest: angular.identity
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
				$state.go('lounges_servicios_index');
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
			// $http({
			// 	method: 'PUT',
			// 	url: server_uri+'/loungeServices/'+$stateParams.id,
			// 	data:$scope.Servicio
			// }).then(function successCallback(response) {
			// 	console.log(response.data);
			// 	Materialize.toast(response.data.msj, 4000);
			//   	$state.go('lounges_servicios_index');
			// }, function errorCallback(response) {
			// 	Materialize.toast(error, 4000);
			// 	$state.reload();
			// });
		};

	}

	if($state.current.name == 'lounges_profesionales_index'){
			$scope.urlFoto = $('body').attr('data-fotos_uri');
			$scope.profesionales
			
			console.log($scope.urlFoto);
			$http({
				method: 'GET',
				url: server_uri+'/professionals/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.profesionales=response.data;
				$scope.cliente_salon= $.sessionStorage.get('cliente_salon');
				ownPagination(response.data);
				// console.log('estoy aqui',$scope.cliente_salon);
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
			        console.log($scope.usuarios);
			    });
				
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.modalProfesional=function(id){
				$scope.id_profesional= id;
				$('#modalprofesional').modal('open');
			};
			$scope.eliminarProfesional=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/professionals/'+id,
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			}

	}

	if($state.current.name == 'lounges_profesionales_crear'){
		if(debug == 'true'){
			$scope.crearProfesional=true;
			$scope.Profesional={};
			$scope.Profesional.lounge_id=$.sessionStorage.get('longe_id');
			var fotos_uri = $('body').attr('data-fotos_uri');
			$http({
				method: 'GET',
				url: server_uri+'/imagen_defecto',
			}).then(function successCallback(response) {
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

			$scope.registrarProfesional = function() {

				var fd = new FormData();
				  var profesional=$scope.Profesional;
				  for ( var key in profesional ) {
				  	fd.append(key, profesional[key]);
				  }

				 console.log(fd);
				  $http.post(server_uri+'/professionals', fd, {
				  	withCredentials: true,
				  	headers: {'Content-Type': undefined },
				  	transformRequest: angular.identity
				  }).then(function successCallback(response) {
				  	Materialize.toast(response.data.msj, 4000);
				  	$state.go('lounges_profesionales_index');
				  }, function errorCallback(response) {
				  	Materialize.toast(error, 4000);
				  	$state.reload();
				  });
			};

		}

	}

	if($state.current.name == 'lounges_profesionales_editar'){
		if(debug == 'true'){
			$scope.editarProfesional=true;
			$scope.Profesional={};
			var fotos_uri = $('body').attr('data-fotos_uri');
			$http({
				method: 'GET',
				url: server_uri+'/professionals/'+$stateParams.id+'/edit',
			}).then(function successCallback(response) {
				console.log(response.data);
				$scope.thumbnail = {
					dataUrl: fotos_uri+response.data.professional.foto
				};
				$scope.Profesional=response.data.professional;
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

			$scope.actualizarPersonal = function() {

				var fd = new FormData();
				  var profesional=$scope.Profesional;
				  for ( var key in profesional ) {
				  	fd.append(key, profesional[key]);
				  }

				 $http.post(server_uri+'/updateProfessional', fd, {
				  	withCredentials: true,
				  	headers: {'Content-Type': undefined },
				  	transformRequest: angular.identity
				  }).then(function successCallback(response) {
				  	Materialize.toast(response.data.msj, 4000);
				  	$state.go('lounges_profesionales_index');
				  }, function errorCallback(response) {
				  	Materialize.toast(error, 4000);
				  	$state.reload();
				  });
			};

		}

	}

	// lounges_servicios_profesionales_index
	if($state.current.name == 'lounges_servicios_profesionales_index'){
		if(debug == 'true'){
			$.sessionStorage.set('profesional_id', $stateParams.id);
			$scope.profesional_servicio={};
			// $scope.profesional_servicio.professional_id=$.sessionStorage.get('profesional_id');

			$http({
				method: 'GET',
				url: server_uri+'/professionalServices/'+$stateParams.id,
			}).then(function successCallback(response) {
				$scope.profesional_servicios=response.data;
				ownPagination(response.data);
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
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.modalAgregarServicio=function(){
				console.log('profesional'+$stateParams.id);
				$http({
					method: 'GET',
					url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.servicios=response.data;
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});

				$scope.profesional_serv={};
				$scope.profesional_serv.professional_id=$stateParams.id;
				$scope.crearServicio=true;
				$scope.editarServ=false;
				$('#modalServicio').modal('open');
			};

			$scope.agregarServicio=function(){

				$http({
					method: 'POST',
					url: server_uri+'/professionalServices',
					data:$scope.profesional_serv
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			}

			$scope.editarServicio=function(id){
				console.log('el id es'+id);
				$scope.servicios={}
				$scope.crearServicio=false;
				$scope.editarServ=true;
				$('#modalServicio').modal('open');
				$scope.id_servicio=id;

				$http({
					method: 'GET',
					url: server_uri+'/professionalServices/'+id+'/edit',
				}).then(function successCallback(response) {
					$scope.profesional_serv=response.data;
					$scope.profesional_serv.service_id = {id: $scope.profesional_serv.service_id};
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});
				
				$http({
					method: 'GET',
					url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
				}).then(function successCallback(response) {
					for (var i = response.data.length - 1; i >= 0; i--) {
						response.data[i].id=response.data[i].service_id;
					}
					$scope.servicios=response.data;
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});

			
				
			}

			$scope.actualizarServicio=function(id){
				$scope.profesional_serv.service_id=$scope.profesional_serv.service_id.id;
				console.log($scope.profesional_serv.service_id);
				$http({
					method: 'PUT',
					url: server_uri+'/professionalServices/'+id,
					data:$scope.profesional_serv
				}).then(function successCallback(response) {
					console.log(response);
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					$state.reload();
				});
			};

			$scope.modalEliminarServicio=function(id){
				$scope.id_servicio=id;
				$('#modalEliminarServicio').modal('open');
			}

			$scope.eliminarServicio=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/professionalServices/'+id,
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

	if($state.current.name == 'lounges_certificados_profesionales_index'){
		if(debug == 'true'){

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

			$http({
					method: 'GET',
					url: server_uri+'/certificates/'+$stateParams.id,
				}).then(function successCallback(response) {
					$scope.certificates=response.data;
					$scope.cliente_salon= $.sessionStorage.get('cliente_salon');
					ownPagination(response.data);
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
					  });
					});
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
			});

			$scope.modalAgregarCertificado=function(){
				$('#modalCertificado').modal('open');
				$scope.agregarCert=true;
				$scope.editarCert=false;
				$scope.cert={};
				$scope.cert.professional_id=$stateParams.id;
				var fotos_uri = $('body').attr('data-fotos_uri');
				$http({
					method: 'GET',
					url: server_uri+'/imagen_defecto2',
				}).then(function successCallback(response) {
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


			};

			$scope.agregarCertificado=function(){
				var fd = new FormData();
				  var cert=$scope.cert;
				  console.log(cert);
				  for ( var key in cert ) {
				  	fd.append(key, cert[key]);
				  }

				  $http.post(server_uri+'/certificates', fd, {
				  	withCredentials: true,
				  	headers: {'Content-Type': undefined },
				  	transformRequest: angular.identity
				  }).then(function successCallback(response) {
				  	Materialize.toast(response.data.msj, 4000);
				  	$state.reload();
				  }, function errorCallback(response) {
				  	Materialize.toast(error, 4000);
				  	$state.reload();
				  });
			}

			$scope.editarCertificado=function(id){
				$scope.crearCertificado=false;
				$scope.editarCert=true;
				$scope.cert={};
				$('#modalCertificado').modal('open');
				$http({
					method: 'GET',
					url: server_uri+'/certificates/'+id+'/edit',
				}).then(function successCallback(response) {
					var fotos_uri = $('body').attr('data-fotos_uri');
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.foto
					};
					$scope.cert=response.data;
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});

			}

			$scope.actualizarCerfiticado=function(id){
				var fd = new FormData();
				  var cert=$scope.cert;
				  console.log(cert);
				  for ( var key in cert ) {
				  	fd.append(key, cert[key]);
				  }

				 $http.post(server_uri+'/updateCertificate', fd, {
				  	withCredentials: true,
				  	headers: {'Content-Type': undefined },
				  	transformRequest: angular.identity
				  }).then(function successCallback(response) {
				  	Materialize.toast(response.data.msj, 4000);
				  	$state.reload();
				  }, function errorCallback(response) {
				  	Materialize.toast(error, 4000);
				  	// $state.reload();
				  });
			}

			$scope.modalEliminarCertificado=function(id){
				$scope.id_certificate=id;
				$('#modalEliminarCertificado').modal('open');
			}

			$scope.modalVerCertificado=function(id){
				$scope.cert={};
				$('#modalVerCertificado').modal('open');
				$http({
					method: 'GET',
					url: server_uri+'/certificates/'+id+'/edit',
				}).then(function successCallback(response) {
					var fotos_uri = $('body').attr('data-fotos_uri');
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.foto
					};
					$scope.cert=response.data;
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});

			}

			$scope.eliminarServicio=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/certificates/'+id,
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

	if($state.current.name == 'lounges_combos_index'){
		if(debug == 'true'){
			// console.log('hola desde el index');
			// $scope.carrito=[];
			$scope.carrito=$.sessionStorage.get('carrito');
			$http({
				method: 'GET',
				url: server_uri+'/lounges/'+$.sessionStorage.get('longe_id')+'/edit',
			}).then(function successCallback(response) {
				$scope.factura.user_to_id=response.data.lounge.user_id;
				$scope.factura.user_id=$.sessionStorage.get('user').id;
				// console.log($scope.factura);
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});
			$http({
				method: 'GET',
				url: server_uri+'/loungeCombos/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.combos=response.data;
				$scope.cliente_salon= $.sessionStorage.get('cliente_salon');
				ownPagination(response.data);
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
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.modalEliminarCombo=function(id){
				$scope.combo_id= id;
				$('#modalEliminarCombo').modal('open');
			};
			$scope.eliminarCombo=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/loungeCombos/'+id,
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
					url: server_uri+'/loungeCombos/'+id+'/edit',
				}).then(function successCallback(response) {
					$scope.combo=response.data;
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});

				$http({
					method: 'GET',
					url: server_uri+'/detailLoungeCombo/'+id,
				}).then(function successCallback(response) {
					$scope.listaServicios=response.data;
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});
				$('#modalVerCombo').modal('open');
			}

			$scope.agregarCarrito=function(object){
				object.tipo='combo';
				// console.log(object);
				$scope.carrito.push(object);
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
	}

	if($state.current.name == 'lounges_combos_crear'){
		if(debug == 'true'){
			$scope.crearCombo=true;
			console.log('hola desde el form');
			$scope.combo={};
			$scope.listaServicios=[];
			var arreglo=[];
			$scope.combo.lounge_id=$.sessionStorage.get('longe_id');
			$scope.serv={};

			$scope.modalServ=function(){
				$scope.serv={}
				console.log('hola')
				$scope.crearServicio=true;
				$('#modalServ').modal('open');
			}

			$http({
				method: 'GET',
				url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.servicios=response.data;
				console.log(response.data);
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.agregarServicio=function() {
				console.log($scope.serv.lounge_service_id);
				$http({
					method: 'GET',
					url: server_uri+'/verServicioProfesional/'+$scope.serv.lounge_service_id,
				}).then(function successCallback(response) {
					console.log(response.data);
					$scope.listaServicios.push(response.data);
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
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

			$scope.registrarCombo=function(){
				var miCombo=[];
				miCombo.push($scope.combo);
				miCombo.push($scope.listaServicios);
				$http({
					method: 'POST',
					url: server_uri+'/loungeCombos',
					data:miCombo
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.go('lounges_combos_index');
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			};


		}

	}

	if($state.current.name == 'lounges_combos_editar'){
		console.log('hola desde el formulario de editar');
		$scope.combo={};
		$scope.listaServicios=[];
		$http({
			method: 'GET',
			url: server_uri+'/loungeCombos/'+$stateParams.id+'/edit',
		}).then(function successCallback(response) {
			$scope.combo=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

		$http({
			method: 'GET',
			url: server_uri+'/detailLoungeCombo/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.listaServicios=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

		$scope.modalServ=function(){
			$scope.serv={}
			$('#modalServ').modal('open');
		}

		$http({
			method: 'GET',
			url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
		}).then(function successCallback(response) {
			$scope.servicios=response.data;
			console.log(response.data);
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

		$scope.agregarServicio=function() {
			console.log($scope.serv);
			detalleCombo={
				'combo_lounge_id' : $stateParams.id,
				'lounge_service_id' : $scope.serv.lounge_service_id
			}
			$http({
				method: 'POST',
				url: server_uri+'/detailLoungeCombo',
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
					url: server_uri+'/detailLoungeCombo/'+id,
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
				url: server_uri+'/loungeCombos/'+id,
				data:$scope.combo
			}).then(function successCallback(response) {
				Materialize.toast(response.data.msj, 4000);
			  	$state.go('lounges_combos_index');
			}, function errorCallback(response) {
				Materialize.toast(error, 4000);
				$state.reload();
			});
		}

	// 	$scope.actualizarProducto=function () {
	// 		$http({
	// 			method: 'PUT',
	// 			url: server_uri+'/products/'+$stateParams.id,
	// 			data:$scope.Producto
	// 		}).then(function successCallback(response) {
	// 			Materialize.toast(response.data.msj, 4000);
	// 		  	$state.go('lounges_productos_index');
	// 		}, function errorCallback(response) {
	// 			Materialize.toast(error, 4000);
	// 			$state.reload();
	// 		});
	// 	};

	}

	if($state.current.name == 'lounges_photos_index'){
		if(debug == 'true'){

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

			$http({
				method: 'GET',
				url: server_uri+'/loungePhotos/'+$stateParams.id_lounge,
			}).then(function successCallback(response) {
				$scope.loungefotos=response.data;
				$scope.thumbnail = fotos_uri;
				console.log($scope.thumbnail);
				console.log($scope.loungefotos);
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
				  	});
				  	$('.slider').slider({
				  		height: 320,
				  		transition: 800
				  	});
				  	$('.materialboxed').materialbox();
				  	
				  	// $('.carousel').carousel('next');
				});
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.modalAgregarFoto=function(){
				$('#modalFoto').modal('open');
				$scope.agregarFoto=true;
				$scope.editarFoto=false;
				$scope.foto={};
				$scope.foto.lounge_id = $stateParams.id_lounge;
				console.log($scope.foto.lounge_id);

				$http({
					method: 'GET',
					url: server_uri+'/imagen_defecto2',
				}).then(function successCallback(response) {
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.path
					};
				    
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});
			};

			$scope.agregar = function () {
				var fd = new FormData();
			  	var foto=$scope.foto;
			  	console.log(foto);
			  	for ( var key in foto ) {
			  		fd.append(key, foto[key]);
			  	}

			  	$http.post(server_uri+'loungePhotos/', fd, {
			  		withCredentials: true,
			  		headers: {'Content-Type': undefined },
			  		transformRequest: angular.identity
			  	}).then(function successCallback(response) {
			  		Materialize.toast(response.data.msj, 4000);
			  		$state.reload();
			  	}, function errorCallback(response) {
			  		Materialize.toast(error, 4000);
			  		$state.reload();
			  	});
			}

			$scope.editarFoto=function(id){
				console.log("id: "+id);
				$('.slider').slider('pause');
				$scope.crearFoto=false;
				$scope.editarFoto=true;
				$scope.foto={};
				$('#modalFoto').modal('open');
				$http({
					method: 'GET',
					url: server_uri+'loungePhotos/'+id+'/edit',
				}).then(function successCallback(response) {
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.foto
					};
					$scope.foto=response.data;
					console.log($scope.foto);
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});

			};

			$scope.actualizarFoto=function(id){
				console.log("id: "+id);
				var fd = new FormData();
				var foto=$scope.foto;
				console.log(foto);
				for ( var key in foto ) {
				  	fd.append(key, foto[key]);
				}

				 $http.post(server_uri+'loungePhotos/'+id, fd, {
				  	withCredentials: true,
				  	headers: {'Content-Type': undefined },
				  	transformRequest: angular.identity
				  }).then(function successCallback(response) {
				  	Materialize.toast(response.data.msj, 4000);
				  	$state.reload();
				  }, function errorCallback(response) {
				  	Materialize.toast(error, 4000);
				  	// $state.reload();
				  });
			};

			$scope.modalEliminarFoto=function(id){
				$scope.id_foto=id;
				$('#modalEliminarFoto').modal('open');
			};

			$scope.cerrarModalVerFoto=function(){
				$('#modalVerFoto').modal('close');
				$state.reload();
			};

			$scope.modalVerFoto=function(id){
				
				$('.slider').slider('pause');
				$('#modalVerFoto').modal('open');
				
				$http({
					method: 'GET',
					url: server_uri+'/loungePhotos/'+id+'/edit',
				}).then(function successCallback(response) {
					var fotos_uri = $('body').attr('data-fotos_uri');
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.foto
					};
					console.log($scope.thumbnail);
					
				}, function errorCallback(response) {
					console.log('Problemas de conexión...');
				});

			};

			$scope.eliminarFoto=function(id){
				$http({
					method: 'DELETE',
					url: server_uri+'/loungePhotos/'+id,
				}).then(function successCallback(response) {
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				}, function errorCallback(response) {
					Materialize.toast(error, 4000);
					// $state.go('lounges_productos_crear');
				});
			};

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
}]);

// cliente_servicio_categorias({id:1})

















