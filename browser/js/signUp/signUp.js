app.config(function($stateProvider) {

    $stateProvider.state('signUp', {
        url: '/signup',
        templateUrl: 'js/signUp/signUp.html',
        controller: 'SignUpCtrl',
        resolve: {
            user: function(AuthService, $state) {
                return AuthService.getLoggedInUser().then(function(user) {
                    console.log(user)
                    if (user) $state.go('allRooms')
                })
            }
        }
    });

});

app.controller('SignUpCtrl', function($scope, UserFactory, AuthService, $state, user) {
    console.log(user)
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