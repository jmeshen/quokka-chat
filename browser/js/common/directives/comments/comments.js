app.directive('comments', function($q, $rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
    return {
        restrict: 'E',
        scope: {
            video: '='
        },
        templateUrl: 'js/common/directives/comments/comments.html',
        link: function(scope) {

            scope.clicked = false;

            scope.showForm = function() {
                scope.clicked = true;
                VideoFactory.pauseVid();
            };

            scope.isLoggedIn = AuthService.isAuthenticated();

            AuthService.getLoggedInUser().then(function(user) {
                scope.user = user;
            });


            scope.addingComment = function(comment) {
                comment = {
                    user: scope.user._id,
                    videoTime: VideoFactory.getCurTime(),
                    content: scope.comment.content,
                    tags: scope.comment.tags.replace(/\s/g, '').split(',')
                }
                CommentFactory.saveComment(comment).then(function(comment) {
                    VideoFactory.addCommentToVid(comment, scope.video._id);
                });
            }
            // CommentFactory.saveComment(scope.comment);
        }
    }

});