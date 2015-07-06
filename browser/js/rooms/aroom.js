app.config(function($stateProvider) {
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
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(function(user) {
                    return user
                })
            }
        }
    });
});



app.controller('SingleRoomCtrl', function($scope, $rootScope, user, VideoObj, CommentFactory, VideoFactory, AuthService) {
    $scope.user = user
    $scope.video = VideoObj;
    $scope.clicked = false;
    $scope.comments = VideoObj.comments.sort(function(a, b) {
        if (a.videoTime < b.videoTime) return -1
        else if (a.videoTime > b.videoTime) return 1
        else return 0
    })
    $scope.oneAtATime = true;
    $scope.isLoggedIn = AuthService.isAuthenticated();
    $scope.displayComments = []
    $scope.clicked = false;
    $scope.display = false;
    var refresher;
    $scope.empty = true
    $rootScope.$on('duration', function(event, player) {
        $scope.duration = player.getDuration()
    })
    $scope.refreshDisplay = function(num) {
        var x = Math.ceil(num / ($scope.interval / 1000))
        console.log($scope.displayComments)
        $scope.displaying = $scope.displayComments[x]
        if (!$scope.displaying) $scope.displaying = []
        if ($scope.displaying.length === 0) $scope.empty = true
        else $scope.empty = false
        console.log('display', $scope.displaying, x)
    }
    $scope.changeInterval = function(number) {
        $scope.interval = number * 1000
        var lowerbound = 0 - (number / 2)
        var upperbound = 0 + (number / 2)
        var bucket = 0
        for (var i = 0; i < $scope.comments.length; i++) {
            if (!$scope.displayComments[bucket]) $scope.displayComments[bucket] = []
            if ((lowerbound < $scope.comments[i].videoTime) && ($scope.comments[i].videoTime < upperbound)) {
                $scope.displayComments[bucket].push($scope.comments[i])
            } else {
                i--
                $scope.displayComments[bucket].push()
                bucket += 1
                lowerbound += number
                upperbound += number
            }
        }
        $scope.refreshDisplay(0)
    }
    $scope.changeInterval(5)
    $rootScope.$on('status', function(event, player) {
        if (player.getPlayerState() === 1) {
            window.clearInterval(refresher)
            refresher = window.setInterval(function() {
                $rootScope.$emit('playing', player.getCurrentTime())
            }, $scope.interval)
        } else if (player.getPlayerState() === 3) {
            $scope.refreshDisplay(player.getCurrentTime())
        } else {
            console.log(player.getPlayerState())
            window.clearInterval(refresher)
            refresher = undefined
        }
    })
    $rootScope.$on('playing', function(event, currentTime) {
        $scope.refreshDisplay(currentTime)
        $scope.$digest()
    })

    $scope.showForm = function() {
        $scope.clicked = true;
        VideoFactory.pauseVid();
    };

    $scope.hideForm = function() {
        $scope.clicked = false
    }
    $scope.getReplies = function(parent) {
        CommentFactory.getReplies(parent._id).then(function(replies) {
            replies.sort(function(a, b) {
                return parseFloat(b.rating) - parseFloat(a.rating);
            });
            $scope.children = replies;
        });
    }

    $scope.addingComment = function(comment) {
        console.log(comment)
        console.log(user);
        comment = {
            // user:
            // // {
            //     userID: $scope.user._id,
            // //     userName: $scope.user.username
            // // },

            user: $scope.user._id,
                // username: $scope.user.username

            title: $scope.comment.title,
            videoTime: VideoFactory.getCurTime(),
            content: $scope.comment.content,
            tags: $scope.comment.tags
        }
        CommentFactory.saveComment(comment).then(function(comment) {
            VideoFactory.addCommentToVid(comment, $scope.video._id).then(function(video) {
                $scope.comments = video.comments;
                $scope.displaying.push($scope.comment)
                $scope.comment = null
            }).catch(console.log);
        });
        $scope.hideForm();

    }
});