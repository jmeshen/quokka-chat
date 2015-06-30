app.directive('comments', function($q, $rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
    return {
        restrict: 'E',
        scope: {
            comment: '='
        },
        templateUrl: 'js/common/directives/comments/comments.html',
        link: function(scope) {}
    }

});