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