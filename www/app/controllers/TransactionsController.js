app.controller('TransactionsController', function($scope, $state, $sessionStorage, $stateParams,  $http, $filter){
    var server_uri = $('body').attr('data-server_uri'),
        debug = $('body').attr('debug');
    $scope.server_uri = server_uri;


    if ($.sessionStorage.get('user')==null) {
        $state.go('login');
    }

    if ( ($state.current.name == 'transacciones') || ($state.current.name == 'transacciones_sin_calificacion') ){
        $scope.Usuario=$.sessionStorage.get('user');

        $http({
            method: 'GET',
            url: server_uri+'/transactions',
            params: {
                id: $scope.Usuario.id
            }
        }).then(function successCallback(response) {
            console.log(response)

            if(response.data.success == true){
                $scope.user = $.sessionStorage.get('user');
                $scope.nonReviews = response.data.nonReview;
                
                ownPagination(response.data.transactions);
            }

        }, function errorCallback(response) {
                console.log('dio error');
        });

    }



    if($state.current.name == 'transaccion_detalle'){
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

    }


    function ownPagination(data){
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.q = '';
        $scope.data = data;
        $scope.rol  = $.sessionStorage.get('user').rol_id;
        
        $scope.getData = function () {
            if ($scope.data.length > 0) {
                return $filter('filter')($scope.data, $scope.q)
            }
        }
                
        $scope.numberOfPages=function(){
            return Math.ceil(($scope.getData().length/$scope.pageSize)-1);                
        }

    }


})