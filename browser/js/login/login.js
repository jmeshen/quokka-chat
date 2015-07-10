app.config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl',
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

app.controller('LoginCtrl', function($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function() {
            $state.go('allRooms');
        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });

    };

});