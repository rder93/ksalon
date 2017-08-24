app.controller('NavigationController', ['$scope', '$state', '$rootScope', '$sessionStorage','$http', function($scope, $state, $rootScope, $sessionStorage,$http){
	$('.button-collapse').sideNav({
		  menuWidth: 300,
		  edge: 'left',
		  closeOnClick: true,
		  draggable: true
		}
	);

	
	$scope.user = $.sessionStorage.get('user');

	$http({
		method: 'GET',
		url: server_uri+'/users/'+$scope.user.id+'/edit',
	}).then(function successCallback(response) {
		var fotos_uri = $('body').attr('data-fotos_uri');
		$scope.foto_menu= fotos_uri+response['data'].avatar;
	}, function errorCallback(response) {
		console.log('dio error');
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
	// $scope.pagename = 'INICIO';
	if (!$.sessionStorage.get('user')) {
		$state.go('login');
		return false;
	}

	$('#btn-logout').click(function(event) {
		console.log("finalizando sesion")
        $.sessionStorage.set('user', null);
        $state.go('login');
    });
	
	console.log("soy administrador")
	console.log($scope.user.rol_id);
	if ($scope.user.rol_id == 0) { /*Parte del administrador*/
		console.log("no esta entrando en administrador")
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'home'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline',
			'state' : 'about'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance',
			'state' : 'politicas'
		},
		{
			'nombre': 'Panel de usuarios',
			'icono' : 'people_outline',
			'state' : 'panel_usuarios'
		},
		{
			'nombre': 'Panel de salones',
			'icono' : 'home',
			'state' : 'panel_salones'
		},
		{
			'nombre':'Panel de servicios y categorias',
			'icono' : 'store',
			'state' : 'panel_servicios_categorias'
		},
		{	'nombre':'Panel de pagos',
			'icono' : 'attach_money',
			'state' : 'panel_pagos'
		},
		{
			'nombre':'Soporte',
			'icono' :'border_color',
			'state' :'admin_tickets'
		}
	
		];
	}else if ($scope.user.rol_id == 1) { /*Parte de grandes salones*/
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'perfil'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline',
			'state' : 'about'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance',
			'state' : 'politicas'
		},
		{
			'nombre':'Mis Salones',
			'icono' : 'location_city',
			'state' : 'lounges_index'
		},
		{
			'nombre':'Transacciones',
			'icono' : 'swap_horiz',
			'state' : 'transacciones'
		},
		{
			'nombre':'Mis Mensajes',
			'icono' : 'question_answer',
			'state' : 'my_messages'
		},	
		{
			'nombre':'Tickets',
			'icono' :'border_color',
			'state' :'tickets'
		}
		];
	}
	else if ($scope.user.rol_id == 2) { /*parte de pequeños salones*/
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'perfil'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline',
			'state' : 'about'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance',
			'state' : 'politicas'
		},
		{
			'nombre':'Mis Salones',
			'icono' : 'location_city',
			'state' : 'lounges_index'
		},
		{
			'nombre':'Transacciones',
			'icono' : 'swap_horiz',
			'state' : 'transacciones'
		},
		{
			'nombre':'Mis Mensajes',
			'icono' : 'question_answer',
			'state' : 'my_messages'
		},	
		{
			'nombre':'Tickets',
			'icono' :'border_color',
			'state' :'tickets'
		}	
		];
	}else if($scope.user.rol_id == 3){  /*parte de profesionales independietes*/
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'home'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline',
			'state' : 'about'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance',
			'state' : 'politicas'
		},
		{
			'nombre':'Transacciones',
			'icono' : 'swap_horiz',
			'state' : 'transacciones'
		},
		{
			'nombre':'Mis Mensajes',
			'icono' : 'question_answer',
			'state' : 'my_messages'
		},
		{
			'nombre': 'Tickets',
			'icono' : 'border_color',
			'state' : 'tickets'
		},
		{
			'nombre': 'Mis Servicios Realizados',
			'icono' : 'format_list_numbered',
			'state' : 'transacciones'
		},		
		{
			'nombre':'Boton ON/OFF',
			'icono' :'border_color',
			'state' :'tickets'
		}
		];
	}else if($scope.user.rol_id == 4){ /*parte del cliente*/
		$scope.opciones= [
		{
			'nombre':'Inicio',
			'icono' : 'home',
			'state' : 'home'
		},
		{
			'nombre':'Sobre Nosotros',
			'icono' : 'info_outline',
			'state' : 'about'
		},
		{
			'nombre':'Politicas de Uso',
			'icono' : 'account_balance',
			'state' : 'politicas'
		},
		{
			'nombre':'Transacciones',
			'icono' : 'swap_horiz',
			'state' : 'transacciones'
		},
		{
			'nombre':'Mis Mensajes',
			'icono' : 'question_answer',
			'state' : 'my_messages'
		},
		{
			'nombre': 'Mis Servicios Realizados',
			'icono' : 'format_list_numbered',
			'state' : 'home'
		},		
		{
			'nombre':'Tickets',
			'icono' :'border_color',
			'state' :'tickets'
		}
		];
	}

}])