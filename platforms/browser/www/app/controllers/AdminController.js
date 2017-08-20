app.controller('AdminController', ['$scope', '$timeout', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', '$filter', function($scope, $timeout, $state, $rootScope, $stateParams, $sessionStorage, $http, $filter){
	$('.mobile-content').fadeIn(1000);
	$('.search-input').fadeIn(1000);

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');
	var fotos_uri = $('body').attr('data-fotos_uri');

	$scope.server_uri = server_uri;


	if ($state.current.name == 'panel_salones') {

		$scope.currentPage = 0;
		$scope.pageSize = 4; // Esta la cantidad de registros que deseamos mostrar por página
		$scope.pages = [];

		$scope.salones = [];

		$http.get(server_uri+"showSalones/")
			.then(function(response){
				console.log(response);
				$scope.salones = response.data;
				if($scope.salones.length > 0){
					$scope.siUsuarios = true;
				}
               
				$timeout(function(){
					$('.modal').modal({ending_top: '50%'});
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
					$scope.configPages();
			        
			    });
				
			})
			.catch(function(error){
				console.log(error);
			});

		$scope.configPages = function() {
		   $scope.pages.length = 0;
		   var ini = $scope.currentPage - 3;
		   var fin = $scope.currentPage + 4;
		   if (ini < 1) {
		      ini = 1;
		      if (Math.ceil($scope.salones.length / $scope.pageSize) > 4) fin = 4;
		      else fin = Math.ceil($scope.salones.length / $scope.pageSize);
		   } else {
		      if (ini >= Math.ceil($scope.salones.length / $scope.pageSize) - 4) {
		         ini = Math.ceil($scope.salones.length / $scope.pageSize) - 4;
		         fin = Math.ceil($scope.salones.length / $scope.pageSize);
		      }
		   }
		   if (ini < 1) ini = 1;
		   for (var i = ini; i <= fin; i++) {
		      $scope.pages.push({ no: i });
		   }
		   if ($scope.currentPage >= $scope.pages.length)
		      $scope.currentPage = $scope.pages.length - 1;
		};
		$scope.setPage = function(index) {
		   $scope.currentPage = index - 1;
		};

		$http({
				method: 'GET',
				url: server_uri+'/loungePhotos/'+$stateParams.id_lounge,
			}).then(function successCallback(response) {
				$scope.loungefotos=response.data;
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
	}

	if ($state.current.name == 'detalle_salon') {

		$scope.currentPage = 0;
		$scope.pageSize = 4; // Esta la cantidad de registros que deseamos mostrar por página
		$scope.pages = [];

		$scope.usuario = [];
		$scope.salones = [];

		$http({
			method: 'GET',
			url: server_uri+'/users/'+$stateParams.id_salon,
		}).then(function successCallback(response) {
			console.log(response);
			$scope.usuario=response.data.user_data;
			$scope.thumbnail = {
				dataUrl: fotos_uri+response.data.user_data.avatar
			};
			
			$timeout(function(){
				$('.modal').modal({ending_top: '50%'});
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
			});
		}, function errorCallback(response) {
			Materialize.toast('Problemas de conexión...', 4000);
		});

		$http({
			method: 'GET',
			url: server_uri+'/lounges/'+$stateParams.id_salon,
		}).then(function successCallback(response) {
			$scope.salones=response.data;
			if($scope.salones.length > 0){
				$scope.tieneSalones = true;
			}
			else{
				$scope.notieneSalones = true;
			}
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

		$scope.configPages = function() {
		   $scope.pages.length = 0;
		   var ini = $scope.currentPage - 3;
		   var fin = $scope.currentPage + 4;
		   if (ini < 1) {
		      ini = 1;
		      if (Math.ceil($scope.salones.length / $scope.pageSize) > 4) fin = 4;
		      else fin = Math.ceil($scope.salones.length / $scope.pageSize);
		   } else {
		      if (ini >= Math.ceil($scope.salones.length / $scope.pageSize) - 4) {
		         ini = Math.ceil($scope.salones.length / $scope.pageSize) - 4;
		         fin = Math.ceil($scope.salones.length / $scope.pageSize);
		      }
		   }
		   if (ini < 1) ini = 1;
		   for (var i = ini; i <= fin; i++) {
		      $scope.pages.push({ no: i });
		   }
		   if ($scope.currentPage >= $scope.pages.length)
		      $scope.currentPage = $scope.pages.length - 1;
		};
		$scope.setPage = function(index) {
		   $scope.currentPage = index - 1;
		};

	}

	if ($state.current.name == 'foto_salon') {

		$http({
			method: 'GET',
			url: server_uri+'/loungePhotos/'+$stateParams.id_salon,
		}).then(function successCallback(response) {
			$scope.salonesfotos=response.data;
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

	}

	if ($state.current.name == 'panel_usuarios') {

		$scope.currentPage = 0;
		$scope.pageSize = 4; // Esta la cantidad de registros que deseamos mostrar por página
		$scope.pages = [];

		$scope.usuarios = [];

		$http.get(server_uri+"users/")
			.then(function(response){
				console.log(response);
				$scope.usuarios = response.data;
				if($scope.usuarios.length > 0){
					$scope.siUsuarios = true;
				}
               
				$timeout(function(){
					$('.modal').modal({ending_top: '50%'});
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
					$scope.configPages();
			        
			    });
				
			})
			.catch(function(error){
				console.log(error);
			});

		$scope.askRemove = function (id) {
			$('#modal1').modal('open');
			$scope.deleteUser = {
				user_id : id
			}
		}

		$scope.askBlock = function (id) {
			$('#modal2').modal('open');
			$scope.blockUser = {
				blockuser_id : id
			}
		}

		$scope.askUnblock = function (id) {
			$('#modal3').modal('open');
			$scope.blockUser = {
				blockuser_id : id
			}
		}

		$scope.edit = function (id) {
			alert("editar");
		}

		$scope.remove = function (id) {
			console.log('eliminar '+id);
			$http.delete(server_uri+"users/"+id)
				.then(function(response){
					console.log(response.data);
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				})
				.catch(function(error){
					console.log(error);
				});
		}

		$scope.block = function (id) {
			console.log('Bloquear: '+id);
			$http.post(server_uri+"change_status/"+id)
				.then(function(response){
					console.log(response.data);
					Materialize.toast(response.data.msj, 4000);
					$state.reload();
				})
				.catch(function(error){
					console.log(error);
				});
		}

		$scope.configPages = function() {
		   $scope.pages.length = 0;
		   var ini = $scope.currentPage - 3;
		   var fin = $scope.currentPage + 4;
		   if (ini < 1) {
		      ini = 1;
		      if (Math.ceil($scope.usuarios.length / $scope.pageSize) > 4) fin = 4;
		      else fin = Math.ceil($scope.usuarios.length / $scope.pageSize);
		   } else {
		      if (ini >= Math.ceil($scope.usuarios.length / $scope.pageSize) - 4) {
		         ini = Math.ceil($scope.usuarios.length / $scope.pageSize) - 4;
		         fin = Math.ceil($scope.usuarios.length / $scope.pageSize);
		      }
		   }
		   if (ini < 1) ini = 1;
		   for (var i = ini; i <= fin; i++) {
		      $scope.pages.push({ no: i });
		   }
		   if ($scope.currentPage >= $scope.pages.length)
		      $scope.currentPage = $scope.pages.length - 1;
		};
		$scope.setPage = function(index) {
		   $scope.currentPage = index - 1;
		};

		
	}


	if ($state.current.name == 'add_usuario') {

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

		// //Markers, es el array donde estaran guardados los marcadores.
		// var markers = [];
		// //Aqui pones/creas el mapa en el div con id map
		// map = new google.maps.Map(document.getElementById('map'), {
		// 	center: {lat: -34.397, lng: 150.644},
		// 	zoom: 8
		// })

	 //    google.maps.event.addListener(map, "click", function (e, a) {
		// 	var latLng = e.latLng;
	 //    	for (var i = 0; i < markers.length; i++) {
	 //        	markers[i].setMap(null); //Remove the marker from the map
	 //      	}

	 //      	placeMarker(latLng);

	 //      	address = {
	 //      		lat : latLng.lat(),
	 //      		lng : latLng.lng()
	 //      	};
	 //      	$scope.new_user.latitud=latLng.lat();
	 //      	$scope.new_user.longitud=latLng.lng();
	 //      	console.log($scope.new_user);
	 //  	});


	 //    //eesta es la funcion que pone el marcador en el mapa
	 //    function placeMarker(location) {
	 //    	var marker = new google.maps.Marker({
	 //    		position: location, 
	 //    		map: map
	 //    	});
	 //    	markers.push(marker);
	 //    }

		$scope.newUser = function () {
			$scope.new_user.password = "12345";
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
					$scope.new_user = error.data.user_data;
					$timeout(function(){
				       $('#selectRol').val($scope.new_user.rol_id +1);
				       $('select').material_select();
				    });
				});
		}
	}

	if ($state.current.name == 'edit_usuario') {

		console.log(server_uri+"users/"+$stateParams.id);

		$scope.new_user = {
	        "rol_id":""
	    };

	    $scope.roles = [];

	    $http.get(server_uri+"rols/")
			.then(function(response){
				console.log(response.data);
				$scope.roles = response.data;
				// $timeout(function(){
			 //       $('select').material_select();
			 //    });
			})
			.catch(function(error){
				console.log(error);
			});

		$http.get(server_uri+"users/"+$stateParams.id)
			.then(function(response){
				console.log(response.data.user_data);
				$scope.new_user = response.data.user_data;
				$timeout(function(){
			       $('#selectRol').val($scope.new_user.rol_id +1);
			       $('#selectRol').attr('disabled', true);
			       $('select').material_select();
			    });
			})
			.catch(function(error){
				Materialize.toast(error, 4000);
			});


		$scope.editUser = function () {
			// $scope.new_user.rol_id = $scope.new_user.rol_id.nivel;
			console.log($scope.new_user.rol_id);

			console.log(server_uri+"users/"+$stateParams.id)
			$http({
			        url: server_uri+"users/"+$stateParams.id,
			        method: "post",
			        data: $scope.new_user
	    		})
				.then(function(response){
					console.log(response.data);
					Materialize.toast(response.data.msj, 4000);
					$state.go('panel_usuarios');
				})
				.catch(function(error){
					Materialize.toast(error, 4000);
				});
		}
	}

	if ($state.current.name == 'panel_categorias') {

        $http.get(server_uri+'categories')
        .then(function successCallback(response) {
            $scope.categorias = response.data;
            $timeout(function(){
					$('.modal').modal({ending_top: '50%'});
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
            console.log('error al obtener las categorias');
            console.log(error);
        });

        $scope.editarItem = function(id, nombre) {
            input_id = $('#categoria_id');
            input_id.val(id);
            input_nombre = $('#categoria_nombre');
            input_nombre.val(nombre);

            $('#modal1').modal('open');
            $('#modal1').css({
                display: 'block',
                top: '15%'
            });
        
            $scope.cancelEdit = function() {
                $('#modal1').modal('close');
                $('#modal1').css({
                    display: 'none',
                    top: '0'
                });

                input_id.val('');
                input_nombre.val('');
            }

            $scope.editarCategoria = function() {
                $scope.btnDisabled = true;

                $http({
                    method: 'PATCH',
                    url: server_uri+'categories/'+input_id.val(),
                    data: {nombre: input_nombre.val() }
                }).then(function successCallback(response) {
                    $scope.categorias = response.data.categories;
                    ocultarModal();
                    Materialize.toast(response.data.mensaje, 4000);
                }, function errorCallback(error) {
                    $scope.btnDisabled = false;
                    Materialize.toast(error.data.mensaje, 4000);      
                });


            }

        }
    }

    if ($state.current.name == 'panel_servicios') {

		$http.get(server_uri+'services/')
		    .then(function successCallback(response) {
		        $scope.servicios = response.data;

		        $timeout(function(){
					$('.modal').modal({ending_top: '50%'});
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

    // function ocultarModal() {
    //     $('#modal1').modal('close');
    //     $('#modal1').css({
    //         display: 'none',
    //         top: '0'
    //     });
    // }

}]);

app.filter('startFromGrid', function() {
   return function(input, start) {
      start = +start;
      return input.slice(start);
   };
});