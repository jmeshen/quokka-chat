app.config(function($stateProvider) {
    $stateProvider.state('allRooms', {
        url: '/rooms',
        templateUrl: 'js/rooms/allRooms.html',
        controller: 'AllRoomCtrl'

    });

    $stateProvider.state('aRoom', {
        url: '/room/:id',
        templateUrl: 'js/rooms/aRoom.html',
        controller: 'SingleRoomCtrl',
        resolve: {
            VideoObj: function(VideoFactory, $stateParams) {
                return VideoFactory.getVideoObjectId($stateParams.id)
                    .then(function(video) {
                        return video;
                    });
            }
        }
    });
});

app.controller('AllRoomCtrl', function($scope, VideoFactory) {
    VideoFactory.getAll().then(function(videos) {
        $scope.videos = videos;
    })

    $scope.whichTag;

    $scope.searchVidsByTag = function(tag) {
        VideoFactory.getVidsByTag(tag).then(function(videos) {
            $scope.videos = videos;
        })
    }
});
app.controller('SingleRoomCtrl', function($scope, VideoObj, CommentFactory, VideoFactory, AuthService) {
    $scope.video = VideoObj;
    $scope.clicked = false;
    $scope.comments = VideoObj.comments

    $scope.showForm = function() {
        $scope.clicked = true;
        VideoFactory.pauseVid();
    };

    $scope.hideForm = function() {
        $scope.clicked = false;
    }

    $scope.oneAtATime = true;

    $scope.isLoggedIn = AuthService.isAuthenticated();

    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });



    $scope.getReplies = function(parent) {
        CommentFactory.getReplies(parent._id).then(function(replies) {
            $scope.children = replies;
        });
    }

    $scope.addingComment = function(comment) {
        comment = {
            user: $scope.user._id,
            videoTime: VideoFactory.getCurTime(),
            content: $scope.comment.content,
            tags: $scope.comment.tags
        }
        CommentFactory.saveComment(comment).then(function(comment) {
            VideoFactory.addCommentToVid(comment, $scope.video._id).then(function(video) {
                $scope.comments = video.comments;
            }).catch(console.log);
        });
        $scope.hideForm();
    }
});