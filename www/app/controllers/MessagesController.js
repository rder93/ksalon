app.controller('MessagesController', ['$scope', '$state',  '$rootScope', '$stateParams', '$sessionStorage', function($scope, $state, $rootScope, $stateParams, $sessionStorage){
	var server_uri = $('body').attr('data-server_uri');
	$scope.server_uri = server_uri;

	
	if (!$.sessionStorage.get('user')) {
		$state.go('login');
	}


	if ($state.current.name == 'my_messages'){
		
		$.ajax({
				url: server_uri+'/user/'+$.sessionStorage.get('user').id+'/messages',
				type: 'get',
				dataType: 'json',
				data: {},
		})
		.done(function(e) {			
				console.log(e)

				if(e.success == true){
					
	                $scope.conversations = getConversations(e.messages);

                    if($scope.conversations.length == 0)
                        $scope.no_messages = true;

	                $scope.user_id         = e.user_data.id;
	                $scope.$apply();

	            }

                console.log($scope)
		})
		.fail(function(e) {
				if (debug=='true') {
					console.log('Response (fail): ');
					console.log(e);
				}

				loaderAnimation(false);
		});

		function getConversations(messages){
            var convers = [];

            for(i=0; i<messages.length; i++){
                if (checkUserConversations(messages[i], convers, i) == 0){
                    convers.push(messages[i]);
                }
            }

            return getConversationsLastMessage(convers, messages);
        }


        function checkUserConversations(message, convers, index){
            var i;

            if(message.user_id == $.sessionStorage.get('user').id ){
                //el mensaje lo envio yo
                for(i=0; i<convers.length; i++){
                    if (convers[i].user_to_id == message.user_to_id){
                        if( convers[i].transaction_id == message.transaction_id )
                            return 1;
                    }
                    if (convers[i].user_id == message.user_to_id){
                        if( convers[i].transaction_id == message.transaction_id )
                            return 1;
                    }
                }
            }
            else if(message.user_to_id == $.sessionStorage.get('user').id)
            {
                    //el mensaje lo recibo yo
                for(i=0; i<convers.length; i++){
                    if (convers[i].user_id == message.user_id){
                        if( convers[i].transaction_id == message.transaction_id )
                            return 1;
                        }                    
                    if (convers[i].user_to_id == message.user_id){
                        if( convers[i].transaction_id == message.transaction_id )
                            return 1;
                    }
                }             
            }
            return 0;
        }


        function getConversationsLastMessage(convers, messages){

            messages.sort(function(a,b){
                return new Date(b.created_at) - new Date(a.created_at);
            })

            for(var i=0; i< convers.length; i++){
                for(var j=0; j<messages.length; j++){
                    if(   ( convers[i].user_id == messages[j].user_id &&  convers[i].user_to_id == messages[j].user_to_id  && convers[i].transaction_id == messages[j].transaction_id) ||  (  convers[i].user_id == messages[j].user_to_id &&  convers[i].user_to_id == messages[j].user_id   && convers[i].transaction_id == messages[j].transaction_id)    ){
                        item = {}
                        item["last_message"] = messages[j];
                        convers[i].lastMessage = messages[j];
                        convers[i].lastMessage.created_at = new Date(convers[i].lastMessage.created_at);
                        break;
                    }
                }
            }

            console.log(convers);

            convers.sort(function(a,b){
                return new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at);
            })

            return convers;
        }
        // function getConversationsLastMessage(convers, messages){

        //     messages.sort(function(a,b){
        //         return new Date(b.created_at) - new Date(a.created_at);
        //     })

        //     for(var i=0; i< convers.length; i++){
        //         for(var j=0; j<messages.length; j++){
        //             if(   ( convers[i].user_id == messages[j].user_id &&  convers[i].user_to_id == messages[j].user_to_id ) ||  (  convers[i].user_id == messages[j].user_to_id &&  convers[i].user_to_id == messages[j].user_id  )    ){
        //                 item = {}
        //                 item["last_message"] = messages[j];
        //                 convers[i].lastMessage = messages[j];
        //                 convers[i].lastMessage.created_at = new Date(convers[i].lastMessage.created_at);
        //                 break;
        //             }
        //         }
        //     }

        //     convers.sort(function(a,b){
        //         return new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at);
        //     })

        //     return convers;
        // }

	}




	// if($state.current.name == "chat"){

	// 	$.ajax({
	// 			url: server_uri+'/user/'+$.sessionStorage.get('user').id+'/messages/'+$stateParams.id,
	// 			type: 'get',
	// 			dataType: 'json',
	// 			data: {},
	// 	})
	// 	.done(function(e) {			
	// 			console.log(e)

	// 			if(e.success == true){
	// 				$scope.user_id = $.sessionStorage.get('user').id;
	// 				$scope.user_to = e.user_to_data;
	// 				$scope.$apply();
	//                 loadMessages(e.messages);
	//             }
	// 	})
	// 	.fail(function(e) {
	// 			if (debug=='true') {
	// 				console.log('Response (fail): ');
	// 				console.log(e);
	// 			}

	// 			loaderAnimation(false);
	// 	});


	// 	function loadMessages(messages){
 //            var i, content='';
 
 //            for(i=0; i<messages.length; i++){
 //                if( messages[i].user_id == $.sessionStorage.get('user').id){

 //                	content+= '<div class="message right">';
	// 	            content+= '	<img src="../../../assets/core/images/no_avatar.jpg" />';
	// 	            content+= '    <div class="bubble">';
	// 	            content+= 		''+messages[i].message+'';
	// 	            content+= '        <div class="corner"></div>';
	// 	            content+= '        <span>'+getDatesDifference(messages[i].created_at)+'</span>';
	// 	            content+= '    </div>';
	// 	            content+= '</div>';
 //                }else{
 	
 // 					content+= '<div class="message">';
	// 	            content+= '	<img src="../../../assets/core/images/no_avatar.jpg" />';
	// 	            content+= '    <div class="bubble">';
	// 	            content+= 		''+messages[i].message+'';
	// 	            content+= '        <div class="corner"></div>';
	// 	            content+= '        <span>'+getDatesDifference(messages[i].created_at)+'</span>';
	// 	            content+= '    </div>';
	// 	            content+= '</div>';

 //                }
                    
 //            }

 //            $('#chat-messages').append(content);
   
 //            var $cont = $('#chat-messages');
 //            $cont[0].scrollTop = $cont[0].scrollHeight;

 //        }

 //        function getDatesDifference(a){
 //        	var _MS_PER_DAY = 1000 * 60 * 60 * 24, 
 //        		messageDate = new Date(a),
 //        		actualDate = new Date(),
 //        		monthNames = [
	// 			    "Enero", "Febrero", "Marzo",
	// 			    "Abril", "Mayo", "Junio", "Julio",
	// 			    "Agosto", "Septiembre", "Octubre",
	// 			    "Noviembre", "Deciembre"
	// 			  ];

	// 			var diffMs = (messageDate - actualDate); // milliseconds between now & Christmas
	// 			var diffDays = (-1 * Math.floor(diffMs / 86400000) ) - 1; // days
	// 			var diffHrs  = (-1 * Math.floor((diffMs % 86400000) / 3600000) ) - 1; // hours
	// 			var diffMins =  -1 * Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

	// 		if(diffDays==0){
	// 			if(diffHrs==0){
	// 				return diffMins+' min';
	// 			}else{
	// 				return diffHrs+' horas';
	// 			}
	// 		}else if(diffDays==1){
	// 			return "Ayer";
	// 		}else{
	// 			return  messageDate.getDate()+' '+monthNames[actualDate.getMonth()];
	// 		}

 //        }

 //        $('#btn-message').click(function(){
 //            var message =  $('#message-text').val();

 //            if( message != ''){       

 //                form = $('form');

 //                if (form.attr('ajax')=='true') {
 //                    $('.spinloader').remove();
 //                    f = form;
 //                    var method = f.attr('method');
 //                    var debug = f.attr('debug');
 //                    var action = server_uri + f.attr('action');
 //                    var inputs = f.serialize();
 //                    $.ajax({
 //                        url: action,
 //                        type: method,
 //                        dataType: 'json',
 //                        data:inputs,
 //                        cache: false,
 //                        contentType: false,
 //                        processData: false
 //                    })
 //                    .done(function(e) {
 //                        if (debug=='true') {
 //                            console.log('Entro en success:');
 //                            console.log(e);
 //                            $('#message-text').val('');
 //                        }

 //                        if (e.success=='false' || e.success==false) {
 //                            Materialize.toast(e.msj, 4000);    
 //                        } else {
 //                            if (e.route == 'message') {
 //                                Materialize.toast(e.msj, 4000);   
 //                                // $('#messages-wrap').empty();
 //                                loadNewMessage(e.message);
 //                            } 
 //                            else {
 //                                Materialize.toast(e.msj, 4000);   
 //                            }
                            
 //                        }

 //                        $('.spinloader').fadeOut(500);                    
 //                    })
 //                    .fail(function(e) {
 //                        console.log(inputs);
 //                        if (debug=='true') {
 //                            console.log('Entro en fail:');
 //                            console.log(e);
 //                            console.log(e.responseText);
 //                        }

 //                        $('.spinloader').fadeOut(500);
                        
 //                    });          
 //                }
 //            }
 //        })

	// 	function loadNewMessage(message){
 //            var content='';

 //            content+= '<div class="message right">';
	// 	    content+= '	<img src="../../../assets/core/images/no_avatar.jpg" />';
	// 	    content+= '    <div class="bubble">';
	// 	    content+= 		''+message+'';
	// 	    content+= '        <div class="corner"></div>';
	// 	    content+= '        <span>Ahora</span>';
	// 	    content+= '    </div>';
	// 	    content+= '</div>';

 //            $('#chat-messages').append(content);

 //            var $cont = $('#chat-messages');
 //            $cont[0].scrollTop = $cont[0].scrollHeight;
 //        }
	// }










    if($state.current.name == 'user_message'){
             
            var url = '/user/'+$.sessionStorage.get('user').id+'/seller/'+$stateParams.id+'/messages/'+$stateParams.transaction_id;

            $.ajax({
                url: server_uri+url,
                type: 'GET',
                data: {},
            })
            .done(function(data) {
                    console.log(data);

                if(data.success == true){
                    $scope.user_to = data.user_to;
                    $scope.messages = data.messages;
                    $scope.user = $.sessionStorage.get('user');
                    $scope.user_id = $.sessionStorage.get('user').id;
                    $scope.transaction_id = $stateParams.transaction_id;
                    $scope.available = availableSend(data.transaction_data);
                    $scope.$apply();

                    loadMessages(data.messages, data.user_to);

                    // document.getElementById("btn-message").addEventListener("click", sendMessage);
                }

            })
            .fail(function(r) {
                    console.log(r);
            })
            .always(function() {
                    console.log("complete");
            });


        function availableSend(transaction){
            var repeats=0;

            if(transaction.reviews.length<2)
                return 1;
            else{
                for(var i=0; i<transaction.reviews.length;i++){
                    if( transaction.reviews[i].user_id== $.sessionStorage.get('user').id )
                        repeats++;
                    if(transaction.reviews[i].user_to_id== $.sessionStorage.get('user').id)
                        repeats++;
                }
                if(repeats==2)
                    return 0;
            }

            return 1;
        }



        

        $scope.sendMessage = function(){
            var message =  $('#message-text').val();

            if( message != ''){       

                form = $('form');

                if (form.attr('ajax')=='true') {
                    $('.spinloader').remove();
                    f = form;
                    var method = f.attr('method');
                    var debug = f.attr('debug');
                    var action = $('body').attr('data-server_uri') + f.attr('action');
                    var inputs = f.serialize();
                    $.ajax({
                        url: action,
                        type: method,
                        dataType: 'json',
                        data:inputs,
                        cache: false,
                        contentType: false,
                        processData: false
                    })
                    .done(function(e) {
                        if (debug=='true') {
                            console.log('Entro en success:');
                            console.log(e);
                            $('#message-text').val('');
                        }

                        if (e.success=='false' || e.success==false) {
                            Materialize.toast(e.msj, 4000);    
                        } else {
                            if (e.route == 'message') {
                                Materialize.toast(e.msj, 4000);   
                                // $('#messages-wrap').empty();
                                loadNewMessage(e.message);
                            } 
                            else {
                                Materialize.toast(e.msj, 4000);   
                            }
                            
                        }

                        $('.spinloader').fadeOut(500);                    
                    })
                    .fail(function(e) {
                        console.log(inputs);
                        if (debug=='true') {
                            console.log('Entro en fail:');
                            console.log(e);
                            console.log(e.responseText);
                        }

                        $('.spinloader').fadeOut(500);
                        
                    });          
                }
            }
        }


        function getDatesDifference(a){
            var _MS_PER_DAY = 1000 * 60 * 60 * 24, 
                messageDate = new Date(a),
                actualDate = new Date(),
                monthNames = [
                    "Enero", "Febrero", "Marzo",
                    "Abril", "Mayo", "Junio", "Julio",
                    "Agosto", "Septiembre", "Octubre",
                    "Noviembre", "Deciembre"
                  ];

                var diffMs = (messageDate - actualDate); // milliseconds between now & Christmas
                var diffDays = (-1 * Math.floor(diffMs / 86400000) ) - 1; // days
                var diffHrs  = (-1 * Math.floor((diffMs % 86400000) / 3600000) ) - 1; // hours
                var diffMins =  -1 * Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

            if(diffDays==0){
                if(diffHrs==0){
                    return diffMins+' min';
                }else{
                    return diffHrs+' horas';
                }
            }else if(diffDays==1){
                return "Ayer";
            }else{
                return  messageDate.getDate()+' '+monthNames[actualDate.getMonth()];
            }

        }
        

        function loadMessages(messages, user_to){
            var i, content='';
 
            for(i=0; i<messages.length; i++){
                if( messages[i].user_id == $.sessionStorage.get('user').id){
                    content+= '<div class="message right">';
                    content+= ' <img src="./assets/core/images/no_avatar.jpg" />';
                    content+= '    <div class="bubble">';
                    content+=       ''+messages[i].message+'';
                    content+= '        <div class="corner"></div>';
                    content+= '        <span>'+getDatesDifference(messages[i].created_at)+'</span>';
                    content+= '    </div>';
                    content+= '</div>';
                }else{
                    content+= '<div class="message">';
                    content+= ' <img src="./assets/core/images/no_avatar.jpg" />';
                    content+= '    <div class="bubble">';
                    content+=       ''+messages[i].message+'';
                    content+= '        <div class="corner"></div>';
                    content+= '        <span>'+getDatesDifference(messages[i].created_at)+'</span>';
                    content+= '    </div>';
                    content+= '</div>';
                }
                    
            }

            $('#chat-messages').append(content);
            var $cont = $('#chat-messages');
            $cont[0].scrollTop = $cont[0].scrollHeight;

        }


        function loadNewMessage(message){
            var content='';

            content+= '<div class="message right">';
            content+= ' <img src="./assets/core/images/no_avatar.jpg" />';
            content+= '    <div class="bubble">';
            content+=       ''+message+'';
            content+= '        <div class="corner"></div>';
            content+= '        <span>Ahora</span>';
            content+= '    </div>';
            content+= '</div>';

            $('#chat-messages').append(content);

            var $cont = $('#chat-messages');
            $cont[0].scrollTop = $cont[0].scrollHeight;
        }


    }

}]) 