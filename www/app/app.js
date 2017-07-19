
var server_uri = $('body').attr('data-server_uri');
var path_views = './app/views';



var app = angular.module('app', ['ui.router', 'ngStorage']);

angular.module('myApp.controllers', []);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/perfil');
    
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                '' : { 
                    templateUrl: path_views+'/home.html',
                    controller: 'MainController'
                },

                'navigation@home' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('login', {
            url: '/login',
            views: {
                '' : { 
                    templateUrl: path_views+'/login.html',
                    controller: 'AuthController'
                }
            }
        })

        .state('about',{
            url: '/about',
            views: {
                '': { 
                    templateUrl: path_views+'/user/about.html',
                    controller: 'MainController'
                },
                'navigation@about' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('politicas',{
            url: '/politicas',
            views: {
                '': { 
                    templateUrl: path_views+'/user/politicas.html',
                    controller: 'MainController'
                },
                'navigation@politicas' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('perfil',{
            url: '/perfil',
            views: {
                '': { 
                    templateUrl: path_views+'/user/perfil_home.html',
                    controller: 'UserController'
                },
                'navigation@perfil' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('perfil_config',{
            url: '/perfil/config',
            views: {
                '': { 
                    templateUrl: path_views+'/user/perfil_config.html',
                    controller: 'UserController'
                },
                'navigation@perfil_config' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('my_messages',{
            url: '/my_messages',
            views:{
                '':{
                    templateUrl: path_views+'/user/my_messages.html',
                    controller: 'MessagesController'
                },
                'navigation@my_messages' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('chat',{
            url: '/conversation/:id',
            views:{
                '':{
                    templateUrl: path_views+'/user/conversation.html',
                    controller: 'MessagesController'
                },
                'navigation@chat':{
                    templateUrl: path_views+'/template_parts/nav.html'
                }
            }
        })

        .state('servicios',{
            url: '/servicios',
            views: {
                '': { 
                    templateUrl: path_views+'/salon/servicios.html',
                    // controller: 'ServiciosController'
                },
                'navigation@servicios' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('servicios_publicaciones',{
            url: '/servicios/publicaciones',
            views: {
                '': { 
                    templateUrl: path_views+'/servicios/servicios_publicados.html',
                    // controller: 'ServiciosController'
                },
                'navigation@servicios_publicaciones' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('clientes_transacciones',{
            url: '/clientes/transacciones',
            views: {
                '': { 
                    templateUrl: path_views+'/user/transacciones.html',
                    // controller: 'ServiciosController'
                },
                'navigation@clientes_transacciones' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('clientes_servicios_contratados',{
            url: '/clientes/servicios_contratados',
            views: {
                '': { 
                    templateUrl: path_views+'/user/servicios_contratados.html',
                    // controller: 'ServiciosController'
                },
                'navigation@clientes_servicios_contratados' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('combos',{
            url: '/combos',
            views: {
                '': { 
                    templateUrl: path_views+'/servicios/combos.html',
                    // controller: 'ServiciosController'
                },
                'navigation@combos' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })



        /*----- JONATHAN -----*/
        .state('cliente_servicio_categorias',{
            url: '/cliente_servicio_categorias/:id',
            views: {
                '':{
                    templateUrl: path_views+'/cliente/cliente_categorias.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_servicio_categorias':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })



        .state('cliente_servicios_publicados',{
            url: '/cliente_servicios_publicados/:id',
            views: {
                '':{
                    templateUrl: path_views+'/cliente/cliente_servicios_publicados.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_servicios_publicados':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                opciones: 0
            }
        })


        .state('cliente_servicio_preview',{
            url: '/cliente_servicio_preview/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_servicio_preview.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_servicio_preview':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('cliente_vendedor_perfil',{
            url: '/cliente_vendedor_perfil/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_perfil.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_perfil':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('registro', {
            url: '/registro',
            views: {
                '' : { 
                    templateUrl: path_views+'/register.html',
                    controller: 'RegistroController'
                },

                'navigation@registro' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })




        /*End Jonathan*/

        /*----- RICARDO -------*/

        .state('panel_usuarios',{
            url: '/admin/panel/usuarios',
            views:{
                '':{
                    templateUrl: path_views+'/admin/admin_lista_usuarios.html',
                    controller: 'AdminController'
                },
                'navigation@panel_usuarios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('add_usuarios',{
            url: '/admin/add/usuarios',
            views:{
                '':{
                    templateUrl: path_views+'/admin/add_usuarios.html',
                    controller: 'AdminController'
                },
                'navigation@add_usuarios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        /*End RICARDO*/

        .state('panel_servicios_categorias',{
            url: '/admin/panel/servicios_categorias',
            views:{
                '':{
                    templateUrl: path_views+'/admin/lista_servicios_categorias.html',
                    controller: 'CategoriaController'
                },
                'navigation@panel_servicios_categorias':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
});