app.controller('CalificacionController', function($scope, $state, $sessionStorage, $stateParams,  $http, $filter){
    var server_uri = $('body').attr('data-server_uri'),
        debug = $('body').attr('debug');
    $scope.server_uri = server_uri;


    if ($.sessionStorage.get('user')==null) {
        $state.go('login');
    }


    if($state.current.name == 'calificacion_nueva'){
        $scope.Usuario=$.sessionStorage.get('user');

        $http({
            method: 'GET',
            url: server_uri+'/transactions/'+$stateParams.id
        }).then(function successCallback(response) {
            console.log(response);

            if(response.data.success == true){
                $scope.user         = $.sessionStorage.get('user');
                $scope.user_id      = $.sessionStorage.get('user').id;
                $scope.transaction  = response.data.t;
                $scope.transaction.created_at = new Date($scope.transaction.created_at);
            }

        }, function errorCallback(response) {
                console.log('dio error');
        });



        $scope.enviar_calificacion = function(){
            $('#modal').css('display','block');
        }

        $scope.cancelar_envio = function(){
            $('#modal').css('display','none');
        }

        $scope.confirmar_envio = function(){
            $('#modal').css('display','none');

            if($scope.check_requerido() == 1){
                var form = $('form'),
                    inputs = form.serialize();

                $.ajax({
                    url: server_uri+'scores',
                    type: 'POST',
                    dataType: 'json',
                    data:inputs
                })
                .done(function(response) {
                    console.log(response)

                    if(response.success == true){
                        Materialize.toast(response.msj, 4000);
                        window.history.go(-1);                     
                    }else
                        Materialize.toast(response.msj,4000);

              
                })
                .fail(function(e) {
                    console.log(e);
                });          
            
            }

        }


        $scope.check_requerido = function(){
            return 1;
        }



    }


})