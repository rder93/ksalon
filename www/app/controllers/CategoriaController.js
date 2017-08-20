// app.controller('CategoriaController', ['$scope', '$state', '$http', '$stateParams', '$sessionStorage', function($scope, $state, $http, $stateParams, $sessionStorage){
// 	var server_uri = $('body').attr('data-server_uri'),
// 	debug = $('body').attr('debug'); 

// 	$scope.server_uri = server_uri;

//     if ($state.current.name == 'panel_categorias') {

//         $http.get(server_uri+'categories')
//         .then(function successCallback(response) {
//             $scope.categorias = response.data;
//         }, function errorCallback(error) {
//             console.log('error al obtener las categorias');
//             console.log(error);
//         });

//         $scope.editarItem = function(id, nombre) {
//             input_id = $('#categoria_id');
//             input_id.val(id);
//             input_nombre = $('#categoria_nombre');
//             input_nombre.val(nombre);

//             $('#modal1').modal('open');
//             $('#modal1').css({
//                 display: 'block',
//                 top: '15%'
//             });
        
//             $scope.cancelEdit = function() {
//                 $('#modal1').modal('close');
//                 $('#modal1').css({
//                     display: 'none',
//                     top: '0'
//                 });

//                 input_id.val('');
//                 input_nombre.val('');
//             }

//             $scope.editarCategoria = function() {
//                 $scope.btnDisabled = true;

//                 $http({
//                     method: 'PATCH',
//                     url: server_uri+'categories/'+input_id.val(),
//                     data: {nombre: input_nombre.val() }
//                 }).then(function successCallback(response) {
//                     $scope.categorias = response.data.categories;
//                     ocultarModal();
//                     Materialize.toast(response.data.mensaje, 4000);
//                 }, function errorCallback(error) {
//                     $scope.btnDisabled = false;
//                     Materialize.toast(error.data.mensaje, 4000);      
//                 });


//             }

//         }
//     }

//     function ocultarModal() {
//         $('#modal1').modal('close');
//         $('#modal1').css({
//             display: 'none',
//             top: '0'
//         });
//     }
// }]);