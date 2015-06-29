app.directive('comments', function($q, $rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
    return {
        restrict: 'E',
        scope: {
            video: '='
        },
        templateUrl: 'js/common/directives/comments/comments.html',
        link: function(scope) {

        }
    }

});