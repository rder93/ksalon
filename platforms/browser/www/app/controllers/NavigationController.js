app.controller('NavigationController', ['$scope', '$state', '$rootScope', '$sessionStorage','$http', function($scope, $state, $rootScope, $sessionStorage,$http){
	$('.button-collapse').sideNav({
		  menuWidth: 300,
		  edge: 'left',
		  closeOnClick: true,
		  draggable: true
		}
	);

	
	$scope.user = $.sessionStorage.get('user');

	console.log("session")
	console.log($scope.user)

	if($scope.user){
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
		

		if ($scope.user.rol_id == 0) { /*Parte del administrador*/
			console.log("no esta entrando en administrador")
			$scope.opciones= [
			{
				'nombre':'Inicio',
				'icono' : 'fa-home',
				'state' : 'home'
			},
			// {
			// 	'nombre':'Perfil',
			// 	'icono' : 'perfil',
			// 	'state' : 'home'
			// },
			{
				'nombre':'Sobre Nosotros',
				'icono' : 'fa-handshake-o',
				'state' : 'about'
			},
			{
				'nombre':'Politicas de Uso',
				'icono' : 'fa-gavel',
				'state' : 'politicas'
			},
			{
				'nombre': 'Panel de usuarios',
				'icono' : 'fa-users',
				'state' : 'panel_usuarios'
			},
			{
				'nombre': 'Panel de salones',
				'icono' : 'fa-building',
				'state' : 'panel_salones'
			},
			{
				'nombre':'Panel de servicios y categorias',
				'icono' : 'fa-paint-brush',
				'state' : 'panel_servicios_categorias'
			},
			{	'nombre':'Panel de pagos',
				'icono' : 'fa-usd',
				'state' : 'panel_pagos'
			},
			{
				'nombre':'Tickets',
				'icono' :'fa-ticket',
				'state' :'admin_tickets'
			}
		
			];
		}else if ($scope.user.rol_id == 1) { /*Parte de grandes salones*/
			$scope.opciones= [
			{
				'nombre':'Perfil',
				'icono' : 'fa-user-circle',
				'state' : 'perfil'
			},
			{
				'nombre':'Sobre Nosotros',
				'icono' : 'fa-handshake-o',
				'state' : 'about'
			},
			{
				'nombre':'Politicas de Uso',
				'icono' : 'fa-gavel',
				'state' : 'politicas'
			},
			{
				'nombre':'Mis Salones',
				'icono' : 'fa-building',
				'state' : 'lounges_index'
			},
			{
				'nombre':'Transacciones',
				'icono' : 'fa-shopping-cart',
				'state' : 'transacciones'
			},
			{
				'nombre':'Mis Mensajes',
				'icono' : 'fa-envelope-open',
				'state' : 'my_messages'
			},	
			{
				'nombre':'Tickets',
				'icono' :'fa-ticket',
				'state' :'tickets'
			}
			];
		}
		else if ($scope.user.rol_id == 2) { /*parte de pequeños salones*/
			$scope.opciones= [
			{
				'nombre':'Perfil',
				'icono' : 'fa-user-circle',
				'state' : 'perfil'
			},
			{
				'nombre':'Sobre Nosotros',
				'icono' : 'fa-handshake-o',
				'state' : 'about'
			},
			{
				'nombre':'Politicas de Uso',
				'icono' : 'fa-gavel',
				'state' : 'politicas'
			},
			{
				'nombre':'Mis Salones',
				'icono' : 'fa-building',
				'state' : 'lounges_index'
			},
			{
				'nombre':'Transacciones',
				'icono' : 'fa-shopping-cart',
				'state' : 'transacciones'
			},
			{
				'nombre':'Mis Mensajes',
				'icono' : 'fa-envelope-open',
				'state' : 'my_messages'
			},	
			{
				'nombre':'Tickets',
				'icono' :'fa-ticket',
				'state' :'tickets'
			}	
			];
		}else if($scope.user.rol_id == 3){  /*parte de profesionales independietes*/
			$scope.opciones= [
			{
				'nombre':'Inicio',
				'icono' : 'fa-home',
				'state' : 'home'
			},
			{
				'nombre':'Perfil',
				'icono' : 'fa-user-circle',
				'state' : 'perfil'
			},
			{
				'nombre':'Sobre Nosotros',
				'icono' : 'fa-handshake-o',
				'state' : 'about'
			},
			{
				'nombre':'Politicas de Uso',
				'icono' : 'fa-gavel',
				'state' : 'politicas'
			},
			{
				'nombre':'Transacciones',
				'icono' : 'fa-shopping-cart',
				'state' : 'transacciones'
			},
			{
				'nombre':'Mis Mensajes',
				'icono' : 'fa-envelope-open',
				'state' : 'my_messages'
			},
			{
				'nombre': 'Tickets',
				'icono' : 'fa-ticket',
				'state' : 'tickets'
			},	
			// {
			// 	'nombre':'Boton ON/OFF',
			// 	'icono' :'border_color',
			// 	'state' :'tickets'
			// }
			];
		}else if($scope.user.rol_id == 4){ /*parte del cliente*/
			$scope.opciones= [
			{
				'nombre':'Inicio',
				'icono' : 'fa-home',
				'state' : 'home'
			},
			{
				'nombre':'Perfil',
				'icono' : 'fa-user-circle',
				'state' : 'perfil'
			},
			{
				'nombre':'Sobre Nosotros',
				'icono' : 'fa-handshake-o',
				'state' : 'about'
			},
			{
				'nombre':'Politicas de Uso',
				'icono' : 'fa-gavel',
				'state' : 'politicas'
			},
			{
				'nombre':'Transacciones',
				'icono' : 'fa-shopping-cart',
				'state' : 'transacciones'
			},
			{
				'nombre':'Mis Mensajes',
				'icono' : 'fa-envelope-open',
				'state' : 'my_messages'
			},	
			{
				'nombre':'Tickets',
				'icono' :'fa-ticket',
				'state' :'tickets'
			}
			];
		}
	}

}])