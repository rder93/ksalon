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
		categoria_id = $stateParams.categoria_id;
		console.log($stateParams.servicios);


		var markers = [];
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 8.284305, lng: -62.754250 },
          zoom: 12,
          gestureHandling: 'cooperative'
        });

        ruta = '';
        switch(categoria_id) {
    		case '3':
        		ruta = 'independents_services';
        		break;
        	default:
        		ruta = 'lounges_services';
        		break;
        }

        console.log('la ruta es: '+ ruta);


        //lo que se recibe de la api
        // $scope.peluquerias = [
        // 	{
        // 		name: "Ricky Styles",
        // 			id: "1",
        // 			type: "1",
        // 			latitud: 41.393964,
        // 			altitud:  2.186403,
        // 			user_id: 1
        // 	},
        // 	{
        // 		name: "Ksa barber shop",
        // 			id: "2",
        // 			type: "1",
        // 			latitud: 41.397666,
        // 			altitud: 2.172048,
        // 			user_id: 2
        // 	},
        // 	{
        // 		name: "Peluqueria Jesus&Roiner",
        // 			id: "3",
        // 			type: "1",
        // 			latitud: 41.359797,
        // 			altitud:  2.162263,
        // 			user_id: 3
        // 	}
        // ];

        $scope.servicios = $stateParams.servicios;

        var services = [];
        for (var i = 0; i < $stateParams.servicios.length ; i++) {
        	services += 'servicios[]='+$stateParams.servicios[i].value+'&';
        	// services.push($stateParams.servicios[i].value);
        }



        console.log('SE ENVIARA LA PETICION');
        console.log(services);
        // services = JSON.stringify(services)
        // console.log(services);

        $http({
            method: 'GET',
            url: server_uri+"buscar_lounges_services?"+services
            // data: {servicios: 'Hola mundo' }
        }).then(function successCallback(response) {
        	console.log('TODO SALIO BIEN AL BUSCAR LOUNGES SERVICES');
        	console.log(response.data);
            $scope.peluquerias = response.data;
			getLatLng($scope.peluquerias);
        }, function errorCallback(error) {
        	console.log('PASO UN ERROR');
        });
/*
        $http({
            method: 'GET',
            url: server_uri+'buscarLoungesServices',
            data: {servicios: "hola mundo"}
        }).then(function successCallback(response) {
        	console.log('LA RESPUESTA ES: ');
        	console.log(response.data);
   //          $scope.peluquerias = response.data;
   //          console.log('LA DATA DE PELUQUERIAS ES: ');
   //          console.log($scope.peluquerias);		        
			// getLatLng($scope.peluquerias);
        }, function errorCallback(error) {
        	// console.log('error al obtener los salones')
        });
*/
	}


	if($state.current.name == "cliente_servicio_preview"){
		console.log('el id de la peluqueria es: '+ $stateParams.id);

		$http.get(server_uri+'lounges/'+$stateParams.id+'/edit')
            .then(function successCallback(response) {
                $scope.peluqueria = response.data;
                console.log('todo calidad');		        
                console.log($scope.peluqueria);		        
            }, function errorCallback(error) {
            	console.log('error al obtener los del salon')
            });


		$scope.servicio = 
			{
				descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde excepturi tempora nulla, totam porro perspiciatis nihil quidem quo fugit impedit, doloremque ipsam doloribus fuga omnis voluptas error quis! Ea, nam.',
				id: 1,
				servicio_id: 3,
				precio: 25,
				servicio:{
					id: 3,
					nombre: "Secado de cabello"
				},
				peluqueria: {
					id: 1,
					nombre: "Ricky's Styles",
					descripcion: "En Ricky's Styles nos orgullecemos de brindar el mejor servicio para su cabello, reserve con nosotros y mismo!",
					tipo: 1,
					user_id: 1,
					tipo: {
						id: 1,
						nombre: 'Gran Salon'
					}
				}
				
			};

		
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

        function getLatLng(peluquerias){
            var latLng;

            for(i=0; i < peluquerias.length; i++){
                latLng = new google.maps.LatLng(peluquerias[i][0].latitud, peluquerias[i][0].altitud);
                placeMarker(latLng, peluquerias[i][0]);
            }             
        }


        function placeMarker(location, peluqueria) {
            console.log("entre en placemarker");
            console.log(location);

            var marker = new google.maps.Marker({
                position: location, 
                map: map,
                title: ''+peluqueria.nombre_salon
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
            	$state.go('cliente_servicio_preview',{
					id: peluqueria.id,
				})

             });
        }

       


}])