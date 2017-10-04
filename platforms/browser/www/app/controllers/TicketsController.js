app.controller('TicketsController', ['$scope', '$state','$sessionStorage','$stateParams','$http','$filter', function($scope, $state, $sessionStorage, $stateParams, $http, $filter){
	var server_uri = $('body').attr('data-server_uri'),
        debug = $('body').attr('debug');
    $scope.server_uri = server_uri;
	

    if (!$.sessionStorage.get('user')) {
        $state.go('login');
    }





	if($state.current.name == 'tickets' || $state.current.name == 'admin_tickets'){

        console.log('En tickets');
        $scope.Usuario = $.sessionStorage.get('user');

        $http({
            method: 'GET',
            url: server_uri+'tickets',
            params: {
                id: $scope.Usuario.id
            }
        }).then(function successCallback(response) {
            console.log(response)
            for(var i=0;i<response.data.tickets.length;i++){
             response.data.tickets[i].created_at = new Date(response.data.tickets[i].created_at);

             if(response.data.tickets[i].thread)
                response.data.tickets[i].thread.created_at = new Date(response.data.tickets[i].thread.created_at);
            }

            if(response.data.tickets.length > 0)
                $scope.noTickets = true;

                ownPagination(response.data.tickets);


        }, function errorCallback(response) {
                console.log('dio error');
        });

	}





	if($state.current.name == 'ticket_send'){
	
		$scope.user = $.sessionStorage.get('user');

		$scope.btn_send_ticket = function(){

			if(!$('select[name="subject"]').val())
                Materialize.toast('Seleccione un asunto',4000);
            else if($('textarea[name="content"]').val().length == 0)
            	Materialize.toast('Escriba contenido del ticket',4000);
            else{

				form = $('form');

	            if (form.attr('ajax')=='true') {
	                $('.spinloader').remove();
	                f = form;
	                var method = 'POST';
	                var action = ''+server_uri + 'ticket';
	                var inputs = f.serialize();


	                $.ajax({
	                        url: server_uri+'tickets',
	                        type: method,
	                        dataType: 'json',
	                        data:inputs
	                })
	                .done(function(response) {
                    console.log(response);

	                    if (response.success==true) {
	                    	$state.go('tickets');
	                        Materialize.toast(response.msj, 4000);    
	                    }else
	                    	Materialize.toast(response.msj, 4000);          
               
	                })
	                .fail(function(e) {
                    console.log(e);
	                });          
	            }
	        }
		}

	}


	if($state.current.name == 'ticket_detail'  ||  $state.current.name == 'admin_ticket_detail'){

        $http({
            method: 'GET',
            url: server_uri+'tickets/'+$stateParams.id
        }).then(function successCallback(response) {
            console.log(response);
            
            if(response.data.success == true){
                $scope.ticket = response.data.ticket;
                $scope.ticket.created_at = new Date(response.data.ticket.created_at);

                if(response.data.ticket.thread)
                    $scope.ticket.thread.created_at = new Date(response.data.ticket.thread.created_at);
            }
            else
                Materialize.toast(response.data.msj, 4000);

        }, function errorCallback(response) {
            console.log('dio error');
        });
	}



	function ownPagination(data){
        $scope.currentPage = 0;
        $scope.pageSize = 1;
        $scope.q = '';
        $scope.data = data;

        $scope.getData = function () {
            if ($scope.data.length > 0) {
               	return $filter('startFrom')($scope.data, $scope.q)
            }
        }
                    
        $scope.numberOfPages=function(){
            return Math.ceil(($scope.getData().length/$scope.pageSize));                
        }
    }


    function filter(input, start) {
        console.log("mieeer");
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }




    if ($state.current.name == 'admin_ticket_detail'){

        $scope.user = $.sessionStorage.get('user');
        $scope.user_id = $.sessionStorage.get('user').id;


        $scope.sendTicketReply = function(){

            if($('textarea[name="content"]').val().length == 0)
                Materialize.toast('Escriba respuesta del ticket',4000);
            else{

                form = $('form');

                f = form;
                var method = 'post';
                var debug = f.attr('debug');
                var action = server_uri + 'tickets';
                var inputs = f.serialize();

                console.log(''+server_uri + 'ticket');

                    $.ajax({
                        url: action,
                        type: method,
                        dataType: 'json',
                        data:inputs
                    })
                    .done(function(e) {
           
                        if (e.success==true) {
                            $state.go('admin_tickets');
                            Materialize.toast(e.msj, 4000);    
                        }else
                            Materialize.toast(e.msj, 4000);
                                
               
                    })
                    .fail(function(e) {
                        if (debug=='true') {
                            console.log('Entro en fail:');
                            console.log(e);
                            console.log(e.responseText);
                        }

                    }); 

                
            }
        }

    }




}])


app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});
