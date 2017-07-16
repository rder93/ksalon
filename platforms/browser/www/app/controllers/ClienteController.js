app.controller('ClienteController', ['$scope', '$state','$stateParams', '$sessionStorage', function($scope, $state, $stateParams, $sessionStorage){

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;


	if($state.current.name == 'cliente_servicio_categorias'){
		if(debug == 'true')
			console.log('en categorias siendo cliente');


		$scope.buscar_categorias = function(){
			var form = $('form');
			var inputs = form.serialize();

			console.log("ido");
			console.log(inputs);

				$state.go('cliente_servicios_publicados',{
					id: $stateParams.id,
					opciones: inputs
				})

		}
	}



	if($state.current.name == 'cliente_servicios_publicados'){

		var markers = [];
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.380087, lng:  2.173485},
          zoom: 8,
          gestureHandling: 'cooperative'
        });


        //lo que se recibe de la api
        $scope.peluquerias = [
        	{
        		name: "Ricky Styles",
        			id: "1",
        			type: "1",
        			latitud: 41.393964,
        			altitud:  2.186403,
        			user_id: 1
        	},
        	{
        		name: "Ksa barber shop",
        			id: "2",
        			type: "1",
        			latitud: 41.397666,
        			altitud: 2.172048,
        			user_id: 2
        	},
        	{
        		name: "Peluqueria Jesus&Roiner",
        			id: "3",
        			type: "1",
        			latitud: 41.359797,
        			altitud:  2.162263,
        			user_id: 3
        	}
        ];


         getLatLng($scope.peluquerias);
	}


	if($state.current.name == "cliente_servicio_preview"){

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



		//FUNCIONES PARA ESTE CONTROLLER

        function getLatLng(peluquerias){
            var latLng;
            for(i=0; i<peluquerias.length; i++){
                latLng = new google.maps.LatLng(peluquerias[i].latitud, peluquerias[i].altitud);
                placeMarker(latLng, peluquerias[i]);
            }             
        }


        function placeMarker(location, peluqueria) {
            console.log("entre en placemarker");
            console.log(location);

            var marker = new google.maps.Marker({
                position: location, 
                map: map,
                title: ''+peluqueria.name
            });
            markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {
            	console.log("clicked on map");

            	$state.go('cliente_servicio_preview',{
					id: peluqueria.id,
				})
                // window.open(window.location.origin+"/#/car_published/"+car.id);

             });
        }

}])