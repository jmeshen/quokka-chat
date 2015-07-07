app.config(function($stateProvider) {
    $stateProvider.state('admin-only', {
        url: '/admin-only',
        templateUrl: '/js/admin-only/admin-only.html',
        controller: 'AdminController'
    });
});

app.controller('AdminController', function($scope, AuthService, UserFactory, $state) {

    $scope.searchingUser = false;
    $scope.successMessage = false;
    $scope.failMessage = false;

    $scope.getUser = function(email) {
        UserFactory.getUserByEmail(email).then(function(user) {
            $scope.searchingUser = true;
            $scope.failMessage = false;
            $scope.foundUser = user;
        }, function() {
            $scope.failMessage = true;
        })
    }

    $scope.promoteToAdmin = function(status) {

        UserFactory.promoteUserStatus($scope.foundUser._id, {
            powerLevel: status
        }).then(function(response) {
            console.log('ADMIN STATUS CHANGED!');
            $scope.searchingUser = false;
            $scope.successMessage = true;
        });

    };

});