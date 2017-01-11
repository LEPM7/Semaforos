angular.module
('myApp',
    [
        'ui.router',
        'ngMaterial',
        'calles'
    ]
)
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('app', {
            url: '/',
            views: {
                'contenido@': {
                    templateUrl: 'app/app.html',
                    controller: 'AppCtrl as appCtrl'
                }
            }
        });
    })
    .controller('AppCtrl', ['$state', function ($state) {
        var appCtrl = this;

        appCtrl.cambiar = function(){
            $state.go('app.calles');
        }

    }]);
;
