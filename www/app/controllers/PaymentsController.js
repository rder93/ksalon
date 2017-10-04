app.controller('PaymentsController', ['$scope', '$state','$sessionStorage','$stateParams','$http','$filter', function($scope, $state, $sessionStorage, $stateParams, $http, $filter){
	var server_uri = $('body').attr('data-server_uri'),
        debug = $('body').attr('debug');
    $scope.server_uri = server_uri;
	

    if (!$.sessionStorage.get('user')) {
        $state.go('login');
    }




    if($state.current.name == 'transaction_success'){

        $scope.factura = $stateParams.factura;
        $scope.carrito = $stateParams.carrito;

        $scope.servicios = $stateParams.servicios;
        $scope.combos = $stateParams.combos;

    }




	if($state.current.name == 'payments' ){

        var url = 'user/'+$sessionStorage.get('user').id+'/payments';

        $.ajax({
            url: server_uri+url,
            type: 'GET',
            data: {},
        })
        .done(function(data) {

            if(data.status == 200){
                $scope.user  = data.user;
                $scope.$apply();

                if(data.payments.length > 0){
                    ownPagination(data.payments);
                }
            }

        })
        .fail(function(r) {
            console.log(r);
        })
        .always(function() {
            console.log("complete");
        });




        $scope.askPayout = function(){
            $('.modal-confirm').css('display','flex');

            $scope.confirmModal = function(){
                $('.modal-confirm').css('display','none');

                var url = 'user/'+$sessionStorage.get('user').id+'/payments';

                $.ajax({
                    url: server_uri+url,
                    type: 'POST',
                    data: {},
                })
                .done(function(data) {
                    console.log(data)
                    Materialize.toast(data.msj, 4000);

                    if(data.status == 200){
                        $scope.user  = data.user;
                        $scope.$apply();

                        if(data.payments.length > 0){
                            ownPagination(data.payments);
                        }
                    }

                })
                .fail(function(r) {
                    console.log(r);
                    Materialize.toast('Error de solicitud de pago', 4000);
                })
                .always(function() {
                    console.log("complete");
                });
            }
        }



        $scope.payDebt = function(){
            $('.modal-confirm').css('display','flex');

            $scope.confirmModal = function(){
                $('.modal-confirm').css('display','none');


                const url = $('html').attr('uri')+'/checkout-paypal-debt';
                var     win = window.open( url, "_blank", "enableViewportScale=yes,toolbar=no");

                var user_id            = $sessionStorage.get('user').id;
                var amount             = $sessionStorage.get('user').balance * (-1);

                var transaction_divisa = 'USD';

                win.addEventListener( "loadstop", function(event) {

                    win.executeScript({ code:  

                        'document.getElementById("user_id").value = "'+user_id+'";'+
                        'document.getElementById("amount").value = "'+amount+'";'+

                        'document.getElementById("transaction_divisa").value = "'+transaction_divisa+'";'

                    });

                    const url_thanks = $('html').attr('uri')+'/checkout-paypal/thanks';
                    const url_cancel = $('html').attr('uri')+'/checkout-paypal/cancel';

                    if (event.url == url_thanks) {
                        win.close();
                        Materialize.toast('Deuda pagada exitosamente',4000);
                    }

                    if (event.url == url_cancel) {
                        win.close();
                        Materialize.toast('Ocurrio un error al pagar deuda',4000);
                    }

                });
            }
        }
        

    }



    if($state.current.name == 'admin_payments'){

        var url = 'payments';

        $.ajax({
            url: server_uri+url,
            type: 'GET',
            data: {},
        })
        .done(function(data) {

            if(data.status == 200){
                $scope.user  = $sessionStorage.get('user');
                $scope.$apply();

                if(data.payments.length > 0){
                    ownPagination(data.payments);
                }
            }

        })
        .fail(function(r) {
            console.log(r);
        })
        .always(function() {
            console.log("complete");
        });

    }





    function ownPagination(data){
        $scope.currentPage = 0;
        $scope.pageSize = 1;
        $scope.q = '';
        $scope.data = data;
        $scope.rol  = $sessionStorage.get('user').rol_id;
            
        $scope.getData = function () {
            if ($scope.data.length > 0) {
                // return filter($scope.data, $scope.q);
                return $filter('filter')($scope.data, $scope.q)
            }
        }
                    
        $scope.numberOfPages=function(){
            return Math.ceil(($scope.getData().length/$scope.pageSize));                
        }

        $scope.$apply();

        if($scope.data.length==0)
            $('.pagination-buttons').remove();
    
    }




}])

app.filter('filter', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});
