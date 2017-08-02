app.controller('LoungeController', ['$scope', '$state', '$http','$stateParams','$timeout', function($scope, $state, $http,$stateParams,$timeout){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;
	$('.mobile-content').fadeIn(1000);
	$('.search-input').fadeIn(1000);
	$('.modal').modal();
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
			$.sessionStorage.set('longe_id', $stateParams.id);

		}
	}

	if($state.current.name == 'lounges_crear'){
		if(debug == 'true'){
			$scope.crearLounge=true;
			$scope.Lounge={};

			$scope.registrarLounge=function(){
				$scope.Lounge.user_id=$.sessionStorage.get('user').id;
				$scope.Lounge.category_id=$.sessionStorage.get('user').rol_id-1;
				$http({
					method: 'POST',
					url: server_uri+'/lounges',
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

	}

	if($state.current.name == 'lounges_index'){
		if(debug == 'true'){
			$http({
				method: 'GET',
				url: server_uri+'/lounges',
			}).then(function successCallback(response) {
				$scope.Lounges=response.data;
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
		}, function errorCallback(response) {
			console.log('dio error');
		});

		$scope.actualizarLounge=function () {
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
				$http({
					method: 'POST',
					url: server_uri+'/products',
					data:$scope.Producto
				}).then(function successCallback(response) {
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
			$scope.Producto=response.data;
		}, function errorCallback(response) {
			console.log('dio error');
		});

		$scope.actualizarProducto=function () {
			$http({
				method: 'PUT',
				url: server_uri+'/products/'+$stateParams.id,
				data:$scope.Producto
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
			$http({
				method: 'GET',
				url: server_uri+'/loungeServices/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
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

	if($state.current.name == 'lounges_profesionales_index'){
			$scope.urlFoto = $('body').attr('data-fotos_uri');
			$scope.profesionales
			
			console.log($scope.urlFoto);
			$http({
				method: 'GET',
				url: server_uri+'/professionals/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.profesionales=response.data;
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
				console.log('dio error');
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
				console.log('dio error');
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
				console.log('dio error');
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
				console.log('dio error');
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
					console.log('dio error');
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
					console.log('dio error');
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
					console.log('dio error');
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
					console.log('dio error');
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
					console.log('dio error');
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
					console.log('dio error');
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
					console.log('dio error');
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
			console.log('hola desde el index');
			$http({
				method: 'GET',
				url: server_uri+'/loungeCombos/'+$.sessionStorage.get('longe_id'),
			}).then(function successCallback(response) {
				$scope.combos=response.data;
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
				console.log('dio error');
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
					console.log('dio error');
				});

				$http({
					method: 'GET',
					url: server_uri+'/detailLoungeCombo/'+id,
				}).then(function successCallback(response) {
					$scope.listaServicios=response.data;
				}, function errorCallback(response) {
					console.log('dio error');
				});
				$('#modalVerCombo').modal('open');
			}
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
				console.log('dio error');
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
			console.log('dio error');
		});

		$http({
			method: 'GET',
			url: server_uri+'/detailLoungeCombo/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.listaServicios=response.data;
		}, function errorCallback(response) {
			console.log('dio error');
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
			console.log('dio error');
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

















