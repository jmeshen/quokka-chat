app.config(function($stateProvider) {
    $stateProvider.state('admin-only', {
        url: '/admin-only',
        templateUrl: '/js/admin-only/admin-only.html',
        controller: 'AdminController'
    });
});

app.controller('AdminController', function($scope, AuthService, UserFactory, $state) {

});