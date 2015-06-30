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
                console.log('hitting the resolve')
                return VideoFactory.getVideoObjectId($stateParams.id)
                    .then(function(video) {
                        console.log('hello')
                        return video;
                    });
            }
        }
    });
});

app.controller('AllRoomCtrl', function($scope, VideoFactory) {
    console.log('hitting RoomCtrl, yo!')
    VideoFactory.getAll().then(function(videos) {
        console.log('videos??', videos)
        $scope.videos = videos;
        console.log('videos on scope?', $scope.videos)
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
    console.log($scope.comments)

    $scope.showForm = function() {
        $scope.clicked = true;
        VideoFactory.pauseVid();
    };

    $scope.hideForm = function() {
        $scope.clicked = false;
    }

    $scope.isLoggedIn = AuthService.isAuthenticated();

    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });


    $scope.addingComment = function(comment) {
        comment = {
            user: $scope.user._id,
            videoTime: VideoFactory.getCurTime(),
            content: $scope.comment.content,
            tags: $scope.comment.tags.replace(/\s/g, '').split(',')
        }
        CommentFactory.saveComment(comment).then(function(comment) {
            VideoFactory.addCommentToVid(comment, $scope.video._id);
        });
    }
});