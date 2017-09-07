app.controller('AuthController', 
	['$scope', '$state', 'ajaxService', 
	function($scope, $state, ajaxService){

	$('body').addClass('fondoBody');
	var user = $.sessionStorage.get('user');

	if(user){
		if( user.rol_id == 0 ){
			$state.go('panel_usuarios');
		} else {
			$state.go($('form').attr('redirect'));
		}
		
	}


	

}])