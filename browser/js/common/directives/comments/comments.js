app.directive('comments', function($rootScope, AuthService, AUTH_EVENTS, $state, VideoFactory, CommentFactory) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/comments/comments.html',
        // controller: 'NewCommentCtrl',
        link: function(scope) {

            scope.click = false;

            scope.showForm = function() {
                scope.clicked = true;
                VideoFactory.pauseVid();
            };

            scope.isLoggedIn = AuthService.isAuthenticated();


            // scope.comment = {
            //     user: AuthService.getLoggedInUser(),
            //     video: {
            //         time: VideoFactory.getCurTime()
            //     }
            // }

            



            // scope.comment.video.time = VideoFactory.getCurTimeAndPause();

            scope.addingComment = function() {
                CommentFactory.saveComment(scope.comment);
                console.log('THIS IS SCOPE.COMMENT', scope.comment);
            }
            // CommentFactory.saveComment(scope.comment);
        }
    }

});

// app.controller('NewCommentCtrl', function($scope, AuthService, CommentFactory) {
//     console.log('hello')
//     $scope.clicked = false;

//     $scope.showForm = function() {
//         $scope.clicked = true;
//     }

//     $scope.isLoggedIn = AuthService.isAuthenticated();

//     AuthService.getLoggedInUser().then(function(user) {
//         $scope.comment.user = user;
//     });

//     $scope.comment.video.time =

//     CommentFactory.saveComment($scope.comment);
// })