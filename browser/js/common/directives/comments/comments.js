app.directive('comments', function($rootScope, AuthService, AUTH_EVENTS, $state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/comments/comments.html',
        controller: 'NewCommentCtrl'
    };
});

app.controller('NewCommentCtrl', function($scope, AuthService, CommentFactory) {
    console.log('hello')
    $scope.clicked = false;

    $scope.showForm = function() {
        $scope.clicked = true;
    }

    $scope.isLoggedIn = AuthService.isAuthenticated();

    // AuthService.getLoggedInUser().then(function(user) {
    //     $scope.comment.user = user;
    // });

    //$scope.comment.video.time =

    //CommentFactory.saveComment($scope.comment);
})