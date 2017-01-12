/**
 * Created by usuario_2 on 1/10/2017.
 */
angular.module('calles', [
    'ui.router',
    'modelos.calle',
    'calles.cantidad'
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.calles', {
                url: 'calles',
                views: {
                    'contenido@': {
                        templateUrl: 'app/sistemas/semaforos/calles/calles.html',
                        controller: 'CallesCtrl as callesCtrl'
                    }
                }
            });
    }])
    .controller('CallesCtrl', ['$state', '$stateParams', 'Calle', '$mdDialog', '$mdMedia', function ($state, $stateParams, Calle, $mdDialog, $mdMedia) {
        var callesCtrl = this;

        function cargarCalles() {
            Calle.get().then(
                function (r) {
                    callesCtrl.calles = r.data;
                }, function (response) {
                }
            );
        };

        // Dialog
        function showDialog(calle_id) {
            return $mdDialog.show({
                controller: 'DialogCalleCtrl as dialogCtrl',
                templateUrl: 'app/sistemas/semaforos/calles/abc.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                locals: {
                    Calle: Calle,
                    calle_id: calle_id
                },
                openFrom: 'left',
                fullscreen: !$mdMedia('gt-xs')
            });
        };

        callesCtrl.crearCalle = function() {
            showDialog(null);
        };

        callesCtrl.editarCalle = function(calle_id) {
            showDialog(calle_id);
        };

        callesCtrl.irCalle = function (calle_id) {
            $state.go('app.calles.cantidad', {id: calle_id});
        };

        cargarCalles();

    }])

    .controller('DialogCalleCtrl', ['$mdDialog', '$q', 'Calle', 'calle_id',
        function ($mdDialog, $q, Calle, calle_id) {

            var dialogCtrl = this;

            dialogCtrl.selected = null;
            dialogCtrl.calle = {ponderacion: 0};

            function descargaInicial() {
                if (calle_id != null) {
                    dialogCtrl.obtenerCalle();
                }
            };

            //Agregar
            dialogCtrl.crearCalle = function (calle) {
                Calle.create(calle).then(function (calle) {
                    hide(); 
                }, function (err) {
                    dialogCtrl.errors = err.data;
                });
            };

            //Editar
            dialogCtrl.obtenerCalle = function () {
                Calle.get(calle_id).then(function (r) {
                    dialogCtrl.calle = r.data;
                }, function (err) {
                    dialogCtrl.errors = err.data;
                });
            };

            dialogCtrl.editarCalle = function (calle) {
                Calle.update(calle_id, calle).then(function () {
                    hide();
                }, function (err) {
                    dialogCtrl.errors = err.data;
                });
            };

            //generales
            dialogCtrl.guardar = function (calle) {
                if (calle_id) {
                    dialogCtrl.editarCalle(calle);
                } else {
                    dialogCtrl.crearCalle(calle);
                }
            };

            function hide(result) {
                $mdDialog.hide(result);
            };

            function cancel(result) {
                $mdDialog.cancel(result);
            };

            /**
             * Cancela el dialog.
             */
            dialogCtrl.cancel = function () {
                cancel();
            };

            descargaInicial();

        }])

;

