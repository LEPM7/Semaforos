/**
 * Created by usuario_2 on 1/10/2017.
 */
angular.module('modelos.semaforo', [])
// super simple service
// each function returns a promise object
    .factory('Semaforo', ['$http', function ($http) {
        return {
            get: function (id) {
                if (id == undefined)
                    return $http.get('/semaforos');
                else
                    return $http.get('/semaforos/' + id);
            },
            create: function (semaforo) {
                return $http.post('/semaforos', semaforo);
            },
            delete: function (id) {
                return $http.delete('/semaforos/' + id);
            },
            update: function (id, data) {
                return $http.put('/semaforos/' + id, data);
            }
        }
    }]);