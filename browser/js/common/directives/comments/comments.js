app.directive('comments', function($q, $rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
    return {
        restrict: 'E',
        scope: {
            comment: '=',
            children: '=',
            user: '='
        },
        templateUrl: 'js/common/directives/comments/comments.html',
        link: function(scope) {

            scope.isAdmin = function() {
                if (scope.user) {
                    return scope.user.powerLevel === 'admin';
                }
            }

            scope.checked = false;

            scope.toggle = function() {

                if (scope.checked) {
                    scope.checked = false;
                } else {
                    scope.checked = true;
                }

            }

            //////////////////////children stuff////////////////////////////////////

            scope.childComment = {};
            scope.upVote = function(comment) {
                if (comment.rating.users.indexOf(scope.user) !== -1) {
                    comment.rating.score--;
                    comment.rating.users.splice(comment.rating.users.indexOf(scope.user), 1)
                } else {
                    comment.rating.score++
                    comment.rating.users.push(scope.user)
                    CommentFactory.changeRating(comment._id, comment);
                }
            }

            scope.downVote = function(comment) {
                if (comment.rating.users.indexOf(scope.user) !== -1) {
                    comment.rating.score++;
                    comment.rating.users.splice(comment.rating.users.indexOf(scope.user), 1)
                } else {
                    comment.rating.score--
                    comment.rating.users.push(scope.user)
                    CommentFactory.changeRating(comment._id, comment);
                }
            }


            scope.reply = function() {
                scope.childComment.parent = scope.comment._id;
                scope.childComment.userId = scope.user._id
                scope.childComment.username = scope.user.username
                CommentFactory.addReply(scope.childComment.parent, scope.childComment)
                    .then(function(child) {
                        scope.children.push(child);
                        scope.childComment = null;
}).catch(console.log);

            }

            //////////////////////grandkids stuff////////////////////////////////////
            scope.getReplies = function(parent) {
                scope.parent = parent;
                CommentFactory.getReplies(parent._id).then(function(replies) {
                    scope.grandChildren = replies;
                });
            }

            scope.grandChild = {};
            scope.replyToReply = function() {
                scope.grandChild.parent = scope.parent._id;
                scope.grandChild.userId = scope.user._id;
                scope.grandChild.username = scope.user.username;
                CommentFactory.addReply(scope.grandChild.parent, scope.grandChild)
                    .then(function(grandChild) {
                        scope.grandChildren.push(grandChild);
                        scope.grandChild = null;
                    }).catch(console.log);

            }

            //////////////////////////DELETE COMMENTS///////////////////////////

            scope.deleteComment = function(comment) {
                CommentFactory.removeComment(comment._id).then(function() {
                    if (scope.grandChildren) {
                        if (scope.grandChildren.indexOf(comment) > -1) {
                            var index = scope.grandChildren.indexOf(comment);
                            scope.grandChildren.splice(index, 1);
                        }
                    } else {
                        var index = scope.children.indexOf(comment);
                        scope.children.splice(index, 1);
                    }
                })
            }

        }
    }

});