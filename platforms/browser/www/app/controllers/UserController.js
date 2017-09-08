app.controller('UserController', ['$scope', '$state', '$http','$timeout', function($scope, $state, $http,$timeout){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;
	var fotos_uri = $('body').attr('data-fotos_uri');
	$scope.fotos_uri = fotos_uri;


	if (!$.sessionStorage.get('user')) {
    	 $state.go('login');
    	 return false;
    }


	if($state.current.name == 'perfil'){
		if(debug == 'true'){
			if (!$.sessionStorage.get('user')) {
				// console.log("no ha iniciado sesion");
    	 		$state.go('login');
    	 		return false;
    		}

    		$scope.noBtnBack = true;

    		$scope.Usuario=$.sessionStorage.get('user');
    		var fotos_uri = $('body').attr('data-fotos_uri');
    		$http({
    			method: 'GET',
    			url: server_uri+'/users/'+$scope.Usuario.id+'/edit',
    		}).then(function successCallback(response) {
				$scope.thumbnail = {
					dataUrl: fotos_uri+response.data.avatar
				};

				$scope.Usuario=response.data;

				$scope.calculateRating();
				// $scope.putRatingsStars();

			    // this callback will be called asynchronously
			    // when the response is available
			}, function errorCallback(response) {
				console.log('dio error');
			});


    		$scope.calculateRating = function(){
    			var i, rate=0;

                for (i=0; i<$scope.Usuario.ratings.length; i++){
                    rate+= $scope.Usuario.ratings[i].puntaje;
                }


                if(rate==0){
                	$('.starrr-user').starrr({
	                    rating: 0,
	                    readOnly: true
	                })
                }else{
	                $('.starrr-user').starrr({
	                    rating: rate/$scope.Usuario.ratings.length,
	                    readOnly: true
	                })
	            }

                // $('#seller-stars').append('<span style="margin-left: 10px;">'+ratings.length+' Calificaciones</span>')
    		}

    		// $scope.putRatingsStars = function(){
    		// 	for(var i=0; i<$scope.Usuario.ratings.length;i++){
    		// 		console.log('#starrr-comment-'+i)
    		// 		$('#starrr-user-'+i).starrr({
	     //                rating: $scope.Usuario.ratings[i].puntaje,
	     //                readOnly: true
	     //            })
    		// 	}
    		// }


			
			if ($scope.Usuario.rol_id==2) {
				$scope.btnSalones=true;
			}else if ($scope.Usuario.rol_id==4) {
				$scope.btnClientes=true;
			}else if ($scope.Usuario.rol_id == 3){
				$scope.btnProfesional = true;
			}

		}

	}

	if($state.current.name == 'perfil_config'){
		
		if(debug == 'true'){
			$scope.Usuario = $.sessionStorage.get('user');
		
			$http.get(server_uri+'/users/'+$scope.Usuario.id+'/edit')
				.then(function(response){
					// console.log(response.data);
					$scope.usuario=response.data;
					$scope.thumbnail = {
						dataUrl: fotos_uri+response.data.avatar
					};

					

					$timeout(function() {
						
						//Aqui pones/creas el mapa en el div con id map
						map = new google.maps.Map(document.getElementById('map'), {
							center: {lat: parseFloat($scope.usuario.latitud), lng: parseFloat($scope.usuario.longitud)},
							zoom: 8
						});

						$scope.getLatLng($scope.usuario);
					
					});

				})
				.catch(function(error){
					console.log(error);
				});


		    $scope.getLatLng = function(data) {
		    	latLng = new google.maps.LatLng(data.latitud,data.longitud);
		    	placeMarker(latLng);
		    }

		    function placeMarker(location) {
		    	var markers = [];

		    	var marker = new google.maps.Marker({
		    		position: location, 
		    		map: map
		    	});
		    	markers.push(marker);

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
			      	$scope.usuario.latitud  = latLng.lat();
			      	$scope.usuario.longitud = latLng.lng();
			  	});


		    }

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

			$scope.actualizarUsuario = function() {
				var fd = new FormData();
				  var usuario=$scope.usuario;
				  for ( var key in usuario ) {
				  	fd.append(key, usuario[key]);
				  }

				 $http.post(server_uri+'/updateUser', fd, {
				  	withCredentials: true,
				  	headers: {'Content-Type': undefined },
				  	transformRequest: angular.identity
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

	// function map(data) {
	// //Markers, es el array donde estaran guardados los marcadores.
	// 	var markers = [];
	// 	//Aqui pones/creas el mapa en el div con id map
	// 	map = new google.maps.Map(document.getElementById('map'), {
	// 		center: {lat: parseFloat(data.latitud), lng: parseFloat(data.longitud)},
	// 		zoom: 8
	// 	})

	//     google.maps.event.addListener(map, "click", function (e, a) {
	// 		var latLng = e.latLng;
	//     	for (var i = 0; i < markers.length; i++) {
	//         	markers[i].setMap(null); //Remove the marker from the map
	//       	}

	//       	placeMarker(latLng);

	//       	address = {
	//       		lat : latLng.lat(),
	//       		lng : latLng.lng()
	//       	};
	//       	$scope.usuario.latitud=latLng.lat();
	//       	$scope.usuario.longitud=latLng.lng();
	//       	console.log($scope.new_user);
	//   	});

	//     //eesta es la funcion que pone el marcador en el mapa
	    


	// }


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


