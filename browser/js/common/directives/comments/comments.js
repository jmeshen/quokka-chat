app.directive('comments', function($q, $rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
    return {
        restrict: 'E',
        scope: {
            comment: '=',
            children: '='
        },
        templateUrl: 'js/common/directives/comments/comments.html',
        link: function(scope) {

            scope.childComment = {
                parent: scope.comment._id
            }

            var user = AuthService.getLoggedInUser().then(function(user) {
                scope.childComment.userId = user._id;
            });

            scope.reply = function() {
                user.then(function() {
                    return CommentFactory.addReply(scope.childComment.parent, scope.childComment);
                }).then(function(child) {
                    console.log('THIS IS CHILD', child);
                    scope.children.push(child);
                    scope.childComment = null;
                }).catch(console.log);
            }
        }
    }

});