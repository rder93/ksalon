app.controller('AuthController', 
	['$scope', '$state', 'ajaxService', 
	function($scope, $state, ajaxService){
	console.log('hola desde el login');
	
	var user = $.sessionStorage.get('user');

	if(user){
		if( user.rol_id == 0 ){
			$state.go('panel_usuarios');
		} else {
			$state.go($('form').attr('redirect'));
		}
		
	}


	

}])