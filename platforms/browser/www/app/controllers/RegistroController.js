app.controller('RegistroController', ['$scope', '$state', '$http','$timeout', function($scope, $state, $http, $timeout){
	var fotos_uri = $('body').attr('data-fotos_uri');
	console.log(fotos_uri);
	$http({
			method: 'GET',
			url: server_uri+'/imagen_defecto',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.thumbnail = {
				dataUrl: fotos_uri+response.data.path
			};
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			console.log('dio error');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
	});

	// $scope.thumbnail = {
	// 	dataUrl: '../../../assets/core/images/no_avatar.jpg'
	// };
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

	// $('.categoria').material_select();
	$('body').removeClass('fondoBody');
	$http({
			method: 'GET',
			url: server_uri+'/categories',
		}).then(function successCallback(response) {
			console.log(response.data);
			$scope.categories=response.data;
		    // this callback will be called asynchronously
		    // when the response is available
		}, function errorCallback(response) {
			console.log('dio error');
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});

	$scope.registrarUsuario = function() {
		console.log($scope.Usuario);
		// $http({
		// 	method: 'POST',
		// 	url: server_uri+'/users',
		// 	data:$scope.Usuario
		// }).then(function successCallback(response) {
		// 	console.log(response);
		//     Materialize.toast(response.data.msj, 4000);
		// 	$state.go('login');
		// }, function errorCallback(response) {
		// 	Materialize.toast(error, 4000);
		// 	$state.go('registro');
		// });

		var fd = new FormData();
		  //Take the first selected file
		  // fd.append("file", $scope.Usuario.foto);
		  // fd.append("name", $scope.Usuario.name);
		  // fd.append('email')
		  var usuario=$scope.Usuario;
		  for ( var key in usuario ) {
    		fd.append(key, usuario[key]);
		  }
		  console.log(fd);


		  $http.post(server_uri+'/users', fd, {
		  	withCredentials: true,
		  	headers: {'Content-Type': undefined },
		  	transformRequest: angular.identity
		  }).then(function successCallback(response) {
		  	 	Materialize.toast(response.data.msj, 4000);
				$state.go('login');
		}, function errorCallback(response) {
			Materialize.toast(error, 4000);
			$state.reload();
		});
	};


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

