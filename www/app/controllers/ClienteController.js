app.controller('ClienteController', ['$scope', '$state','$stateParams', '$sessionStorage', '$http','$timeout', function($scope, $state, $stateParams, $sessionStorage, $http, $timeout){

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');
	$scope.factura={};
	$scope.server_uri = server_uri;
	$('.modal').modal();
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

	if($state.current.name == 'cliente_servicio_categorias'){
		if(debug == 'true'){

			$http.get(server_uri+'services')
			.then(function successCallback(response) {
				$scope.servicios = response.data;
				console.log($scope.servicios);		        
			}, function errorCallback(error) {
				console.log('error al obtener las categorias')
			});


			$scope.buscar_categorias = function(){
				var form = $('form');
				var inputs = form.serializeArray();

				$.sessionStorage.set('servicios', inputs);

				$state.go('cliente_servicios_publicados',{
					categoria_id: $stateParams.id,
					// servicios: inputs
				})

			}
		}
	}

	if($state.current.name == 'cliente_servicios_publicados'){
		if(debug == 'true'){

			$scope.goBack = function() {
				$state.go('cliente_servicio_categorias',{
					id: $stateParams.categoria_id
				})
			}

			$scope.goPreview=function(categoria_id, peluqueria, servicios){

				$.sessionStorage.set('peluqueria', peluqueria);
				// $.sessionStorage.set('servicios', servicios);
				$state.go('cliente_servicio_preview');
			}

			$scope.categoria_id = $stateParams.categoria_id;
			// categoria_id = $stateParams.categoria_id;

			var actualLatLng = new google.maps.LatLng($.sessionStorage.get('user').latitud, $.sessionStorage.get('user').longitud);

			console.log($.sessionStorage.get('user'))

	        var markers = [];
	        map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: actualLatLng.lat(), lng: actualLatLng.lng()},
	          zoom: 12,
	          gestureHandling: 'cooperative'
	        });


			// var markers = [];
			// map = new google.maps.Map(document.getElementById('map'), {
			// 	center: {lat: 8.284305, lng: -62.754250 },
			// 	zoom: 12,
			// 	gestureHandling: 'cooperative'
			// });

			ruta = '';
			switch($scope.categoria_id) {
				case '3':
				ruta = 'buscar_independents_services';
				break;
				default:
				ruta = 'buscar_lounges_services';
				break;
			}

			// console.log('la ruta es: '+ ruta);

			$scope.servicios = $.sessionStorage.get('servicios');

			console.log('LOS SERVICIOS SON');

			console.log($.sessionStorage.get('servicios'));
			// console.log($stateParams);
			var services = [];
			for (var i = 0; i < $scope.servicios.length ; i++) {
				services += 'servicios[]='+$scope.servicios[i].value+'&';
			}

			$http({
				method: 'GET',
				url: server_uri+ruta+"?"+services
			}).then(function successCallback(response) {
				console.log('TODO SALIO BIEN AL BUSCAR LOUNGES SERVICES');
				console.log(response.data);
				$scope.peluquerias = response.data;
				getLatLng($scope.peluquerias, $stateParams.servicios, $stateParams.categoria_id);
			}, function errorCallback(error) {
				console.log('PASO UN ERROR');
			});

		}
		
	}



	if($state.current.name == "cliente_servicio_preview"){
		if(debug == 'true'){
			$scope.carrito=[];
			$.sessionStorage.set('cliente_salon', true);
			// console.log($.sessionStorage.get('peluqueria'));
			$scope.pel= $.sessionStorage.get('peluqueria');
			// console.log(pel);
			// console.log($scope.pel[0]);
			$scope.urlFoto = $('body').attr('data-fotos_uri');	
			$scope.perfil={};
			// 
			$timeout(function(){
				$('.slider').slider({
					height: 400,
					transition: 800
				});
			});
			$scope.servs=[];
			angular.forEach($.sessionStorage.get('peluqueria'), function(value, key){
				// console.log(value);
				$scope.servs.push({'id':value.id ,'descripcion': value.nombre_servicio, 'precio':value.precio, 'tipo': 'servicio','foto':value.foto, 'descripcion_servicio':value.descripcion_servicio});
				// serv.push={}
			});
			
			$http({
				method: 'GET',
				url: server_uri+'/users/'+$scope.pel[0].id_usuario,
			}).then(function successCallback(response) {
				// console.log('estoy aqui');

				console.log("Respuesta del ajax");
				console.log(response.data);

				$scope.usuario=response.data.user_data;
				if ($.sessionStorage.get('user_to_id')!=$scope.usuario.id) {
					console.log('el usuario es diferente')
					$scope.factura={};
					$scope.carrito=[];
				}else
				// console.log('el usuario es el mismo');
				// console.log($.sessionStorage.get('user_to_id'));
				$.sessionStorage.set('user_to_id', $scope.usuario.id);
				$scope.factura.user_to_id=$scope.usuario.id;
				$scope.factura.user_id=$.sessionStorage.get('user').id;
				if($scope.usuario.rol_id==1 || $scope.usuario.rol_id==2)
					$scope.estado=false;
				else
					$scope.estado=true;
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.agregarCarrito=function(object){
				// console.log('estoy haciendo click aqui')
				// console.log(object.id);
				object.tipo='servicio';
				// console.log(object);
				ob={'id':object.id,'descripcion': object.descripcion, 'precio':object.precio, 'tipo': 'servicio'};
				console.log(ob);
				$scope.carrito.push(ob);
				$('#carrito'+object.id).addClass('hide');
				// console.log($scope.carrito);
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
				console.log($.sessionStorage.get('carrito'));
			};
			
			$scope.modalCarrito=function(){
				$timeout(function(){
					$('#modalCarrito').modal('open');
				});
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
				$('#carrito'+id).removeClass('hide');
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




	if($state.current.name == 'cliente_pago'){
		if(debug == 'true')
			console.log('en categorias siendo cliente');

		console.log('ESTOY EN LA VISTA DE PAGOS');
		console.log($stateParams);

		$scope.goBack = function() {
        	$state.go('cliente_servicio_preview',{
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

	}

	if($state.current.name == 'cliente_vendedor_perfil'){
		console.log('ESTOY EN EL PERFIL DEL VENDEDOR');
		console.log($stateParams);

		$scope.goBack = function() {
        	$state.go('cliente_servicio_preview',{
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

	    /*ruta = '';
	    switch($scope.categoria_id) {
			case '3':
	    		ruta = 'buscar_independents_services';
	    		break;
	    	default:
	    		ruta = 'buscar_lounges_services';
	    		break;
	    }*/

        $http({
            method: 'GET',
            url: server_uri+'all_lounge/'+$stateParams.id
        }).then(function successCallback(response) {
        	console.log('TODO SALIO BIEN AL BUSCAR LOUNGES SERVICES');
        	console.log(response.data);
            $scope.peluqueria = response.data.lounge;
            $scope.servicios = response.data.services;
            $scope.fotos = response.data.photos;
            $scope.comentarios = response.data.comments;
            $scope.url=$('body').attr('data-fotos_uri');
            $.sessionStorage.set('cliente_salon', true);
            $timeout(function(){
				$('.slider').slider();		
			 });

        }, function errorCallback(error) {
        	console.log('PASO UN ERROR');
        });

/*
			$('.starrr').starrr({
                rating: $scope.peluqueria.estrellas,
                readOnly: true,
                max: $scope.peluqueria.estrellas
            })
*/
	}

	if($state.current.name == 'cliente_independiente_perfil'){
		if(debug == 'true'){
			console.log('hola');
		}
	}


	if($state.current.name == 'cliente_vendedor_profesionales'){
		$scope.urlFoto = $('body').attr('data-fotos_uri');
		$scope.profesionales
		
		console.log($scope.urlFoto);
		$http({
			method: 'GET',
			url: server_uri+'/professionals/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.profesionales=response.data;
	
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

		$scope.goBack = function() {
        	$state.go('cliente_vendedor_opciones',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}
	}



	if($state.current.name == 'cliente_vendedor_productos'){
		$scope.goBack = function() {
        	$state.go('cliente_vendedor_opciones',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$http({
			method: 'GET',
			url: server_uri+'/products/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.Productos=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});
	}

	if($state.current.name == 'cliente_vendedor_combos'){
		$scope.goBack = function() {
        	$state.go('cliente_vendedor_opciones',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$http({
			method: 'GET',
			url: server_uri+'/loungeCombos/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.combos=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

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
	}

	if($state.current.name == 'cliente_vendedor_servicios'){
		$scope.goBack = function() {
        	$state.go('cliente_vendedor_opciones',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.urlFoto = $('body').attr('data-fotos_uri');
		$http({
			method: 'GET',
			url: server_uri+'/loungeServices/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.Servicios=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});
	}






		//FUNCIONES PARA ESTE CONTROLLER

        function getLatLng(peluquerias, servicios, categoria_id){
            var latLng;

            for(i=0; i < peluquerias.length; i++){
                latLng = new google.maps.LatLng(peluquerias[i][0].latitud, peluquerias[i][0].altitud);
                placeMarker(latLng, peluquerias[i], servicios, categoria_id);
            }             
        }

        function placeMarker(location, peluqueria, servicios, categoria_id) {
            console.log("entre en placemarker");
            console.log(location);

            var marker = new google.maps.Marker({
                position: location, 
                map: map
                // title: ''+peluqueria[0].nombre_salon
            });
            markers.push(marker);

            console.log('ANTES DE ENTRAR AL EVENTO DEL MAPA');
            google.maps.event.addListener(marker, 'click', function() {

            	$.sessionStorage.set('peluqueria', peluqueria);
				$state.go('cliente_servicio_preview');


    //         	$state.go('cliente_servicio_preview',{
				// 	categoria_id: categoria_id,
				// 	peluqueria: peluqueria,
				// 	servicios: servicios
				// })

             });
        }

       


}])