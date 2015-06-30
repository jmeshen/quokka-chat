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
app.controller('SingleRoomCtrl', function($scope, $rootScope, VideoObj, CommentFactory, VideoFactory, AuthService) {
    $scope.video = VideoObj;
    $scope.clicked = false;
    $scope.comments = VideoObj.comments
    console.log('comments', $scope.comments)
    $scope.displayComments = []
    var section = 0
    var refresher;
    $scope.interval = 5000





    $rootScope.$on('duration', function(event, target) {
        $scope.duration = target.getDuration()
        var x = (Math.ceil($scope.duration / ($scope.interval / 1000)))
        console.log(x)
        for (var i = 0; i < x; i++) {
            $scope.displayComments.push([])
            for (var j = 0; j < $scope.comments.length; j++) {
                if ($scope.comments[j].videoTime < (($scope.interval / 1000) * (i + 1))) {
                    console.log($scope.comments)
                    console.log($scope.displayComments)
                    $scope.displayComments[i].push($scope.comments[j])
                    $scope.comments[j].videoTime = undefined
                }
            }
        }
        console.log($scope.displayComments)
    })


    $rootScope.$on('status', function(event, status) {

        if (status === 1) {
            refresher = window.setInterval(function() {
                section += 1
                console.log('logging', $scope.displayComments[section])
            }, $scope.interval)
        } else if (status === 2) {
            window.clearInterval(refresher)
            refresher = undefined
            console.log('never stop', refresher)
        }
    })


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