app.config(function($stateProvider) {
    $stateProvider.state('quincy', {
        url: '/quincy',
        templateUrl: 'js/quincy/quincy.html',
        controller: 'QuincyCtrl'
    });
});

app.controller('QuincyCtrl', function($scope) {

});