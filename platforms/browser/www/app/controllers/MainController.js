app.controller('MainController', ['$scope', '$state', '$http', function($scope, $state, $http){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');

	$scope.server_uri = server_uri;


	if($state.current.name == 'home'){
		if(debug == 'true'){
			console.log('en home');
			$http.get(server_uri+'categories')
		    .then(function successCallback(response) {
		        $scope.categories = response.data;
		        // console.log('he obtenido las categorias');
		        // console.log(response);
		    }, function errorCallback(error) {
		        console.log('error al obtener las categorias');
		    });
		}

	}


	if($state.current.name == 'politicas')
		if(debug == 'true')
			console.log('en politicas');


	if($state.current.name == 'about')
		if(debug == 'true')
			console.log('en about');

}])