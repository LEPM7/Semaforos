/**
 * Created by usuario_2 on 1/10/2017.
 */
angular.module('modelos.calle', [])
// super simple service
// each function returns a promise object
    .factory('Calle', ['$http', function ($http) {
        return {
            get: function (id) {
                if (id == undefined)
                    return $http.get('/calles');
                else
                    return $http.get('/calles/' + id);
            },
            create: function (calle) {
                return $http.post('/calles', calle);
            },
            delete: function (id) {
                return $http.delete('/calles/' + id);
            },
            update: function (id, data) {
                return $http.put('/calles/' + id, data);
            },
            ponderacion: function (id) {
                return $http.get('/calles/' + id + '/ponderacion');
            }
        }
    }]);