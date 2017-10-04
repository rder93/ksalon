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
                //  
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

        .state('user_message',{
            url: '/user_message/:id?transaction_id',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function(){
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/user/conversation.html',
                    controller: 'MessagesController'
                },
                'navigation@user_message':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        // .state('chat',{
        //     onExit: function() 
        //     { 
                 
        //     },
        //     url: '/conversation/:id',
        //     views:{
        //         '':{
        //             templateUrl: path_views+'/user/conversation.html',
        //             controller: 'MessagesController'
        //         },
        //         'navigation@chat':{
        //             templateUrl: path_views+'/template_parts/nav.html'
        //         }
        //     }
        // })

        .state('servicios',{
            onExit: function() 
            { 
                 
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
                 
            },
            url: '/lounges/nuevoServicio/crear',
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

        .state('lounges_photos_index',{
            onExit: function() 
            { 
                 
            },
            url: '/lounges/photos/:id_lounge',
            views: {
                '':{
                    templateUrl: path_views+'/lounges/lounges_photos_index.html',
                    controller: 'LoungeController'
                },
                'navigation@lounges_photos_index':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })
        

        /*----- JONATHAN -----*/
        .state('cliente_servicio_categorias',{
            onExit: function() 
            { 
                 
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
            url: '/cliente_servicios_publicados/:categoria_id',
            onExit: function() 
            { 
                 
            },
            views: {
                '':{
                    templateUrl: path_views+'/cliente/cliente_servicios_publicados.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_servicios_publicados':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                peluqueria: null,
                servicios: null
            }
        })


        .state('cliente_servicio_preview',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_servicio_preview',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_servicio_preview.html',
                    controller: 'ClienteController'
                },
                // 'navigation@cliente_servicio_preview':{
                //     templateUrl: path_views+'/template_parts/nav.html',
                //     controller: 'NavigationController'
                // }
            },
            params: {
                peluqueria: null,
                servicios: null
            }
        })


        .state('cliente_pago',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_pago',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_pago.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_pago':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null

            }
        })

        .state('cliente_pago_efectivo',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_pago_efectivo',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_pago_efectivo.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_pago':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null

            }
        })

        .state('cliente_vendedor_perfil',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_perfil/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_perfil.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_perfil':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null
            }
        })

        .state('cliente_vendedor_opciones',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_opciones/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_opciones.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_opciones':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null
            }
        })

        .state('cliente_vendedor_profesionales',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_profesionales/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_profesionales.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_profesionales':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('cliente_vendedor_profesional',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_profesional/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_profesional_show.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_profesional':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            }
        })


        .state('cliente_vendedor_combos',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_combos/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_combos.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_combos':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null
            }
        })

        .state('cliente_vendedor_servicios',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_servicios/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_servicios.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_servicios':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null
            }
        })

        .state('cliente_vendedor_productos',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_productos/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_productos.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_productos':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('cliente_vendedor_producto',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_vendedor_producto/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_vendedor_producto_show.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_vendedor_producto':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params:{
                product: null
            }
        })

        .state('cliente_independiente_perfil',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_independiente_perfil/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_independiente_perfil.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_independiente_perfil':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null
            }
        })

        .state('cliente_profesionales_salon',{
            onExit: function() 
            { 
                 
            },
            url: '/cliente_profesionales_salon/:id',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/cliente_profesionales_salon.html',
                    controller: 'ClienteController'
                },
                'navigation@cliente_profesionales_salon':{
                    templateUrl: path_views+'/template_parts/nav-cliente.html',
                    controller: 'NavigationController'
                }
            },
            params: {
                categoria_id: null,
                peluqueria: null,
                servicios: null
            }
        })

        .state('registro', {
            onExit: function() 
            { 
                 
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


        .state('admin_tickets',{
            url: '/admin_tickets',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function  () {
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/admin/tickets/index.html',
                    controller: 'TicketsController'
                },
                'navigation@admin_tickets':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller:  'NavigationController'
                }
            }
        })


        .state('admin_ticket_detail',{
            url: '/admin_ticket_detail/:id',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function  () {
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/admin/tickets/detail.html',
                    controller: 'TicketsController'
                },
                'navigation@admin_ticket_detail':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller:  'NavigationController'
                }
            }
        })


        .state('transacciones',{
            onExit: function() 
            { 
                 
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


        .state('admin_user_chats',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/user/messages/:id',
            views:{
                '':{
                    templateUrl: path_views+'/admin/user_messages.html',
                    controller: 'MessagesController'
                }
            }
        })

        .state('admin_user_chat',{
            url: '/admin/user/chat/:id?seller_id?transaction_id',
            onEnter: function(){
                $('.mobile-content').fadeIn(1000);
            },
            onExit: function(){
                $('.mobile-content').fadeOut(1000);
            },
            views:{
                '':{
                    templateUrl: path_views+'/admin/user_chat.html',
                    controller: 'MessagesController'
                }
            }
        })



        .state('cliente_payments_methods',{
            url: '/cliente_payments_methods',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/payments_methods.html',
                    controller: 'ClienteController'
                },
                'navigation@payments':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
            params:{
                carrito: null,
                factura: null
            }
        })



        .state('transaction_success',{
            onExit: function() 
            { 
                 
            },
            url: '/transaction_success',
            views:{
                '':{
                    templateUrl: path_views+'/cliente/success_payment.html',
                    controller: 'PaymentsController'
                }
            },
            params:{
                factura: null,
                carrito: null,
                servicios: [],
                combos: []
            }
        })






        .state('payments',{
            url: '/payments',
            views:{
                '':{
                    templateUrl: path_views+'/user/payments/index.html',
                    controller: 'PaymentsController'
                },
                'navigation@payments':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
            params:{
                data: null
            }
        })

        .state('admin_payments',{
            url: '/admin_payments',
            views:{
                '':{
                    templateUrl: path_views+'/admin/payments/index.html',
                    controller: 'PaymentsController'
                },
                'navigation@admin_payments':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            },
            params:{
                data: null
            }
        })



        .state('panel_comisiones',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/panel/comisiones',
            views:{
                '':{
                    templateUrl: path_views+'/admin/panel_comisiones.html',
                    controller: 'AdminController'
                },
                'navigation@panel_comisiones':{
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

        .state('panel_salones',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/panel/salones',
            views:{
                '':{
                    templateUrl: path_views+'/admin/admin_lista_salones.html',
                    controller: 'AdminController'
                },
                'navigation@panel_salones':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('panel_servicios_categorias',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/panel/choose',
            views:{
                '':{
                    templateUrl: path_views+'/admin/choose_servicios_categorias.html',
                    controller: 'AdminController'
                },
                'navigation@panel_servicios_categorias':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('panel_categorias',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/panel/categorias',
            views:{
                '':{
                    templateUrl: path_views+'/admin/categorias.html',
                    controller: 'AdminController'
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
                 
            },
            url: '/admin/panel/servicios',
            views:{
                '':{
                    templateUrl: path_views+'/admin/servicios.html',
                    controller: 'AdminController'
                },
                'navigation@panel_servicios':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('add_usuario',{
            onExit: function() 
            { 
                 
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

        .state('detalle_salon',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/detalle/salon/:id_salon',
            views:{
                '':{
                    templateUrl: path_views+'/admin/detalle_salon.html',
                    controller: 'AdminController'
                },
                'navigation@detalle_salon':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('foto_salon',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/detalle/foto/salon/:id_salon',
            views:{
                '':{
                    templateUrl: path_views+'/admin/foto_salon.html',
                    controller: 'AdminController'
                },
                'navigation@foto_salon':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('panel_pagos',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/panel/gestion',
            views:{
                '':{
                    templateUrl: path_views+'/admin/panel_gestion.html',
                    controller: 'AdminController'
                },
                'navigation@panel_pagos':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('panel_pagos_transacciones',{
            onExit: function() 
            { 
                 
            },
            url: '/admin/panel/gestion/transacciones',
            views:{
                '':{
                    templateUrl: path_views+'/admin/panel_gestion_transacciones.html',
                    controller: 'AdminController'
                },
                'navigation@panel_pagos_transacciones':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_servicios',{
            onExit: function() 
            { 
                 
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
                 
            },
            url: '/profesional/add/servicios/:id',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_servicios_crear.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_servicios_crear':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_servicios_editar',{
            onExit: function() 
            { 
                 
            },
            url: '/profesional/edit/servicios/:id/:id_service',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_servicios_editar.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_servicios_editar':{
                    templateUrl: path_views+'/template_parts/nav.html',
                    controller: 'NavigationController'
                }
            }
        })

        .state('profesional_combos',{
            onExit: function() 
            { 
                 
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
        
        .state('profesional_transactions',{
            onExit: function() 
            { 
                 
            },
            url: '/profesional/transacciones',
            views:{
                '':{
                    templateUrl: path_views+'/profesional/profesional_transactions.html',
                    controller: 'ProfesionalController'
                },
                'navigation@profesional_transactions':{
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

        // .state('panel_pagos',{
        //     onExit: function() 
        //     { 
                 
        //     },
        //     url: '/admin/panel/pagos',
        //     views:{
        //         '':{
        //             templateUrl: path_views+'/admin/panel_pagos_transacciones_comisiones.html',
        //             controller: 'ServicioController'
        //         },
        //         'navigation@panel_pagos':{
        //             templateUrl: path_views+'/template_parts/nav.html',
        //             controller: 'NavigationController'
        //         }
        //     }
        // })

        /*End RICARDO*/

});

app.filter('startFrom', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});






































