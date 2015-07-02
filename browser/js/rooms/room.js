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
    $scope.comments = VideoObj.comments.sort(function(a, b) {
        if (a.videoTime < b.videoTime) return -1
        else if (a.videoTime > b.videoTime) return 1
        else return 0
    })
    $scope.oneAtATime = true;
    $scope.isLoggedIn = AuthService.isAuthenticated();
    $scope.displayComments = {}
    $scope.interval = 5000
    $scope.displaying = []
    $scope.clicked = false;
    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });
    var refresher;

    $rootScope.$on('duration', function(event, player) {
        $scope.duration = player.getDuration()
        $scope.changeInterval(5)
        $scope.timeline = [];
        for (var i = 0; i < $scope.duration; i + $scope.interval) {
            $scope.timeline.push(i)
        }
    })
    $scope.changeInterval = function(number) {
        $scope.interval = number * 1000
        var lowerbound = 0 - (number / 2)
        var upperbound = 0 + (number / 2)
        var bucket = 0
        for (var i = 0; i < $scope.comments.length; i++) {
            debugger
            if (!$scope.displayComments[bucket]) $scope.displayComments[bucket] = []
            if ((lowerbound < $scope.comments[i].videoTime) && ($scope.comments[i].videoTime < upperbound)) {
                $scope.displayComments[bucket].push($scope.comments[i])
            } else {
                i--
                bucket += 1
                lowerbound += number
                upperbound += number
            }
        }

    }

    $rootScope.$on('status', function(event, player) {
        if (player.getPlayerState() === 1) {
            refresher = window.setInterval(function() {
                $rootScope.$emit('playing', player.getCurrentTime())
            }, $scope.interval)
        } else if (player.getPlayerState() === 2) {
            window.clearInterval(refresher)
            refresher = undefined
        }
    })

    $rootScope.$on('playing', function(event, currentTime) {
        var x = currentTime / $scope.interval
        $scope.displaying = $scope.displayComments[x]
    })

    $scope.showForm = function() {
        $scope.clicked = true;
        VideoFactory.pauseVid();
    };

    $scope.hideForm = function() {

    }
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