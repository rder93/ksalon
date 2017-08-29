app.controller('ClienteController', ['$scope', '$state','$stateParams', '$sessionStorage', '$http', function($scope, $state, $stateParams, $sessionStorage, $http){

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;


	if($state.current.name == 'cliente_servicio_categorias'){
		if(debug == 'true')
			console.log('en categorias siendo cliente');

		// console.log('la categoria seleccionada es: '+$stateParams.id);

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

			console.log("ido");
			console.log(inputs);

			$state.go('cliente_servicios_publicados',{
				categoria_id: $stateParams.id,
				servicios: inputs
			})

		}
	}

	if($state.current.name == 'cliente_servicios_publicados'){

		$scope.goBack = function() {
        	$state.go('cliente_servicio_categorias',{
				id: $stateParams.categoria_id
			})
		}

		// console.log('el id pasado es: '+$stateParams.categoria_id);
		// console.log('Servicios: '+$stateParams.servicios);
		// console.log($stateParams);
		$scope.categoria_id = $stateParams.categoria_id;
		// categoria_id = $stateParams.categoria_id;
		console.log($stateParams.servicios);

		var markers = [];
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 8.284305, lng: -62.754250 },
          zoom: 12,
          gestureHandling: 'cooperative'
        });

        ruta = '';
        switch($scope.categoria_id) {
    		case '3':
        		ruta = 'buscar_independents_services';
        		break;
        	default:
        		ruta = 'buscar_lounges_services';
        		break;
        }

        console.log('la ruta es: '+ ruta);

        $scope.servicios = $stateParams.servicios;

        console.log('LOS SERVICIOS SON');
        console.log($stateParams.servicios);
        console.log($stateParams);
        var services = [];
        for (var i = 0; i < $stateParams.servicios.length ; i++) {
        	services += 'servicios[]='+$stateParams.servicios[i].value+'&';
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



	if($state.current.name == "cliente_servicio_preview"){
		console.log('el id de la categoria es: '+ $stateParams.categoria_id);
		console.log('LOS PARAMETROS SON:');
		console.log($stateParams);

	    $scope.estado = false;
	    if ($stateParams.categoria_id == '3') {
	    	console.log('ES UN INDEPENDIENTE');
	    	$scope.estado = true;

	    	$scope.goClienteIndependientePerfil = function(){
	    		$state.go('cliente_independiente_perfil',{
	    			id: $stateParams.peluqueria[0].user_id,
	    			categoria_id: $stateParams.categoria_id,
	    			peluqueria: $stateParams.peluqueria,
	    			servicios: $stateParams.servicios

	    		})
	    	}
	    }else {
	    	console.log('ES UN SALON');

	    	$scope.goClienteVendedorPerfil = function(){
	    		$state.go('cliente_vendedor_perfil',{
	    			id: $stateParams.peluqueria[0].lounge_id,
	    			categoria_id: $stateParams.categoria_id,
	    			peluqueria: $stateParams.peluqueria,
	    			servicios: $stateParams.servicios

	    		})
	    	}
	    }

		$scope.total = 0;

		$scope.peluqueria = $stateParams.peluqueria;
		console.log('EL ARRAY EN DETALLES DE LOS SERVICIOS ES: ');
		console.log($scope.peluqueria);

		$scope.contentServicios = '';

		for (var i = 0; i < $scope.peluqueria.length; i++) {
			console.log('CICLO: '+ i);
			$scope.contentServicios += '<li><img ng-src="'+$scope.peluqueria[i].foto+'"><div class="caption center-align"><h3>'+$scope.peluqueria[i].nombre_servicio+'</h3><h5 class="light grey-text text-lighten-3">'+$scope.peluqueria[i].descripcion_servicio+'</h5><h5 class="light grey-text text-lighten-3">Precio: $'+$scope.peluqueria[i].precio+'</h5></div></li>';
			$scope.total += $scope.peluqueria[i].precio;
		}

		$('.slides').append($scope.contentServicios);

		$scope.goBack = function() {
        	$state.go('cliente_servicios_publicados',{
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.peluqueria = $stateParams.peluqueria;

		$scope.goClientePago = function() {
        	$state.go('cliente_pago',{
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		
			// id: peluqueria[0].id}

      	$('.slider').slider();
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

		$scope.goProfesionales = function() {
        	$state.go('cliente_profesionales_salon',{
				id: $stateParams.peluqueria[0].lounge_id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.goClienteVendedorOpciones = function(){
        	$state.go('cliente_vendedor_opciones',{
				id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

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

            contentServicios = ''
			uri_server_foto = $('body').attr('data-fotos_uri');
    		for (var i = 0; i < $scope.fotos.length; i++) {
    			contentServicios += '<li><img ng-src="'+ uri_server_foto + $scope.fotos[i].foto +'"></li>';
    		}

    		$('.slides').append(contentServicios);
          	$('.slider').slider();

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
		console.log('ESTOY EN EL PERFIL DEL INDEPENDIENTE');
		console.log($stateParams);

		$scope.goBack = function() {
        	$state.go('cliente_servicio_preview',{
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

        $http({
            method: 'GET',
            url: server_uri+'all_independent/'+$stateParams.id
        }).then(function successCallback(response) {
        	console.log('TODO SALIO BIEN AL BUSCAR TODA LA INFO DEL INDEPENDIENTE');
        	console.log(response.data);
            $scope.peluqueria = response.data.independent;
            $scope.servicios = response.data.services;
            $scope.comentarios = response.data.comments;
            $scope.peluqueria.avatar = $('body').attr('data-fotos_uri') + $scope.peluqueria.avatar;

        	contentServicios = '<li><img ng-src="'+$scope.peluqueria.avatar+'"><div class="caption center-align"></div></li>';
        	$('.slides').append(contentServicios);
  			$('.slider').slider();
        }, function errorCallback(error) {
        	console.log('PASO UN ERROR');
        });
	}


	if($state.current.name == 'cliente_profesionales_salon'){
		console.log('ESTE ES EL PERFIL DE LOS PROFESIONALES DE UN SALON');
		console.log($stateParams);

	}

	if($state.current.name == 'cliente_vendedor_opciones'){
		console.log('LOS PARAMETROS RECIBIDOS SON: ');
		console.log($stateParams);

		$scope.goBack = function() {
        	$state.go('cliente_vendedor_perfil',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}
/*		
		$scope.goClienteVendedorOpciones = function(){
	    	$state.go('cliente_vendedor_opciones',{
				id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}
*/
		$scope.goClienteVendedorProfesionales = function(){
	    	$state.go('cliente_vendedor_profesionales',{
				id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.goClienteVendedorCombos = function(){
	    	$state.go('cliente_vendedor_combos',{
				id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.goClienteVendedorServicios = function(){
	    	$state.go('cliente_vendedor_servicios',{
				id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.goClienteVendedorProductos = function(){
	    	$state.go('cliente_vendedor_productos',{
				id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
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
                map: map,
                title: ''+peluqueria[0].nombre_salon
            });
            markers.push(marker);

            console.log('ANTES DE ENTRAR AL EVENTO DEL MAPA');
            google.maps.event.addListener(marker, 'click', function() {
            	console.log('DENTRO DEL EVENTO DEL MAPA');
            	$state.go('cliente_servicio_preview',{
					categoria_id: categoria_id,
					peluqueria: peluqueria,
					servicios: servicios
				})

             });
        }

       


}])