var server_uri = $('body').attr('data-server_uri');
var path_views = './app/views';



var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.materialize', 'ngMaterial']);

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

        .state('lounges_servicios',{
            url: '/lounges/servicios/:id',
            views:{
                '':{
                    templateUrl: path_views+'/lounges/servicios.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_servicios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('lounges_index',{
            url: '/lounges',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_crear',{
            url: '/lounges/crear',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_crear' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_editar',{
            url: '/lounges/editar/:id',
            views: {
                '':{
                    templateUrl: path_views+'/lounges/form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_editar':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                opciones: 0
            }
        })
        .state('lounges_productos_index',{
            url: '/lounges/productos',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_productos_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_productos_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_productos_crear',{
            url: '/lounges/productos/crear',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_productos_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_productos_crear' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_productos_editar',{
            url: '/lounges/productos/editar/:id',
            views: {
                '':{
                    templateUrl: path_views+'/lounges/lounges_productos_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_productos_editar':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                opciones: 0
            }
        })
        .state('lounges_servicios_index',{
            url: '/lounges/listaservicios',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_servicios_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_servicios_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_servicios_crear',{
            url: '/lounges/servicios/crear',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_servicios_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_servicios_crear' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_servicios_editar',{
            url: '/lounges/servicios/editar/:id',
            views: {
                '':{
                    templateUrl: path_views+'/lounges/lounges_servicios_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_servicios_editar':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
        })
        .state('lounges_profesionales_index',{
            url: '/lounges/listaprofesionales',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_profesionales_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_profesionales_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_profesionales_crear',{
            url: '/lounges/prefesionales/crear',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_profesionales_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_profesionales_crear' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_profesionales_editar',{
            url: '/lounges/profesionales/editar/:id',
            views: {
                '':{
                    templateUrl: path_views+'/lounges/lounges_profesionales_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_profesionales_editar':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
        })
        .state('lounges_servicios_profesionales_index',{
            url: '/lounges/profesionales/servicios/:id',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_servicios_profesionales_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_servicios_profesionales_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_certificados_profesionales_index',{
            url: '/lounges/profesionales/certificados/:id',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_certificados_profesionales_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_certificados_profesionales_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_combos_index',{
            url: '/lounges/combos',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_combos_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_combos_index' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('lounges_combos_crear',{
            url: '/lounges/combos/crear',
            views: {
                '': { 
                    templateUrl: path_views+'/lounges/lounges_combos_form.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_combos_crear' : { 
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        .state('lounges_combos_editar',{
            url: '/lounges/combos/editar/:id',
            views: {
                '':{
                    templateUrl: path_views+'/lounges/lounges_combos_form2.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_combos_editar':{
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
                }
            }
        })

        .state('tickets',{
            url: '/tickets',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function  () {
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/user/tickets.html',
                    controller: 'TicketsController'
                },
                'navigation@tickets':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })


        .state('ticket_detail',{
            url: '/ticket_detail/:id',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function  () {
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/user/ticket_detail.html',
                    controller: 'TicketsController'
                },
                'navigation@ticket_detail':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })


        .state('ticket_send',{
            url: '/ticket_send',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function  () {
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/user/ticket_send.html',
                    controller: 'TicketsController'
                },
                'navigation@ticket_send':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })



        .state('transacciones',{
            url: '/transacciones',
            views:{
                '':{
                    templateUrl: path_views+'/user/transacciones.html',
                    controller: 'TransactionsController'
                },
                'navigation@transacciones':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('transacciones_sin_calificacion',{
            url: '/transacciones_sin_calificacion',
            views:{
                '':{
                    templateUrl: path_views+'/user/transacciones_sin_calificacion.html',
                    controller: 'TransactionsController'
                },
                'navigation@transacciones_sin_calificacion':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('transaccion_detalle',{
            url: '/transaccion_detalle/:id',
            views:{
                '':{
                    templateUrl: path_views+'/user/transaccion_detalle.html',
                    controller: 'TransactionsController'
                },
                'navigation@transaccion_detalle':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('calificacion_nueva',{
            url: '/calificacion_nueva/:id',
            views:{
                '':{
                    templateUrl: path_views+'/user/calificacion_nueva.html',
                    controller: 'CalificacionController'
                },
                'navigation@calificacion_nueva':{
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

        .state('add_usuario',{
            url: '/admin/add/usuario',
            views:{
                '':{
                    templateUrl: path_views+'/admin/add_usuarios.html',
                    controller: 'AdminController'
                },
                'navigation@add_usuario':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('edit_usuario',{
            url: '/admin/edit/usuario/:id',
            views:{
                '':{
                    templateUrl: path_views+'/admin/edit_usuario.html',
                    controller: 'AdminController'
                },
                'navigation@edit_usuario':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('panel_gestion',{
            url: '/admin/panel/gestion',
            views:{
                '':{
                    templateUrl: path_views+'/admin/panel_gestion.html',
                    controller: 'AdminController'
                },
                'navigation@panel_gestion':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_servicios',{
            url: '/profesional/servicios/:id',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/servicios.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_servicios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_servicios_crear',{
            url: '/profesional/add/servicios/:id',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_servicios_crear.html',
                    controller: 'ProfesionalController'
                },
                'navigation@add_servicios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_combos',{
            url: '/profesional/combos/:id',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_combos.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_combos':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_combos_crear',{
            url: '/profesional/combos/create/:id',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_combos_crear.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_combos_crear':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_combos_editar',{
            url: '/profesional/combos/edit/:id/:id_combo',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_combos_editar.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_combos_editar':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        
        // .state('transacciones',{
        //     url: '/admin/panel/transacciones',
        //     views:{
        //         '':{
        //             templateUrl: path_views+'/admin/transacciones.html',
        //             controller: 'AdminController'
        //         },
        //         'navigation@transacciones':{
        //             templateUrl: path_views+'/template_parts/nav.html',
        //             controller: 'NavigationController'
        //         }
        //     }
        // })


        /*End RICARDO*/

        .state('panel_categorias',{
            url: '/admin/panel/categorias',
            views:{
                '':{
                    templateUrl: path_views+'/admin/categorias.html',
                    controller: 'CategoriaController'
                },
                'navigation@panel_categorias':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('panel_servicios',{
            url: '/admin/panel/servicios',
            views:{
                '':{
                    templateUrl: path_views+'/admin/servicios.html',
                    controller: 'ServicioController'
                },
                'navigation@panel_servicios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
});










































