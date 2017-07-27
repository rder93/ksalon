app.controller('ProfesionalController', ['$scope', '$timeout', '$state',  '$rootScope', '$stateParams', '$sessionStorage', '$http', function($scope, $timeout, $state, $rootScope, $stateParams, $sessionStorage, $http){
	$('.mobile-content').fadeIn(1000);
	$('.search-input').fadeIn(1000);

	

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');

	$scope.server_uri = server_uri;

	if ($state.current.name == 'profesional_servicios') {

		

		$http.get(server_uri+'servicios/'+$stateParams.id)
		    .then(function successCallback(response) {
		        $scope.servicios = response.data;
		        $timeout(function(){
					$('.modal').modal();
					$('.dropdown-button').dropdown({
					      inDuration: 300,
					      outDuration: 225,
					      constrainWidth: false, // Does not change width of dropdown to that of the activator
					      hover: true, // Activate on hover
					      gutter: 0, // Spacing from edge
					      belowOrigin: true, // Displays dropdown below the button
					      alignment: 'left', // Displays dropdown with edge aligned to the left of button
					      stopPropagation: false // Stops event propagation
					    }
					);
			    });
		    }, function errorCallback(error) {
		    	Materialize.toast(error, 4000);
		    });

	}

}])