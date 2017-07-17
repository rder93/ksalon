app.controller('NavigationController', ['$scope', '$state', '$rootScope', '$sessionStorage', function($scope, $state, $rootScope, $sessionStorage){
	$('.button-collapse').sideNav({
		  menuWidth: 300,
		  edge: 'left',
		  closeOnClick: true,
		  draggable: true
		}
	);


	$scope.user = $.sessionStorage.get('user');
	// $scope.pagename = 'INICIO';
	if (!$.sessionStorage.get('user')) {
		console.log("aqui")
		$state.go('login');
	}

	$('#btn-logout').click(function(event) {
		console.log("finalizando sesion")
        $sessionStorage= null;
        $state.go('login');
    });
	
	console.log($scope.user.rol);

	if ($scope.user.rol!=0) {
		var servicios="";
		if ($scope.user.rol != 4) {
			servicios= 'Mis Servicios Realizados';
		}else{
			servicios='Mis Servicios Contratados';
		}
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance'
		},
		{
			'nombre':'Transacciones',
			'icono' : 'swap_horiz'
		},
		{
			'nombre':'Mis Mensajes',
			'icono' : 'question_answer'
		},
		{
			'nombre':servicios,
			'icono' : 'format_list_numbered'
		},
		];
	}else{
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home'
		}
		];
	}

}])