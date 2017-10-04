app.controller('ClienteController', ['$scope', '$state','$stateParams', '$sessionStorage', '$http','$timeout', function($scope, $state, $stateParams, $sessionStorage, $http, $timeout){

	var server_uri = $('body').attr('data-server_uri'),
	debug = $('body').attr('debug');
	$scope.factura={};
	$scope.server_uri = server_uri;
	$('.modal').modal();
	function contarFactura(object){
		$scope.factura.total=0;
		$scope.factura.comision=0;
		$scope.factura.valor=0;
		angular.forEach(object, function(value, key){
					// $scope.factura.total+=object.precio;
					$scope.factura.total+=value.precio;
				});
		$scope.factura.comision=$scope.factura.total*0.025;
		$scope.factura.valor=$scope.factura.total-($scope.factura.total*0.025);
		// console.log($scope.factura);
	}

	if($state.current.name == 'cliente_servicio_categorias'){
		if(debug == 'true'){

			$http.get(server_uri+'services')
			.then(function successCallback(response) {
				$scope.servicios = response.data;
				console.log($scope.servicios);		        
			}, function errorCallback(error) {
				console.log('error al obtener las categorias')
			});


			$scope.buscar_categorias = function(){
				var form = $('form');
				var inputs = form.serializeArray();

				$.sessionStorage.set('servicios', inputs);

				$state.go('cliente_servicios_publicados',{
					categoria_id: $stateParams.id,
					// servicios: inputs
				})

			}
		}
	}

	if($state.current.name == 'cliente_servicios_publicados'){
		if(debug == 'true'){
			
			$scope.urlFoto = $('body').attr('data-fotos_uri');

			$scope.goBack = function() {
				$state.go('cliente_servicio_categorias',{
					id: $stateParams.categoria_id
				})
			}

			$scope.goPreview=function(categoria_id, peluqueria, servicios){

				$.sessionStorage.set('peluqueria', peluqueria);
				// $.sessionStorage.set('servicios', servicios);
				$state.go('cliente_servicio_preview');
			}

			$scope.categoria_id = $stateParams.categoria_id;
			// categoria_id = $stateParams.categoria_id;

			var actualLatLng = new google.maps.LatLng($.sessionStorage.get('user').latitud, $.sessionStorage.get('user').longitud);

			console.log($.sessionStorage.get('user'))

	        var markers = [];
	        map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: actualLatLng.lat(), lng: actualLatLng.lng()},
	          zoom: 12,
	          gestureHandling: 'cooperative'
	        });


			// var markers = [];
			// map = new google.maps.Map(document.getElementById('map'), {
			// 	center: {lat: 8.284305, lng: -62.754250 },
			// 	zoom: 12,
			// 	gestureHandling: 'cooperative'
			// });

			ruta = '';
			switch($scope.categoria_id) {
				case '3':
				ruta = 'buscar_independents_services';
				break;
				default:
				ruta = 'buscar_lounges_services/'+$scope.categoria_id;
				break;
			}

			console.log('la ruta es: '+ ruta);

			$scope.servicios = $.sessionStorage.get('servicios');

			var services = [];
			for (var i = 0; i < $scope.servicios.length ; i++) {
				services += 'servicios[]='+$scope.servicios[i].value+'&';
			}

			$http({
				method: 'GET',
				url: server_uri+ruta+"?"+services
			}).then(function successCallback(response) {

				$scope.peluquerias = response.data;
				getLatLng($scope.peluquerias, $stateParams.servicios, $stateParams.categoria_id);

				if($scope.peluquerias.length == 0){
					Materialize.toast('No se encontraron resultados', 4000);
				}

			}, function errorCallback(error) {
				console.log('PASO UN ERROR!!!!!!!!!');
			});

		}
		
	}



	if($state.current.name == "cliente_servicio_preview"){
		if(debug == 'true'){

			// $scope.carrito=$.sessionStorage.get('carrito');

			// $scope.carrito=[];


			$.sessionStorage.set('cliente_salon', true);
			$scope.pel= $.sessionStorage.get('peluqueria');
			$scope.urlFoto = $('body').attr('data-fotos_uri');	
			$scope.perfil={};

			if(!$.sessionStorage.get('factura'))
				$scope.factura = {};
			if(!$.sessionStorage.get('peluqueria'))
				$scope.carrito = [];

			$timeout(function(){
				$('.slider').slider({
					height: 400,
					transition: 800
				});
			});
			$scope.servs=[];
			angular.forEach($.sessionStorage.get('peluqueria'), function(value, key){
				// console.log(value);
				$scope.servs.push({'id':value.id ,'descripcion': value.nombre_servicio, 'precio':value.precio, 'tipo': 'servicio', 'type': 1,'foto':value.foto, 'descripcion_servicio':value.descripcion_servicio});
				// serv.push={}
			});
			


			$http({
				method: 'GET',
				url: server_uri+'users/'+$scope.pel[0].id_usuario,
			}).then(function successCallback(response) {

				console.log("response server");
				console.log(response.data)
				console.log($.sessionStorage.get('peluqueria'));
				$scope.publishBy = $.sessionStorage.get('peluqueria');

				$scope.usuario=response.data.user_data;
				if ($.sessionStorage.get('user_to_id')!=$scope.usuario.id) {
					// console.log('el usuario es diferente')
					$scope.factura={};
					$scope.carrito=[];
				}else
				// console.log('el usuario es el mismo');
				// console.log($.sessionStorage.get('user_to_id'));
				$.sessionStorage.set('user_to_id', $scope.usuario.id);
				$scope.factura.user_to_id=$scope.usuario.id;
				$scope.factura.user_id=$.sessionStorage.get('user').id;
				if($scope.usuario.rol_id==1 || $scope.usuario.rol_id==2)
					$scope.estado=false;
				else
					$scope.estado=true;
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$scope.agregarCarrito=function(object){
				object.tipo='servicio';

				ob={'id':object.id,'descripcion': object.descripcion, 'precio':object.precio, 'tipo': 'servicio', 'type': 1};

				$scope.carrito.push(ob);
				$('#carrito'+object.id).addClass('hide');
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
			};
			
			$scope.modalCarrito=function(){
				$timeout(function(){
					$('#modalCarrito').modal('open');
				});
			};

			$scope.modalPagar=function(){
				$('#modalPagar').modal('open');	
			};

			$scope.eliminarServicioCarrito=function(id){
				// console.log(id);
				var indice=0;
				for (var i = $scope.carrito.length - 1; i >= 0; i--) {
					if ($scope.carrito[i].id==id) {
						indice=i;
					}
				}
				// console.log(indice);
				$scope.carrito.splice(indice,1);
				console.log(id);
				$('#carrito'+id).removeClass('hide');
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);
			};

			$scope.pagoEfectivo=function(){

				$('#modalConfirmCash').modal('open');

				$scope.confirmPayCash = function(){
					var o=[];
					o.push($scope.factura);
					o.push($scope.carrito);

					var transaction_services = [], transaction_combos = [];

					for(var i=0; i < $scope.carrito.length > 0; i++){
						if($scope.carrito[i].type == 1){
							transaction_services.push($scope.carrito[i]);
						}else{
							transaction_combos.push($scope.carrito[i]);
						}
					}

					o.push( JSON.stringify(transaction_services) );
					o.push( JSON.stringify(transaction_combos) );


					if($scope.carrito.length > 0){
						$http({
							method: 'POST',
							url: server_uri+'transactions',
							data:o
						}).then(function successCallback(response) {
							Materialize.toast(response.data.msj, 4000);
							console.log(response.data);
							// $state.go('perfil');


							$state.go('transaction_success',{
		                        factura: $scope.factura,
		                        carrito: $scope.carrito,
		                        servicios: transaction_services,
		                        combos: transaction_combos
		                    });



						}, function errorCallback(response) {
							Materialize.toast('Intenta mas tarde', 4000);
							// $state.reload();
						});
					}
				}

			};



			$scope.payPaypal = function(){

	            const url = server_uri+'checkout-paypal';
	            var     win = window.open( url, "_blank", "enableViewportScale=yes,toolbar=no");

	            var user_id    = $scope.factura.user_id;
	            var user_to_id = $scope.factura.user_to_id;
	            var total      = $scope.factura.total;
	            var comision   = $scope.factura.comision;
	            var valor      = $scope.factura.valor;


	            var transaction_services = [], transaction_combos = [];

				for(var i=0; i < $scope.carrito.length > 0; i++){

					if($scope.carrito[i].type == 1){
						transaction_services.push($scope.carrito[i]);
					}else{
						transaction_combos.push($scope.carrito[i]);
					}
				}
				
				// var servicios, combos;

				// if(transaction_services.length > 0){
				// 	servicios = encodeURIComponent( angular.toJson(transaction_services) );
				// }else{
				// 	item = {}
				// 	transaction_services.push(item);
				// 	servicios = encodeURIComponent( JSON.stringify(transaction_services) );
				// }

				// if(transaction_combos.length > 0){
				// 	combos = encodeURIComponent( angular.toJson(transaction_combos) );
				// }else{
				// 	item = {}
				// 	transaction_combos.push(item);
				// 	combos = encodeURIComponent( JSON.stringify(transaction_combos) );
				// }

				var servicios = encodeURIComponent( angular.toJson(transaction_services) );
				var combos = encodeURIComponent( angular.toJson(transaction_combos) );
				// var servicios = JSON.stringify(transaction_services);
				// var combos = JSON.stringify(transaction_combos);

	            var transaction_divisa = 'USD';


	            win.addEventListener( "loadstop", function(event) {

	                win.executeScript({ code:  

	                    'document.getElementById("user_id").value = "'+user_id+'";'+
	                    'document.getElementById("user_to_id").value = "'+user_to_id+'";'+
	                    'document.getElementById("total").value = "'+total+'";'+
	                    'document.getElementById("comision").value = "'+comision+'";'+
	                    'document.getElementById("valor").value = "'+valor+'";'+

	                    'document.getElementById("servicios").value = "'+servicios+'";'+
	                    'document.getElementById("combos").value = "'+combos+'";'+

	                    'document.getElementById("transaction_divisa").value = "'+transaction_divisa+'";'

	                });

	                const url_thanks = server_uri+'checkout-paypal/thanks';
	                const url_cancel = server_uri+'checkout-paypal/cancel';


	                if (event.url == url_thanks) {
	                    win.close();
	                    Materialize.toast('Transaccion realizada exitosamente',4000);

	                    $state.go('transaction_success',{
	                        factura: $scope.factura,
	                        carrito: $scope.carrito
	                    });

	                    // sessionStorage.setItem('transaction_status', 1);
	                    // location.reload();
	                }

	                if (event.url == url_cancel) {
	                    win.close();
	                    Materialize.toast('Ocurrio un error al realizar la transaccion',4000);
	                    // sessionStorage.setItem('transaction_status', 0);
	                    // location.reload();
	                }

	                

	            });

	        }



	        $scope.bookThis = function(object){
	        	object.tipo='servicio';

				ob={'id':object.id,'descripcion': object.descripcion, 'precio':object.precio, 'tipo': 'servicio', 'type': 1};

				$scope.carrito.push(ob);
				$('#carrito'+object.id).addClass('hide');
				contarFactura($scope.carrito);
				$.sessionStorage.set('carrito', $scope.carrito);



				$state.go('cliente_payments_methods',{
					carrito: $scope.carrito,
					factura: $scope.factura
				})

	        }

		}
	}




	if($state.current.name == 'cliente_pago'){
		if(debug == 'true')
			console.log('en categorias siendo cliente');

		console.log('ESTOY EN LA VISTA DE PAGOS');
		console.log($stateParams);

		$scope.goBack = function() {
        	$state.go('cliente_servicio_preview',{
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

	}

	if($state.current.name == 'cliente_vendedor_perfil'){
		console.log('ESTOY EN EL PERFIL DEL VENDEDOR');
		console.log($stateParams);

		$scope.goBack = function() {
        	$state.go('cliente_servicio_preview',{
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

        $http({
            method: 'GET',
            url: server_uri+'all_lounge/'+$stateParams.id
        }).then(function successCallback(response) {
        	console.log('server response');
        	console.log(response.data);
            $scope.peluqueria = response.data.lounge;
            $scope.servicios = response.data.services;
            $scope.fotos = response.data.photos;
            $scope.comentarios = response.data.comments;
            $scope.url=$('body').attr('data-fotos_uri');

            $.sessionStorage.set('cliente_salon', true);
            $timeout(function(){
				$('.slider').slider();		
			 });

        }, function errorCallback(error) {
        	console.log('PASO UN ERROR');
        });

/*
			$('.starrr').starrr({
                rating: $scope.peluqueria.estrellas,
                readOnly: true,
                max: $scope.peluqueria.estrellas
            })
*/
	}

	if($state.current.name == 'cliente_independiente_perfil'){
		if(debug == 'true'){
			console.log('hola');
		}
	}


	if($state.current.name == 'cliente_vendedor_profesionales'){
		$scope.urlFoto = $('body').attr('data-fotos_uri');
		$scope.pel = $.sessionStorage.get('peluqueria');
		$scope.profesionales = null;
		
		$http({
			method: 'GET',
			url: server_uri+'professionals/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.profesionales=response.data;

			// console.log("response seerver");
			// console.log(response.data)

			$scope.initCarousel();
	
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});



		// $scope.showDetailsBtn = function(id){
		// 	if($('#product-card-'+id).hasClass( "animate" ) == false){
		// 		$('#product-card-'+id).addClass('animate');
  //       		$('div#carouselNext-'+id+', div#carouselPrev-'+id).addClass('visible');   
		// 	}else{
		// 		$('#product-card-'+id).removeClass('animate');     
  //       		$('div#carouselNext-'+id+', div#carouselPrev-'+id).removeClass('visible');
		// 	}
		// }

		$scope.startAnimation = function(id){
			$('div#carouselNext-'+id+', div#carouselPrev-'+id).removeClass('visible');

		      $('#product-card-'+id).addClass('flip-10');

		      setTimeout(function(){
		        $('#product-card-'+id).removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
		          $('#product-front-'+id+', #product-front-'+id+' div.shadow').hide();      
		        });
		      }, 50);
		      
		      setTimeout(function(){
		        $('#product-card-'+id).removeClass('flip90').addClass('flip190');
		        $('#product-back-'+id).show().find('div.shadow').show().fadeTo( 90 , 0);
		        setTimeout(function(){        
		          $('#product-card-'+id).removeClass('flip190').addClass('flip180').find('div.shadow').hide();            
		          setTimeout(function(){
		            $('#product-card-'+id).css('transition', '100ms ease-out');     
		            $('#cx-'+id+', #cy-'+id).addClass('s1');
		            setTimeout(function(){$('#cx-'+id+', #cy-'+id).addClass('s2');}, 100);
		            setTimeout(function(){$('#cx-'+id+', #cy-'+id).addClass('s3');}, 200);       
		            $('div#carouselNext-'+id+', div#carouselPrev-'+id).addClass('visible');        
		          }, 100);
		        }, 100);      
		      }, 150); 
		}


		$scope.flipBackBtn = function(id){
			$('#product-card-'+id).removeClass('flip180').addClass('flip190');
		      setTimeout(function(){
		        $('#product-card-'+id).removeClass('flip190').addClass('flip90');
		    
		        $('#product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
		          $('#product-back-'+id+', #product-back-'+id+' div.shadow').hide();
		          $('#product-front-'+id+', #product-front-'+id+' div.shadow').show();
		        });
		      }, 50);
		      
		      setTimeout(function(){
		        $('#product-card-'+id).removeClass('flip90').addClass('flip-10');
		        $('#product-front-'+id+' div.shadow').show().fadeTo( 100 , 0);
		        setTimeout(function(){            
		          $('#product-front-'+id+' div.shadow').hide();
		          $('#product-card-'+id).removeClass('flip-10').css('transition', '100ms ease-out');    
		          $('#cx, #cy').removeClass('s1 s2 s3');      
		        }, 100);      
		      }, 150); 
		}

		var carouselWidthVector = [];
		var isAnimatingVector = [];
		var carouselSlideWidth = 335;
		
    	$scope.initCarousel = function(){
    		var profes = $.map($scope.profesionales, function(value, index) {
			    return [value];
			});

    		for(i=0; i<profes.length; i++){

	    		var id = profes[i].id;
	    		var carousel = $('#carousel-'+id+' ul');
	    		
	    		var carouselWidth = 0;  
	    		isAnimatingVector[i] = false;

		    	$('#carousel-'+id+' li').each(function(){
			      carouselWidth += carouselSlideWidth;
			      
			    });
			    carouselWidthVector[i] = carouselWidth;
			    $(carousel).css('width', carouselWidth);
			}

			// console.log(carouselWidthVector)
			// console.log(isAnimatingVector)
    	}


		$scope.nextImage = function(id){
			var carousel = $('#carousel-'+id+' ul');

			var currentLeft = Math.abs(parseInt($(carousel).css("left")));
		    var newLeft = currentLeft + carouselSlideWidth;
		    if(newLeft == carouselWidthVector[id] || isAnimatingVector[id] === true){return;}
		    else{
		    	// console.log("Ok no son lo mismo lo del if")
		    	// console.log(newLeft)
		    	// console.log(carouselWidthVector[id])
		    	// console.log(isAnimatingVector[id])
		    }
		    $('#carousel-'+id+' ul').css({'left': "-" + newLeft + "px",
		        "transition": "300ms ease-out"
		    });
		    isAnimatingVector[id] = true;
		    setTimeout(function(){isAnimatingVector[id] = false;}, 300); 
		}

		$scope.prevImage = function(id){

			var carousel = $('#carousel-'+id+' ul');

			var currentLeft = Math.abs(parseInt($(carousel).css("left")));
      		var newLeft = currentLeft - carouselWidthVector[id];
      		if(newLeft < 0  || isAnimatingVector[id] === true){return;}
      		$('#carousel-'+id+' ul').css({'left': "-" + newLeft + "px",
                   "transition": "300ms ease-out"
                 });
        	isAnimatingVector[id] = true;
      		setTimeout(function(){isAnimatingVector[id] = false;}, 300); 
		}

	}



	if($state.current.name == 'cliente_vendedor_profesional'){
		$scope.urlFoto = $('body').attr('data-fotos_uri');
		$scope.pel = $.sessionStorage.get('peluqueria');
		$scope.profesional = null;


		$.ajax({
				url: server_uri+'lounge/profesional/'+$stateParams.id,
				type: 'get',
				dataType: 'json',
				data: {},
		})
		.done(function(response){

			if(response.status == 200){
				if(response.profesional){
					$scope.profesional = response.profesional;
				}
	        }else{
	        	Materialize.toast(response.msj, 4000);
	        }

	        console.log("profesional info from server")
	        console.log($scope.profesional)
		})
		.fail(function(e) {
			console.log("Error");

		});
	}




	if($state.current.name == 'cliente_vendedor_opciones'){
		$scope.pel = $.sessionStorage.get('peluqueria');
	}




	if($state.current.name == 'cliente_vendedor_productos'){

		$scope.pel = $.sessionStorage.get('peluqueria');
		$('.modal').modal();

		$http({
			method: 'GET',
			url: server_uri+'products/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.Productos=response.data;

			$scope.urlFoto = $('body').attr('data-fotos_uri');
			ownPagination(response.data);
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
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

		$scope.modalVerProducto = function(prod, id){
			$scope.prod = prod;
			$scope.id_producto= id;
			$('#modalVerProducto').modal('open');
		};
	}

	/*----- CLIENTE_VENDEDOR_PRODUCTO-----*/
	if($state.current.name == 'cliente_vendedor_producto'){
		$scope.urlFoto = $('body').attr('data-fotos_uri');
		$scope.product = $stateParams.product;


	}





	if($state.current.name == 'cliente_vendedor_combos'){
		$scope.goBack = function() {
        	$state.go('cliente_vendedor_opciones',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$http({
			method: 'GET',
			url: server_uri+'loungeCombos/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.combos=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});

		$scope.modalVerCombo=function(id){
			$scope.combo={};
			$scope.listaServicios=[];
			$http({
				method: 'GET',
				url: server_uri+'loungeCombos/'+id+'/edit',
			}).then(function successCallback(response) {
				$scope.combo=response.data;
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});

			$http({
				method: 'GET',
				url: server_uri+'detailLoungeCombo/'+id,
			}).then(function successCallback(response) {
				$scope.listaServicios=response.data;
			}, function errorCallback(response) {
				console.log('Problemas de conexión...');
			});
			$('#modalVerCombo').modal('open');
		}
	}

	if($state.current.name == 'cliente_vendedor_servicios'){
		$scope.goBack = function() {
        	$state.go('cliente_vendedor_opciones',{
    			id: $stateParams.id,
				categoria_id: $stateParams.categoria_id,
				peluqueria: $stateParams.peluqueria,
				servicios: $stateParams.servicios
			})
		}

		$scope.urlFoto = $('body').attr('data-fotos_uri');
		$http({
			method: 'GET',
			url: server_uri+'loungeServices/'+$stateParams.id,
		}).then(function successCallback(response) {
			$scope.Servicios=response.data;
		}, function errorCallback(response) {
			console.log('Problemas de conexión...');
		});
	}







	if($state.current.name == 'cliente_payments_methods'){
		$scope.carrito = $stateParams.carrito;
		$scope.factura = $stateParams.factura;
		$scope.payment_method = null;

		if(!$scope.carrito || !$scope.factura){
			Materialize.toast('Intente mas tarde', 4000);
			// window.history.go(-1);
		}


		$("input:checkbox").on('click', function() {

			var $box = $(this);

			if ($box.is(":checked")) {

			  	$scope.payment_method = parseInt( $box.attr("value") );

			    var group = "input:checkbox[name='" + $box.attr("name") + "']";

			    $(group).prop("checked", false);
			    $box.prop("checked", true);

			} else {
			    $box.prop("checked", false);
			}

		});


		$scope.toPay = function(){
			if($scope.payment_method){

				if($scope.payment_method == 1)
					$scope.payPaypal();
				else if($scope.payment_method == 2)
					$scope.pagoEfectivo();
			}
		}



		$scope.pagoEfectivo=function(){

			console.log("Ok caigo aqui");

			$('#modalConfirmCash').modal('open');

			$scope.confirmPayCash = function(){
				var o=[];
				o.push($scope.factura);
				o.push($scope.carrito);

				var transaction_services = [], transaction_combos = [];

				for(var i=0; i < $scope.carrito.length > 0; i++){
					if($scope.carrito[i].type == 1){
						transaction_services.push($scope.carrito[i]);
					}else{
						transaction_combos.push($scope.carrito[i]);
					}
				}

				o.push( JSON.stringify(transaction_services) );
				o.push( JSON.stringify(transaction_combos) );


				if($scope.carrito.length > 0){
					$http({
						method: 'POST',
						url: server_uri+'transactions',
						data:o
					}).then(function successCallback(response) {
						Materialize.toast(response.data.msj, 4000);

						$state.go('transaction_success',{
		                        factura: $scope.factura,
		                        carrito: $scope.carrito,
		                        servicios: transaction_services,
		                        combos: transaction_combos
		                   });


					}, function errorCallback(response) {
						Materialize.toast('Intenta mas tarde', 4000);
					});
				}
			}

		};



			$scope.payPaypal = function(){

	            const url = server_uri+'checkout-paypal';
	            var     win = window.open( url, "_blank", "enableViewportScale=yes,toolbar=no");

	            var user_id    = $scope.factura.user_id;
	            var user_to_id = $scope.factura.user_to_id;
	            var total      = $scope.factura.total;
	            var comision   = $scope.factura.comision;
	            var valor      = $scope.factura.valor;


	            var transaction_services = [], transaction_combos = [];

				for(var i=0; i < $scope.carrito.length > 0; i++){

					if($scope.carrito[i].type == 1){
						transaction_services.push($scope.carrito[i]);
					}else{
						transaction_combos.push($scope.carrito[i]);
					}
				}


				var servicios = encodeURIComponent( angular.toJson(transaction_services) );
				var combos = encodeURIComponent( angular.toJson(transaction_combos) );

	            var transaction_divisa = 'USD';


	            win.addEventListener( "loadstop", function(event) {

	                win.executeScript({ code:  

	                    'document.getElementById("user_id").value = "'+user_id+'";'+
	                    'document.getElementById("user_to_id").value = "'+user_to_id+'";'+
	                    'document.getElementById("total").value = "'+total+'";'+
	                    'document.getElementById("comision").value = "'+comision+'";'+
	                    'document.getElementById("valor").value = "'+valor+'";'+

	                    'document.getElementById("servicios").value = "'+servicios+'";'+
	                    'document.getElementById("combos").value = "'+combos+'";'+

	                    'document.getElementById("transaction_divisa").value = "'+transaction_divisa+'";'

	                });

	                const url_thanks = server_uri+'checkout-paypal/thanks';
	                const url_cancel = server_uri+'checkout-paypal/cancel';


	                if (event.url == url_thanks) {
	                    win.close();
	                    Materialize.toast('Transaccion realizada exitosamente',4000);

	                    $state.go('transaction_success',{
	                        factura: $scope.factura,
	                        carrito: $scope.carrito
	                    });

	                }

	                if (event.url == url_cancel) {
	                    win.close();
	                    Materialize.toast('Ocurrio un error al realizar la transaccion',4000);
	                }

	                

	            });

	        }
	}





		//FUNCIONES PARA ESTE CONTROLLER

        function getLatLng(peluquerias, servicios, categoria_id){
            var latLng;

            for(i=0; i < peluquerias.length; i++){
                latLng = new google.maps.LatLng(peluquerias[i][0].latitud, peluquerias[i][0].altitud);
                placeMarker(latLng, peluquerias[i], servicios, categoria_id);
            }             
        }

        function placeMarker(location, peluqueria, servicios, categoria_id) {
            console.log("entre en placemarker");
            console.log(location);

            var marker = new google.maps.Marker({
                position: location, 
                map: map
                // title: ''+peluqueria[0].nombre_salon
            });
            markers.push(marker);

            console.log('ANTES DE ENTRAR AL EVENTO DEL MAPA');
            google.maps.event.addListener(marker, 'click', function() {

            	$.sessionStorage.set('peluqueria', peluqueria);
				$state.go('cliente_servicio_preview');


    //         	$state.go('cliente_servicio_preview',{
				// 	categoria_id: categoria_id,
				// 	peluqueria: peluqueria,
				// 	servicios: servicios
				// })

             });
        }


        function filter(input, start) {
	        if (!input || !input.length) { return; }
	        start = +start; //parse to int
	        return input.slice(start);
	    }

		function ownPagination(data){
	        $scope.currentPage = 0;
	        $scope.pageSize = 3;
	        $scope.q = '';
	        $scope.data = data;
			$scope.mostrar=false;
			if ($scope.data.length>0) {
				$scope.mostrar=true;
			}

	        $scope.getData = function () {
	            if ($scope.data.length > 0) {
	               	return filter($scope.data, $scope.q);
	            }
	        }
	                    
	        $scope.numberOfPages=function(){
	            return Math.ceil(($scope.getData().length/$scope.pageSize));                
	        }
	    }

       


}])