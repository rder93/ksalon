app.controller('RegistroController', ['$scope', '$state', '$http','$timeout', function($scope, $state, $http, $timeout){
	var fotos_uri = $('body').attr('data-fotos_uri');

	if($state.current.name == 'registro'){
		if(debug == 'true'){
			
			$http({
				method: 'GET',
				url: server_uri+'/imagen_defecto',
			}).then(function successCallback(response) {
				$scope.thumbnail = {
					dataUrl: fotos_uri+response.data.path
				};
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

			var user = $.sessionStorage.get('user');
			if( user ){
				ruta = '/rols'
			} else {
				ruta = '/roles'
			}



			$('body').removeClass('fondoBody');
			$http({
				method: 'GET',
				url: server_uri+ruta,
			}).then(function successCallback(response) {
				$scope.categories=response.data;
			}, function errorCallback(response) {
				console.log('dio error');
			});




			var markers = [];
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 0.944148, lng: -23.388347},
                zoom: 1
            });


            google.maps.event.addListener(map, "click", function (e, a) {

	            var latLng = e.latLng;
	            
	            for (var i = 0; i < markers.length; i++) {
	                markers[i].setMap(null); //Remove the marker from the map
	            }

	            markers=[];
	            placeMarker(latLng);

	            address = {
	                lat : latLng.lat(),
	                lng : latLng.lng()
	            };

	            $scope.Usuario.latitud = address.lat;
	            $scope.Usuario.longitud = address.lng;

	            $('input[name="latitud"]').val(address.lat);
	            $('input[name="longitud"]').val(address.lng);
	        });


	        function placeMarker(location) {

	            var marker = new google.maps.Marker({
	                position: location, 
	                map: map
	            });
	            markers.push(marker);
	        }




			$scope.registrarUsuario = function() {
				var fd = new FormData();

			  	var usuario=$scope.Usuario;
			  	for ( var key in usuario ) {
			  		fd.append(key, usuario[key]);
			  	}


			  	$http.post(server_uri+'/users', fd, {
			  		withCredentials: true,
			  		headers: {'Content-Type': undefined },
			  		transformRequest: angular.identity
			  	}).then(function successCallback(response) {
			  		Materialize.toast(response.data.msj, 4000);

			  		if(response.data.success == true){
				  		$.sessionStorage.set('user', response.data.user_data);
						$.sessionStorage.set('rol', response.data.user_data.rol_id); 
				  		$state.go('perfil');
				  	}
			  	}, function errorCallback(response) {
			  		Materialize.toast('Error al intetar registro', 4000);
			  		$state.reload();
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
}])

