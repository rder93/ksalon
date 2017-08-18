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
		console.log('el id de la peluqueria es: '+ $stateParams.id);
		console.log('LOS PARAMETROS SON:');
		console.log($stateParams);

		$scope.peluqueria = $stateParams.peluqueria;
		console.log('EL ARRAY EN DETALLES DE LOS SERVICIOS ES: ');
		console.log($scope.peluqueria);

		$scope.contentServicios = '';

		for (var i = 0; i < $scope.peluqueria.length; i++) {
			console.log('CICLO: '+ i);
			$scope.contentServicios += '<li><img ng-src="'+$scope.peluqueria[i].foto+'"><div class="caption center-align"><h3>'+$scope.peluqueria[i].nombre_servicio+'</h3><h5 class="light grey-text text-lighten-3">'+$scope.peluqueria[i].descripcion+'</h5></div></li>';
		}

		$('.slides').append($scope.contentServicios);

		$scope.goBack = function() {
        	$state.go('cliente_servicios_publicados',{
				categoria_id: $stateParams.id,
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

		$scope.goClienteVendedrPerfil = function(){
			$state.go('cliente_vendedor_perfil',{
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}
			// id: peluqueria[0].id}
	}




	if($state.current.name == 'cliente_pago'){
		if(debug == 'true')
			console.log('en categorias siendo cliente');

		console.log('ESTOY EN LA VISTA DE PAGOS');
		console.log($stateParams);

	}

	if($state.current.name == 'cliente_vendedor_perfil'){

		$scope.peluqueria = 
			{
				
				id: 1,
				nombre: "Ricky's Styles",
				descripcion: "En Ricky's Styles nos orgullecemos de brindar el mejor servicio para su cabello, reserve con nosotros y mismo!",
				estrellas: 4,
				rol_id: 1,
				user_id: 1,
				tipo: {
					id: 1,
					nombre: 'Gran Salon'
				},
				duenio: {
					id: 1,
					nombre: 'Ricardo E'

				},
				comentarios:
					[
						{
							id: 1,
							comentario: 'Buen trato, no es la excelendia, pero cumplen',
							estrellas: 3,
							user_id: 8,
							user_to_id: 1,
							envia:{
								id: 8,
								nombre: 'Carolina Gutierrez'
							},
							recibe: {
								id: 1,
								nombre: 'Ricardo R'
							}
						},
						{
							id: 2,
							comentario: 'Buenisimo, muy atentos, recomendados!!',
							estrellas: 5,
							user_id: 15,
							user_to_id: 1,
							envia:{
								id: 15,
								nombre: 'Luz Mary R.'
							},
							recibe: {
								id: 1,
								nombre: 'Ricardo R'
							}
						}
					]
				
			};
				
			$('.starrr').starrr({
                rating: $scope.peluqueria.estrellas,
                readOnly: true,
                max: $scope.peluqueria.estrellas
            })
	}

	if($state.current.name == 'cliente_vendedor_opciones'){
		$scope.peluqueria = {
				id: 1,
				nombre: "Ricky's Styles",
				descripcion: "En Ricky's Styles nos orgullecemos de brindar el mejor servicio para su cabello, reserve con nosotros y mismo!",
				rol_id: 1,
				user_id: 1,
				tipo: {
					id: 1,
					nombre: 'Gran Salon'
				},
				duenio: {
					id: 1,
					nombre: 'Ricardo E'

				}
		}

		console.log($scope);
			
	}


	if($state.current.name == 'cliente_vendedor_profesionales'){
		$scope.profesionales = [
									{
										id: 1,
										nombre: 'Maria Sandoval'
									},
									{
										id: 2,
										nombre: 'Sofia Nuñez'
									},
									{
										id: 3,
										nombre: 'Guadalupe Gutierrez'
									},
									{
										id: 1,
										nombre: 'Maria2 Sandoval'
									},
									{
										id: 2,
										nombre: 'Sofia2 Nuñez'
									},
									{
										id: 3,
										nombre: 'Guadalupe2 Gutierrez'
									},
									{
										id: 1,
										nombre: 'Maria3 Sandoval'
									},
									{
										id: 2,
										nombre: 'Sofia3 Nuñez'
									},
									{
										id: 3,
										nombre: 'Guadalupe3 Gutierrez'
									}
								]

	}



	if($state.current.name == 'cliente_vendedor_productos'){
		$scope.productos = [
								{
									id:1,
									nombre: 'Shampoo Retro',
									descripcion: 'Nuevo shampoo exportado de Estados Unidos especialmente para el cabello rizado'
								},
								{
									id:2,
									nombre: 'Acondicionador Lounge Large',
									descripcion: 'Acondicionador '
								},
								{
									id:3,
									nombre: 'Pantene X5',
									descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi laboriosam, adipisci eum corporis nam dignissimos, alias ut error enim maiores vel pariatur incidunt cum ex. Quae assumenda esse voluptate officiis.'
								},
								{
									id:4,
									nombre: 'Jabon facial especial',
									descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat adipisci animi voluptates, ab et, rerum molestias fugit laudantium iste nostrum cupiditate. Dolore harum sit quibusdam earum neque dignissimos praesentium expedita?'
								}
							]
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
					id: categoria_id,
					peluqueria: peluqueria,
					servicios: servicios
				})

             });
        }

       


}])