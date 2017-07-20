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
        $.sessionStorage.set('user', null);
        $state.go('login');
    });
	
	console.log($scope.user.rol);

	if ($scope.user.rol_id != 0) {
		var servicios="";
		if ($scope.user.rol_id != 4) {
			servicios= 'Mis Servicios Realizados';
		}else{
			servicios='Mis Servicios Contratados';
		}
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'home'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline',
			'state' : 'home'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance',
			'state' : 'home'
		},
		{
			'nombre':'Transacciones',
			'icono' : 'swap_horiz',
			'state' : 'home'
		},
		{
			'nombre':'Mis Mensajes',
			'icono' : 'question_answer',
			'state' : 'home'
		},
		{
			'nombre':servicios,
			'icono' : 'format_list_numbered',
			'state' : 'home'
		},
		];
	}else{
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'home'
		},
		{
			'nombre':'Gestión de usuarios',
			'icono' : 'contacts',
			'state' : 'panel_usuarios'
		},
		{
			'nombre':'Gestión de categorias',
			'icono' : 'format_list_numbered',
			'state' : 'home'
		},
		{
			'nombre':'Pagos, Transacciones, otros',
			'icono' : 'payment',
			'state' : 'home'
		},
		{
			'nombre':'Soporte',
			'icono' : 'question_answer',
			'state' : 'home'
		},
		{
			'nombre':'Clasificación de salones',
			'icono' : 'home',
			'state' : 'home'
		}
		];
	}

}])