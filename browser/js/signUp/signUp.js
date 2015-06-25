app.config(function($stateProvider) {

    $stateProvider.state('signUp', {
        url: '/signup',
        templateUrl: 'js/signUp/signUp.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function($scope, UserFactory, AuthService, $state) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignUp = function(user) {

        $scope.error = null;

        UserFactory.createUser(user)
            .then(function() {
                return AuthService.login(user);
            })
            .then(function() {
                $state.go('home');
            }).catch(function() {
                $scope.error = 'Invalid signup credentials.';
            });
    };

});