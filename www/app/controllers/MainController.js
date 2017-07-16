app.controller('MainController', ['$scope', '$state', function($scope, $state){
	var server_uri = $('body').attr('data-server_uri'),
		debug = $('body').attr('debug');

	$scope.server_uri = server_uri;


	if($state.current.name == 'home'){
		if(debug == 'true')
			console.log('en home');
		// $.post(server_uri+'/categories', null, function(data, textStatus, xhr) {
		// 	$scope.$apply(function() {
		// 	  $scope.categorys = data;
		// 	});
		// });

	}


	if($state.current.name == 'politicas')
		if(debug == 'true')
			console.log('en politicas');


	if($state.current.name == 'about')
		if(debug == 'true')
			console.log('en about');

}])