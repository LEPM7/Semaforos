/**
 * Created by usuario_2 on 1/12/2017.
 */
angular.module('calles.cantidad', [
    'ui.router',
    'modelos.calle'
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.calles.cantidad', {
                url: '/:id/ponderacion',
                views: {
                    'contenido@': {
                        templateUrl: 'app/sistemas/semaforos/calles/cantidad/cantidad.html',
                        controller: 'CantidadCtrl as cantidadCtrl'
                    }
                }
            });
    }])
    .controller('CantidadCtrl', ['$state', '$stateParams', 'Calle', function ($state, $stateParams, Calle) {
        var cantidadCtrl = this;
        var calle_id = $stateParams.id;

        cantidadCtrl.ponderacion = 0;

        function iniciar() {
            Calle.get(calle_id).then(function (r) {
                cantidadCtrl.calle = r.data;
            }, function (err) {
                cantidadCtrl.errors = err.data;
            });
            setInterval(function () {
                Calle.ponderacion(calle_id).then(function (r) {
                    cantidadCtrl.ponderacion = r.data * 20;
                })
            }, 3000);
        }

        iniciar();
    }]);

