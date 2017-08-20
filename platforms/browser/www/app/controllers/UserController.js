app.controller('UserController', ['$scope', '$state', '$http','$timeout', function($scope, $state, $http,$timeout){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');
	$scope.server_uri = server_uri;
	var fotos_uri = $('body').attr('data-fotos_uri');


	if($state.current.name == 'perfil'){
		if(debug == 'true'){
			if (!$.sessionStorage.get('user')) {
				console.log("no ha iniciado sesion");
    	 		$state.go('login');
    	 		return false;
    		}

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
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
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
		// if(debug == 'true')
		// $scope.Usuario={};	
		// 	console.log('en configuracion del perfil');

		// $scope.cargarImagen = function(id) {
		// 	navigator.camera.getPicture(successPhoto,errorPhoto,{quality:50});
		// };
		
		// $scope.Usuario=$.sessionStorage.get('user');

		// $scope.actualizarUsuario = function() {
		// 	$http({
		// 		method: 'PUT',
		// 		url: server_uri+'/users/'+$scope.Usuario.id,
		// 		data:$scope.Usuario
		// 	}).then(function successCallback(response) {
		// 		console.log(response);
		// 	    console.log('se obtienen los datos del usuario')
		// 	}, function errorCallback(response) {
		// 		console.log('dio error');
		// 	});
		// };

		// function successPhoto(url){
		// 	$("#contenedorFoto").attr("src",url);
  //   		$("#contenedorFoto").show();
  //   		$scope.Usuario.foto=url;
  //   		alert($scope.Usuario);
		// }
		// function errorPhoto(){
		// 	alert("error");
		// }
		$scope.Usuario=$.sessionStorage.get('user');
		var fotos_uri = $('body').attr('data-fotos_uri');
			$http({
				method: 'GET',
				url: server_uri+'/users/'+$scope.Usuario.id+'/edit',
			}).then(function successCallback(response) {
				// console.log(response.data);
				$scope.thumbnail = {
					dataUrl: fotos_uri+response.data.avatar
				};
				$scope.Usuario=response.data;
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

			$scope.actualizarUsuario = function() {

				var fd = new FormData();
				  var usuario=$scope.Usuario;
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


