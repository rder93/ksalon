var server_uri = $('body').attr('data-server_uri');
var path_views = './app/views';



var app = angular.module('app', ['ui.router', 'ngStorage', 'ui.materialize', 'ngMaterial']);

angular.module('myApp.controllers', []);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/perfil');
    
    $stateProvider
        .state('home', {
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
            url: '/login',
            views: {
                '' : { 
                    templateUrl: path_views+'/login.html',
                    controller: 'AuthController'
                }
            }
        })

        .state('about',{
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
<<<<<<< HEAD
            url: '/cliente_servicios_publicados/:categoria_id',
=======
            onExit: function() 
            { 
                location.reload(); 
            },
            url: '/cliente_servicios_publicados/:id',
>>>>>>> origin/master
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
                servicios: 0
            }
        })


        .state('cliente_servicio_preview',{
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
                location.reload(); 
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
                location.reload(); 
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
                location.reload(); 
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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
            onExit: function() 
            { 
                location.reload(); 
            },
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










































